import { Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Checkbox } from '@pinback/design-system/ui';
import { JobsResponse } from '@shared/types/api';
import JobCards from './JobCards';
import JobCardsSkeleton from './JobCardsSkeleton';

export interface JobStepProps {
  selectedJob: string | null;
  onSelectJob: (job: string) => void;
  agreeChecked: boolean;
  onAgreeChange: (checked: boolean) => void;
}

const JobStep = ({
  selectedJob,
  onSelectJob,
  agreeChecked,
  onAgreeChange,
}: JobStepProps) => {
  const queryClient = useQueryClient();
  const cachedJobs = queryClient.getQueryData<JobsResponse>(['jobs']);
  const skeletonCount = cachedJobs?.jobs.length ?? 4;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-[2.4rem] flex flex-col items-center gap-[0.8rem]">
        <p className="head3 text-font-black-1">직무를 선택해주세요</p>
        <p className="body2-m text-font-gray-3 text-center">
          직무에 따라 아티클을 추천해드려요
        </p>
      </div>

      <Suspense fallback={<JobCardsSkeleton count={skeletonCount} />}>
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
