import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

// Storybook에 컴포넌트를 어떻게 표시할지 정의합니다.
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
};
