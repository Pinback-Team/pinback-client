import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent, fn } from '@storybook/test';
import Badge from './Badge';
import { useState } from 'react';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    text: '알림',
    countNum: 3,
    onClick: () => alert('onClick 실행'),
    isActive: true,
  },
  argTypes: {
    text: { control: 'text', description: '뱃지 라벨 텍스트' },
    countNum: {
      control: { type: 'number', min: 0 },
      description: '카운트 숫자(옵션)',
    },

    isActive: {
      control: 'boolean',
      description: '활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '뱃지 클릭 시 호출되는 콜백 함수(옵션)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '클릭 시 내부 state(isClick)가 true로 바뀌며 스타일이 활성화됩니다. 토글 방식은 아닙니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const NoCount: Story = {
  args: { text: '카운트 없음', countNum: 0, isActive: false },
};

export const LargeCount: Story = {
  args: { text: '메시지', countNum: 12000 },
};

export const ActiveBadge: Story = {
  render: (args) => {
    const ClickedBadge = () => {
      const [isActive, setIsActive] = useState(false);

      return (
        <Badge
          {...args}
          isActive={isActive}
          onClick={() => {
            setIsActive((prev) => !prev); // 토글
            args.onClick?.(); // 액션 로그
          }}
        />
      );
    };

    return <ClickedBadge />;
  },
  args: {
    text: '클릭해줘',
    countNum: 5,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByText(String(args.text)));
  },
  parameters: {
    docs: {
      description: { story: 'onClick으로 뱃지 활/비활성화' },
    },
  },
};
