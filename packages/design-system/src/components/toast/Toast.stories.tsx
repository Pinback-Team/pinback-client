import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import AutoDismissToast from './hooks/uesFadeOut';
import Toast from './Toast';

type AutoDismissStoryArgs = {
  text: string;
  duration: number;
  fadeMs: number;
  className?: string;
};

const meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '`AutoDismissToast`는 표시/페이드/언마운트만 담당하고, **콘텐츠는 children**으로 받습니다. ' +
          '스토리 컨트롤의 `text`는 children `<Toast>`로 전달합니다.',
      },
    },
  },
  argTypes: {
    text: { control: 'text', description: 'children <Toast>에 전달할 문구' },
    duration: { control: 'number', description: '표시 시간(ms), 기본 3000' },
    fadeMs: { control: 'number', description: '페이드아웃(ms), 기본 200' },
    className: { table: { disable: true } },
  },
  args: {
    text: '저장에 실패했어요.\n다시 시도해주세요.',
    duration: 3000,
    fadeMs: 200,
  },
} satisfies Meta<AutoDismissStoryArgs>;

export default meta;
type Story = StoryObj<AutoDismissStoryArgs>;

const ManualTriggerExample: React.FC<AutoDismissStoryArgs> = ({
  text,
  duration,
  fadeMs,
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="p-10" style={{ minHeight: '25vh' }}>
      <button
        type="button"
        onClick={() => setShow(true)}
        style={{
          background: 'gray',
          color: 'white',
          padding: '8px 16px',
          borderRadius: 4,
        }}
      >
        토스트 띄우기
      </button>

      {show && (
        <div className="fixed bottom-6 left-6 z-[9999]">
          <AutoDismissToast
            duration={duration}
            fadeMs={fadeMs}
            onClose={() => setShow(false)}
          >
            <Toast text={text} />
          </AutoDismissToast>
        </div>
      )}
    </div>
  );
};

export const ManualTrigger: Story = {
  name: '버튼으로 띄우기 (AutoDismiss)',
  parameters: { layout: 'fullscreen', docs: { story: { height: 520 } } },
  render: (args) => <ManualTriggerExample {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 버튼 클릭 → 토스트 등장
    const btn = await canvas.findByRole('button', { name: '토스트 띄우기' });
    await userEvent.click(btn);
    await expect(await canvas.findByRole('alert')).toBeInTheDocument();

    // duration + fadeMs 후 사라짐 검증
    const timeout = (args.duration ?? 3000) + (args.fadeMs ?? 200) + 400;
    await waitFor(() => expect(canvas.queryByRole('alert')).toBeNull(), {
      timeout,
    });
  },
};
export const Static_Basic: Story = {
  name: '정적 UI — 기본',
  parameters: { layout: 'centered' },
  render: (args) => <Toast text={args.text} />,
};

export const Static_LongText: Story = {
  name: '정적 UI — 긴 문구',
  parameters: { layout: 'centered' },
  render: () => (
    <Toast
      text={
        '네트워크 상태가 불안정합니다.\n잠시 후 다시 시도해주세요. 문제가 계속되면 관리자에게 문의해 주세요.'
      }
    />
  ),
};
