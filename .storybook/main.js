module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-ie11",
  ],
  framework: "@storybook/angular",
  // core: {
  //   builder: "@storybook/builder-webpack5",
  // },
  features: {
    interactionsDebugger: true,
  },
};
