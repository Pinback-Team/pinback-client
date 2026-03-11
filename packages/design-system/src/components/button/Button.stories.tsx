import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**애플리케이션 전반에서 사용될 기본 버튼입니다.** `variant`로 주/보조 스타일을, `size`로 크기를, `isDisabled`로 비활성화 상태를 제어합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    isDisabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 호출되는 이벤트 핸들러입니다.',
    },
    className: { table: { disable: true } },
  },

  args: {
    variant: 'primary',
    size: 'medium',
    isDisabled: false,
    children: 'Button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  name: 'variant: primary',
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  name: 'variant: secondary',
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Large: Story = {
  name: 'size: large',
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const Small: Story = {
  name: 'size: small',
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Disabled: Story = {
  name: 'state: disabled',
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
    </div>
  ),
};

export const WithAlertOnClick: Story = {
  name: 'onClick with Alert',
  args: {
    children: 'onClick test',
    onClick: () => {
      alert('버튼이 클릭되었습니다.');
    },
  },
};
