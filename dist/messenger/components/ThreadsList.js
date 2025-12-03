import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useMessenger } from "../context";
export const ThreadsList = ({ receiverId, onSelectThread, renderThread }) => {
    const { adapter, currentUserId, theme } = useMessenger();
    const [threads, setThreads] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        let mounted = true;
        adapter
            .getThreads(currentUserId, receiverId)
            .then((ts) => {
            if (mounted)
                setThreads(ts);
        })
            .catch((err) => console.error("Failed to load threads", err));
        return () => {
            mounted = false;
        };
    }, [adapter, currentUserId, receiverId]);
    const select = (thread) => {
        setSelected(thread.id);
        onSelectThread?.(thread);
    };
    return (_jsx("div", { style: { background: theme.threadListBg, padding: 8, borderRight: `1px solid ${theme.borderColor}` }, children: threads.map((t) => {
            const active = selected === t.id;
            if (renderThread)
                return _jsx("div", { onClick: () => select(t), children: renderThread(t, active) }, t.id);
            return (_jsxs("div", { onClick: () => select(t), style: {
                    background: active ? theme.threadItemActiveBg : theme.threadItemBg,
                    padding: 8,
                    marginBottom: 6,
                    borderRadius: 4,
                    cursor: "pointer",
                    border: `1px solid ${theme.borderColor}`,
                }, children: [_jsx("div", { style: { fontWeight: 600, color: theme.textColor }, children: t.subject ?? t.latest_message.body.slice(0, 40) }), _jsx("div", { style: { fontSize: 12, color: theme.textColor }, children: t.latest_message.body })] }, t.id));
        }) }));
};
export default ThreadsList;
//# sourceMappingURL=ThreadsList.js.map