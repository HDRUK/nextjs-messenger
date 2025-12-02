import React, { useState } from "react";
import { MessengerProvider, ThreadsList, ThreadView, MessageComposer, DefaultAdapter } from "../../src/messenger";

export default function MessageDemoPage() {
  // Example: assume user ID 1 is logged in
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
  const adapter = new DefaultAdapter({ baseUrl: "http://localhost:3000" });

  return (
    <MessengerProvider currentUserId={1} adapter={adapter}>
      <div style={{ display: "flex", gap: 8, height: "100vh" }}>
        <div style={{ width: 320 }}>
          <ThreadsList
            onSelectThread={(t) => setSelectedThreadId(t.id)}
            renderThread={(t, active) => (
              <div
                style={{ padding: 10 }}
              >
                <div style={{ fontWeight: active ? 800 : 600 }}>{t.subject ?? t.latest_message.body.slice(0, 40)}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{t.latest_message.body}</div>
              </div>
            )}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <ThreadView threadId={selectedThreadId} />
          <MessageComposer receiverId={2} />
        </div>
      </div>
    </MessengerProvider>
  );
}
