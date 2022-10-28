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
        "更新日志",
        "开发指南",
        "主题",
        "页面布局",
        "示例页面",
        "特色组件",
        "复合组件",
        "*",
      ],
    },
  },
  docs: { inlineStories: true },
};
