import { Button } from '@pinback/design-system/ui';
import { usePatchUserJob } from '@shared/apis/queries';
import { useFunnel } from '@shared/hooks/useFunnel';
import { useState } from 'react';
import FunnelProgress from './FunnelProgress';
import JobStep from './step/job/JobStep';
import PinStep from './step/pin/PinStep';
import ShareStep from './step/share/ShareStep';

const funnelSteps = ['job', 'pin', 'share'] as const;
type FunnelStep = (typeof funnelSteps)[number];

interface JobSelectionFunnelProps {
  onComplete?: () => void;
}

export default function JobSelectionFunnel({
  onComplete,
}: JobSelectionFunnelProps) {
  const { currentStep, currentIndex, goNext, isLastStep } =
    useFunnel<FunnelStep>({
      steps: funnelSteps,
      initialStep: 'job',
    });

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobShareAgree, setJobShareAgree] = useState(false);
  const { mutateAsync: patchUserJob, isPending: isPatchUserJobPending } =
    usePatchUserJob();

  const handleNext = async () => {
    if (isLastStep) {
      if (selectedJob) {
        await patchUserJob({ job: selectedJob });
      }
      onComplete?.();
      return;
    }
    goNext();
  };

  return (
    <section className="bg-white-bg flex h-[54.8rem] w-full max-w-[82.6rem] flex-col items-center justify-between rounded-[2.4rem] px-[3.2rem] pb-[4.8rem] pt-[3.2rem]">
      <FunnelProgress
        currentIndex={currentIndex}
        totalSteps={funnelSteps.length}
      />

      <div className="flex h-full w-full items-center justify-center">
        {currentStep === 'job' && (
          <JobStep
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
            agreeChecked={jobShareAgree}
            onAgreeChange={setJobShareAgree}
          />
        )}
        {currentStep === 'pin' && <PinStep />}
        {currentStep === 'share' && <ShareStep />}
      </div>

      <div className="flex w-full justify-end">
        <Button
          variant="primary"
          size="medium"
          className="w-[4.8rem]"
          onClick={handleNext}
          isDisabled={
            isPatchUserJobPending ||
            (currentStep === 'job' && (!jobShareAgree || !selectedJob))
          }
        >
          {isLastStep ? '완료' : '다음'}
        </Button>
      </div>
    </section>
  );
}
