import { Icon } from '@pinback/design-system/icons';
import { Button, sendGAEvent } from '@pinback/design-system/ui';

const Header = () => {
  const handleHeaderInstallClick = () => {
    sendGAEvent('랜딩페이지', '랜딩페이지', '헤더 설치 버튼 클릭');
    window.location.href =
      'https://chromewebstore.google.com/detail/pinback-extension/engpidnjjbemfjmpcplchpfhokkgnbec?hl=ko&utm_source=ext_sidebar';
  };
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[7.4rem] w-full items-center justify-between px-[8rem]">
      <Icon name={'logo'} width={87} height={24} />
      <div>
        <Button onClick={handleHeaderInstallClick}>다운로드</Button>
      </div>
    </header>
  );
};
export default Header;
