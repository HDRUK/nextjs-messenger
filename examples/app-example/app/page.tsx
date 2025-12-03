import React from 'react';
import ComposerClient from './components/ComposerClient';
import { sendMessageAction } from './actions/sendMessage.server';

// Server component
export default async function Page() {
  // server-side: you can prefetch threads or other data with ServerAdapter if desired
  // Example passes server action to client component
  const currentUserId = 1;
  const receiverId = 2;

  return (
    <div style={{ padding: 16 }}>
      <h2>App Router Server Actions Example</h2>
      <p>This demo shows a client composer calling a server action that uses the ServerAdapter.</p>
      {/* Pass the server action down to the client component */}
      {/* Note: Server Actions must be used from the app/ directory and the Next.js runtime will wire them up. */}
      {/* @ts-ignore server action prop */}
      <ComposerClient action={sendMessageAction} currentUserId={currentUserId} receiverId={receiverId} />
    </div>
  );
}
