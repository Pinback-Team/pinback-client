import { Icon } from '@pinback/design-system/icons';
import { Balloon } from '@shared/components/balloon/Balloon';

const JobPins = () => {
  return (
    <div>
      {' '}
      <Balloon variant="main" side="bottom">
        <div className="text-lg font-semibold">치삐가 방금</div>

        <div className="text-sm opacity-90">도토리 1개를 모았어요!</div>
      </Balloon>
      <Balloon variant="gray" side="left" onClose={() => alert('닫힘')}>
        <div className="text-lg font-semibold">치삐가 방금</div>

        <div className="text-sm opacity-90">도토리 1개를 모았어요!</div>
      </Balloon>
      <Balloon variant="gray" side="left">
        <Icon name="ic_info" size={16} />
        <div className="text-sm opacity-90">도토리 1개를 모았어요!</div>
      </Balloon>
      <Balloon variant="main" side="bottom">
        <div className="flex items-center gap-3">
          {/* 캐릭터 이미지 */}
          <Icon name="chippi_profile" size={40} />

          {/* 텍스트 영역 */}
          <div className="flex flex-col">
            <div className="text-[18px] font-semibold">치삐가 방금</div>
            <div className="text-[16px]">도토리 1개를 모았어요!</div>
          </div>
        </div>
      </Balloon>
    </div>
  );
};

export default JobPins;
