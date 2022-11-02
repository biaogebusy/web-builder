# 信使前端框架

信使是基于 Material UI 的 Angular 前端框架，提供优秀的数字创新体验，快速构建响应式优先的 Web 项目。这是一套完整的前端解决方案，包含工程构建，主题定制等功能，极大提升了开发效率，如果您的业务中面向前台业务的，不妨看看。

- 为了适配 IE11 目前的版本保持在 Angular v11；
- 支持 SSR 服务端渲染；
- 支持多主题、暗黑模式；
- 全局配置、品牌菜单配置、主题配置、API、用户状态在 app.module 中注入，不同的项目可覆盖 Token 改变业务逻辑；
- 页面内容数据通过当前页面的 url 来读取 api，根据返回的 body 数组渲染对应的组件；
- 框架全面使用 Storybook 进行开发、测试和文档的更新；

## 开始开发

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
- production: 为 false 时，页面的内容 api 将调用本地 json 文件，`${this.apiUrl}/assets/app${this.pageUrl}.json`，true 时将会调用`${this.apiUrl}/api/v1/landingPage?content=${this.pageUrl}`接口；
- site: prod 打包时生成的文件夹名称，此设置是为了生存多个站点项目；
- port: 自定义应用端口；
- cache: 是否开启 api 请求缓存；
- ssr: 是否使用 SSR 服务端渲染方式；
- drupalProxy: 对应后端为 drupal，统一使用 Drupal 来登录登出；

## 路由守卫配置

默认会读取 `/api/v1/config` 的全局配置信息，这里主要是查看该站点是否是开放还是需要登录的，文件路径`src/app/core/guards/auth.guard.ts`，本地开发时可注释掉大概 35 行`reture true；`；

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

> 如果有提示内存不足的报错，可在命令行执行`export NODE_OPTIONS="--max-old-space-size=8192"`，然后重新运行。

## Storybook 相关资源

- [官网](https://storybook.js.org/)
- [play test query](https://testing-library.com/docs/queries/about)
