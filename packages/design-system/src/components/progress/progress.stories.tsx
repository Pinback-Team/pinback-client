// packages/design-system/src/components/progress/Progress.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect, useState } from 'react';
import { within, userEvent, expect } from '@storybook/test';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '단일 로직을 공유하고 **variant**로 스타일만 분기하는 진행바입니다.\n' +
          '- `variant="profile"`: 얇은 트랙 + 단색 인디케이터 (기본)\n' +
          '- `variant="tree"`: 두꺼운 트랙 + 그라데이션 인디케이터\n' +
          '내부 채움은 `width: {value}%`로 처리됩니다.',
      },
    },
  },
  argTypes: {
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
    ref: { table: { disable: true } },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '진행 퍼센트(0–100)',
    },
    variant: {
      control: { type: 'radio' },
      options: ['profile', 'tree'],
      description: '스타일 분기',
    },
  },
  args: {
    value: 40,
    variant: 'profile',
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

const Frame: React.FC<React.ComponentProps<typeof Progress>> = (props) => (
  <div style={{ width: 320 }}>
    <Progress {...props} />
  </div>
);

export const Basic: Story = {
  render: (args) => <Frame {...args} />,
};

export const Tree: Story = {
  args: { variant: 'tree', value: 70 },
  render: (args) => <Frame {...args} />,
};

export const Zero: Story = {
  args: { value: 0 },
  render: (args) => <Frame {...args} />,
};

export const Full: Story = {
  args: { value: 100 },
  render: (args) => <Frame {...args} />,
};

// 훅은 별도 컴포넌트에서 사용
const AutoProgressDemo: React.FC<{ variant?: 'profile' | 'tree' }> = ({
  variant = 'profile',
}) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setV((p) => (p >= 100 ? 0 : p + 10)), 250);
    return () => clearInterval(id);
  }, []);
  return <Frame value={v} variant={variant} />;
};

export const AutoProgress: Story = {
  name: 'Auto progress (demo)',
  args: { variant: 'tree' },
  render: (args) => (
    <AutoProgressDemo variant={args.variant as 'profile' | 'tree'} />
  ),
};

const ClickToAdvance: React.FC<{ variant?: 'profile' | 'tree' }> = ({
  variant = 'profile',
}) => {
  const [v, setV] = useState(0);
  return (
    <div style={{ width: 320 }}>
      <Progress value={v} variant={variant} />
      <button
        type="button"
        onClick={() => setV((p) => Math.min(p + 20, 100))}
        style={{ marginTop: 12 }}
      >
        +20%
      </button>
    </div>
  );
};

export const WithInteraction: Story = {
  args: { variant: 'profile' },
  render: (args) => (
    <ClickToAdvance variant={args.variant as 'profile' | 'tree'} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole('button', { name: '+20%' });
    await userEvent.click(btn);
    await userEvent.click(btn); // 40%

    const el = canvasElement.querySelector(
      '[data-slot="progress-indicator"]'
    ) as HTMLElement;
    await expect(el.style.width).toBe('40%'); // width 기반 검증
  },
};
