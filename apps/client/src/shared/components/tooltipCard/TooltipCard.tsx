import { Icon } from '@pinback/design-system/icons';
import InfoCard from './InfoCard';

export default function TooltipCard() {
  return (
    <div className="mt-[0.8rem] flex items-center">
      <p className="body3-r text-font-gray-3">
        일부 콘텐츠는 제목·이미지가 불러와지지 않을 수 있어요.
      </p>

      <div className="relative inline-flex items-center">
        <button
          type="button"
          aria-describedby="info-card"
          className="peer rounded p-[0.4rem]"
        >
          <Icon name="ic_info" size={16} />
        </button>

        <div
          id="info-card"
          className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-[100] opacity-0 transition-opacity duration-150 peer-hover:opacity-100 peer-focus-visible:opacity-100"
        >
          <InfoCard />
        </div>
      </div>
    </div>
  );
}
