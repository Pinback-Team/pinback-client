import { Progress, Button } from '@pinback/design-system/ui';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoryStep from './StoryStep';
import AlarmStep from './AlarmStep';
import MacStep from './MacStep';
import FinalStep from './FinalStep';
import { AlarmsType } from './AlarmBox';

const stepProgress = [{ progress: 30 }, { progress: 60 }, { progress: 100 }];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

const MainCard = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [alarmSelected, setAlarmSelected] = useState<1 | 2 | 3>(1);

  const renderStep = () => {
    switch (step) {
      case 0:
      case 1:
      case 2:
        return <StoryStep step={step as 0 | 1 | 2} />;
      case 3:
        return (
          <AlarmStep selected={alarmSelected} setSelected={setAlarmSelected} />
        );
      case 4:
        return <MacStep />;
      case 5:
        return <FinalStep />;
      default:
        return <FinalStep />;
    }
  };
  const nextStep = () => {
    if (step === 3) {
      console.log('선택된 알람:', AlarmsType[alarmSelected - 1].time);
    }
    if (step < 5) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else if (step === 5) {
      window.location.href = '/';
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white-bg flex h-[54.8rem] w-[63.2rem] flex-col items-center justify-between overflow-hidden rounded-[2.4rem] pt-[3.2rem]">
      {step < 3 && (
        <Progress
          value={stepProgress[step].progress}
          variant="profile"
          className="w-[30%]"
        />
      )}

      <div className="relative flex h-full w-full items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
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
