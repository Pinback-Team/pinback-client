import {
  Step,
  StepType,
  storySteps,
} from '@pages/onBoarding/constants/onboardingSteps';
import { useOnboardingFunnel } from '@pages/onBoarding/hooks/useOnboardingFunnel';
import { Button, Progress } from '@pinback/design-system/ui';
import { cva } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import SocialLoginStep from './step/socialLogin/SocialLoginStep';
const StoryStep = lazy(() => import('./step/story/StoryStep'));
const JobStep = lazy(() => import('./step/job/JobStep'));
const AlarmStep = lazy(() => import('./step/alarm/AlarmStep'));
const MacStep = lazy(() => import('./step/mac/MacStep'));
const FinalStep = lazy(() => import('./step/final/FinalStep'));
const stepProgress = [{ progress: 33 }, { progress: 66 }, { progress: 100 }];

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
  'bg-white-bg flex h-[54.8rem] w-full max-w-[82.6rem] flex-col items-center justify-between rounded-[2.4rem] pt-[3.2rem]',
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
  const {
    step,
    direction,
    alarmSelected,
    jobShareAgree,
    selectedJob,
    setAlarmSelected,
    setJobShareAgree,
    setSelectedJob,
    nextStep,
    prevStep,
  } = useOnboardingFunnel();

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
      case Step.JOB:
        return (
          <JobStep
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
            agreeChecked={jobShareAgree}
            onAgreeChange={setJobShareAgree}
          />
        );
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
        {!(
          [Step.STORY_0, Step.SOCIAL_LOGIN, Step.MAC, Step.FINAL] as StepType[]
        ).includes(step) && (
          <Button
            variant="secondary"
            size="medium"
            className="w-[4.8rem]"
            onClick={prevStep}
          >
            뒤로
          </Button>
        )}

        {!([Step.SOCIAL_LOGIN, Step.FINAL] as StepType[]).includes(step) && (
          <Button
            variant="primary"
            size="medium"
            className="ml-auto w-[4.8rem]"
            onClick={nextStep}
            isDisabled={step === Step.JOB && (!jobShareAgree || !selectedJob)}
          >
            다음
          </Button>
        )}
      </div>
    </div>
  );
};

export default MainCard;
