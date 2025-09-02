import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from '@storybook/test';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    text: '알림',
    countNum: 3,
  },
  argTypes: {
    text: { control: 'text', description: '뱃지 라벨 텍스트' },
    countNum: {
      control: { type: 'number', min: 0 },
      description: '카운트 숫자(옵션)',
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
  args: { text: '카운트 없음', countNum: undefined },
};

export const LargeCount: Story = {
  args: { text: '메시지', countNum: 12000 },
};

export const Clicked: Story = {
  args: { text: '클릭해줘', countNum: 5 },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByText(String(args.text)));
  },
  parameters: {
    docs: {
      description: { story: '로드 직후 자동 클릭으로 활성 상태 미리보기.' },
    },
  },
};
