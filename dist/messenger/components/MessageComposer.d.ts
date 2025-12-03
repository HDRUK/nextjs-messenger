import React from "react";
export type MessageComposerProps = {
    receiverId?: number;
    subject?: string | null;
    onSent?: (messageId: number) => void;
    clearOnSend?: boolean;
};
export declare const MessageComposer: React.FC<MessageComposerProps>;
export default MessageComposer;
//# sourceMappingURL=MessageComposer.d.ts.map