"use client";

import React, { useState, useTransition } from 'react';

export default function ComposerClient({ action, currentUserId, receiverId }: { action: (p: any) => Promise<any>; currentUserId: number; receiverId: number }) {
  const [body, setBody] = useState('');
  const [subject, setSubject] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    startTransition(async () => {
      try {
        await action({ sender_id: currentUserId, receiver_id: receiverId, body: body.trim(), subject: subject || null });
        setBody('');
        setSubject('');
        // Optionally show a UI notification
      } catch (err) {
        console.error('Failed to send', err);
      }
    });
  };

  return (
    <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input placeholder="Subject (optional)" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <textarea placeholder="Write a message" rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
      <div>
        <button type="submit" disabled={isPending || !body.trim()}>{isPending ? 'Sending…' : 'Send'}</button>
      </div>
    </form>
  );
}
