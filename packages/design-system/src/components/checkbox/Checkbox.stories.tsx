import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '기본 체크박스 컴포넌트입니다. `isSelected`로 제어하고 `onSelectedChange`로 상태를 전달합니다. `size`로 크기를 조절할 수 있습니다.',
      },
    },
  },
  argTypes: {
    isSelected: { control: 'boolean' },
    defaultSelected: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
    onSelectedChange: { action: 'selected' },
    className: { table: { disable: true } },
  },
  args: {
    size: 'medium',
    isSelected: false,
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { isSelected: false },
};

export const Selected: Story = {
  args: { isSelected: true },
};

export const Medium: Story = {
  args: { size: 'medium', isSelected: true },
};

export const Disabled: Story = {
  args: { isSelected: true, disabled: true },
};
