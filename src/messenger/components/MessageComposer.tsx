import React, { useState } from "react";
import { useMessenger } from "../context";
import { SendMessagePayload } from "../types";

export type MessageComposerProps = {
  receiverId?: number;
  subject?: string | null;
  onSent?: (messageId: number) => void;
  clearOnSend?: boolean;
};

export const MessageComposer: React.FC<MessageComposerProps> = ({ receiverId, subject: initialSubject, onSent, clearOnSend = true }) => {
  const { adapter, currentUserId, theme } = useMessenger();
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState(initialSubject ?? "");
  const [loading, setLoading] = useState(false);

  const canSend = !!receiverId && body.trim().length > 0;

  const send = async () => {
    if (!canSend) return;
    setLoading(true);
    const payload: SendMessagePayload = {
      sender_id: currentUserId,
      receiver_id: receiverId!,
      subject: subject || null,
      body: body.trim(),
    };
    try {
      const m = await adapter.sendMessage(payload);
      onSent?.(m.id);
      if (clearOnSend) setBody("");
    } catch (e) {
      console.error("Failed to send message", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 8, borderTop: `1px solid ${theme.borderColor}` }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <input placeholder="Subject (optional)" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <textarea placeholder="Write a message" rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
        <div>
          <button onClick={send} disabled={!canSend || loading} style={{ padding: "8px 12px" }}>
            {loading ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
