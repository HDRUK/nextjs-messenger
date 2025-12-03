import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMessenger } from "../context";
export const MessageComposer = ({ receiverId, subject: initialSubject, onSent, clearOnSend = true }) => {
    const { adapter, currentUserId, theme } = useMessenger();
    const [body, setBody] = useState("");
    const [subject, setSubject] = useState(initialSubject ?? "");
    const [loading, setLoading] = useState(false);
    const canSend = !!receiverId && body.trim().length > 0;
    const send = async () => {
        if (!canSend)
            return;
        setLoading(true);
        const payload = {
            sender_id: currentUserId,
            receiver_id: receiverId,
            subject: subject || null,
            body: body.trim(),
        };
        try {
            const m = await adapter.sendMessage(payload);
            onSent?.(m.id);
            if (clearOnSend)
                setBody("");
        }
        catch (e) {
            console.error("Failed to send message", e);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { style: { padding: 8, borderTop: `1px solid ${theme.borderColor}` }, children: _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [_jsx("input", { placeholder: "Subject (optional)", value: subject, onChange: (e) => setSubject(e.target.value) }), _jsx("textarea", { placeholder: "Write a message", rows: 3, value: body, onChange: (e) => setBody(e.target.value) }), _jsx("div", { children: _jsx("button", { onClick: send, disabled: !canSend || loading, style: { padding: "8px 12px" }, children: loading ? "Sending…" : "Send" }) })] }) }));
};
export default MessageComposer;
//# sourceMappingURL=MessageComposer.js.map