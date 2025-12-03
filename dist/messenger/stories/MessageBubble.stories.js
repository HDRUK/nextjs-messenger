import MessageBubble from '../components/MessageBubble';
const meta = {
    title: 'Messenger/MessageBubble',
    component: MessageBubble,
};
export default meta;
const baseMessage = {
    id: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    thread_id: 1,
    sender_id: 1,
    receiver_id: 2,
    body: 'Some message content',
    is_read: 0,
};
export const Sender = {
    args: {
        message: baseMessage,
    },
};
export const Receiver = {
    args: {
        message: { ...baseMessage, sender_id: 2 },
    },
};
//# sourceMappingURL=MessageBubble.stories.js.map