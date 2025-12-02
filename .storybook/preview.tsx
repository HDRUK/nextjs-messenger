import React from 'react';
import type { Preview } from '@storybook/react';
import { MessengerProvider } from '../src/messenger/context';
import type { MessagingAdapter, Thread, Message } from '../src/messenger/types';

// Create a mock adapter used by Storybook globally for examples
class MockAdapter implements MessagingAdapter {
  async getThreads(senderId: number) {
    const messages: Message[] = [
      {
        id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        thread_id: 1,
        sender_id: 1,
        receiver_id: 2,
        body: 'Hello from mock',
        is_read: 0,
      },
    ];
    const thread: Thread = {
      id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      subject: 'Mock conversation',
      messages,
      participants: [
        { id: 1, name: 'Alice', email: 'a@example.test' },
        { id: 2, name: 'Bob', email: 'b@example.test' },
      ],
      latest_message: messages[0],
    };
    return [thread];
  }
  async getThreadById(id: number) {
    const messages: Message[] = [
      {
        id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        thread_id: id,
        sender_id: 1,
        receiver_id: 2,
        body: 'Mock message',
        is_read: 0,
      },
    ];
    return {
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      subject: 'Mock conversation',
      messages,
      participants: [
        { id: 1, name: 'Alice', email: 'a@example.test' },
        { id: 2, name: 'Bob', email: 'b@example.test' },
      ],
      latest_message: messages[0],
    };
  }
  async sendMessage(payload) {
    return {
      id: Math.floor(Math.random() * 10000),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      thread_id: payload.sender_id, // random placeholder
      sender_id: payload.sender_id,
      receiver_id: payload.receiver_id,
      body: payload.body,
      is_read: 0,
    };
  }
  async markMessageRead(id: number) {
    return void 0;
  }
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ padding: 12 }}>
        <MessengerProvider currentUserId={1} adapter={new MockAdapter()}>
          <Story />
        </MessengerProvider>
      </div>
    ),
  ],
};

export default preview;
