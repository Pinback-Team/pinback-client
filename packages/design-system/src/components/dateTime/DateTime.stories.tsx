import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from '@storybook/test';
import DateTime from './DateTime';

const meta: Meta<typeof DateTime> = {
  title: 'UI/DateTime',
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
      description: '스타일 상태',
    },
    type: {
      control: { type: 'inline-radio' },
      options: ['date', 'time'],
      description: '입력 모드',
    },
    value: {
      control: 'text',
      description: '초기값(숫자만 입력해도 됨)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '날짜는 실시간 포맷(YYYY.MM.DD), 시간은 **숫자 버퍼(HHMM)** → 표시(오전/오후 HH:MM)로 렌더. 커서/백스페이스도 커스텀 처리됨.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateTime>;

/** 기본 날짜 */
export const Date_Default: Story = {
  args: {
    type: 'date',
    value: '20250819',
  },
};

export const Time_Empty: Story = {
  args: {
    type: 'time',
    value: '',
  },
};

/** 16→20 타이핑: "오후 04:20" 되는지 시연 */
export const Time_Typing_1620: Story = {
  args: {
    type: 'time',
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByLabelText('시간 입력');
    await userEvent.type(input, '1620');
  },
  parameters: {
    docs: {
      description: {
        story: '`16` → `오후 04`, `1620` → `오후 04:20` 실시간 포맷팅.',
      },
    },
  },
};

/** 초기값 1620에서 백스페이스 두 번 → "오후 04" 되는지 시연 */
export const Time_Backspace: Story = {
  args: {
    type: 'time',
    value: '1620',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByLabelText('시간 입력');
    await userEvent.click(input);
    await userEvent.keyboard('{Backspace}{Backspace}');
  },
  parameters: {
    docs: {
      description: { story: '커스텀 삭제 핸들러 동작 확인(Backspace).' },
    },
  },
};

/** Disabled/Error 스타일 확인 */
export const States_Showcase: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <DateTime {...args} state="default" type="date" value="20250101" />
      <DateTime {...args} state="disabled" type="date" value="20250101" />
      <DateTime {...args} state="error" type="time" value="0930" />
    </div>
  ),
  parameters: {
    controls: { exclude: ['state', 'type', 'value'] },
    docs: { description: { story: '상태별 스타일 한눈에 보기.' } },
  },
};
