import React from "react";
import { MessagingAdapter } from "./types";
import { MessengerTheme } from "./theme";
export type MessengerConfig = {
    adapter?: MessagingAdapter;
    baseUrl?: string;
    headers?: Record<string, string>;
    currentUserId: number;
    theme?: MessengerTheme;
};
export declare const MessengerContext: React.Context<{
    adapter: MessagingAdapter;
    currentUserId: number;
    theme: Required<MessengerTheme>;
} | null>;
export declare const useMessenger: () => {
    adapter: MessagingAdapter;
    currentUserId: number;
    theme: Required<MessengerTheme>;
};
export declare const MessengerProvider: React.FC<React.PropsWithChildren<MessengerConfig>>;
//# sourceMappingURL=context.d.ts.map