import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'head1',
        'head2',
        'head3',
        'head4',
        'head5',
        'head6',
        'sub1-sb',
        'sub1-m',
        'sub2-b',
        'sub2-sb',
        'sub3-b',
        'sub3-sb',
        'sub4-sb',
        'sub5-sb',
        'body1-m',
        'body1-r',
        'body2-m',
        'body2-r',
        'body3-r',
        'body4-r',
        'caption1-sb',
        'caption1-m',
        'caption2-sb',
        'caption2-m',
      ],

      color: [
        // main
        'main0',
        'main100',
        'main200',
        'main300',
        'main400',
        'main500',
        'main600',

        // gradient
        'gradient-start',
        'gradient-end',

        // secondary
        'secondary',

        // grayscale
        'gray0',
        'gray100',
        'gray200',
        'gray300',
        'gray400',
        'gray500',
        'gray600',
        'gray700',
        'gray800',
        'gray900',

        // bg
        'white-bg',
        'gray-bg',

        // font
        'font-black-1',
        'font-gray-2',
        'font-gray-3',
        'font-ltgray-4',
        'font-ltgray-5',

        // state
        'error',
        'success',

        // category text
        'category-red-text',
        'category-purple-text',
        'category-navyblue-text',
        'category-skyblue-text',
        'category-emerald-text',
        'category-navygreen-text',
        'category-khaki-text',
        'category-orange-text',
        'category-amber-text',
        'category-maroon-text',

        // category bg
        'category-red-bg',
        'category-purple-bg',
        'category-navyblue-bg',
        'category-skyblue-bg',
        'category-emerald-bg',
        'category-navygreen-bg',
        'category-khaki-bg',
        'category-orange-bg',
        'category-amber-bg',
        'category-maroon-bg',
      ],

      shadow: ['popup'],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
