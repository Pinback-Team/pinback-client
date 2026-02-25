import { Suspense, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import dotori from '/assets/onBoarding/icons/dotori.svg';
import jobPlan from '/assets/onBoarding/jobs/jobPlan.svg';
import jobDesign from '/assets/onBoarding/jobs/jobDesign.svg';
import jobFrontend from '/assets/onBoarding/jobs/jobFrontend.svg';
import jobBackend from '/assets/onBoarding/jobs/jobBackend.svg';
import { Checkbox } from '@pinback/design-system/ui';
import { useSuspenseGetJobs } from '@shared/apis/queries';

interface JobStepProps {
  selectedJob: string | null;
  onSelectJob: (jobName: string) => void;
  agreeChecked: boolean;
  onAgreeChange: (checked: boolean) => void;
}

interface JobCardsProps {
  activeJob: string | null;
  onSelectJob: (jobName: string) => void;
}

const jobCardStyle = cva(
  'flex h-[22.4rem] w-[18rem] flex-col items-center justify-center rounded-[1.2rem] border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main400 focus-visible:ring-offset-2 focus-visible:ring-offset-white-bg',
  {
    variants: {
      selected: {
        true: 'border-main400 bg-main0',
        false: 'border-transparent bg-white-bg hover:border-main300',
      },
    },
    defaultVariants: { selected: false },
  }
);

const jobImageByName: Record<string, string> = {
  기획자: jobPlan,
  디자이너: jobDesign,
  프론트엔드: jobFrontend,
  백엔드: jobBackend,
};

const JobIcon = ({
  jobName,
  imageUrl,
}: {
  jobName: string;
  imageUrl: string;
}) => {
  const resolvedImageUrl = jobImageByName[jobName] ?? imageUrl;
  return (
    <img
      src={resolvedImageUrl}
      alt={`${jobName} 직무 아이콘`}
      aria-hidden="true"
      className="h-[10.2rem] w-[10.2rem]"
    />
  );
};

const JobCardsSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-2 justify-items-center gap-[1.4rem] sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray100 h-[22.4rem] w-[18rem] animate-pulse rounded-[1.2rem]"
        />
      ))}
    </div>
  );
};

const JobCards = ({ activeJob, onSelectJob }: JobCardsProps) => {
  const { data: jobData } = useSuspenseGetJobs();
  const jobOptions = jobData.jobs;

  useEffect(() => {
    if (!activeJob && jobOptions.length > 0) {
      onSelectJob(jobOptions[0].job);
    }
  }, [activeJob, jobOptions, onSelectJob]);

  return (
    <div
      role="radiogroup"
      aria-label="직무 선택"
      className="grid w-full grid-cols-2 justify-items-center gap-[1.4rem] sm:grid-cols-4"
    >
      {jobOptions.map(({ imageUrl: jobImageUrl, job: jobName }) => {
        const isSelected = activeJob === jobName;
        return (
          <button
            key={jobName}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectJob(jobName)}
            className={jobCardStyle({ selected: isSelected })}
          >
            <div className="flex flex-col items-center gap-[1.6rem]">
              <JobIcon jobName={jobName} imageUrl={jobImageUrl} />
              <span
                className={`sub3-sb ${
                  isSelected ? 'text-main500' : 'text-font-black-1'
                }`}
              >
                {jobName}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const JobStep = ({
  selectedJob,
  onSelectJob,
  agreeChecked,
  onAgreeChange,
}: JobStepProps) => {
  return (
    <div className="flex w-full flex-col items-center">
      <img src={dotori} className="mb-[1.2rem]" alt="dotori" />
      <div className="mb-[2.4rem] flex flex-col items-center gap-[0.8rem]">
        <p className="head3 text-font-black-1">직무를 선택해주세요</p>
        <p className="body2-m text-font-gray-3 text-center">
          직무에 따라 아티클을 추천해드려요
        </p>
      </div>

      <Suspense fallback={<JobCardsSkeleton />}>
        <JobCards activeJob={selectedJob} onSelectJob={onSelectJob} />
      </Suspense>

      <label className="mt-[2.4rem] flex max-w-[62rem] items-start gap-[1.2rem]">
        <Checkbox
          size="small"
          isSelected={agreeChecked}
          onSelectedChange={onAgreeChange}
        />
        <span className="body3-r text-font-gray-3">
          내가 북마크한 아티클이 내 Google 이름과 함께 다른 사용자에게 추천될 수
          있어요.
        </span>
      </label>
    </div>
  );
};

export default JobStep;
