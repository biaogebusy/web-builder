# 远方信使 Xinshi

- 远方信使是一个使用 Drupal 提供 API 的 Angular 前端开发学习框架，拥有丰富的前端组件，通过 Drupal Pannel 可快速构建 Landing 营销着陆页；
- 拥有丰富的前端组件，支持多应用构建；

## Demo

- [信使首页](https://www.zhaobg.com)

## 开发 Development server

`npm start`

## 打包 Build

`npm run build`

## 支持 CSR 和 SSR

### SSR

SSR config，set cache true enabel api cache

```javascript
export const environment: IEnvironment = {
  production: true,
  site: "{{siteId}}",
  port: 4200,
  cache: true,
  ssr: true,
};
```

### CSR

```javascript
export const environment: IEnvironment = {
  production: true,
  site: "{{siteId}}",
  port: 4200,
  cache: false,
  ssr: false,
};
```

## 本地调式线上环境

- 配置本地开发环境

```javascript
export const environment: IEnvironment = {
  production: true, // 设置为true读取线上环境数据
  site: "xinshi",
  port: 4000,
  cache: false,
  ssr: false,
  drupalProxy: true, // 如果站点前后台统一的域名，需要设置为ture，这样可以自动获取用户信息
};
```

- 配置 proxy 代理
  进入 `cofing/proxy.config.json`，检查和新增对应需要的代理

- 配置 cookies
  Drupal Proxy 的情况下，路由守卫会自动调转到 `/my`，通过本地 cookie 来获取用户信息自动登录，所以需要用户先在在线环境登录，进入 devTool 直接修改该对应站点的 cookie 的 path 为`localhost:4200`，这样本地就有了 cookies 信息

## 微信公众号：Drupal 自习室

![Drupal 自习室](./src/assets/images/qrcode.jpg)

## Storybook angular guide

[get started](https://storybook.js.org/tutorials/intro-to-storybook/angular/en/get-started/)

## 扫码入群，或加微信：biaogebusy

![交流群](./src/assets/images/qrcode.png)
