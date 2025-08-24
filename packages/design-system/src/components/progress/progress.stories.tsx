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
          '단순 퍼센트 기반의 진행 상태 바입니다. `value`(0–100)를 넘기면 표시되며, 내부에서는 `translateX(-{100 - value}%)`로 채워집니다.',
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
  },
  args: {
    value: 40,
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

export const Zero: Story = {
  args: { value: 0 },
  render: (args) => <Frame {...args} />,
};

export const Full: Story = {
  args: { value: 100 },
  render: (args) => <Frame {...args} />,
};

// 훅 사용은 별도 컴포넌트로 분리 (Rules of Hooks 회피)
const AutoProgressDemo: React.FC = () => {
  const [v, setV] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setV((p) => Math.min(p + 10, 100)), 250);
    return () => clearInterval(id);
  }, []);
  return <Frame value={v} />;
};

export const AutoProgress: Story = {
  name: 'Auto progress (demo)',
  render: () => <AutoProgressDemo />,
};

const ClickToAdvance: React.FC = () => {
  const [v, setV] = useState(0);
  return (
    <div style={{ width: 320 }}>
      <Progress value={v} />
      <button
        type="button"
        onClick={() => setV((p) => Math.min(p + 25, 100))}
        style={{ marginTop: 12 }}
      >
        +25%
      </button>
    </div>
  );
};

export const WithInteraction: Story = {
  render: () => <ClickToAdvance />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole('button', { name: '+25%' });

    // 버튼 2번 클릭 → 50%
    await userEvent.click(btn);
    await userEvent.click(btn);
    // indicator의 transform이 translateX(-50%)인지 검증
    const el =
      (canvasElement.querySelector(
        '[data-slot="progress-indicator"]'
      ) as HTMLElement) || null;
    await expect(el.style.transform).toContain('translateX(-50%)');
  },
};
