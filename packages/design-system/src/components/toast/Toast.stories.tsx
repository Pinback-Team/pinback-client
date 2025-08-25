import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const SuccessMessage: Story = {
  name: '성공 메시지 예시',
  args: {
    text: '저장되었습니다.',
  },
  render: (args) => <Toast {...args} />,
};
