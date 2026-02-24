import { Checkbox } from '@pinback/design-system/ui';
import { cn } from '@pinback/design-system/utils';
import jobPlan from '/assets/onBoarding/jobs/jobPlan.svg';
import jobDesign from '/assets/onBoarding/jobs/jobDesign.svg';
import jobFrontend from '/assets/onBoarding/jobs/jobFrontend.svg';
import jobBackend from '/assets/onBoarding/jobs/jobBackend.svg';

export type JobKey = 'planner' | 'designer' | 'frontend' | 'backend';

export interface JobStepProps {
  selectedJob: JobKey;
  onSelectJob: (job: JobKey) => void;
  agreeChecked: boolean;
  onAgreeChange: (checked: boolean) => void;
}

const jobCardStyle = (selected: boolean) =>
  cn(
    'flex h-[22.4rem] w-[18rem] flex-col items-center justify-center rounded-[1.2rem] border transition',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main400 focus-visible:ring-offset-2 focus-visible:ring-offset-white-bg',
    selected
      ? 'border-main400 bg-main0'
      : 'border-transparent bg-white-bg hover:border-main300'
  );

const JobIcon = ({ type }: { type: JobKey }) => {
  const iconMap: Record<JobKey, string> = {
    planner: jobPlan,
    designer: jobDesign,
    frontend: jobFrontend,
    backend: jobBackend,
  };

  return (
    <img
      src={iconMap[type]}
      alt=""
      aria-hidden="true"
      className="h-[10.2rem] w-[10.2rem]"
    />
  );
};

const JobStep = ({
  selectedJob,
  onSelectJob,
  agreeChecked,
  onAgreeChange,
}: JobStepProps) => {
  const jobs: { key: JobKey; label: string }[] = [
    { key: 'planner', label: '기획자' },
    { key: 'designer', label: '디자이너' },
    { key: 'frontend', label: '프론트엔드 개발자' },
    { key: 'backend', label: '백엔드 개발자' },
  ];

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-[2.4rem] flex flex-col items-center gap-[0.8rem]">
        <p className="head3 text-font-black-1">직무를 선택해주세요</p>
        <p className="body2-m text-font-gray-3 text-center">
          직무에 따라 아티클을 추천해드려요
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="직무 선택"
        className="grid w-full grid-cols-2 justify-items-center gap-[1.4rem] sm:grid-cols-4"
      >
        {jobs.map((job) => {
          const isSelected = selectedJob === job.key;
          return (
            <button
              key={job.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectJob(job.key)}
              className={jobCardStyle(isSelected)}
            >
              <div className="flex flex-col items-center gap-[1.6rem]">
                <JobIcon type={job.key} />
                <span
                  className={cn(
                    'sub3-sb text-center',
                    isSelected ? 'text-main500' : 'text-font-black-1'
                  )}
                >
                  {job.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

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
