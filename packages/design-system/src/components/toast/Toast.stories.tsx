// packages/design-system/src/components/toast/Toast.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '단일 문구를 표시하는 간단한 토스트 컴포넌트입니다. 스타일은 내부에서 고정하며, 외부에서는 `text`만 전달합니다. ' +
          '`role="alert"`로 접근성 알림을 제공합니다.',
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
  },
  args: {
    text: '저장에 실패했어요.\n 다시 시도해주세요.',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/** 버튼 클릭으로 띄우기 → 자동 페이드아웃 */
const ManualTriggerExample: React.FC<{ text: string }> = ({ text }) => {
  const [show, setShow] = React.useState(false);
  const [fading, setFading] = React.useState(false);

  React.useEffect(() => {
    if (!show) return;
    setFading(false);
    const t1 = window.setTimeout(() => setFading(true), 1200);
    const t2 = window.setTimeout(() => setShow(false), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [show]);

  return (
    <div className="pb-50 p-10">
      <button
        style={{
          background: 'gray',
          color: 'white',
          padding: '8px 16px',
          borderRadius: 4,
        }}
        type="button"
        onClick={() => setShow(true)}
      >
        토스트 띄우기
      </button>

      {show && (
        <div className="fixed mt-[1.6rem]">
          <div
            className={`transition-opacity duration-200 ease-out ${fading ? 'opacity-0' : 'opacity-100'}`}
          >
            <Toast text={text} />
          </div>
        </div>
      )}
    </div>
  );
};

export const ManualTrigger: Story = {
  name: '버튼으로 띄우기(자동 닫힘)',
  parameters: { layout: 'fullscreen', docs: { story: { height: 520 } } },
  render: (args) => <ManualTriggerExample text={args.text} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole('button', { name: '토스트 띄우기' });
    await userEvent.click(btn);
    await expect(await canvas.findByRole('alert')).toBeInTheDocument();
    await waitFor(
      () => {
        expect(canvas.queryByRole('alert')).toBeNull();
      },
      { timeout: 2500 }
    );
  },
};

export const Basic: Story = {
  render: (args) => <Toast {...args} />,
};

export const LongText: Story = {
  name: '긴 문구',
  args: {
    text: '네트워크 상태가 불안정합니다. 잠시 후 다시 시도해주세요. 문제가 계속되면 관리자에게 문의해 주세요.',
  },
  render: (args) => <Toast {...args} />,
};
