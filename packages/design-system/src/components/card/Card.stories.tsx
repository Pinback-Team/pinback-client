import { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Card** 컴포넌트는 리마인드 카드와 북마크 카드 두 가지 유형을 지원합니다.<br/>' +
          '**`remind`**, **`bookmark`** 중 type을 선택하여 사용할 수 있으며 이에 따라 다른 인터페이스를 제공합니다..',
      },
    },
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
    variant: {
      control: 'inline-radio',
      options: ['default', 'save'],
      if: { arg: 'type', eq: 'bookmark' },
    },
    nickname: {
      control: 'text',
      if: { arg: 'variant', eq: 'save' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Remind: Story = {
  name: 'type: remind',
  args: {
    type: 'remind',
    title: '리마인드 카드 타이틀',
    content: '리마인드 컨텐츠 내용입니다.',
    category: '개발',
    timeRemaining: '3시간 25분',
    imageUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
  },
};

export const BookMark: Story = {
  name: 'type: bookmark',
  args: {
    type: 'bookmark',
    variant: 'default',
    title: '북마크 카드 타이틀',
    content: '북마크 컨텐츠 내용입니다.',
    category: '디자인',
    date: '2025.08.26',
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
  },
};

export const BookMarkSave: Story = {
  name: 'type: bookmark (save)',
  args: {
    type: 'bookmark',
    variant: 'save',
    title: '북마크 카드 타이틀',
    content: '북마크 컨텐츠 내용입니다.',
    category: '디자인',
    nickname: '하비',
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
  },
};

export const LongTextSideBySide: Story = {
  name: 'case: Long Text',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <Card
        type="remind"
        title="두 줄로 표시되는 긴 리마인드 카드 타이틀입니다. 제한 길이를 넘어가면 ... 처리가 됩니다."
        content="여기에 두 줄 이상으로 늘어나는 리마인드 컨텐츠 내용이 들어갑니다. 길이를 확인해보세요."
        category="기획"
        timeRemaining="3시간 25분"
        imageUrl="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop"
      />
      <Card
        type="bookmark"
        variant="default"
        title="두 줄로 표시되는 긴 북마크 카드 타이틀입니다. 제한 길이를 넘어가면 ... 처리가 됩니다."
        content="여기에 두 줄 이상으로 늘어나는 북마크 컨텐츠 내용이 들어갑니다. 길이를 확인해보세요."
        category="마케팅"
        date="2025.09.15"
        imageUrl="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop"
      />
    </div>
  ),
};

export const NoImageSideBySide: Story = {
  name: 'case: No imageUrl',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <Card
        type="remind"
        title="두 줄로 표시되는 긴 리마인드 카드 타이틀입니다. 제한 길이를 넘어가면 ... 처리가 됩니다."
        content="여기에 두 줄 이상으로 늘어나는 리마인드 컨텐츠 내용이 들어갑니다. 길이를 확인해보세요."
        category="기획"
        timeRemaining="3시간 25분"
      />
      <Card
        type="bookmark"
        variant="default"
        title="두 줄로 표시되는 긴 북마크 카드 타이틀입니다. 제한 길이를 넘어가면 ... 처리가 됩니다."
        content="여기에 두 줄 이상으로 늘어나는 북마크 컨텐츠 내용이 들어갑니다. 길이를 확인해보세요."
        category="마케팅"
        date="2025.09.15"
      />
    </div>
  ),
};

export const NoCategoryBookmark: Story = {
  name: 'case: No category (bookmark)',
  args: {
    type: 'bookmark',
    variant: 'default',
    title: '북마크 카드 타이틀',
    content: '북마크 컨텐츠 내용입니다.',
    date: '2025.08.26',
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
  },
};
