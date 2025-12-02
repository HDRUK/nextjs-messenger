import React from "react";

export type MessengerTheme = {
  containerBg?: string;
  threadListBg?: string;
  threadItemBg?: string;
  threadItemActiveBg?: string;
  messageSenderBg?: string;
  messageReceiverBg?: string;
  textColor?: string;
  borderColor?: string;
};

export const defaultTheme: Required<MessengerTheme> = {
  containerBg: "#ffffff",
  threadListBg: "#f7f7f7",
  threadItemBg: "#ffffff",
  threadItemActiveBg: "#e6f7ff",
  messageSenderBg: "#cfe9ff",
  messageReceiverBg: "#eee",
  textColor: "#111",
  borderColor: "#ddd",
};

export const ThemeContext = React.createContext<Required<MessengerTheme>>(defaultTheme);
