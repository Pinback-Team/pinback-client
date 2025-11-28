import { Progress, Button } from '@pinback/design-system/ui';
import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialLoginStep from './step/SocialLoginStep';
const StoryStep = lazy(() => import('./step/StoryStep'));
const AlarmStep = lazy(() => import('./step/AlarmStep'));
const MacStep = lazy(() => import('./step/MacStep'));
const FinalStep = lazy(() => import('./step/FinalStep'));
import { cva } from 'class-variance-authority';
import { usePostSignUp } from '@shared/apis/queries';
import { useNavigate, useLocation } from 'react-router-dom';
import { firebaseConfig } from '../../../../firebase-config';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { registerServiceWorker } from '@pages/onBoarding/utils/registerServiceWorker';
import { AlarmsType } from '@constants/alarms';
import { normalizeTime } from '@pages/onBoarding/utils/formatRemindTime';
const stepProgress = [{ progress: 33 }, { progress: 66 }, { progress: 100 }];

export const Step = {
  STORY_0: 'STORY_0',
  STORY_1: 'STORY_1',
  STORY_2: 'STORY_2',
  SOCIAL_LOGIN: 'SOCIAL_LOGIN',
  ALARM: 'ALARM',
  MAC: 'MAC',
  FINAL: 'FINAL',
} as const;

export type StepType = (typeof Step)[keyof typeof Step];

const storySteps: StepType[] = [Step.STORY_0, Step.STORY_1, Step.STORY_2];

const variants = {
  slideIn: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  slideCenter: { x: 0, opacity: 1 },
  slideOut: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

const CardStyle = cva(
  'bg-white-bg flex h-[54.8rem] w-[63.2rem] flex-col items-center justify-between rounded-[2.4rem] pt-[3.2rem]',
  {
    variants: {
      overflow: {
        true: 'overflow-visible',
        false: 'overflow-hidden',
      },
    },
    defaultVariants: { overflow: false },
  }
);

const MainCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: postSignData } = usePostSignUp();

  const [step, setStep] = useState<StepType>(Step.STORY_0);
  const [direction, setDirection] = useState(0);
  const [alarmSelected, setAlarmSelected] = useState<1 | 2 | 3>(1);
  const [isMac, setIsMac] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [remindTime, setRemindTime] = useState('09:00');
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const stepOrder: StepType[] = [
    Step.STORY_0,
    Step.STORY_1,
    Step.STORY_2,
    Step.SOCIAL_LOGIN,
    Step.ALARM,
    Step.MAC,
    Step.FINAL,
  ];
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setUserEmail(emailParam);
      localStorage.setItem('email', emailParam);
    }

    const stepParam = params.get('step') as StepType;
    if (stepParam && Object.values(Step).includes(stepParam)) {
      setStep(stepParam);
    }
  }, [location.search]);

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const requestFCMToken = async (): Promise<string | null> => {
    try {
      const permission = await Notification.requestPermission();
      registerServiceWorker();

      if (permission !== 'granted') {
        alert('알림 권한 허용이 필요합니다!');
        return null;
      }

      const forFcmtoken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (forFcmtoken) {
        return forFcmtoken;
      } else {
        alert('토큰 생성 실패. 다시 시도해주세요.');
        return null;
      }
    } catch (error) {
      console.error('FCM 토큰 받는 도중 오류:', error);
      alert('알림 설정 중 오류가 발생했습니다. 다시 시도해주세요.');
      return null;
    }
  };

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac os') || ua.includes('iphone') || ua.includes('ipad')) {
      setIsMac(true);
    }

    (async () => {
      const token = await requestFCMToken();
      if (token) {
        setFcmToken(token);
        localStorage.setItem('FcmToken', token);
      } else {
        alert('푸시 알람 설정 에러');
      }
    })();
  }, []);

  const renderStep = () => {
    switch (step) {
      case Step.STORY_0:
      case Step.STORY_1:
      case Step.STORY_2:
        return (
          <StoryStep step={Number(step.replace('STORY_', '')) as 0 | 1 | 2} />
        );
      case Step.SOCIAL_LOGIN:
        return <SocialLoginStep />;
      case Step.ALARM:
        return (
          <AlarmStep selected={alarmSelected} setSelected={setAlarmSelected} />
        );
      case Step.MAC:
        return <MacStep />;
      case Step.FINAL:
        return <FinalStep />;
      default:
        return <FinalStep />;
    }
  };

  const nextStep = async () => {
    const idx = stepOrder.indexOf(step);
    const next = stepOrder[idx + 1];

    if (step === Step.ALARM) {
      if (alarmSelected === 1) setRemindTime('09:00');
      else if (alarmSelected === 2) setRemindTime('20:00');
      else {
        const raw = AlarmsType[alarmSelected - 1].time;
        setRemindTime(normalizeTime(raw));
      }
    }

    // 다음 스텝이 MAC인데 Mac 사용자가 아닐 경우 → 바로 FINAL로 건너뛰기
    if (next === Step.MAC && !isMac) {
      setDirection(1);
      setStep(Step.FINAL);
      navigate(`/onboarding?step=${Step.FINAL}`);
      return;
    }

    // 마지막 스텝(Final)인 경우 → API 호출
    if (step === Step.FINAL) {
      postSignData(
        { email: userEmail, remindDefault: remindTime, fcmToken },
        {
          onSuccess: () => (window.location.href = '/'),
          onError: () => {
            const savedEmail = localStorage.getItem('email');
            if (savedEmail) window.location.href = '/';
          },
        }
      );
      return;
    }

    // 일반적인 next 이동
    setDirection(1);
    setStep(next);
    navigate(`/onboarding?step=${next}`);
  };

  const prevStep = () => {
    const idx = stepOrder.indexOf(step);
    if (idx > 0) {
      const previous = stepOrder[idx - 1];
      setDirection(-1);
      setStep(previous);
      navigate(`/onboarding?step=${previous}`);
    }
  };

  return (
    <div
      className={CardStyle({
        overflow: step === Step.ALARM && alarmSelected === 3,
      })}
    >
      {storySteps.includes(step) && (
        <Progress
          value={stepProgress[storySteps.indexOf(step)].progress}
          variant="profile"
          className="w-[15.6rem]"
        />
      )}

      <div className="relative flex h-full w-full items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="slideIn"
            animate="slideCenter"
            exit="slideOut"
            transition={{ duration: 0.4 }}
            className="flex h-full flex-col items-center"
          >
            <Suspense fallback={null}>{renderStep()}</Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mb-[4.8rem] mt-[1.2rem] flex w-full justify-between px-[3.2rem]">
        {!([Step.STORY_0, Step.SOCIAL_LOGIN] as StepType[]).includes(step) && (
          <Button
            variant="secondary"
            size="medium"
            className="w-[4.8rem]"
            onClick={prevStep}
          >
            뒤로
          </Button>
        )}

        {step !== Step.SOCIAL_LOGIN && (
          <Button
            variant="primary"
            size="medium"
            className="ml-auto w-[4.8rem]"
            onClick={nextStep}
          >
            다음
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainCard;
