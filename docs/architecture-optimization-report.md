# 项目架构与优化审查报告

审查日期：2026-06-19  
项目类型：Angular 20 + SSR + Builder/Runtime 动态页面系统  
审查范围：构建配置、SSR 服务、路由与模块边界、认证、动态模板安全、性能、CI/CD、测试与工程规范。

## 结论摘要

当前项目已经完成 Angular 20、SSR、hydration、signals、standalone component 等方向的升级，整体方向可继续演进。但当前存在几类高优先级问题：

- 生产构建在本机两次复现 `Abort trap: 6`，发布链路不可稳定验证。
- Docker/SSR 启动入口、端口配置和 CI 安装命令存在明显不一致。
- 前台页面模块直接导入 BuilderModule，导致编辑器能力进入运行时边界，削弱懒加载和性能收益。
- token 存储使用前端可解密 cookie，安全边界较弱。
- 自定义模板支持 `new Function` 执行 JS，属于强能力插件系统，需要配套权限、审计和 CSP 策略。

建议先处理构建与部署阻塞，再处理模块边界和认证安全，最后推进工具链和类型治理。

## 已执行验证

| 命令 | 结果 | 说明 |
| --- | --- | --- |
| `npm run lint -- --quiet` | 通过 | 当前 ESLint 规则未发现错误 |
| `npm run build` | 失败 | `ng build --configuration production` 以 `Abort trap: 6` 退出 |
| `npx ng build --configuration production --verbose` | 失败 | 同样以 `Abort trap: 6` 退出，未输出普通 TS/Angular 编译错误 |
| `node -v` | `v22.16.0` | 当前本机 Node 版本 |
| `npx ng version` | Angular CLI/Core `20.3.0` | Angular 版本确认 |

## P0：必须优先处理的问题

### 1. 生产构建不稳定

相关位置：

- `package.json`：`scripts.build`
- `angular.json`：`build.options`

现象：

- `npm run build` 两次失败。
- 构建阶段提示：`The "prerender" option is not considered when "outputMode" is specified.`
- 随后进程以 `Abort trap: 6` 退出。

影响：

- 无法证明当前代码可生产发布。
- CI/CD 即使配置正确，也可能无法稳定产物。
- 这类崩溃通常不是普通 TypeScript 错误，可能与 Angular 构建器、Node 版本、原生依赖、优化阶段或平台依赖有关。

建议：

1. 固定 Node 版本矩阵，优先验证 Angular 20 官方支持的 LTS 版本。
2. 清理 `angular.json` 中与 `outputMode: "server"` 冲突的 `prerender: false`。
3. 使用 `npm ci` 重新安装依赖后复测。
4. 在 CI 中增加 `npm run lint`、`npm run build` 两个硬门禁。
5. 若仍崩溃，使用最小化排查：关闭优化、关闭 SSR、逐步恢复配置定位崩溃阶段。

验收标准：

- `npm ci && npm run build` 在本机和 CI 均稳定通过。
- 构建日志无配置冲突警告。

### 2. Docker SSR 启动入口错误

相关位置：

- `Dockerfile`
- `package.json`
- `src/server.ts`

问题：

- `Dockerfile` 当前启动 `dist/server/main.server.mjs`。
- 项目脚本 `serve:ssr:xinshi` 启动的是 `dist/server/server.mjs`。
- `main.server.mjs` 是 Angular bootstrap 入口，不是 Express SSR server。
- `src/server.ts` 中 `environment.port || process.env['PORT'] || 4000` 会让环境变量 `PORT` 失效。
- Docker 暴露 4200，但生产环境配置端口是 4201。

影响：

- 容器可能启动后不监听 HTTP 请求。
- 不同环境端口行为不一致。
- 平台注入 `PORT` 时无法覆盖应用端口。

建议：

1. Docker CMD 改为 `node dist/server/server.mjs`。
2. 端口优先级改为 `process.env['PORT'] || environment.port || 4000`。
3. 统一 Docker `EXPOSE`、生产环境 `port`、部署平台端口。
4. 增加容器启动 smoke test，例如请求 `/home` 返回 200。

验收标准：

- `docker run -p 4200:4200 ...` 后可访问 SSR 页面。
- `PORT=4000 node dist/server/server.mjs` 能按环境变量监听。

### 3. CI 安装命令不规范

相关位置：

- `.github/workflows/master.yml`

问题：

- 当前命令是 `npm ci over npm`。
- 这不是明确的 CI 安装意图，会产生误导，也可能触发异常参数行为。

建议：

1. 改为 `npm ci`。
2. 升级 GitHub Actions 版本：`actions/checkout@v4`、`actions/setup-node@v4`。
3. 在部署前增加 build artifact 检查。
4. 增加 `npm run lint` 和生产构建门禁。

验收标准：

- CI 日志中依赖安装使用 `npm ci`。
- lint/build 失败时阻断部署。

## P1：高价值架构优化

### 4. 前台运行时不应导入 BuilderModule

相关位置：

- `src/app/app.config.ts`
- `src/app/modules/page/page.module.ts`
- `src/app/modules/builder/builder.module.ts`
- `src/app/core/service/component.service.ts`

问题：

- 根配置导入 `PageModule`。
- `PageModule` 又导入 `BuilderModule`。
- `BuilderModule` 引入 Monaco、Formly、Material、编辑器面板、管理页面等重依赖。

影响：

- 前台页面和编辑器边界不清。
- `/builder` 懒加载收益下降。
- SSR/runtime 可能承担不必要的编辑器依赖。
- 首屏 bundle 和服务端 bundle 复杂度增加。

建议：

1. 拆分 Runtime 与 Builder：
   - `RuntimeComponentsModule`：只包含前台渲染需要的动态组件。
   - `BuilderModule`：只包含编辑器、管理、配置检查、Monaco、Formly 等能力。
2. `PageModule` 不再导入 `BuilderModule`。
3. `ComponentService` 的组件注册按 runtime/builder 分区。
4. 前台渲染未知 builder-only 组件时给出 graceful fallback。

验收标准：

- `PageModule` 不依赖 `BuilderModule`。
- `/builder` 仍能懒加载编辑器能力。
- 前台页面构建产物不包含 Monaco 编辑器主依赖。

### 5. 认证 token 存储安全边界不足

相关位置：

- `src/app/core/service/user.service.ts`
- `src/app/core/service/crypto-js.service.ts`
- `src/app/core/interceptor/auth.interceptor.ts`

问题：

- access token 和 refresh token 被加密后写入普通 cookie。
- 加密密钥硬编码在前端代码中。
- 这无法抵御 XSS 后读取 token。
- refresh token 暴露在前端会放大攻击影响。

建议：

短期：

1. cookie 增加 `secure` 配置，生产强制 HTTPS。
2. 降低 refresh token 有效期。
3. 增加登出时服务端 refresh token revoke。
4. 审计所有 `[innerHTML]` 和动态脚本能力。

中期：

1. 迁移为 HttpOnly + Secure + SameSite cookie。
2. 前端只通过 BFF 或后端 session 访问用户状态。
3. refresh token 不进入浏览器 JS 上下文。

验收标准：

- 前端 JS 无法读取 refresh token。
- XSS 风险不再直接等价于长期账号接管。

### 6. 自定义模板执行 JS 风险需要产品化治理

相关位置：

- `src/app/uiux/combs/other/custom-template/custom-template.component.ts`

问题：

- 自定义模板允许 DOMPurify 后写入 HTML。
- 允许管理员配置 JS，并用 `new Function` 执行。
- 这是插件能力，不是普通模板能力。

影响：

- 一旦编辑权限泄露，可影响所有访问页面的用户。
- CSP 很难收紧到禁止 inline/eval。
- 审计和回滚要求更高。

建议：

1. 将 custom JS 能力标为高危配置项。
2. 后端限制只有超级管理员可编辑 JS。
3. 保存 JS 时记录审计日志和版本差异。
4. 发布前增加人工审核或审批流。
5. 能用 JSON 配置表达的交互，不允许写 JS。
6. 若必须执行 JS，建议使用 sandbox iframe 隔离执行上下文。

验收标准：

- 普通内容编辑角色不能编辑 JS。
- 每次 JS 变更有审计记录。
- 前台 CSP 策略有明确例外说明。

### 7. SSR 路由策略不完整

相关位置：

- `src/app/app.routes.ts`
- `src/app/app.routes.server.ts`

问题：

- 客户端路由包含 `/builder` 和 `/en/builder`。
- 服务端路由只把 `builder` 设置为 `RenderMode.Client`。
- `en/builder` 会落到 `**` 的 SSR 渲染策略。

建议：

1. 将 `en/builder` 同样标记为 Client render。
2. 用模式化配置覆盖多语言 builder 路由。
3. 补充 SSR smoke test 覆盖 `/builder` 和 `/en/builder`。

验收标准：

- `/builder` 与 `/en/builder` 在 SSR 下行为一致。
- 编辑器相关路由不触发服务端渲染错误。

### 8. 配置加载失败时 guard 可能崩溃

相关位置：

- `src/app/core/service/content.service.ts`
- `src/app/core/guards/auth.guard.ts`

问题：

- `loadConfig` 失败后返回 `{}`。
- `auth.guard.ts` 直接解构 `coreConfig.guard`。

建议：

1. 为 `CORE_CONFIG` 提供完整默认值。
2. guard 读取配置时使用安全默认值。
3. 配置加载失败时应进入可观测降级状态，而不是隐式空对象。

验收标准：

- 远端 `/core/base` 失败时页面不会因 guard 抛错白屏。
- 用户能看到合理错误或默认页面。

## P2：工程质量与性能优化

### 9. URL query string 需要统一构建

相关位置：

- `src/app/core/service/api.service.ts`
- `src/app/core/service/node.service.ts`
- 多处 service/component 中的 API 参数拼接

问题：

- 大量手工拼接 `key=value&key2=value2`。
- 缺少统一 URL 编码。
- 数组、中文、空格、`&` 等字符容易导致请求错误。

建议：

1. 新增 `buildHttpParams()` 工具，统一处理数组、空值、布尔值、数字、字符串。
2. 新代码禁止手工拼 query string。
3. 对 Drupal JSON:API 特殊参数保留明确兼容逻辑。

验收标准：

- 核心 API 服务不再直接拼接普通 query string。
- 参数编码有单元测试覆盖。

### 10. 测试入口与覆盖范围需要收敛

相关位置：

- `package.json`
- `angular.json`
- `tsconfig.spec.json`
- `src/test-*.ts`
- `e2e/`
- `vitest.config.ts`

问题：

- 单元测试已迁移到 Vitest，E2E 已迁移到 Playwright，但 `package.json` 直接调用 `vitest`，没有经过 Angular 20 官方 `ng test` 入口。
- `angular.json` 缺少 `@angular/build:unit-test` 的 `test` target，CI 与本地命令无法复用 Angular CLI 的测试集成。
- `tsconfig.spec.json` 与 `vitest.config.ts` 只覆盖 `src/app/core/util/**/*.spec.ts`，大部分组件 spec 不会被执行。
- 现有大量组件 spec 仍是旧 CLI 模板写法，例如把 standalone component 放在 `declarations`，以及继续使用 `RouterTestingModule`。

建议：

1. `package.json` 统一使用 `ng test`；CI 使用当前 Angular CLI 20.3 可接受的 `ng test --no-watch`。
2. 在 `angular.json` 增加 `@angular/build:unit-test` target，runner 使用 `vitest`。
3. 通过 `providersFile` 提供测试环境公共 provider，例如 `provideZonelessChangeDetection()`。
4. `tsconfig.spec.json` 覆盖 `src/**/*.spec.ts`、`src/**/*.test.ts`、setup 和 providers 文件。
5. 分批修复旧组件 spec：standalone component 放入 `imports`，路由测试优先使用 `provideRouter` 或 `RouterTestingHarness`。
6. ESLint 重新开启关键规则：
   - `@typescript-eslint/no-explicit-any`
   - `@typescript-eslint/no-unused-vars`
   - RxJS 订阅治理相关规则

验收标准：

- `npm run test` 通过 Angular CLI `ng test` 执行 Vitest。
- `npm run e2e` 使用 Playwright。
- 所有需要保留的 spec 都被测试入口覆盖，并且在 CI 单次运行模式下通过。
- 新增测试优先遵循 Angular 20 的 Vitest、zoneless、standalone component 测试写法。

### 11. `any` 使用过多，类型边界偏弱

现象：

- `src/app` 中存在大量 `any`。
- ESLint 当前关闭了 `no-explicit-any` 和 `no-unused-vars`。

影响：

- 动态页面系统数据结构复杂，缺少类型会放大运行时错误。
- CMS/Drupal API 返回结构变更时不容易提前发现。

建议：

1. 不要求一次性清零 `any`。
2. 先从核心边界治理：
   - `IPage`
   - `IBuilderComponent`
   - 用户 token/profile
   - JSON:API response
   - dynamic component input
3. 新增或修改核心服务时禁止继续扩大 `any`。

验收标准：

- 核心服务新增代码无裸 `any`。
- 主要 CMS response 有类型定义。

处理进展：

- 已新增通用 JSON/CSS 类型边界，覆盖 `JsonValue`、`JsonObject`、动态组件 class/style 输入。
- 已阶段性收口 `IPage`、`IBuilderComponent`、Builder 抽屉内容、动态组件输入、JSON editor 数据输入。
- 已为 OAuth token、账号 profile、Drupal 用户列表、JSON:API response 增加明确接口。
- 已将 `ContentService` 的页面 JSON、Builder/UIUX 配置、GitHub repository 返回值和 `UserService` 的登录、用户资料、OTP、头像上传等核心 API 方法改为显式类型。
- 剩余 `any` 主要集中在 widget/combs 配置工厂、历史 Formly 表单配置、通用 node/manage 服务和部分模板 `$any()`，建议按组件族分批治理。

### 12. 动画 IntersectionObserver 存在清理问题

相关位置：

- `src/app/core/service/utilities.service.ts`
- `src/app/modules/page/page/page.component.ts`

问题：

- `intersectionObserver()` 每次调用都创建新的 `IntersectionObserver`。
- 没有 disconnect。
- 页面渲染或导航频繁时可能重复观察相同元素。

建议：

1. 由调用组件持有 observer 生命周期。
2. 或在 service 中缓存 observer，并提供 `disconnectAnimateObserver()`。
3. 动态内容重渲染时先清理再重新 observe。

验收标准：

- 长页面多次导航后 observer 数量不会持续增加。

处理进展：

- 已将 `UtilitiesService.intersectionObserver()` 改为返回 `disconnect` 清理函数。
- `PageComponent`、`PreviewComponent`、`BuilderListComponent` 已在重新观察前断开旧 observer，并在组件销毁时清理。
- `BuilderListComponent` 的页面切换延迟重扫已清理 pending timer，避免组件销毁后继续触发观察。

### 13. 静态资源发布体积偏大

相关位置：

- `angular.json`
- `package.json`

问题：

- `node_modules/monaco-editor` 整包复制到 assets，体积约 98MB。
- `material-design-icons` 依赖体积约 356MB。

建议：

1. Monaco 只复制实际需要的 worker 和 minified assets。
2. 前台运行时不加载 Monaco。
3. 图标体系优先使用 SVG icon set 或 Material Symbols 子集。
4. 增加 bundle analyzer 报告。

验收标准：

- 前台首屏 bundle 不包含编辑器资源。
- assets 产物体积显著下降。

处理进展：

- 已将 `angular.json` 中 Monaco 资源复制范围从整个 `node_modules/monaco-editor` 缩小到 `node_modules/monaco-editor/min/vs`，保留 `ngx-monaco-editor-v2` 默认需要的 `/assets/monaco/min/vs/loader.js` 路径。
- 已通过 `provideMonacoEditor({ baseUrl: 'assets' })` 提供应用级 Monaco 配置，确保动态创建的 `CodeEditorComponent` 也能注入 `NGX_MONACO_EDITOR_CONFIG`。
- 已移除 `material-design-icons` 依赖，不再为 Material Icons 字体安装 356MB 整包。
- 已将 Material Icons ligature 字体所需的 `woff2/woff` 放入 `src/assets/fonts/material-icons`，并新增项目内 `@font-face`，CMS 下发的 `icon.name` 仍可通过字体 ligature 渲染。
- 已保留 `/assets/mdi.svg` 和 `/assets/icons/icons.svg` 图标集注册，CMS 下发的 `icon.svg` 仍按原 `MatIconRegistry` 协议解析。
- 当前 Monaco 发布资源源目录约从 98MB 降到 14MB，Material Icons 运行时字体约 104KB。

## 推荐实施顺序

### 第一阶段：发布链路修复

目标：让项目可稳定构建、启动、部署。

任务：

1. 修复 Docker CMD。
2. 修复 SSR 端口优先级。
3. 修复 CI `npm ci over npm`。
4. 排查 `Abort trap: 6` 构建崩溃。
5. 增加构建和 SSR smoke test。

### 第二阶段：模块边界和性能

目标：前台 runtime 与 builder/editor 解耦。

任务：

1. 拆分 runtime dynamic components。
2. 移除 PageModule 对 BuilderModule 的依赖。
3. 确认 `/builder` 仍为 lazy route。
4. 降低 Monaco 和编辑器资源对前台影响。

### 第三阶段：认证与安全治理

目标：降低 token 泄露和动态脚本风险。

任务：

1. token 存储方案评估与迁移计划。
2. custom-template JS 权限、审计和发布流程治理。
3. 增强 CSP 策略。
4. 审计所有动态 HTML 渲染点。

### 第四阶段：工程质量治理

目标：降低长期维护成本。

任务：

1. 完成 Angular CLI `ng test` 与 Vitest 的官方入口收敛。
2. 分批修复旧组件 spec，确保所有保留的 spec 都在 CI 中执行。
3. 建立核心类型边界。
4. 分阶段收紧 ESLint 规则。

## 建议建立的质量门禁

- PR 必须通过 `npm run lint`。
- PR 必须通过 production build。
- 主分支部署前必须执行 SSR smoke test。
- 新增 API 参数拼接必须使用统一工具。
- 新增认证相关代码必须明确 token 存储边界。
- 新增 `[innerHTML]` 或动态脚本能力必须说明清洗和权限策略。

## 风险分级表

| 优先级 | 问题 | 风险类型 | 建议处理时间 |
| --- | --- | --- | --- |
| P0 | 生产构建失败 | 发布阻塞 | 立即 |
| P0 | Docker SSR 启动入口错误 | 部署阻塞 | 立即 |
| P0 | CI 安装命令不规范 | 部署可靠性 | 立即 |
| P1 | PageModule 依赖 BuilderModule | 架构/性能 | 近期 |
| P1 | token 存储安全边界弱 | 安全 | 近期 |
| P1 | custom-template 执行 JS | 安全/治理 | 近期 |
| P1 | SSR 多语言 builder 路由遗漏 | SSR 稳定性 | 近期 |
| P1 | 配置失败 guard 可能崩溃 | 稳定性 | 近期 |
| P2 | query string 手工拼接 | 正确性 | 迭代治理 |
| P2 | 测试入口与覆盖范围不一致 | 工程质量 | 迭代治理 |
| P2 | `any` 过多 | 可维护性 | 迭代治理 |
| P2 | observer 未清理 | 性能/内存 | 迭代治理 |
| P2 | 静态资源体积偏大 | 性能 | 迭代治理 |

## 后续拆分建议

建议先拆 5 个独立任务：

1. `fix-deploy-runtime`：修复 Docker、PORT、CI install。
2. `investigate-prod-build-crash`：定位并修复 `Abort trap: 6`。
3. `split-runtime-builder-modules`：拆分 Page runtime 与 Builder editor。
4. `harden-auth-token-storage`：认证 token 存储安全方案设计和落地。
5. `govern-custom-template-js`：自定义 JS 权限、审计、CSP 和发布流程治理。
