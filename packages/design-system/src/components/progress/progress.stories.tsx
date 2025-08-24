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
          '단일 로직을 공유하고 **variant**로 스타일만 분기하는 progress입니다.\n' +
          '- `variant="profile"`: 얇은 트랙 + 단색 인디케이터 (기본)\n' +
          '- `variant="tree"`: 두꺼운 트랙 + 그라데이션 인디케이터\n',
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

export const Profile: Story = {
  args: { variant: 'profile', value: 70 },
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

export const AutoProgressBoth: StoryObj<typeof Progress> = {
  name: 'Auto progress — profile & tree',
  parameters: {
    controls: { exclude: ['value', 'variant'] },
    layout: 'centered',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, width: 760 }}>
      <div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>
          profile
        </div>
        <AutoProgressDemo variant="profile" />
      </div>
      <div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>tree</div>
        <AutoProgressDemo variant="tree" />
      </div>
    </div>
  ),
};
const ClickToAdvanceSync: React.FC = () => {
  const [v, setV] = React.useState(0);
  return (
    <div style={{ width: 320, display: 'grid', gap: 12 }}>
      <Progress value={v} variant="profile" />
      <Progress value={v} variant="tree" />
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => setV((p) => Math.min(p + 20, 100))}
        >
          +20% (both)
        </button>
        <button type="button" onClick={() => setV(0)}>
          Reset
        </button>
        <span style={{ marginLeft: 'auto', fontSize: 12, opacity: 0.7 }}>
          {v}%
        </span>
      </div>
    </div>
  );
};

export const WithInteractionSync: Story = {
  name: 'With interaction — sync both',
  render: () => <ClickToAdvanceSync />,
  // 2번 클릭 → 두 바 모두 40%가 되었는지 검사
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole('button', { name: /\+20% \(both\)/i });
    await userEvent.click(btn);
    await userEvent.click(btn);

    // Progress Root의 aria-valuenow로 검증(로직이 width/transform 어떤 것이든 안전)
    const roots = canvasElement.querySelectorAll('[data-slot="progress"]');
    roots.forEach((el) => expect(el.getAttribute('aria-valuenow')).toBe('40'));
  },
};
