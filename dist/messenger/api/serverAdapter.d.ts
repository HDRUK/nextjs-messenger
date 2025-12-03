import { MessagingAdapter, MessagingAdapterConfig, ThreadsResponse, Thread, SendMessagePayload, Message } from "../types";
/**
 * ServerAdapter is intended for usage inside Next.js server components or server-side code.
 * It performs server-side fetches to the upstream messaging API and keeps secrets on the server.
 *
 * Usage (server component):
 * const adapter = new ServerAdapter({ baseUrl: process.env.MESSENGER_API_BASE });
 * const thread = await adapter.getThreadById(1);
 */
export declare class ServerAdapter implements MessagingAdapter {
    private baseUrl;
    private headers;
    constructor(config: MessagingAdapterConfig);
    private request;
    getThreads(senderId: number, receiverId?: number): Promise<ThreadsResponse>;
    getThreadById(id: number): Promise<Thread>;
    sendMessage(payload: SendMessagePayload): Promise<Message>;
    markMessageRead(messageId: number): Promise<void>;
}
export default ServerAdapter;
//# sourceMappingURL=serverAdapter.d.ts.map