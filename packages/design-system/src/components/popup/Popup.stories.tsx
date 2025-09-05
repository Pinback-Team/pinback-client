import type { Meta, StoryObj } from '@storybook/react-vite';
import Popup from './Popup';

const meta: Meta<typeof Popup> = {
  title: 'Components/Popup',
  component: Popup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['input', 'subtext', 'default'],
      description: '팝업의 내용 타입',
    },
    title: {
      control: 'text',
      description: '팝업 제목',
    },
    subtext: {
      control: 'text',
      description: 'subtext 타입일 때 보여줄 보조 문구',
    },
    placeholder: {
      control: 'text',
      description: 'input 타입일 때 placeholder',
    },
    left: {
      control: 'text',
      description: '왼쪽 버튼 텍스트',
    },
    right: {
      control: 'text',
      description: '오른쪽 버튼 텍스트',
    },
    isError: {
      control: 'boolean',
      description: 'input 타입일 때 에러 상태 여부',
    },
    helperText: {
      control: 'text',
      description: '에러 상태일 때 표시할 도움말',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Popup>;

export const Default: Story = {
  args: {
    type: 'default',
    title: '기본 팝업',
    left: '취소',
    right: '확인',
  },
};

export const WithInput: Story = {
  args: {
    type: 'input',
    title: '카테고리 입력',
    placeholder: '카테고리 제목을 입력해주세요',
    left: '취소',
    right: '저장',
  },
};

export const WithErrorInput: Story = {
  args: {
    type: 'input',
    title: '카테고리 입력',
    placeholder: '카테고리 제목을 입력해주세요',
    isError: true,
    helperText: '10자 이내로 입력해주세요',
    left: '취소',
    right: '저장',
  },
};

export const WithSubtext: Story = {
  args: {
    type: 'subtext',
    title: '알림',
    subtext: '카테고리가 정상적으로 저장되었습니다.',
    left: '닫기',
    right: '확인',
  },
};
