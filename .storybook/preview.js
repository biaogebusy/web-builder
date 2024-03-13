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
        ["本地环境", "页面渲染流程", "开发组件", "组件主题"],
        "低代码",
        "主题",
        "全局配置",
        ["通用", "页头", "页脚"],
        "示例页面",
        ["首页示例", "内容类型", "资料简介", "中台管理", "系统页面"],
        "特色组件",
        ["首屏", "图文 Showcase"],
        "复合组件",
        "基本元素",
        "基础组件",
        "Drupal",
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
