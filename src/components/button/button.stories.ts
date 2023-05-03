import type { Meta, StoryObj } from '@storybook/web-components';

import { slottedRenderer } from '../../util/slotted-renderer';

import './button.ts';

// This default export determines where your story goes in the story list
const meta: Meta = {
  title: 'OuiButton',
  component: 'oui-button',
  tags: ['autodocs'],
  render: slottedRenderer,
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    slot: 'Submit',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    color: 'secondary',
  },
};
