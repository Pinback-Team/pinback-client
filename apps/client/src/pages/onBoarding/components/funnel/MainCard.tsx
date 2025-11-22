import { Progress, Button } from '@pinback/design-system/ui';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoryStep from './step/StoryStep';
import AlarmStep from './step/AlarmStep';
import MacStep from './step/MacStep';
import FinalStep from './step/FinalStep';
import SocialLoginStep from './step/SocialLoginStep';
import { cva } from 'class-variance-authority';
import { usePostSignUp } from '@shared/apis/queries';
import { useNavigate, useLocation } from 'react-router-dom';
import { firebaseConfig } from '../../../../firebase-config';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { registerServiceWorker } from '@pages/onBoarding/utils/registerServiceWorker';
import { AlarmsType } from '@constants/alarms';
import { normalizeTime } from '@pages/onBoarding/utils/formatRemindTime';

const stepProgress = [{ progress: 30 }, { progress: 60 }, { progress: 100 }];

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
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [alarmSelected, setAlarmSelected] = useState<1 | 2 | 3>(1);
  const [isMac, setIsMac] = useState(false);

  const { mutate: postSignData } = usePostSignUp();

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setUserEmail(emailParam);
      localStorage.setItem('email', emailParam);
    }
    const stepParam = params.get('step');
    if (stepParam && !isNaN(Number(stepParam))) {
      setStep(Number(stepParam));
    }
  }, [location.search]);

  const [fcmToken, setFcmToken] = useState<string | null>(null);
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
      case 0:
      case 1:
      case 2:
        return <StoryStep step={step as 0 | 1 | 2} />;
      case 3:
        return <SocialLoginStep />;
      case 4:
        return (
          <AlarmStep selected={alarmSelected} setSelected={setAlarmSelected} />
        );
      case 5:
        if (isMac) return <MacStep />;
        return <FinalStep />;
      case 6:
        if (isMac) return <FinalStep />;
        return null;

      default:
        return <FinalStep />;
    }
  };

  const [remindTime, setRemindTime] = useState('09:00');

  const nextStep = async () => {
    const next = step + 1;

    if (step === 4) {
      if (alarmSelected === 1) setRemindTime('09:00');
      else if (alarmSelected === 2) setRemindTime('20:00');
      else {
        const raw = AlarmsType[alarmSelected - 1].time;
        setRemindTime(normalizeTime(raw));
      }
    }

    if ((isMac && step < 6) || (!isMac && step < 5)) {
      setDirection(1);
      setStep(next);
      navigate(`/onboarding?step=${next}`);
      return;
    }

    if ((isMac && step === 6) || (!isMac && step === 5)) {
      postSignData(
        {
          email: userEmail,
          remindDefault: remindTime,
          fcmToken: fcmToken,
        },
        {
          onSuccess: () => {
            window.location.href = '/';
          },
          onError: () => {
            const savedEmail = localStorage.getItem('email');
            if (savedEmail) {
              window.location.href = '/';
            }
          },
        }
      );
    }
  };

  const prevStep = () => {
    if (step > 0) {
      const prev = step - 1;
      setDirection(-1);
      setStep(prev);
      navigate(`/onboarding?step=${prev}`);
    }
  };

  return (
    <div className={CardStyle({ overflow: step === 4 && alarmSelected === 3 })}>
      {step < 3 && (
        <Progress
          value={stepProgress[step].progress}
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
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mb-[4.8rem] mt-[1.2rem] flex w-full justify-between px-[3.2rem]">
        {step < 4 && step > 0 && (
          <Button
            variant="secondary"
            size="medium"
            className="w-[4.8rem]"
            onClick={prevStep}
          >
            뒤로
          </Button>
        )}
        {step !== 3 && (
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
