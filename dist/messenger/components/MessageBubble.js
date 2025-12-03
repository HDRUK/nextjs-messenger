import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMessenger } from "../context";
export const MessageBubble = ({ message, onMarkRead }) => {
    const { currentUserId, theme } = useMessenger();
    const isSender = message.sender_id === currentUserId;
    return (_jsxs("div", { onClick: () => !message.is_read && onMarkRead?.(message), style: {
            alignSelf: isSender ? "flex-end" : "flex-start",
            background: isSender ? theme.messageSenderBg : theme.messageReceiverBg,
            padding: 8,
            borderRadius: 8,
            maxWidth: "75%",
            border: `1px solid ${theme.borderColor}`,
        }, children: [_jsx("div", { style: { color: theme.textColor }, children: message.body }), _jsx("div", { style: { fontSize: 11, marginTop: 6 }, children: new Date(message.created_at).toLocaleString() })] }));
};
export default MessageBubble;
//# sourceMappingURL=MessageBubble.js.map