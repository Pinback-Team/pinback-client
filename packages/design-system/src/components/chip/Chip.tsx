import { cva } from 'class-variance-authority';
type ChipColor =
  | 'red'
  | 'purple'
  | 'navyblue'
  | 'skyblue'
  | 'emerald'
  | 'navygreen'
  | 'khaki'
  | 'orange'
  | 'amber'
  | 'maroon';

interface ChipProps {
  color: ChipColor;
  category: string;
}
const ChipColorVariants = cva(
  'caption2-sb rounded-[0.4rem] px-[0.8rem] py-[0.39rem]',
  {
    variants: {
      color: {
        red: 'bg-category-red-bg text-category-red-text',
        purple: 'bg-category-purple-bg text-category-purple-text',
        navyblue: 'bg-category-navyblue-bg text-category-navyblue-text',
        skyblue: 'bg-category-skyblue-bg text-category-skyblue-text',
        emerald: 'bg-category-emerald-bg text-category-emerald-text',
        navygreen: 'bg-category-navygreen-bg text-category-navygreen-text',
        khaki: 'bg-category-khaki-bg text-category-khaki-text',
        orange: 'bg-category-orange-bg text-category-orange-text',
        amber: 'bg-category-amber-bg text-category-amber-text',
        maroon: 'bg-category-maroon-bg text-category-maroon-text',
      },
    },
    defaultVariants: {
      color: 'red',
    },
  }
);
const Chip = ({ color, category }: ChipProps) => {
  return (
    <span className={ChipColorVariants({ color: color })}>{category}</span>
  );
};

export default Chip;
