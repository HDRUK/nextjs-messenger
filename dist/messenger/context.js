import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext } from "react";
import { DefaultAdapter } from "./api/defaultAdapter";
import { defaultTheme, ThemeContext } from "./theme";
const defaultAdapterFactory = (baseUrl, headers) => {
    return new DefaultAdapter({ baseUrl, headers });
};
export const MessengerContext = React.createContext(null);
export const useMessenger = () => {
    const ctx = useContext(MessengerContext);
    if (!ctx)
        throw new Error("useMessenger must be used within a MessengerProvider");
    return ctx;
};
export const MessengerProvider = ({ children, adapter, baseUrl, headers, currentUserId, theme, }) => {
    const finalAdapter = adapter || (baseUrl ? defaultAdapterFactory(baseUrl, headers) : defaultAdapterFactory("/api", headers));
    const mergedTheme = { ...defaultTheme, ...(theme || {}) };
    return (_jsx(MessengerContext.Provider, { value: { adapter: finalAdapter, currentUserId, theme: mergedTheme }, children: _jsx(ThemeContext.Provider, { value: mergedTheme, children: children }) }));
};
//# sourceMappingURL=context.js.map