import { MessagingAdapter, MessagingAdapterConfig, ThreadsResponse, Thread, SendMessagePayload, Message } from "../types";
export declare class DefaultAdapter implements MessagingAdapter {
    private baseUrl;
    private headers;
    constructor(config: MessagingAdapterConfig);
    private request;
    getThreads(senderId: number, receiverId?: number): Promise<ThreadsResponse>;
    getThreadById(id: number): Promise<Thread>;
    sendMessage(payload: SendMessagePayload): Promise<Message>;
    markMessageRead(messageId: number): Promise<void>;
}
//# sourceMappingURL=defaultAdapter.d.ts.map