import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from '@storybook/test';
import { useState } from 'react';
import DateTime from './DateTime';

const meta: Meta<typeof DateTime> = {
  title: 'Components/DateTime',
  component: DateTime,
  tags: ['autodocs'],
  args: {
    state: 'default',
    type: 'date',
    value: '',
  },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'disabled', 'error'],
    },
    type: {
      control: { type: 'inline-radio' },
      options: ['date', 'time'],
    },
    value: {
      control: 'text',
      description: '초기값 (숫자만 가능)',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '입력 중에는 내부 포맷팅된 값(`YYYY.MM.DD`, `오전 HH:MM`)이 보이고, 최종 blur 시 부모에 값 전달.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateTime>;

/** 📌 컨트롤 가능한 Wrapper */
const Controlled = (args: React.ComponentProps<typeof DateTime>) => {
  const [val, setVal] = useState(args.value);
  return <DateTime {...args} value={val} onChange={setVal} />;
};

/** 기본 날짜 */
export const Date_Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    type: 'date',
    value: '20250819',
  },
};

/** 빈 시간 입력 */
export const Time_Empty: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    type: 'time',
    value: '',
  },
};

/** 1620 타이핑 후 blur → 오후 04:20 */
export const Time_Typing_1620: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    type: 'time',
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByLabelText('시간 입력');
    await userEvent.type(input, '1620');
    await userEvent.tab(); // 👉 blur 발생시켜야 onChange 전달됨
  },
};

/** 초기값 1620 → 백스페이스 두 번 → blur */
export const Time_Backspace: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    type: 'time',
    value: '1620',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByLabelText('시간 입력');
    await userEvent.click(input);
    await userEvent.keyboard('{Backspace}{Backspace}');
    await userEvent.tab(); // 👉 blur로 최종 전달
  },
};

/** 상태별 스타일 */
export const States_Showcase: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <DateTime state="default" type="date" value="20250101" />
      <DateTime state="disabled" type="date" value="20250101" />
      <DateTime state="error" type="time" value="0930" />
    </div>
  ),
  parameters: {
    controls: { exclude: ['state', 'type', 'value'] },
  },
};
