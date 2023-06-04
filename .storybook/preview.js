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
        "开发指南",
        "主题",
        "示例页面",
        "品牌布局",
        "特色组件",
        "复合组件",
        "*",
        "编程指南",
        "Drupal",
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
      king: "king-theme",
      light: "light-theme",
      pink: "pink-theme",
      red: "red-theme",
    },
    defaultTheme: "light",
  }),
];
