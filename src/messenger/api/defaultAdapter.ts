import { MessagingAdapter, MessagingAdapterConfig, ThreadsResponse, Thread, SendMessagePayload, Message } from "../types";

export class DefaultAdapter implements MessagingAdapter {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(config: MessagingAdapterConfig) {
    this.baseUrl = config.baseUrl.replace(/\/+$/, "");
    this.headers = { "Content-Type": "application/json", ...(config.headers || {}) };
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, { headers: this.headers, ...(init || {}) });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API request failed ${res.status}: ${text}`);
    }
    return res.json() as Promise<T>;
  }

  async getThreads(senderId: number, receiverId?: number): Promise<ThreadsResponse> {
    let path = `/threads`;
    const query: string[] = [];
    if (senderId) query.push(`sender_id=${encodeURIComponent(senderId)}`);
    if (receiverId) query.push(`receiver_id=${encodeURIComponent(receiverId)}`);
    if (query.length) path += `?${query.join("&")}`;
    return this.request<ThreadsResponse>(path);
  }

  async getThreadById(id: number): Promise<Thread> {
    return this.request<Thread>(`/threads/${id}`);
  }

  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    return this.request<Message>(`/messages`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async markMessageRead(messageId: number): Promise<void> {
    await this.request<void>(`/messages/${messageId}/read`, { method: "PUT" });
  }
}
