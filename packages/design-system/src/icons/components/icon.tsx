import type { IconName } from '../iconNames';
import clsx from 'clsx';

type IconRotate = 90 | 180 | 270;

type IconColor =
  | 'main0'
  | 'main100'
  | 'main200'
  | 'main300'
  | 'main400'
  | 'main500'
  | 'main600'
  | 'secondary'
  | 'error400'
  | 'success400'
  | 'white'
  | 'black'
  | 'gray0'
  | 'gray100'
  | 'gray200'
  | 'gray300'
  | 'gray400'
  | 'gray500'
  | 'gray600'
  | 'gray700'
  | 'gray800'
  | 'gray900';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: IconColor;
  className?: string;
  rotate?: IconRotate;
  ariaHidden?: boolean;
}

export const Icon = ({
  name,
  size,
  width,
  height,
  color,
  className,
  rotate,
  ariaHidden = true,
  ...rest
}: IconProps) => {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  const rotateClass =
    rotate === 90
      ? 'rotate-90'
      : rotate === 180
        ? 'rotate-180'
        : rotate === 270
          ? 'rotate-[270deg]'
          : '';

  const combined = clsx('inline-block', rotateClass, className);

  return (
    <svg
      width={typeof w === 'number' ? `${w}px` : w}
      height={typeof h === 'number' ? `${h}px` : h}
      className={combined}
      style={color ? { color: `var(--color-${color})` } : undefined}
      aria-hidden={ariaHidden}
      {...rest}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};
