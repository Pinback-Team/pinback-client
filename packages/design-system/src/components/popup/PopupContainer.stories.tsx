import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import PopupContainer from './PopupContainer';

const PopupContainerWrapper = (
  props: React.ComponentProps<typeof PopupContainer>
) => <PopupContainer {...props} />;

const meta: Meta<typeof PopupContainerWrapper> = {
  title: 'Components/PopupContainer',
  component: PopupContainerWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof PopupContainer>;

// 인터랙션 가능한 예시
const WithTriggerButtonComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setOpen(true)}
      >
        팝업 열기
      </button>

      <PopupContainer
        isOpen={open}
        onClose={() => setOpen(false)}
        type="input"
        title="카테고리 입력"
        left="취소"
        right="저장"
        placeholder="카테고리 제목을 입력해주세요"
      />
    </div>
  );
};

export const WithTriggerButton: Story = {
  render: () => <WithTriggerButtonComponent />,
};
