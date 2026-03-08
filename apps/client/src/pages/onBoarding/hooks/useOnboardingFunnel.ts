import { AlarmsType } from '@constants/alarms';
import {
  Step,
  stepOrder,
  StepType,
} from '@pages/onBoarding/constants/onboardingSteps';
import { normalizeTime } from '@pages/onBoarding/utils/formatRemindTime';
import { registerServiceWorker } from '@pages/onBoarding/utils/registerServiceWorker';
import { sendGAEvent } from '@pinback/design-system/ui';
import { usePostSignUp } from '@shared/apis/queries';
import { useFunnel } from '@shared/hooks/useFunnel';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { useCallback, useEffect, useState } from 'react';
import { firebaseConfig } from '../../../firebase-config';

type AlarmSelection = 1 | 2 | 3;

export function useOnboardingFunnel() {
  const { mutate: postSignData } = usePostSignUp();
  const {
    currentStep: step,
    currentIndex,
    setStep,
    goNext,
    goPrev,
  } = useFunnel<StepType>({
    steps: stepOrder,
    initialStep: Step.STORY_0,
  });

  const [direction, setDirection] = useState(0);
  const [alarmSelected, setAlarmSelected] = useState<AlarmSelection>(1);
  const [isMac, setIsMac] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [remindTime, setRemindTime] = useState('09:00');
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [jobShareAgree, setJobShareAgree] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const requestFCMToken = useCallback(async (): Promise<string | null> => {
    try {
      const app =
        getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
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
      }

      alert('토큰 생성 실패. 다시 시도해주세요.');
      return null;
    } catch {
      alert('알림 설정 중 오류가 발생했습니다. 다시 시도해주세요.');
      return null;
    }
  }, []);

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
  }, [requestFCMToken]);

  const nextStep = useCallback(async () => {
    const next = stepOrder[currentIndex + 1];
    const isAlarmStep = step === Step.ALARM;
    const isMacStep = next === Step.MAC;
    const shouldSkipMacStep = isMacStep && !isMac;

    // AlarmStep에서 알람 시간 세팅 + 회원가입 실행
    if (isAlarmStep) {
      let finalRemindTime = remindTime;

      if (alarmSelected === 1) finalRemindTime = '09:00';
      else if (alarmSelected === 2) finalRemindTime = '20:00';
      else {
        const raw = AlarmsType[alarmSelected - 1].time;
        finalRemindTime = normalizeTime(raw);
      }

      setRemindTime(finalRemindTime);

      postSignData(
        {
          email: userEmail,
          remindDefault: finalRemindTime,
          fcmToken,
          job: selectedJob ?? '',
        },
        {
          onSuccess: () => {
            setDirection(1);

            // MacStep 스킵 여부 처리
            if (shouldSkipMacStep) {
              setStep(Step.FINAL);
            } else {
              goNext();
            }
          },
          onError: () => {
            const savedEmail = localStorage.getItem('email');
            if (savedEmail) {
              alert('회원가입에 실패했습니다. 다시 시도해주세요.');
              window.location.href = '/';
            }
          },
        }
      );
      return;
    }

    setDirection(1);
    goNext();
    sendGAEvent(
      `onboard-step-${currentIndex + 1}`,
      `onboard-step-${currentIndex + 1}`,
      `onboard-step-${currentIndex + 1}`
    );
  }, [
    alarmSelected,
    currentIndex,
    fcmToken,
    goNext,
    isMac,
    postSignData,
    remindTime,
    selectedJob,
    setStep,
    step,
    userEmail,
  ]);

  const prevStep = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      goPrev();
    }
  }, [currentIndex, goPrev]);

  return {
    step,
    currentIndex,
    direction,
    alarmSelected,
    jobShareAgree,
    selectedJob,
    setAlarmSelected,
    setJobShareAgree,
    setSelectedJob,
    nextStep,
    prevStep,
  };
}
