import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ThreadView from '../components/ThreadView';
import { MessengerProvider } from '../context';
import type { MessagingAdapter, Thread, Message } from '../types';

const meta: Meta<typeof ThreadView> = {
  title: 'Messenger/ThreadView',
  component: ThreadView,
};

export default meta;

type Story = StoryObj<typeof ThreadView>;
type ThreadViewStoryArgs = React.ComponentProps<typeof ThreadView> & { messageCount?: number };

export const Default: Story = {
  args: {
    threadId: 1,
  },
};

export const Conversation: StoryObj<ThreadViewStoryArgs> = {
  argTypes: {
    messageCount: { control: { type: 'number', min: 1, max: 50 } },
  },
  args: {
    threadId: 1,
    messageCount: 8,
  },
  render: ({ threadId, messageCount }: ThreadViewStoryArgs) => {
    // Build a small adapter that returns `messageCount` messages alternating sender/receiver
    class LocalAdapter implements MessagingAdapter {
      async getThreads(_senderId: number) {
        return [await this.getThreadById(threadId!)];
      }
      async getThreadById(id: number) {
        const messages: Message[] = [];
        const count = messageCount ?? 8;
        for (let i = 0; i < count; i++) {
          const sender = i % 2 === 0 ? 1 : 2;
          messages.push({
            id: i + 1,
            created_at: new Date(Date.now() - (count - i) * 60_000).toISOString(),
            updated_at: new Date().toISOString(),
            thread_id: id,
            sender_id: sender,
            receiver_id: sender === 1 ? 2 : 1,
            body: `Message ${i + 1} from ${sender === 1 ? 'Alice' : 'Bob'}`,
            is_read: i % 3 === 0 ? 0 : 1,
          });
        }
        const thread: Thread = {
          id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          subject: 'Generated conversation',
          messages,
          participants: [
            { id: 1, name: 'Alice', email: 'alice@example.test' },
            { id: 2, name: 'Bob', email: 'bob@example.test' },
          ],
          latest_message: messages[messages.length - 1],
        };
        return thread;
      }
      async sendMessage(payload: any) {
        return {
          id: Math.floor(Math.random() * 10000),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          thread_id: payload.sender_id,
          sender_id: payload.sender_id,
          receiver_id: payload.receiver_id,
          body: payload.body,
          is_read: 0,
        } as Message;
      }
      async markMessageRead(_id: number) {
        return void 0;
      }
    }

    return (
      <div style={{ padding: 12 }}>
        <MessengerProvider currentUserId={1} adapter={new LocalAdapter()}>
          <ThreadView threadId={threadId ?? 1} />
        </MessengerProvider>
      </div>
    );
  },
};
