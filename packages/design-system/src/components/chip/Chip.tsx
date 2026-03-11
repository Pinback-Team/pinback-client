import { cva } from 'class-variance-authority';

export type ChipColor =
  | 'COLOR1'
  | 'COLOR2'
  | 'COLOR3'
  | 'COLOR4'
  | 'COLOR5'
  | 'COLOR6'
  | 'COLOR7'
  | 'COLOR8'
  | 'COLOR9'
  | 'COLOR10';

interface ChipProps {
  color: ChipColor;
  category: string;
}

const ChipColorVariants = cva(
  'caption2-sb rounded-[0.4rem] px-[0.8rem] py-[0.39rem]',
  {
    variants: {
      color: {
        COLOR1: 'bg-category-red-bg text-category-red-text',
        COLOR2: 'bg-category-purple-bg text-category-purple-text',
        COLOR3: 'bg-category-navyblue-bg text-category-navyblue-text',
        COLOR4: 'bg-category-skyblue-bg text-category-skyblue-text',
        COLOR5: 'bg-category-emerald-bg text-category-emerald-text',
        COLOR6: 'bg-category-navygreen-bg text-category-navygreen-text',
        COLOR7: 'bg-category-khaki-bg text-category-khaki-text',
        COLOR8: 'bg-category-orange-bg text-category-orange-text',
        COLOR9: 'bg-category-amber-bg text-category-amber-text',
        COLOR10: 'bg-category-maroon-bg text-category-maroon-text',
      },
    },
    defaultVariants: {
      color: 'COLOR1',
    },
  }
);
const Chip = ({ color, category }: ChipProps) => {
  return (
    <span className={ChipColorVariants({ color: color })}>{category}</span>
  );
};

export default Chip;
