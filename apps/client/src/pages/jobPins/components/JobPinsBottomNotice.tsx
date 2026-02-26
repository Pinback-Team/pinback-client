import JobPinsBottomSpinner from './JobPinsBottomSpinner';

interface JobPinsBottomNoticeProps {
  visible: boolean;
}

const JobPinsBottomNotice = ({ visible }: JobPinsBottomNoticeProps) => {
  return (
    <div
      className={`w-full overflow-hidden transition-all duration-300 ease-out ${
        visible
          ? 'max-h-[10rem] translate-y-0 py-[1.2rem] opacity-100'
          : 'max-h-0 translate-y-2 py-0 opacity-0'
      }`}
    >
      <div className="flex w-full flex-col items-center gap-[0.8rem]">
        <p className="body2-m text-font-gray-3 text-center">
          관심 직무 핀은 계속 업데이트 돼요!
        </p>
        <JobPinsBottomSpinner />
      </div>
    </div>
  );
};

export default JobPinsBottomNotice;
