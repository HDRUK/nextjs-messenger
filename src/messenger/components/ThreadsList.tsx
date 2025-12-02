import React, { useEffect, useState } from "react";
import { Thread } from "../types";
import { useMessenger } from "../context";

export type ThreadsListProps = {
  receiverId?: number; // optional filter
  onSelectThread?: (thread: Thread) => void;
  renderThread?: (thread: Thread, isActive: boolean) => React.ReactNode;
};

export const ThreadsList: React.FC<ThreadsListProps> = ({ receiverId, onSelectThread, renderThread }) => {
  const { adapter, currentUserId, theme } = useMessenger();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    let mounted = true;
    adapter
      .getThreads(currentUserId, receiverId)
      .then((ts) => {
        if (mounted) setThreads(ts);
      })
      .catch((err) => console.error("Failed to load threads", err));
    return () => {
      mounted = false;
    };
  }, [adapter, currentUserId, receiverId]);

  const select = (thread: Thread) => {
    setSelected(thread.id);
    onSelectThread?.(thread);
  };

  return (
    <div style={{ background: theme.threadListBg, padding: 8, borderRight: `1px solid ${theme.borderColor}` }}>
      {threads.map((t) => {
        const active = selected === t.id;
        if (renderThread) return <div key={t.id} onClick={() => select(t)}>{renderThread(t, active)}</div>;
        return (
          <div
            key={t.id}
            onClick={() => select(t)}
            style={{
              background: active ? theme.threadItemActiveBg : theme.threadItemBg,
              padding: 8,
              marginBottom: 6,
              borderRadius: 4,
              cursor: "pointer",
              border: `1px solid ${theme.borderColor}`,
            }}
          >
            <div style={{ fontWeight: 600, color: theme.textColor }}>{t.subject ?? t.latest_message.body.slice(0, 40)}</div>
            <div style={{ fontSize: 12, color: theme.textColor }}>{t.latest_message.body}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ThreadsList;
