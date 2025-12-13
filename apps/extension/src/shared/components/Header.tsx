import { Icon } from '@pinback/design-system/icons';
import { useState } from 'react';
const Header = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <Icon
        name={isHover ? 'ext_home2' : 'ext_home1'}
        width={28}
        height={28}
        className="cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          chrome.tabs.create({ url: 'https://www.pinback.today/' });
        }}
      />
      <Icon name="main_logo" width={72} height={20} />
    </div>
  );
};

export default Header;
