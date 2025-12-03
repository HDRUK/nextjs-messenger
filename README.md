# nextjs-messenger

Reusable TypeScript React components for in-app messaging, designed for Next.js. The package includes a configurable API adapter and a theme system.

## Features
- Configurable API adapter (base URL, headers) with a default fetch-based adapter
- Components: ThreadsList, ThreadView, MessageComposer, MessageBubble
- Configurable theme and render overrides (render props)
- TypeScript first API

## Installation
This example ships as source; copy `src/messenger` into your project and import components.

## Basic usage
Wrap your app or page with `MessengerProvider` and provide `currentUserId` and either `adapter` or `baseUrl`.

```tsx
import { MessengerProvider, DefaultAdapter, ThreadsList, ThreadView, MessageComposer } from "@messenger";

export default function Page() {
  return (
    <MessengerProvider currentUserId={1} baseUrl="https://api.example.com" headers={{ Authorization: 'Bearer x' }}>
      <div style={{ display: 'flex' }}>
        <ThreadsList />
        <ThreadView threadId={1} />
      </div>
    </MessengerProvider>
  );
}
```

## API Adapter
The `MessagingAdapter` interface has these methods:
- `getThreads(senderId, receiverId?)`
- `getThreadById(id)`
- `sendMessage(payload)`
- `markMessageRead(messageId)`

You can provide your own adapter that conforms to the interface or use `DefaultAdapter` and provide `baseUrl` and `headers`.

## Themes
Provide a partial theme object to `MessengerProvider` to override colors:

```tsx
<MessengerProvider currentUserId={1} baseUrl="/api" theme={{ containerBg: '#f0f' }}>
  {/* children */}
</MessengerProvider>
```

## Custom Renderers
You can override how threads or messages are rendered using `renderThread` or `renderMessage` props for the components.

## Example
There is an example page in `examples/pages/message-demo.tsx` that demonstrates usage.

## Testing
Basic tests can be set up with Vitest and React Testing Library.
Run tests:
```
npm run test
```

## Storybook (Updated)
Storybook is included as a devDependency and configured for the workspace.

Start Storybook to visually inspect components and interact with the UI:
```bash
npm install
npm run storybook
```

Build the static Storybook site:
```bash
npm run build-storybook
```

Note:
- This project uses Storybook v8.6.x to maintain compatibility with addon packages (e.g., `@storybook/addon-docs`, `@storybook/addon-controls`). If you need v9+ or v10, expect to update some addon packages and possibly Storybook config, since addon names and options change between major versions.
- If you see a warning about an old transitive package (like "inflight"), we added an `overrides` entry in `package.json` to force newer transitive dependency versions that remove that vulnerable package. You can revert or update these overrides when you decide to bump major Storybook versions.

## Notes on Dependencies & Overrides
- We added an `overrides` entry in `package.json` (npm 8+ feature) to help upgrade transitive dependencies and eliminate deprecated or vulnerable transitive packages in dev dependencies.
- Recommended local environment: Node >= 18 and npm >= 8. The `overrides` field is only supported by newer npm and may not apply with other package managers (use the package-manager equivalent if needed).
- If you want to upgrade Storybook to v10 later, remove the `overrides` (or adjust), update `@storybook/*` packages to v10, and ensure `vite` is at a compatible version (v7). Then run `npm install` again to align dependencies.

Open http://localhost:6006 in your browser to view stories.

## Server usage / Next.js Server Actions

If you want to run messaging calls on the Next.js server (app router) and keep credentials secret, use the included `ServerAdapter` from the package inside server components or server-side actions.

Example (server component usage):

```tsx
// app/page.tsx (server component)
import React from 'react';
import { ServerAdapter } from './src/messenger/api/serverAdapter';
import ThreadView from './src/messenger/components/ThreadView';

export default async function Page() {
  const adapter = new ServerAdapter({ baseUrl: process.env.MESSENGER_API_BASE! });
  // server-side fetch example
  const thread = await adapter.getThreadById(1);
  return (
    <html>
      <body>
        <ThreadView threadId={1} />
      </body>
    </html>
  );
}
```

For client-initiated actions (send message / mark read) use Next.js Server Actions in your `app/` directory and call server-side methods, for example:

```ts
// app/actions/sendMessage.server.ts
import { ServerAdapter } from './src/messenger/api/serverAdapter';

export async function sendMessageAction(payload: { sender_id: number; receiver_id: number; body: string; subject?: string | null }) {
  'use server';
  const adapter = new ServerAdapter({ baseUrl: process.env.MESSENGER_API_BASE! });
  return adapter.sendMessage(payload as any);
}
```

Then pass `sendMessageAction` down to your client component and call it (it will run on the server):

```tsx
// app/components/ComposerClient.tsx (client component)
"use client";
import React from 'react';

export default function ComposerClient({ action }: { action: (p: any) => Promise<any> }) {
  // call `await action(payload)` on user submit (via useTransition or form action)
}
```

Notes:
- Server Actions must be defined within your Next.js `app/` directory and use the `'use server'` directive. The `ServerAdapter` in this package is intended to be instantiated from server components/actions. You cannot import server action functions from node_modules; instead define Server Actions in your app and call into the `ServerAdapter` or package helpers.
- Keep `MESSENGER_API_BASE` (and any API keys) in your environment variables.

