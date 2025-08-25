import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    category: 'Frontend',
    color: 'red',
  },
  argTypes: {
    category: {
      control: 'text',
      description: '칩에 표시할 텍스트',
    },
    color: {
      control: { type: 'select' },
      options: [
        'red',
        'purple',
        'navyblue',
        'skyblue',
        'emerald',
        'navygreen',
        'khaki',
        'orange',
        'amber',
        'maroon',
      ],
      description: '카테고리 색상',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '카테고리를 색상별로 표시하는 Chip 컴포넌트. cva로 색상 variants를 스위칭합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const AllColors: Story = {
  args: { category: 'Category' },
  render: (args) => {
    const colors = [
      'red',
      'purple',
      'navyblue',
      'skyblue',
      'emerald',
      'navygreen',
      'khaki',
      'orange',
      'amber',
      'maroon',
    ] as const;

    return (
      <div style={{ display: 'grid', gap: '8px' }}>
        {colors.map((c) => (
          <div
            key={c}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Chip {...args} color={c} />
            <code style={{ fontSize: 12 }}>{c}</code>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: '팔레트 뷰: 모든 색상 변형을 한 번에 미리보기' },
    },
  },
};
