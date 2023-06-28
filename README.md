# 信使前端 UI 框架

信使 UI 是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。

- [信使 UI](https://www.zhaobg.com)
- [Web Builder](https://www.zhaobg.com/builder)
- [信使 Storybook](https://ui.zhaobg.com)

## 主要功能

- Builder 着陆页构建器，拖动组件快速构建页面，可从组件库中抽选随机生成页面；
- Manage sidebar 边栏，类似前台管理主题，可嵌入 Drupal 后台 View iframe；
- Dashboard 数据面板；
- 列表可通过 Drupal view REST api 适配；
- 动态组件，动态表单；
- 链接或者组件可根据角色显示；
- 支持 SSR；
- 登录页支持手机号和用户名密码登录方式；
- 地图使用高德地图，切换主题时支持匹配暗黑和浅色风格；
- 可以设置强制弹窗提示信息；
- 支持谷歌 Analytics 分析，腾讯企点；
- 支持开启或者禁用全站权限访问；
- 支持站点消息推送；
- 页头和页脚根据 JSON 构建，菜单支持角色显示；
- link 组件、View list 组件设置`rel="drawer"`可以调用 drawer 切出`href`的接口数据并显示对应组件；

## 技术选型

- 前端：Angular + Material + FlexLayout
- 动态表单：ngx-formly
- web 动画：gsap
- 图表：Echarts
- 视频：Video.js
- 文件生成：jspdf 生成 pdf，html2canvas 生成图像
- 编辑器：quill, ang-jsoneditor
- 幻灯片：swiper
- 字体图标：material design icons + 自定义 svg icon
- 加密：crypto-js
- 工具函数：lodash-es
- 测试预览：storybook
- web 服务：Nginx
- 后端：Drupal(推荐)，通过 Drupal 的 views 视图可灵活配置动态组件、动态 api；

## 开发指南

详情可查阅[开发指南](https://ui.zhaobg.com/?path=/docs/guide--page)

## environment 开发环境设置

```javascript
export const environment: IEnvironment = {
  apiUrl: "http://localhost:4200",
  production: false,
  site: "dist",
  port: 4200,
  cache: false,
  ssr: false,
  drupalProxy: false,
};
```

- apiUrl: 是整个应用的 Base api 参数；
- production: 为 false 时，页面的内容 api 将调用本地 json 文件，true 时将会调用`${this.apiUrl}/api/v1/landingPage?content=${this.pageUrl}`接口；
- site: prod 打包时生成的文件夹名称，此设置是为了生存多个站点项目；
- port: 自定义应用端口；
- cache: 是否开启 api 请求缓存；
- ssr: 是否使用 SSR 服务端渲染方式；
- drupalProxy: 对应后端为 drupal，统一使用 Drupal 来登录登出；

## 路由守卫配置

默认会读取 `/api/v1/config` 的全局配置/信息，这里主要是查看该站点是否是开放还是需要登录的，文件路径`src/app/core/guards/auth.guard.ts`，本地开发时可注释掉大概 35 行`reture true；`；

## 代理

配置文件`config/proxy.config.js`，本地开发时，会根据对应的 api url 前缀进行代理转发，根据实际情况进行配置；

```javascript
const PROXY_CONFIG = [
  {
    context: ["/api", "/user", "/sites"],
    target: "https://api.zhaobg.com",
    secure: false,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
```

## 运行

`npm start`

## 为生产环境打包

`npm run build:ssr`

## 运行 Storybook

`npm run storybook`

如果有提示内存不足的报错，执行以下命令，然后重新运行:

`export NODE_OPTIONS="--max-old-space-size=8192"`

## 交流学习

| 联系                   | 二维码                                      |
| ---------------------- | ------------------------------------------- |
| 公众号：Drupal 自习室  | ![Drupal 自习室](/assets/images/qrcode.jpg) |
| 入群加微信：biaogebusy | ![交流群](/assets/images/qrcode.png)        |
