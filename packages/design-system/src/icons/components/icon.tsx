import clsx from 'clsx';
import React from 'react';
import type { IconName } from '../iconNames';

type IconRotate = 90 | 180 | 270;

type IconColor =
  | 'main0'
  | 'main100'
  | 'main200'
  | 'main300'
  | 'main400'
  | 'main500'
  | 'main600'
  | 'gradient-start'
  | 'gradient-end'
  | 'secondary'
  | 'gray0'
  | 'gray100'
  | 'gray200'
  | 'gray300'
  | 'gray400'
  | 'gray500'
  | 'gray600'
  | 'gray700'
  | 'gray800'
  | 'gray900'
  | 'white-bg'
  | 'gray-bg'
  | 'font-black-1'
  | 'font-gray-2'
  | 'font-gray-3'
  | 'font-ltgray-4'
  | 'font-ltgray-5'
  | 'error'
  | 'success'
  | 'category-red-text'
  | 'category-purple-text'
  | 'category-navyblue-text'
  | 'category-skyblue-text'
  | 'category-emerald-text'
  | 'category-navygreen-text'
  | 'category-khaki-text'
  | 'category-orange-text'
  | 'category-amber-text'
  | 'category-maroon-text'
  | 'category-red-bg'
  | 'category-purple-bg'
  | 'category-navyblue-bg'
  | 'category-skyblue-bg'
  | 'category-emerald-bg'
  | 'category-navygreen-bg'
  | 'category-khaki-bg'
  | 'category-orange-bg'
  | 'category-amber-bg'
  | 'category-maroon-bg';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: IconColor;
  className?: string;
  rotate?: IconRotate;
  hasRotateAnimation?: boolean;
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
  hasRotateAnimation = false,
  ariaHidden = true,
  ...rest
}: IconProps) => {
  const w = width ?? size ?? 20;
  const h = height ?? size ?? 20;

  const rotateClass =
    rotate === 90
      ? 'rotate-90'
      : rotate === 180
        ? 'rotate-180'
        : rotate === 270
          ? 'rotate-[270deg]'
          : '';

  const combined = clsx(
    'inline-block',
    rotateClass,
    hasRotateAnimation && 'transform transition-transform duration-200',
    className
  );

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
