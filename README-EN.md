<h1 align="center">XINSHI Front-end UI Framework</h1>

<p align="center">
  <img src="src/assets/images/logo/logo-white.png" alt="logo" width="100px"/>
  <br>
  <i>Xinshi UI is an Angular front-end framework based on Material. With its rich component library, it provides an excellent digital innovation experience. <br>The Web Builder allows for quick construction of responsive, multi-themed web pages through drag-and-drop.
    </i>
  <br>
</p>

<p align="center">
  <a href="https://www.zhaobg.com"><strong>https://www.zhaobg.com</strong></a>
  <br>
</p>

<p align="center">
  <a href="https://www.zhaobg.com/builder">Web Builder</a>
  ·
  <a href="https://ui.zhaobg.com">UI Storybook</a>
  ·
  <a href="https://www.zhihu.com/people/biaogebusy">知乎</a>
    ·
  <a href="./README.md">中文</a>
  <br>
  <br>
</p>

#### Open Source Purpose

This project is the result of continuous accumulation, reflection, and improvement during my learning process with Angular. From the initial Angular 9 to the current Angular 11, from a single component to a rich component library, from a cumbersome page component traversal approach to dynamic components, it has undergone numerous iterations, refactoring, and upgrades. This open-source project is very suitable for beginners to learn or advance their skills. It covers most of the Angular technical knowledge points but is not limited to the following:

- Server-Side Rendering (SSR)
- Lazy Loading，Inject DI
- Route Guards
- Request Interception and Caching
- Dynamic Components
- Dynamic Forms
- Dynamic Tables
- Multiple Themes
- Custom Directives
- Custom Pipes
- Custom Icons
- Data Visualization and Charts
- RxJS
- Flex Layout
- Storybook
- TypeScript
- Provider
- Map Applications
- Applications of Messenger UI in Drupal Headless

## Technology Stack

- Front-end: Angular + Material + FlexLayout
- Dynamic Forms: ngx-formly
- Web Animation: gsap
- Charts: Echarts
- Video: Video.js
- File Generation: jspdf for PDF generation, html2canvas for image generation
- Editors: quill, ang-jsoneditor
- Slideshow: swiper
- Icon Fonts: material design icons + custom SVG icons
- Encryption: crypto-js
- Utility Functions: lodash-es
- Testing and Preview: Storybook
- Web Server: Nginx
- Back-end: Drupal (recommended), dynamic components and APIs can be flexibly configured through Drupal views

## Development Guide

For more details, please refer to the[Development Guide](https://ui.zhaobg.com/?path=/docs/guide--page)

## Development Environment Setup

```javascript
// src/environments/environment.ts
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

- apiUrl: Base API parameter for the entire application
- production: When set to false, the content API of the page will call the local JSON file. When set to true, it will call the `${this.apiUrl}/api/v1/landingPage?content=${this.pageUrl}` interface.
- site: The folder name generated when the project is built in production mode. This setting is for generating multiple site projects.
- port: Custom application port.
- cache: Whether to enable API request caching.
- ssr: Whether to use SSR server-side rendering.
- drupalProxy: Corresponds to Drupal as the back-end, and unified login/logout using Drupal.

## Route Guard Configuration

By default, it will read the global configuration information from `/api/v1/`config. This is mainly to check whether the site is open or requires login. The file path is `src/app/core/guards/auth.guard.ts`. You can comment out line 35, return true;, during local development.

## Proxy

Configuration file `config/proxy.config.js`. During local development, it will forward the request based on the corresponding API URL prefix. Configure it according to the actual situation.

```javascript
const PROXY_CONFIG = [
  {
    context: ["/api", "/user", "/sites"],
    target: "https://yourdomain.com",
    secure: false,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
```

## Run

`npm start`

## Route Pages

- Default homepage:[http://localhost:4200/home](http://localhost:4200/home)
- User login:[http://localhost:4200/me/login](http://localhost:4200/me/login)
- Web builder: [http://localhost:4200/builder](http://localhost:4200/builder)
- Drupal Media: [http://localhost:4200/media](http://localhost:4200/media)
- Drupal Blocks:[http://localhost:4200/block](http://localhost:4200/block)

## Other Pages

In addition to the above route pages, when accessing other pages, the url will be used to retrieve data from the API and render the page. Returns for local and production environments are handled for easy testing:

```javascript
loadPageContent(pageUrl = this.pageUrl): Observable<IPage> {
    if (environment.production) {
      const landingPath = '/api/v1/landingPage?content=';
      const pageUrlParams = `${this.apiUrl}${landingPath}${pageUrl}`;

      return this.http.get<any>(pageUrlParams).pipe(
        tap((page) => {
          this.updatePage(page);
        }),
        catchError(() => {
          return this.http.get<any>(`${this.apiUrl}${landingPath}404`);
        })
      );
    } else {
      const sample = pageUrl.split('/')[1];
      const samplePage = samples.elements.filter(
        (item) => item.id === sample
      )[0];
      if (samplePage) {
        this.updatePage(samplePage.page);
        return of(samplePage.page);
      } else {
        return this.http.get<any>(`${this.apiUrl}/assets/app/404.json`);
      }
    }
  }
```

For base configuration, refer to [Xinshi Messenger Storybook Global Configuration](https://ui.zhaobg.com/?path=/docs/base-config--page)

## Build for Production

`npm run build:ssr`

## Run Storybook

`npm run storybook`

If you encounter an out-of-memory error, execute the following command and then run it again:

`export NODE_OPTIONS="--max-old-space-size=8192"`

## Communication and Learning

| Contact                 | QR Code                                              |
| ----------------------- | ---------------------------------------------------- |
| Official：Drupal 自习室 | <img src="src/assets/images/qrcode-official.jpg"/>   |
| WeChat：biaogebusy      | <img src="src/assets/images/wechat.jpg" alt="logo"/> |
