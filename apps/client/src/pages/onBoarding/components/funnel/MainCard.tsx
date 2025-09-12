import { Progress, Button } from '@pinback/design-system/ui';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoryStep from './step/StoryStep';
import AlarmStep from './step/AlarmStep';
import MacStep from './step/MacStep';
import FinalStep from './step/FinalStep';
import { cva } from 'class-variance-authority';
import { usePostSignUp } from '@shared/apis/queries';
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
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [alarmSelected, setAlarmSelected] = useState<1 | 2 | 3>(1);
  const [isMac, setIsMac] = useState(false);
  // api 구간
  const {mutate:postSignData} = usePostSignUp();

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac os') || ua.includes('iphone') || ua.includes('ipad')) {
      setIsMac(true);
    }
  }, []);
 const renderStep = () => {
    switch (step) {
      case 0:
      case 1:
      case 2:
        return <StoryStep step={step as 0 | 1 | 2} />;
      case 3:
        return <AlarmStep selected={alarmSelected} setSelected={setAlarmSelected} />;
      case 4:
        if (isMac) return <MacStep />;
        return <FinalStep />;
      case 5:
        if (isMac) return <FinalStep />;
        return null;
      default:
        return <FinalStep />;
    }
  };

  const nextStep = () => {
    if (step === 3) {
      // 이거 이후에 api 붙일 자리 표시임! console.log('선택된 알람:', AlarmsType[alarmSelected - 1].time);
    }
    if (step < 5) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else if (step === 5) {
      postSignData({
            "email": "tesdfdfsst@gmail.com", 
            "remindDefault": "08:00", 
            "fcmToken": "adlfdjlajlkadfsjlkfdsdfsdfsdfsdfsa"
        },
        {
          onSuccess:()=>{
            window.location.href = '/';
           }
        }
      )
      
      
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className={CardStyle({ overflow: step === 3 && alarmSelected === 3 })}>
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
        {step < 4 && (
          <Button
            variant="primary"
            size="medium"
            isDisabled={step === 0}
            className="w-[4.8rem]"
            onClick={prevStep}
          >
            이전
          </Button>
        )}
        <Button
          variant="primary"
          size="medium"
          isDisabled={step === 6}
          className="ml-auto w-[4.8rem]"
          onClick={nextStep}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default MainCard;
