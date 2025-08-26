import { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['remind', 'bookmark'],
      description: '카드의 종류를 선택합니다.',
    },
    title: { control: 'text' },
    content: { control: 'text' },
    category: { control: 'text' },
    imageUrl: { control: 'text' },
    timeRemaining: {
      control: 'text',
      if: { arg: 'type', eq: 'remind' },
    },
    date: {
      control: 'text',
      if: { arg: 'type', eq: 'bookmark' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Remind: Story = {
  name: '타입: 리마인드 카드',
  args: {
    type: 'remind',
    title: '리마인드 카드 타이틀입니다. 두 줄까지 표시될 수 있습니다.',
    content:
      '여기는 컨텐츠 내용입니다. 사용자가 북마크한 아티클의 일부나 메모가 표시됩니다. 이 내용도 두 줄로 제한됩니다.',
    category: '카테고리',
    timeRemaining: '3시간 25분',
    imageUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
  },
};

export const BookMark: Story = {
  name: '타입: 북마크 카드',
  args: {
    type: 'bookmark',
    title: '북마크 카드 타이틀입니다. 길어지면 두 줄까지 표시됩니다.',
    content:
      '북마크 카드 컨텐츠입니다. 역시 이 내용도 두 줄까지 표시되도록 설정되어 있습니다. 길이를 확인하기 위한 텍스트입니다.',
    category: '디자인',
    date: '2025.08.26',
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
  },
};
