import type { Meta, StoryObj } from '@storybook/react-vite';
import InfoBox from './InfoBox';

const meta: Meta<typeof InfoBox> = {
  title: 'Components/InfoBox',
  component: InfoBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '메인 제목 (180px 넘어가면 … 처리)',
    },
    source: {
      control: 'text',
      description: '출처 (예: 블로그, 뉴스 등)',
    },
    imgUrl: {
      control: 'text',
      description: '썸네일 이미지 URL',
    },
  },
};
export default meta;

type Story = StoryObj<typeof InfoBox>;

// 기본 예시
export const Default: Story = {
  args: {
    imgUrl:
      'https://previews.123rf.com/images/latkun/latkun1712/latkun171200130/92172856-empty-transparent-background-seamless-pattern.jpg',
    title: '집에서 할 수 있는 것들은 무엇이 있을까요구르트',
    source: '네이버 블로그',
  },
};

export const LongTitle: Story = {
  args: {
    imgUrl:
      'https://previews.123rf.com/images/latkun/latkun1712/latkun171200130/92172856-empty-transparent-background-seamless-pattern.jpg',
    title:
      '이건 엄청엄청엄청 길어서 180px 넘어가면 자동으로 ... 처리되는 긴 제목 테스트용 텍스트입니다',
    source: '브런치',
  },
};
