import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Only include TypeScript story files to avoid duplicates with compiled .js output
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-links'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: false,
  },
};

export default config;
