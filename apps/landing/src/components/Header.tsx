import { Icon } from '@pinback/design-system/icons';
import { Button } from '@pinback/design-system/ui';

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[7.4rem] w-full items-center justify-between px-[8rem]">
      <Icon name={'logo'} width={87} height={24} />
      <div>
        {/*TODO: onClick 추가 */}
        <Button>다운로드</Button>
      </div>
    </header>
  );
};
export default Header;
