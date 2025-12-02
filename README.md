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
