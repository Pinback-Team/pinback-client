import type { Meta, StoryObj } from '@storybook/react-vite';
import Level from './Level';

const meta: Meta<typeof Level> = {
  title: 'Components/Level',
  component: Level,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'number', min: 1, max: 100 },
      description: '현재 레벨 값',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Level>;

// 기본 예시
export const Default: Story = {
  args: {
    level: 1,
  },
};

export const Level10: Story = {
  args: {
    level: 10,
  },
};

export const Level99: Story = {
  args: {
    level: 99,
  },
};
