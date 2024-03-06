import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { withThemeByClassName } from "@storybook/addon-styling";
setCompodocJson(docJson);

export const parameters = {
  // actions: { argTypesRegex: "^on[A-Z].*" },
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
        "开发",
        "低代码",
        "主题",
        "全局配置",
        "示例页面",
        "特色组件",
        "复合组件",
        "Drupal",
        "基本元素",
        "基础组件",
        "*",
        "编程指南",
      ],
    },
  },
  docs: { inlineStories: true },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      blue: "blue-theme",
      dark: "dark-theme",
      green: "green-theme",
      pink: "pink-theme",
    },
    defaultTheme: "blue",
  }),
];
