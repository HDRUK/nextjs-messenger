import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MessageBubble from '../components/MessageBubble';
import type { Message } from '../types';

const meta: Meta<typeof MessageBubble> = {
  title: 'Messenger/MessageBubble',
  component: MessageBubble,
};

export default meta;

type Story = StoryObj<typeof MessageBubble>;

const baseMessage: Message = {
  id: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  thread_id: 1,
  sender_id: 1,
  receiver_id: 2,
  body: 'Some message content',
  is_read: 0,
};

export const Sender: Story = {
  args: {
    message: baseMessage,
  },
};

export const Receiver: Story = {
  args: {
    message: { ...baseMessage, sender_id: 2 },
  },
};
