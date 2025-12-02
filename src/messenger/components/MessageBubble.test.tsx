import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MessageBubble from './MessageBubble';
import { MessengerProvider } from '../context';

describe('MessageBubble', () => {
  it('renders message content and calls onMarkRead when clicked and unread', async () => {
    const message = {
      id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      thread_id: 1,
      sender_id: 2,
      receiver_id: 1,
      body: 'hello bubble',
      is_read: 0,
    } as any;

    const onMarkRead = vi.fn();
    const adapter = { getThreads: vi.fn(), getThreadById: vi.fn(), sendMessage: vi.fn(), markMessageRead: vi.fn() } as any;

    render(
      <MessengerProvider adapter={adapter} currentUserId={1}>
        <MessageBubble message={message} onMarkRead={onMarkRead} />
      </MessengerProvider>
    );

    const node = await screen.findByText('hello bubble');
    expect(node).toBeTruthy();

    const user = userEvent.setup();
    await user.click(node);
    expect(onMarkRead).toHaveBeenCalledWith(message);
  });
});
