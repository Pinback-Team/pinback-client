import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent, expect } from '@storybook/test';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '고정 크기 **h-[12rem] / w-[24.8rem]** · 기본 **500자** 제한 · 내용 초과 시 내부 스크롤이 나타나는 텍스트영역입니다. ' +
          '`maxLength`로 글자수 제한을 변경할 수 있습니다.',
      },
    },
  },
  argTypes: {
    className: { table: { disable: true } },
    maxLength: { control: { type: 'number', min: 1 } },
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
  },
  args: {
    placeholder: '나중에 내가 꺼내줄 수 있게 살짝 적어줘!',
    maxLength: 500,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  render: (args) => <Textarea {...args} />,
};

export const WithMaxLength500: Story = {
  name: 'MaxLength=500',
  args: { maxLength: 500, placeholder: '최대 500자' },
  render: (args) => <Textarea {...args} />,
};

export const ScrollableOverflow: Story = {
  name: '넘치면 스크롤',
  args: {
    defaultValue: 'o '.repeat(400),
  },
  render: (args) => <Textarea {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ta = (await canvas.findByRole('textbox')) as HTMLTextAreaElement;
    await expect(ta.scrollHeight).toBeGreaterThan(ta.clientHeight);
  },
};

export const PreventOverflowByMaxLength: Story = {
  name: '입력 길이 제한 동작',
  args: { maxLength: 50, placeholder: '최대 50자' },
  render: (args) => <Textarea {...args} />,
  play: async ({ canvasElement, args }) => {
    const limit = Number(args.maxLength ?? 500);
    const canvas = within(canvasElement);
    const ta = (await canvas.findByRole('textbox')) as HTMLTextAreaElement;

    await userEvent.click(ta);
    await userEvent.type(ta, 'a'.repeat(limit + 10));

    await expect(ta.value.length).toBe(limit);
  },
};
