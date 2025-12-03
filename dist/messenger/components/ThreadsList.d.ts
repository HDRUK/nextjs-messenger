import React from "react";
import { Thread } from "../types";
export type ThreadsListProps = {
    receiverId?: number;
    onSelectThread?: (thread: Thread) => void;
    renderThread?: (thread: Thread, isActive: boolean) => React.ReactNode;
};
export declare const ThreadsList: React.FC<ThreadsListProps>;
export default ThreadsList;
//# sourceMappingURL=ThreadsList.d.ts.map