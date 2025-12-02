import React from "react";
import { Message } from "../types";
import { useMessenger } from "../context";

export type MessageBubbleProps = {
  message: Message;
  onMarkRead?: (message: Message) => void;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onMarkRead }) => {
  const { currentUserId, theme } = useMessenger();
  const isSender = message.sender_id === currentUserId;
  return (
    <div
      onClick={() => !message.is_read && onMarkRead?.(message)}
      style={{
        alignSelf: isSender ? "flex-end" : "flex-start",
        background: isSender ? theme.messageSenderBg : theme.messageReceiverBg,
        padding: 8,
        borderRadius: 8,
        maxWidth: "75%",
        border: `1px solid ${theme.borderColor}`,
      }}
    >
      <div style={{ color: theme.textColor }}>{message.body}</div>
      <div style={{ fontSize: 11, marginTop: 6 }}>{new Date(message.created_at).toLocaleString()}</div>
    </div>
  );
};

export default MessageBubble;
