import { describe, it, expect, vi, beforeEach } from "vitest";
import { DefaultAdapter } from "./defaultAdapter";
describe("DefaultAdapter", () => {
    beforeEach(() => {
        // @ts-ignore
        global.fetch = vi.fn();
    });
    it("should call correct URL for getThreads", async () => {
        // @ts-ignore
        global.fetch.mockResolvedValue({ ok: true, json: async () => [{ id: 1, messages: [], participants: [], latest_message: { id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), thread_id: 1, sender_id: 1, receiver_id: 2, body: 'Hello', is_read: 0 } }] });
        const adapter = new DefaultAdapter({ baseUrl: "http://localhost:3000" });
        const result = await adapter.getThreads(1, 2);
        expect(result).toBeDefined();
        expect(global.fetch.mock.calls[0][0]).toBe("http://localhost:3000/threads?sender_id=1&receiver_id=2");
    });
    it('throws when a request returns non-ok', async () => {
        // @ts-ignore
        global.fetch.mockResolvedValue({ ok: false, status: 500, text: async () => 'Server error' });
        const adapter = new DefaultAdapter({ baseUrl: 'http://localhost:3000' });
        await expect(adapter.getThreads(1)).rejects.toThrow('API request failed 500');
    });
});
//# sourceMappingURL=defaultAdapter.test.js.map