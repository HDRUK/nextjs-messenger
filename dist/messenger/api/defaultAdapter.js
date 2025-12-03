export class DefaultAdapter {
    constructor(config) {
        this.baseUrl = config.baseUrl.replace(/\/+$/, "");
        this.headers = { "Content-Type": "application/json", ...(config.headers || {}) };
    }
    async request(path, init) {
        const url = `${this.baseUrl}${path}`;
        const res = await fetch(url, { headers: this.headers, ...(init || {}) });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`API request failed ${res.status}: ${text}`);
        }
        return res.json();
    }
    async getThreads(senderId, receiverId) {
        let path = `/threads`;
        const query = [];
        if (senderId)
            query.push(`sender_id=${encodeURIComponent(senderId)}`);
        if (receiverId)
            query.push(`receiver_id=${encodeURIComponent(receiverId)}`);
        if (query.length)
            path += `?${query.join("&")}`;
        return this.request(path);
    }
    async getThreadById(id) {
        return this.request(`/threads/${id}`);
    }
    async sendMessage(payload) {
        return this.request(`/messages`, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    async markMessageRead(messageId) {
        await this.request(`/messages/${messageId}/read`, { method: "PUT" });
    }
}
//# sourceMappingURL=defaultAdapter.js.map