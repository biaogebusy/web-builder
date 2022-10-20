import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        "介绍",
        "主题",
        "示例页面",
        "特色组件",
        "常规组件",
        "页头页脚",
        "*",
      ],
    },
  },
  docs: { inlineStories: true },
};
