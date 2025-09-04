import { Progress, Button } from '@pinback/design-system/ui';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoryStep from './StoryStep';
import AlarmStep from './AlarmStep';

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

  const nextStep = () => {
    if (step < 3) {
      // 0,1,2 → story, 3 → alarm
      setDirection(1);
      setStep((prev) => prev + 1);
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
      {/* ProgressBar는 story 단계에서만 보여줌 */}
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
            className="absolute flex flex-col items-center"
          >
            {step < 3 ? <StoryStep step={step as 0 | 1 | 2} /> : <AlarmStep />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mb-[4.8rem] mt-[1.2rem] flex w-full justify-between px-[3.2rem]">
        <Button
          variant="primary"
          size="medium"
          isDisabled={step === 0}
          className="w-[4.8rem]"
          onClick={prevStep}
        >
          이전
        </Button>
        <Button
          variant="primary"
          size="medium"
          isDisabled={step === 3} // 마지막은 alarmStep
          className="w-[4.8rem]"
          onClick={nextStep}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default MainCard;
