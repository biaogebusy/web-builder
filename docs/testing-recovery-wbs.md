# 单元测试体系修复 WBS · 开工顺序 · 进度记录

> 目标:让 `npm test`(`@angular/build:unit-test` + Vitest)在 **master** 分支全量绿,可作为 CI 门禁。
> 背景:standalone 迁移(2026-05-20)与测试框架切换到 Angular 官方 vitest builder 后,存量 spec 存在编译阻塞与大量缺 fixture 的脚手架测试(`should create` 因 NG0201 缺 provider / NG0950 缺必填输入失败)。修复方法论已在 pro 分支完成单模块打样验证(17 个 spec 文件、27 个用例全绿),本文档将该模式推广到 master 全仓。

- 状态:T0–T7 已完成(`npm test` 全量绿,CI 门禁已接入);T8 随迭代持续
- 日期:2026-07-25
- 适用分支:master(基线状态均经 `git show/grep master:` 核实)

---

## 0. 现状基线(master,2026-07-25 核实)

**已知编译阻塞(2 个,任一存在则 `npm test` 完全无法运行)**:

1. `src/app/core/service/node.service.media.spec.ts` — `vi.fn((url: string) => ...)` 只声明 1 个参数,断言却访问 `mock.calls[0][2]`,类型检查报 TS2493/TS2352。修法(已在 pro 验证):签名补全为 `vi.fn((url: string, _body?: unknown, _options?: unknown) => ...)`。
2. `src/server/**` 3 个 node 环境 spec(request-timing / ssr-cache-policy / ssr-html-cache)被打进浏览器平台 bundle,`node:crypto` 无法解析。修法(已在 pro 验证):`angular.json` test target 增加 `"exclude": ["src/server/**"]`,这些 spec 由 `vitest.config.ts` 通道覆盖。

**无历史包袱项(已核实)**:master 的 spec 中无 jasmine API 残留、无 TestBed `declarations:` 旧写法。

**双跑通道现状**:`npm test`(全量 `src/**/*.spec.ts`)与 `npm run test:vitest`(根 `vitest.config.ts` 精选清单)并存,清单中 core/util、comment 服务、`node.service.media`、`BuilderState`、builder/factory、edit-branding、page-setting、code-editor、custom-template、article、dynamic-component 等与 `npm test` 重复覆盖,仅 `src/server/**` 是其独有职责。

**全量失败数字**:未知,待 T2 首跑产出。预期失败类型与 pro 侧观察一致:脚手架 spec 缺 provider(NG0201)、缺必填输入(NG0950)、mock 缺方法(TypeError)。

---

## 1. Ticket 拆分

> 优先级 P0/P1/P2 = 必做 / 强烈推荐 / 可推迟。T3–T6 工时为估算,待 T2 归类清单出来后校准。
> 状态标记:☐ 待办 / ◐ 进行中 / ☑ 完成。

| ID | 标题 | 工时 | 优先级 | 依赖 | DoD |
|---|---|---|---|---|---|
| T0 ☑ | 解除编译阻塞并提交:① `node.service.media.spec.ts` vi.fn 签名补全;② `angular.json` 排除 `src/server/**`;③ 提交本文档 | 0.5h | P0 | — | `npm test` 能完整构建并运行到底(允许用例失败);pre-commit lint-staged 通过 |
| T1 ☑ | 收敛双测试体系:`vitest.config.ts` 的 `test.include` 缩减到 `src/server/**/*.spec.ts`,其余全部交给 `npm test`;脚本可改名 `test:server` 更达意;CLAUDE.md 补一行两通道分工说明 | 0.5d | P0 | T0 | 两通道无重复覆盖;`npm test` + `npm run test:vitest` 先后执行覆盖全部 spec 且互不遗漏 |
| T2 ☑ | 全量基线重跑 + 失败归类:`npm test` 完整跑一次,按模块统计失败文件/用例数与失败类型(NG0201 / NG0950 / TypeError / 其他),登记到附录 A | 0.5d | P0 | T0 | 附录 A 有按模块的失败清单与归因;T3–T6 工时据此校准 |
| T3 ☑ | builder 模块 fixture(`modules/builder/`:toolbar、main、sidebar、preview、node、factory) | ~1.5d | P1 | T2 | 该目录 `--include` 运行全绿;共享 mock 放 `modules/builder/testing/` |
| T4 ☑ | manage 模块 fixture(`modules/manage/`) | ~1d | P1 | T2 | 同上,目录全绿 |
| T5 ☑ | uiux fixture(`uiux/combs/` + `uiux/widgets/`) | ~2d | P1 | T2 | 同上,目录全绿;widget 级共享 mock 优先复用 core 服务 mock |
| T6 ☑ | core 服务与剩余散点(`core/`、`modules/user/`、`modules/page/` 等) | ~1d | P1 | T2 | `npm test` 全量 0 失败 |
| T7 ☑ | CI 门禁接入:`npm test` 进 CI;若 T3–T6 未完,可先以 `--include` 锁已绿目录防回归,随模块转绿逐步扩大 | 0.5d | P0 | T0(最小门禁)/ T6(全量门禁) | CI 红灯可阻断合并;门禁范围在 CI 配置中有注释说明 |
| T8 ☐ | 行为测试深化(不急,随迭代做):builder 工具栏交互、manage 内容管理流程等核心路径补行为断言;仓内已有范式:`page-setting.component.fields/payload.spec.ts`、`edit-branding/**.spec.ts`(局部 mock + 行为断言) | 持续 | P2 | 对应模块绿 | 核心交互路径有行为断言,不止 should create |

---

## 2. 开工顺序

```
T0(解除阻塞+提交)─→ T1(收敛双体系)─→ T2(基线归类)─┬→ T3 builder ─┐
                                                    ├→ T4 manage  ─┤─→ T6 收尾 ─→ T7 全量门禁
                                                    └→ T5 uiux    ─┘
T7 最小门禁(仅已绿目录)可在 T0 后立刻做,不必等 T3–T6
T8 独立,随时可插
```

---

## 3. Fixture 推广模式(操作手册)

> 模式已在 pro 分支单模块打样验证。核心思想:每个模块建一个共享 mock 工厂,把组件树**创建期**会触达的服务与令牌一次性 mock 掉,脚手架 spec 统一为最小形态。

1. **汇总依赖**:对目标模块所有组件 grep 注入与必填输入。注意泛型写法 `inject<Observable<...>>(TOKEN)` 会被 `inject\(` 漏掉,pattern 用 `inject[<(]`:
   ```bash
   grep -rnE "= inject[<(]|input\.required" src/app/modules/<module> --include="*.ts"
   ```
   再 grep `this.<svc>\.` 成员调用,确定各 mock 需要的方法 / Subject / signal 面。
2. **建共享工厂**:`<module>/testing/mocks.ts` 导出 `provideXxxMocks(): Provider[]`。mock 形状约定:方法用 `vi.fn()`(返回流的用 `vi.fn(() => of({}))`)、流属性用 `new Subject()`、signal 型用 `() => 值`;令牌给惰性值(如 `USER: signal(false)`、`CORE_CONFIG: {}`、`BRANDING: of({})`、`PAGE_CONTENT: signal(undefined)`、`BUILDER_CONFIG: of({})`、`API_URL: ''`)。常需覆盖的服务:BuilderState、ScreenState、ContentState、NodeService、ApiService、BuilderService、ContentService、UserService、UtilitiesService、RouteService、ngx-webstorage(Local/Session)、MatDialog、BreakpointObserver。
3. **spec 统一形态**:
   ```ts
   await TestBed.configureTestingModule({
     imports: [XxxComponent],
     providers: [provideRouter([]), ...provideXxxMocks()],
   }).compileComponents();
   fixture = TestBed.createComponent(XxxComponent);
   ```
   不显式调 `detectChanges()`(zoneless 自动变更检测会渲染模板并跑完整生命周期)。
4. **必填输入**:`createComponent` 后立即 `fixture.componentRef.setInput('content', 最小合法值)`,再进入断言。
5. **jsdom 跑不动的 DOM/图形库**(echarts、swiper、video.js、monaco、quill 等):优先用服务开关绕开(mock 里 `isPlatformBrowser: () => false`);绕不开的在 spec 顶部 `vi.mock('库名', () => ...)` 换掉本体。
6. **迭代收敛**:跑目标目录,按错误补 mock,通常 2–3 轮:
   ```bash
   npx ng test --no-watch --include='src/app/modules/<module>/**/*.spec.ts'
   ```
   - `NG0201 No provider found for X. Path: A -> B` → 给 **A**(链条最上游的直接依赖)补 mock,不要顺着链条提供真实服务
   - `TypeError: x.y is not a function` → 对应 mock 补方法
   - `NG0950 Input is required` → 补 `setInput`
7. **需要断言 mock 的行为测试**:不用共享工厂,自建局部 mock 并覆盖同名 provider(工厂顶部注释写明此约定)。

---

## 4. 已知坑(打样阶段踩过,推广时会再遇到)

1. **TestBed `declarations` 放独立组件直接报错** → 一律用 `imports`(本仓已全 standalone)。
2. **jasmine → vitest API 对照**(写新测试勿带旧习惯):`jasmine.createSpyObj` → 普通对象 + `vi.fn()`;`.and.returnValue/.and.callFake/.and.resolveTo` → `.mockReturnValue/.mockImplementation/.mockResolvedValue`;`spy.calls.count()` → `spy.mock.calls.length`;`jasmine.objectContaining` → `expect.objectContaining`;`toBeTrue()` → `toBe(true)`;`spyOn` → `vi.spyOn`。
3. **vitest(tinyspy)在实现函数执行完才记录调用**(jasmine 是先记录):mock 实现内部依据"第几次调用"分支时,用局部计数器,别读 `mock.calls.length`。
4. **`ReadableStream` 的 `enqueue` 后立即 `controller.error()` 会清空队列**,已入队 chunk 丢失:需要"先给数据再断流"的流测试场景用 `pull` 分两步。
5. **类型检查覆盖 `tsconfig.spec.json` 全量 spec**,`--include/--exclude` 只影响运行集:任何一个 spec 编译错都阻塞所有测试。修某模块前先保证 `npx tsc --noEmit -p tsconfig.spec.json` 全仓干净。
6. **zoneless 下 `createComponent` 即自动渲染模板**:模板里 widget(app-btn 等)的依赖链(如 `RouteService → ActivatedRoute`)会立刻求值,共享 mock 需覆盖;必填输入必须在 `createComponent` 后同步 `setInput`。
7. **组合式工厂/工具函数(`useXxx()` 形态)内部也会 `inject()`**,组件注入字段面看不到:NG0201 报的 token 找不到直接注入点时,查工厂函数内部。
8. **水合 HttpTransferCache 同步回放响应**(本仓 `app.config.ts` 已启用 `provideClientHydration(withHttpTransferCacheOptions)`):`computed` 求值路径里发起的订阅若同步 `next` 并写 signal → NG0600。副作用启动处包 `untracked()`。纯 dev 环境响应异步不报错,勿以 dev 表现判断安全。
9. **服务端 spec(依赖 `node:crypto` 等 node 内建模块)不能进浏览器平台 bundle**:归 `vitest.config.ts` 通道,`angular.json` test target 里保持 exclude(T0/T1 落实)。

---

## 附录 A. 全量失败归类清单(T2 产出,2026-07-25 基线)

> 基线:`npm test` 全量 197 个 spec 文件(115 失败 / 82 通过),293 个用例(121 失败 / 172 通过)。耗时约 8 分钟。
> 注:`src/server/**` 3 个文件 15 个用例由 `npm run test:server` 通道覆盖,全绿,不计入本表。

| 模块 | 失败文件数 | 失败用例数 | 主要失败类型 | 备注 |
|---|---|---|---|---|
| uiux/combs | 43 | 44 | NG0201×29、NG0950×10、其他×5 | 其他 5 个为行为断言失败(search 跳转 spy ×2)、表单控件缺 name、mock 缺 valueChanges、formly viewType 未注册 |
| uiux/widgets | 29 | 30 | NG0201×23、NG0950×7 | — |
| modules/builder | 24 | 26 | NG0201×25、NG0950×1 | — |
| core | 12 | 14 | NG0201×13、NG0950×1 | branding(header/footer/menu)组件为主 |
| modules/user | 3 | 3 | NG0201×3 | — |
| modules/manage | 3 | 3 | NG0201×3 | — |
| modules/page | 1 | 1 | NG0201×1 | — |
| **合计** | **115** | **121** | NG0201×97、NG0950×19、其他×5 | — |

**缺失 provider Top 榜(NG0201 报错计数)**:`CORE_CONFIG`×69、`API_URL`×56、`USER`×16、`ActivatedRoute`×12、`BUILDER_PAGE`(builder page)×8、`HttpClient`×7、`BRANDING`(branding config)×7、`BUILDER_UIUX_DATA`×2、`BUILDER_CONFIG`×2、`DEBUG_ANIMATE`×2、`CURRENT_THEME`×2、`MAT_DIALOG_DATA`×2。
→ 印证第 3 节共享 mock 工厂策略:一个覆盖 core 令牌 + 常用服务的基础工厂可消解绝大多数 NG0201。

---

## 5. 进度记录

- **2026-07-25**:初版(master 视角)。基线经 git 核实:2 个编译阻塞待 T0 解除;无 jasmine / declarations 历史包袱;方法论已在 pro 分支打样验证。T0–T8 待办。
- **2026-07-25**:T0 完成。除文档所列 2 项外,实际另有 3 个 Formly mock cast 类型错误(`getAnimate.spec` / `getComponentSetting.spec` / `page-setting.component.fields.spec`,TS2352/TS2322)一并修复;`npx tsc --noEmit -p tsconfig.spec.json` 全仓干净;`npm test` 可完整运行。
- **2026-07-25**:T1 完成。`vitest.config.ts` include 收敛为 `src/server/**/*.spec.ts`;脚本 `test:vitest` 改名 `test:server`(3 文件 15 用例全绿);CLAUDE.md 已补两通道分工。
- **2026-07-25**:T2 完成。全量基线:197 文件(115 失败/82 通过)、293 用例(121 失败/172 通过);归类见附录 A,NG0201 占 97/121,与共享 mock 工厂策略假设一致。
- **2026-07-25**:T3 完成。新增基础工厂 `src/app/core/testing/mocks.ts`(`provideCoreMocks()`:core 令牌 + BuilderState/ScreenState/ScreenService(平台开关短路)/Node/Api/Builder/Content/User/Route/Tags/Manage/Utilities + webstorage + MatDialog/SnackBar + BreakpointObserver + HttpClientTesting 兜底 + TranslateModule.forRoot)与 `modules/builder/testing/mocks.ts`(`provideBuilderMocks()` = core + TourService);24 个脚手架 spec 重写为规范形态,builder 目录一轮全绿(34 文件/63 用例)。
- **2026-07-25**:T4 完成。manage 3 个 spec 直接复用 `provideCoreMocks()`(StripTagsPipe 为组件级 provider,无需模块工厂),目录全绿。
- **2026-07-25**:T5 完成。新增 `src/app/uiux/testing/mocks.ts`(`provideUiuxMocks()` = core + ConfigService/AmapService;FormService/DialogService/CalendarState 依赖已被 core mock 覆盖,保留真实实例)。70 个脚手架 spec 重写(formly FieldType 子类注入最小 field 配置;datepicker/terms-service 给配对的 FormGroup 与 key);search spec 的 getLang 断言过时(组件已改用 `NodeService.resolveLangCode`),按现行为重写;img spec 保留行为断言仅补 providers。uiux 目录一轮全绿(123 文件/146 用例)。
- **2026-07-25**:T6 完成。branding(header/footer/menu 树)+ user + page 共 16 个 spec 重写(menu 系 content 给 `child: []`,inverse 给 `footerNewsletter.params`)。**`npm test` 全量 0 失败:198 文件/291 用例全绿**;`npm run test:server` 3 文件/15 用例全绿。
- **2026-07-25**:T7 完成(全量门禁)。`master.yml` 在 build 前插入 `npm test` + `npm run test:server`(红灯中止构建与部署);新增 `.github/workflows/test.yml` 于 PR 上跑同两通道,配合分支保护 Required status check 可阻断合并(分支保护需在 GitHub 仓库设置中启用)。
- 剩余:T8(P2,行为测试深化)随迭代持续进行;新组件脚手架 spec 请直接套用第 3 节规范形态与对应模块工厂。
