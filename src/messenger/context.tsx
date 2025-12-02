import React, { useContext } from "react";
import { DefaultAdapter } from "./api/defaultAdapter";
import { MessagingAdapter } from "./types";
import { MessengerTheme, defaultTheme, ThemeContext } from "./theme";

export type MessengerConfig = {
  adapter?: MessagingAdapter;
  baseUrl?: string; // alias for default adapter
  headers?: Record<string, string>;
  currentUserId: number;
  theme?: MessengerTheme;
};

const defaultAdapterFactory = (baseUrl: string, headers?: Record<string, string>) => {
  return new DefaultAdapter({ baseUrl, headers });
};

export const MessengerContext = React.createContext<{
  adapter: MessagingAdapter;
  currentUserId: number;
  theme: Required<MessengerTheme>;
} | null>(null);

export const useMessenger = () => {
  const ctx = useContext(MessengerContext);
  if (!ctx) throw new Error("useMessenger must be used within a MessengerProvider");
  return ctx;
};

export const MessengerProvider: React.FC<React.PropsWithChildren<MessengerConfig>> = ({
  children,
  adapter,
  baseUrl,
  headers,
  currentUserId,
  theme,
}) => {
  const finalAdapter = adapter || (baseUrl ? defaultAdapterFactory(baseUrl, headers) : defaultAdapterFactory("/api", headers));
  const mergedTheme = { ...defaultTheme, ...(theme || {}) } as Required<MessengerTheme>;

  return (
    <MessengerContext.Provider value={{ adapter: finalAdapter, currentUserId, theme: mergedTheme }}>
      <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>
    </MessengerContext.Provider>
  );
};
