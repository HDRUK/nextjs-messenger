import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MessageComposer from '../components/MessageComposer';

const meta: Meta<typeof MessageComposer> = {
  title: 'Messenger/MessageComposer',
  component: MessageComposer,
};

export default meta;

type Story = StoryObj<typeof MessageComposer>;

export const Default: Story = {
  args: {
    receiverId: 2,
    subject: 'Hello',
  },
};
