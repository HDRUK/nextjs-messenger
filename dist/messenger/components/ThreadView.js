import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useMessenger } from "../context";
export const ThreadView = ({ threadId, renderMessage, onMarkRead }) => {
    const { adapter, currentUserId, theme } = useMessenger();
    const [thread, setThread] = useState(null);
    useEffect(() => {
        if (!threadId)
            return;
        let mounted = true;
        adapter
            .getThreadById(threadId)
            .then((t) => {
            if (mounted)
                setThread(t);
        })
            .catch((err) => console.error("Failed to load thread", err));
        return () => {
            mounted = false;
        };
    }, [adapter, threadId]);
    const markRead = async (m) => {
        try {
            await adapter.markMessageRead(m.id);
            onMarkRead?.(m);
        }
        catch (e) {
            console.error("Failed to mark message read", e);
        }
    };
    if (!threadId)
        return _jsx("div", { style: { padding: 12 }, children: "Select a thread" });
    if (!thread)
        return _jsx("div", { style: { padding: 12 }, children: "Loading..." });
    return (_jsxs("div", { style: { padding: 12, background: theme.containerBg }, children: [_jsx("h3", { style: { marginTop: 0 }, children: thread.subject ?? "Conversation" }), _jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: thread.messages.map((m) => {
                    const isSender = m.sender_id === currentUserId;
                    if (renderMessage)
                        return _jsx("div", { children: renderMessage(m) }, m.id);
                    return (_jsxs("div", { style: {
                            alignSelf: isSender ? "flex-end" : "flex-start",
                            background: isSender ? theme.messageSenderBg : theme.messageReceiverBg,
                            padding: 8,
                            borderRadius: 8,
                            maxWidth: "75%",
                            border: `1px solid ${theme.borderColor}`,
                        }, onClick: () => !m.is_read && markRead(m), title: m.is_read ? "Read" : "Mark as read", children: [_jsx("div", { style: { color: theme.textColor }, children: m.body }), _jsx("div", { style: { fontSize: 11, marginTop: 6 }, children: new Date(m.created_at).toLocaleString() })] }, m.id));
                }) })] }));
};
export default ThreadView;
//# sourceMappingURL=ThreadView.js.map