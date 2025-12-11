if (typeof window !== "undefined") {
    throw new Error("ServerAdapter can only be used on the server side.");
}
/**
 * ServerAdapter is intended for usage inside Next.js server components or server-side code.
 * It performs server-side fetches to the upstream messaging API and keeps secrets on the server.
 *
 * Usage (server component):
 * const adapter = new ServerAdapter({ baseUrl: process.env.MESSENGER_API_BASE });
 * const thread = await adapter.getThreadById(1);
 */
export class ServerAdapter {
    constructor(config) {
        this.baseUrl = (config.baseUrl || process.env.MESSENGER_API_BASE || "").replace(/\/+$/, "");
        this.headers = { "Content-Type": "application/json", ...(config.headers || {}) };
    }
    async request(path, init) {
        const url = `${this.baseUrl}${path}`;
        // Use server-side fetch (available in Next.js server environment)
        const res = await fetch(url, { headers: this.headers, ...(init || {}) });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`API request failed ${res.status}: ${text}`);
        }
        return res.json();
    }
    async getThreads() {
        let path = `/threads`;
        return this.request(path);
    }
    async getThreadById(id) {
        return this.request(`/threads/${id}`);
    }
    async sendMessage(payload) {
        const response = this.request(`/messages`, {
            method: "POST",
            body: JSON.stringify(payload),
        });
        console.log(response);
        return response;
    }
    async markMessageRead(messageId) {
        await this.request(`/messages/${messageId}/read`, { method: "PUT" });
    }
}
export default ServerAdapter;
//# sourceMappingURL=serverAdapter.js.map