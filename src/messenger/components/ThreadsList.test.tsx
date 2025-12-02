import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadsList from './ThreadsList';
import { MessengerProvider } from '../context';

describe('ThreadsList', () => {
  it('renders fetched threads as list items', async () => {
    const mockThreads = [
      {
        id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        subject: 'Hello',
        messages: [
          { id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), thread_id: 1, sender_id: 1, receiver_id: 2, body: 'first', is_read: 0 },
        ],
        participants: [{ id: 1, name: 'A', email: 'a@example.test' }, { id: 2, name: 'B', email: 'b@example.test' }],
        latest_message: { id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), thread_id: 1, sender_id: 1, receiver_id: 2, body: 'first', is_read: 0 },
      },
    ];
    const adapter = {
      getThreads: vi.fn().mockResolvedValue(mockThreads),
      getThreadById: vi.fn(),
      sendMessage: vi.fn(),
      markMessageRead: vi.fn(),
    } as any;

    const onSelect = vi.fn();
    render(
      <MessengerProvider adapter={adapter} currentUserId={1}>
        <ThreadsList onSelectThread={onSelect} />
      </MessengerProvider>
    );

    // Wait for the subject text to appear
    const found = await screen.findByText('Hello');
    expect(found).toBeTruthy();
    // clicking thread should call onSelect
    const user = userEvent.setup();
    const threadNode = await screen.findByText('Hello');
    await user.click(threadNode);
    expect(onSelect).toHaveBeenCalled();
  });
});
