import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from "vitest";
import { MessengerProvider } from "../context";
import MessageComposer from "./MessageComposer";

describe("MessageComposer", () => {
  it("calls adapter.sendMessage on send", async () => {
    const sendMessage = vi.fn().mockResolvedValue({ id: 100 });
    const adapter = { getThreads: vi.fn(), getThreadById: vi.fn(), sendMessage, markMessageRead: vi.fn() } as any;
    render(
      <MessengerProvider adapter={adapter} currentUserId={1}>
        <MessageComposer receiverId={2} />
      </MessengerProvider>
    );
    const textarea = screen.getByPlaceholderText("Write a message");
    const sendButton = screen.getByText("Send");
    const user = userEvent.setup();
    await user.type(textarea, 'Hello world');
    await user.click(sendButton);
    await waitFor(() => expect(sendMessage).toHaveBeenCalled());
  });
});
