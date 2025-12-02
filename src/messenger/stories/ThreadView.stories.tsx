import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ThreadView from '../components/ThreadView';

const meta: Meta<typeof ThreadView> = {
  title: 'Messenger/ThreadView',
  component: ThreadView,
};

export default meta;

type Story = StoryObj<typeof ThreadView>;

export const Default: Story = {
  args: {
    threadId: 1,
  },
};
