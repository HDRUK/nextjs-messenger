import { ServerAdapter } from '../../../src/messenger/api/serverAdapter';

export async function sendMessageAction(payload: { sender_id: number; receiver_id: number; body: string; subject?: string | null }) {
  'use server';
  const adapter = new ServerAdapter({ baseUrl: process.env.MESSENGER_API_BASE || 'http://localhost:3000' });
  return adapter.sendMessage(payload as any);
}
