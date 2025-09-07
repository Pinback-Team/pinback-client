import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Dropdown from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**선택형 입력 컴포넌트입니다.** `selectedValue`로 선택 상태를 제어하고 `onChange`로 변경 이벤트를 처리합니다. ' +
          '`onAddItem`을 지정하면 목록 하단에 “추가” 버튼을 노출하며, `limit`으로 최대 개수를 제어합니다.',
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: '드롭다운 항목 문자열 배열입니다.',
    },
    selectedValue: {
      control: 'text',
      description: '현재 선택된 값(제어 컴포넌트에서 사용).',
    },
    placeholder: {
      control: 'text',
      description: '선택 전 표시되는 안내 문구.',
    },
    addItemLabel: {
      control: 'text',
      description: '추가 버튼 라벨 (`onAddItem`과 함께 사용).',
    },
    onChange: {
      action: 'changed',
      description: '선택이 변경될 때 호출됩니다.',
    },
    limit: {
      control: 'number',
      description: '옵션 개수 상한. 도달 시 “추가” 버튼 숨김.',
    },
    onAddItem: {
      action: 'add item clicked',
      description: '“추가” 버튼 클릭 시 호출됩니다.',
    },
    className: { table: { disable: true } },
  },
  args: {
    options: ['사과', '바나나', '체리'],
    selectedValue: null,
    placeholder: '항목을 선택하세요',
    addItemLabel: '항목 추가',
    limit: 5,
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

function ControlledRender(args: any) {
  const [value, setValue] = useState<string | null>(args.selectedValue ?? null);

  return (
    <div className="h-[20rem]">
      <Dropdown
        {...args}
        selectedValue={value}
        onChange={(next: string | null) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
    </div>
  );
}

export const Default: Story = {
  name: '기본',
  render: ControlledRender,
};

export const WithPreselected: Story = {
  name: '선택값 초기화',
  args: { selectedValue: '바나나' },
  render: ControlledRender,
};

export const WithAddItemAlert: Story = {
  name: '추가 버튼 클릭 시 (test Alert)',
  args: {
    options: ['사과', '바나나'],
    limit: 5,
    addItemLabel: '새 항목 추가',
    onAddItem: () => {
      alert('추가 버튼이 클릭되었습니다.');
    },
  },
  render: ControlledRender,
};

export const LimitReached: Story = {
  name: '추가 제한 도달 (limit)',
  args: {
    options: ['사과', '바나나', '체리'],
    limit: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          '`options.length`가 `limit`에 도달하여 “추가” 버튼이 표시되지 않습니다.',
      },
    },
  },
  render: ControlledRender,
};

export const ManyOptions: Story = {
  name: '옵션이 많은 경우',
  args: {
    options: Array.from({ length: 20 }, (_, i) => `옵션 ${i + 1}`),
  },
  render: ControlledRender,
};
