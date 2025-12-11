
import { MessagingAdapter, MessagingAdapterConfig, ThreadsResponse, Thread, SendMessagePayload, Message } from "../types";
if (typeof window !== "undefined") {
  throw new Error("ServerAdapter can only be used on the server side.");
}
/**
 * ServerAdapter is intended for usage inside Next.js server components or server-side code.
 * It performs server-side fetches to the upstream messaging API and keeps secrets on the server.
 *
 * Usage (server component):
 * const adapter = new ServerAdapter({ baseUrl: process.env.MESSENGER_API_BASE });
 * const thread = await adapter.getThreadById(1);
 */
export class ServerAdapter implements MessagingAdapter {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(config: MessagingAdapterConfig) {
    this.baseUrl = (config.baseUrl || process.env.MESSENGER_API_BASE || "").replace(/\/+$/, "");
    this.headers = { "Content-Type": "application/json", ...(config.headers || {}) };
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    // Use server-side fetch (available in Next.js server environment)
    const res = await fetch(url, { headers: this.headers, ...(init || {}) });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API request failed ${res.status}: ${text}`);
    }
    return res.json() as Promise<T>;
  }

  async getThreads(): Promise<ThreadsResponse> {
    let path = `/threads`;
    return this.request<ThreadsResponse>(path);
  }

  async getThreadById(id: number): Promise<Thread> {
    return this.request<Thread>(`/threads/${id}`);
  }

  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    const response = this.request<Message>(`/messages`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    console.log(response);
    return response;
  }

  async markMessageRead(messageId: number): Promise<void> {
    await this.request<void>(`/messages/${messageId}/read`, { method: "PUT" });
  }
}

export default ServerAdapter;
