export type ISODateString = string;

export interface Participant {
  id: number;
  name: string;
  email: string;
}

export interface Message {
  id: number;
  created_at: ISODateString;
  updated_at: ISODateString;
  thread_id: number;
  sender_id: number;
  receiver_id: number;
  body: string;
  is_read: 0 | 1;
}

export interface Thread {
  id: number;
  created_at: ISODateString;
  updated_at: ISODateString;
  subject: string | null;
  messages: Message[];
  participants: Participant[];
  latest_message: Message;
}

export interface ThreadsResponse extends Array<Thread> {}

export interface SendMessagePayload {
  sender_id: number;
  receiver_id: number;
  subject?: string | null;
  body: string;
}

export interface MessagingAdapterConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export interface MessagingAdapter {
  getThreads(senderId: number, receiverId?: number): Promise<ThreadsResponse>;
  getThreadById(id: number, senderId?: number, receiverId?: number): Promise<Thread>;
  sendMessage(payload: SendMessagePayload): Promise<Message>;
  markMessageRead(messageId: number): Promise<void>;
}
