import { Icon } from '@pinback/design-system/icons';
import { cn } from '@pinback/design-system/utils';

interface MyLevelItemProps {
  active: boolean;
}
//TODO: 프로필카드 만들기

export default function MyLevelItem({ active }: MyLevelItemProps) {
  return (
    <div
      className={cn(
        'bg-white-bg flex h-[6.2rem] w-full rounded-[0.4rem] p-[0.8rem]',
        'transition-colors'
      )}
    ></div>
  );
}
