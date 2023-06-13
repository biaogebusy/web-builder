import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { builder } from "@assets/app/core/base.json";
import { withThemeByClassName } from "@storybook/addon-styling";
import { componentWrapperDecorator } from "@storybook/angular";
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
        "Builder",
        "主题",
        "全局配置",
        "示例页面",
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
      light: "light-theme",
      pink: "pink-theme",
    },
    defaultTheme: "light",
  }),
  componentWrapperDecorator((story) => {
    // console.log(story);
    if (
      story.includes("app-block") ||
      story.includes("widget") ||
      story.includes("app-header") ||
      story.includes("app-footer") ||
      story.includes("builder")
    ) {
      return story;
    } else {
      return `<app-dynamic-component [inputs]="content"></app-dynamic-component>`;
    }
  }),
];
