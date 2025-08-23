import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef, useState } from 'react';
import { within, userEvent, expect } from '@storybook/test';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '단일 책임 원칙에 따라 **Input은 “값 입력 + 시각적 상태 표현”만 담당**합니다. ' +
          '유효성 판단/에러 메시지 결정은 외부 폼 로직이 맡고, 컴포넌트는 에러의 **존재 여부(Boolean)** 만 입력으로 받습니다.',
      },
    },
  },
  argTypes: {
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    isError: { control: 'boolean' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    isError: false,
    placeholder: '값을 입력하세요',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const WithRef = (args: React.ComponentProps<typeof Input>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div style={{ width: 228 }}>
      <Input {...args} ref={inputRef} />
    </div>
  );
};

export const Basic: Story = {
  render: (args) => <WithRef {...args} />,
};

export const Error: Story = {
  args: { isError: true },
  render: (args) => <WithRef {...args} />,
};

export const ErrorWithHelperText: Story = {
  args: {
    isError: true,
    helperText: '형식이 올바르지 않습니다.',
    placeholder: '예: user@example.com',
  },
  render: (args) => <WithRef {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: '비활성화 상태' },
  render: (args) => <WithRef {...args} />,
};

export const Controlled: Story = {
  args: { placeholder: '컨트롤드 예시' },
  render: (args) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div style={{ width: 320 }}>
        <Input
          {...args}
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isError={args.isError}
          helperText={
            args.isError
              ? (args.helperText ?? '유효하지 않은 값입니다.')
              : undefined
          }
        />
        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
          현재 값: {value || '—'}
        </div>
      </div>
    );
  },
};

export const WithInteraction: Story = {
  args: { placeholder: '클릭 후 타이핑 테스트' },
  render: (args) => <WithRef {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox');
    await userEvent.click(textbox);
    await userEvent.type(textbox, 'hello');
    await expect((textbox as HTMLInputElement).value).toBe('hello');
  },
};
