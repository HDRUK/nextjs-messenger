import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ThreadView from './ThreadView';
import { MessengerProvider } from '../context';
describe('ThreadView', () => {
    it('renders thread messages and marks unread on click', async () => {
        const messages = [
            {
                id: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                thread_id: 1,
                sender_id: 2,
                receiver_id: 1,
                body: 'hi there',
                is_read: 0,
            },
        ];
        const thread = {
            id: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            subject: 'Topic',
            messages,
            participants: [{ id: 1, name: 'A', email: 'a@example.test' }, { id: 2, name: 'B', email: 'b@example.test' }],
            latest_message: messages[0],
        };
        const markMessageRead = vi.fn().mockResolvedValue(undefined);
        const adapter = {
            getThreads: vi.fn(),
            getThreadById: vi.fn().mockResolvedValue(thread),
            sendMessage: vi.fn(),
            markMessageRead,
        };
        render(_jsx(MessengerProvider, { adapter: adapter, currentUserId: 1, children: _jsx(ThreadView, { threadId: 1 }) }));
        const messageNode = await screen.findByText('hi there');
        expect(messageNode).toBeTruthy();
        const user = userEvent.setup();
        await user.click(messageNode);
        expect(markMessageRead).toHaveBeenCalledWith(1);
    });
});
//# sourceMappingURL=ThreadView.test.js.map