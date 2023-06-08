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
      king: "king-theme",
      light: "light-theme",
      pink: "pink-theme",
      red: "red-theme",
    },
    defaultTheme: "light",
  }),
  componentWrapperDecorator(
    (story) =>
      `
      <div class="${builder.enable ? "builder-item" : ""}">
        <app-component-toolbar *ngIf="content?.type && ${
          builder.enable
        }" [content]="content"></app-component-toolbar>
        ${story}
      </div>`
  ),
];
