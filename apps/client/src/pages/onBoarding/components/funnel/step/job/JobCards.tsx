import { cva } from 'class-variance-authority';
import jobPlan from '/assets/onBoarding/jobs/jobPlan.svg';
import jobDesign from '/assets/onBoarding/jobs/jobDesign.svg';
import jobFrontend from '/assets/onBoarding/jobs/jobFrontend.svg';
import jobBackend from '/assets/onBoarding/jobs/jobBackend.svg';
import { useSuspenseGetJobs } from '@shared/apis/queries';

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

const JobCards = ({ activeJob, onSelectJob }: JobCardsProps) => {
  const { data: jobData } = useSuspenseGetJobs();
  const jobOptions = jobData.jobs;

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

export default JobCards;
