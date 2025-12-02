import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ThreadsList from '../components/ThreadsList';

const meta: Meta<typeof ThreadsList> = {
  title: 'Messenger/ThreadsList',
  component: ThreadsList,
};

export default meta;

type Story = StoryObj<typeof ThreadsList>;

export const Default: Story = {
  args: {
    onSelectThread: (t) => console.log('Selected', t.id),
  },
};
