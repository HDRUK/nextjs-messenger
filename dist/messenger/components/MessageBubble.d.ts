import React from "react";
import { Message } from "../types";
export type MessageBubbleProps = {
    message: Message;
    onMarkRead?: (message: Message) => void;
};
export declare const MessageBubble: React.FC<MessageBubbleProps>;
export default MessageBubble;
//# sourceMappingURL=MessageBubble.d.ts.map