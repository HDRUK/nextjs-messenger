import React from "react";
import { Message } from "../types";
export type ThreadViewProps = {
    threadId: number | null;
    renderMessage?: (message: Message) => React.ReactNode;
    onMarkRead?: (message: Message) => void;
};
export declare const ThreadView: React.FC<ThreadViewProps>;
export default ThreadView;
//# sourceMappingURL=ThreadView.d.ts.map