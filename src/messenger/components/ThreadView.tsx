import React, { useEffect, useState } from "react";
import { Thread, Message } from "../types";
import { useMessenger } from "../context";

export type ThreadViewProps = {
  threadId: number | null;
  renderMessage?: (message: Message) => React.ReactNode;
  onMarkRead?: (message: Message) => void;
};

export const ThreadView: React.FC<ThreadViewProps> = ({ threadId, renderMessage, onMarkRead }) => {
  const { adapter, currentUserId, theme } = useMessenger();
  const [thread, setThread] = useState<Thread | null>(null);

  useEffect(() => {
    if (!threadId) return;
    let mounted = true;
    adapter
      .getThreadById(threadId)
      .then((t) => {
        if (mounted) setThread(t);
      })
      .catch((err) => console.error("Failed to load thread", err));
    return () => {
      mounted = false;
    };
  }, [adapter, threadId]);

  const markRead = async (m: Message) => {
    try {
      await adapter.markMessageRead(m.id);
      onMarkRead?.(m);
    } catch (e) {
      console.error("Failed to mark message read", e);
    }
  };

  if (!threadId) return <div style={{ padding: 12 }}>Select a thread</div>;
  if (!thread) return <div style={{ padding: 12 }}>Loading...</div>;

  return (
    <div style={{ padding: 12, background: theme.containerBg }}>
      <h3 style={{ marginTop: 0 }}>{thread.subject ?? "Conversation"}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {thread.messages.map((m) => {
          const isSender = m.sender_id === currentUserId;
          if (renderMessage) return <div key={m.id}>{renderMessage(m)}</div>;
          return (
            <div
              key={m.id}
              style={{
                alignSelf: isSender ? "flex-end" : "flex-start",
                background: isSender ? theme.messageSenderBg : theme.messageReceiverBg,
                padding: 8,
                borderRadius: 8,
                maxWidth: "75%",
                border: `1px solid ${theme.borderColor}`,
              }}
              onClick={() => !m.is_read && markRead(m)}
              title={m.is_read ? "Read" : "Mark as read"}
            >
              <div style={{ color: theme.textColor }}>{m.body}</div>
              <div style={{ fontSize: 11, marginTop: 6 }}>{new Date(m.created_at).toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreadView;
