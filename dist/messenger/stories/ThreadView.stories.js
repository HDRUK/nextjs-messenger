import { jsx as _jsx } from "react/jsx-runtime";
import ThreadView from '../components/ThreadView';
import { MessengerProvider } from '../context';
const meta = {
    title: 'Messenger/ThreadView',
    component: ThreadView,
};
export default meta;
export const Default = {
    args: {
        threadId: 1,
    },
};
export const Conversation = {
    argTypes: {
        messageCount: { control: { type: 'number', min: 1, max: 50 } },
    },
    args: {
        threadId: 1,
        messageCount: 8,
    },
    render: ({ threadId, messageCount }) => {
        // Build a small adapter that returns `messageCount` messages alternating sender/receiver
        class LocalAdapter {
            async getThreads(_senderId) {
                return [await this.getThreadById(threadId)];
            }
            async getThreadById(id) {
                const messages = [];
                const count = messageCount ?? 8;
                for (let i = 0; i < count; i++) {
                    const sender = i % 2 === 0 ? 1 : 2;
                    messages.push({
                        id: i + 1,
                        created_at: new Date(Date.now() - (count - i) * 60000).toISOString(),
                        updated_at: new Date().toISOString(),
                        thread_id: id,
                        sender_id: sender,
                        receiver_id: sender === 1 ? 2 : 1,
                        body: `Message ${i + 1} from ${sender === 1 ? 'Alice' : 'Bob'}`,
                        is_read: i % 3 === 0 ? 0 : 1,
                    });
                }
                const thread = {
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
            async sendMessage(payload) {
                return {
                    id: Math.floor(Math.random() * 10000),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    thread_id: payload.sender_id,
                    sender_id: payload.sender_id,
                    receiver_id: payload.receiver_id,
                    body: payload.body,
                    is_read: 0,
                };
            }
            async markMessageRead(_id) {
                return void 0;
            }
        }
        return (_jsx("div", { style: { padding: 12 }, children: _jsx(MessengerProvider, { currentUserId: 1, adapter: new LocalAdapter(), children: _jsx(ThreadView, { threadId: threadId ?? 1 }) }) }));
    },
};
//# sourceMappingURL=ThreadView.stories.js.map