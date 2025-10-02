import { Icon } from '@pinback/design-system/icons';

export default function Tooltip() {
  return (
    <div>
      <p>일부 콘텐츠는 제목·이미지가 불러와지지 않을 수 있어요.</p>
      <Icon name="ic_info" size={16} />
    </div>
  );
}
