import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ThreadView from '../components/ThreadView';
declare const meta: Meta<typeof ThreadView>;
export default meta;
type Story = StoryObj<typeof ThreadView>;
type ThreadViewStoryArgs = React.ComponentProps<typeof ThreadView> & {
    messageCount?: number;
};
export declare const Default: Story;
export declare const Conversation: StoryObj<ThreadViewStoryArgs>;
//# sourceMappingURL=ThreadView.stories.d.ts.map