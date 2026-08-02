import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  EnvironmentProviders,
  importProvidersFrom,
  Provider,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { vi } from 'vitest';

import { IPage } from '@core/interface/IAppConfig';
import { ApiService } from '@core/service/api.service';
import { BuilderService } from '@core/service/builder.service';
import { ContentService } from '@core/service/content.service';
import { ManageService } from '@core/service/manage.service';
import { NodeService } from '@core/service/node.service';
import { RouteService } from '@core/service/route.service';
import { ScreenService } from '@core/service/screen.service';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { ScreenState } from '@core/state/screen/ScreenState';
import {
  API_URL,
  BRANDING,
  BUILDER_CONFIG,
  BUILDER_CURRENT_PAGE,
  BUILDER_FULL_SCREEN,
  CORE_CONFIG,
  DEBUG_ANIMATE,
  LANG,
  MEDIA_ASSETS,
  NOTIFY_CONTENT,
  PAGE_CONTENT,
  THEME,
  UIUX,
  USER,
} from '@core/token/token-providers';

/**
 * 脚手架(should create)spec 的共享 mock 工厂。
 *
 * 约定(见 docs/testing-recovery-wbs.md 第 3 节):
 * - 方法一律 `vi.fn()`,返回流的用 `vi.fn(() => of(...))`;流属性用 `new Subject()`;
 *   signal 型用 `signal(值)`;令牌给惰性最小值。
 * - 需要"断言 mock 调用"的行为测试请勿依赖本工厂的实例:自建局部 mock,
 *   并在 `providers` 数组中排在 `...provideCoreMocks()` 之后覆盖同名 provider。
 */

export const createScreenServiceMock = () => ({
  // 统一按服务端环境短路,绕开 echarts/swiper/video.js 等 jsdom 跑不动的初始化
  isPlatformServer: vi.fn(() => true),
  isPlatformBrowser: vi.fn(() => false),
  isElementInViewport: vi.fn(() => false),
  isElementOutTopViewport: vi.fn(() => false),
  isElementOutBottomViewport: vi.fn(() => false),
  scrollToAnchor: vi.fn(),
  gotoTop: vi.fn(),
  initSidebarStyle: vi.fn(),
});

export const createScreenStateMock = () => ({
  scroll$: new BehaviorSubject<boolean>(true),
  drawer$: new Subject<void>(),
  stickyMenu$: new Subject<void>(),
  displayNameMap: new Map<string, string>(),
  initScreen: vi.fn(),
  mqAlias$: vi.fn(() => of([] as string[])),
  eq: vi.fn(() => false),
  initBrowserEvents: vi.fn(),
  toggleDrawer: vi.fn(),
});

export const createBuilderStateMock = () => ({
  fixedShowcase: signal(false),
  fixedContent: signal(null),
  currentShowcase: signal(false),
  themeMode: signal<'light' | 'dark'>('light'),
  rightContent$: new Subject<unknown>(),
  closeRightDrawer$: new Subject<boolean>(),
  fixedChange$: new Subject<boolean>(),
  animateDisable$: new Subject<boolean>(),
  fullScreen$: new Subject<boolean>(),
  debugAnimate$: new Subject<boolean>(),
  selectedMedia$: new Subject<unknown>(),
  switchPreview$: new Subject<'xs' | 'sm' | 'md' | 'xs-md' | 'none'>(),
  revealCode$: new Subject<string>(),
  pendingPageLoad: signal(null),
  loading: signal(false),
  updateSuccess$: new Subject<boolean>(),
  COPYCOMPONENTKEY: 'cck',
  COPYWIDGETKEY: 'cwk',
  version: signal<IPage[]>([]),
  versionKey: 'version',
  editingCodePath: signal(null),
  currentPage: { title: '', body: [] },
  queuePageLoad: vi.fn(),
  consumePageLoad: vi.fn((): unknown => null),
  showcase: vi.fn(),
  deleteLocalPage: vi.fn(),
  deleteLocalPageByPage: vi.fn(),
  markPageSynced: vi.fn(),
  markCurrentPageDirty: vi.fn(),
  clearAllHistory: vi.fn(),
  saveLocalVersions: vi.fn(),
  initPage: vi.fn(),
  showVersionPage: vi.fn(),
  updatePage: vi.fn(),
  setCurrentPage: vi.fn(),
  getArrsByPath: vi.fn(() => []),
  moveComponent: vi.fn(),
  pushComponent: vi.fn(),
  deleteComponent: vi.fn(),
  targetIndex: vi.fn(() => 0),
  bulkUpdateComponent: vi.fn(),
  updatePageContentByPath: vi.fn(),
  onDrop: vi.fn(),
  dropComponent: vi.fn(),
  transferComponent: vi.fn(),
  loadNewPage: vi.fn(),
  showComponentSetting: vi.fn(),
  cancelFixedShowcase: vi.fn(),
  getAllComponents: vi.fn(() => []),
  getRandomElements: vi.fn(() => []),
  renderMarkers: vi.fn(),
  onNewPage: vi.fn(),
  switchVersion: vi.fn(),
  editorCode: vi.fn(),
});

export const createUtilitiesServiceMock = () => ({
  getLibraries: vi.fn(() => of(true)),
  openSnackbar: vi.fn(),
  loadScript: vi.fn(() => Promise.resolve()),
  loadScriptWithoutAmd: vi.fn(() => Promise.resolve()),
  loadStyle: vi.fn(() => Promise.resolve()),
  copy: vi.fn(),
  intersectionObserver: vi.fn(() => () => {}),
});

export const createApiServiceMock = () => ({
  configLoadDone$: new Subject<void>(),
  http: {
    get: vi.fn(() => of({})),
    post: vi.fn(() => of({})),
    patch: vi.fn(() => of({})),
    delete: vi.fn(() => of({})),
  },
  optionsWithBearerToken: vi.fn(() => ({})),
  getToken: vi.fn(() => of('')),
  getLang: vi.fn(() => undefined),
  getUrlPath: vi.fn(() => ({ lang: '', path: '/' })),
  getParams: vi.fn(),
  getDeepValue: vi.fn(),
  getApiParams: vi.fn(() => ''),
  handlePager: vi.fn(() => ({})),
});

export const createNodeServiceMock = () => ({
  fetch: vi.fn((): Observable<any> => of({ rows: [], pager: {} })),
  resolveLangCode: vi.fn(() => undefined),
  getNodeByLink: vi.fn((): Observable<any> => of({})),
  getNodes: vi.fn((): Observable<any> => of({ rows: [], pager: {} })),
  batchDeleteNodes: vi.fn(() => of([])),
  deleteEntity: vi.fn(() => of({})),
  addEntity: vi.fn(() => of({})),
  getEntityType: vi.fn(() => ''),
  getNodePath: vi.fn(() => ''),
  addComment: vi.fn(() => of({})),
  updateComment: vi.fn(() => of({})),
  replyComment: vi.fn(() => of({})),
  getCommentType: vi.fn(() => ''),
  getCommentRelEntityId: vi.fn(() => ''),
  getCommentsParams: vi.fn(() => ''),
  getCommentsPidParams: vi.fn(() => ''),
  handleComment: vi.fn(),
  getCommentsWitchChild: vi.fn(() => of({})),
  getCustomApiComment: vi.fn(() => of({})),
  deleteFlagging: vi.fn(() => of({})),
  checkReqRule: vi.fn(() => false),
  checkNodeAccess: vi.fn(() => of({})),
  uploadImage: vi.fn(() => of({})),
  createMediaImage: vi.fn(() => of(undefined)),
  imageHandler: vi.fn(),
});

export const createBuilderServiceMock = () => ({
  loadPage: vi.fn(() => of({})),
  loadPageJSON: vi.fn(),
  checkIsLatestPage: vi.fn(),
  loadNodeJson: vi.fn(),
  createLandingPage: vi.fn(() => of({})),
  updateLandingPage: vi.fn(() => of({})),
  getDefaultPage: vi.fn(() => of({ title: '', body: [] })),
  addTranslation: vi.fn(() => of({})),
  checkTranslationExists: vi.fn(() => of(false)),
  updateAttributes: vi.fn(() => of({})),
  updateUrlalias: vi.fn(() => of({})),
  openPageSetting: vi.fn(),
  addBlock: vi.fn(),
});

export const createContentServiceMock = () => ({
  pageUrl: '/',
  updatePage: vi.fn(),
  loadPageContent: vi.fn(() => of({ title: '', body: [] })),
  getCachedPageContent: vi.fn(() => undefined),
  logContent: vi.fn(),
  loadBranding: vi.fn(() => of({})),
  loadConfig: vi.fn(() => Promise.resolve()),
  loadUIUX: vi.fn(() => of([])),
  loadBuilderConfig: vi.fn(() => of({})),
  setBodyClasses: vi.fn(),
  getRepository: vi.fn(() => of({})),
});

export const createUserServiceMock = () => ({
  userSub$: new Subject<unknown>(),
  login: vi.fn(),
  openLoginDialog: vi.fn(),
  startAuthorize: vi.fn(() => Promise.resolve()),
  processTokenAndLogin: vi.fn(() => of(false)),
  updateUser: vi.fn(),
  editingUser: vi.fn(() => of({})),
  getStoredUser: vi.fn(() => null),
  applyRefreshedToken: vi.fn(() => null),
  refreshAccessToken: vi.fn(() => of(null)),
  refreshLocalUser: vi.fn(),
  checkShow: vi.fn(() => true),
  loginUser: vi.fn(),
  logoutUser: vi.fn(),
  logout: vi.fn(),
  getCode: vi.fn(() => of({})),
  loginByPhone: vi.fn(() => of({ ok: true })),
  getUserConfig: vi.fn(() => of({})),
  getUserById: vi.fn(() => of({ data: [] })),
  getUser: vi.fn(() => of({ data: [] })),
  getCurrentUserProfile: vi.fn(() => of({})),
  getAuthHeader: vi.fn(() => ({})),
  getCurrentUserById: vi.fn(() => of({})),
  setUserCookie: vi.fn(),
  getLoginState: vi.fn(() => of(false)),
  uploadUserPicture: vi.fn(() => of({})),
});

export const createRouteServiceMock = () => ({
  updateQueryParams: vi.fn(),
  toNavigate: vi.fn(),
  eventLinkToNav: vi.fn(),
  isAbsolute: vi.fn(() => false),
});

export const createTagsServiceMock = () => ({
  setTitle: vi.fn(),
  addMeta: vi.fn(),
  updateMeta: vi.fn(),
  updateTags: vi.fn(),
});

export const createManageServiceMock = () => ({
  mediaDialogClass: [],
  deleteMedia: vi.fn(() => of({})),
  updateMediaName: vi.fn(() => of({})),
  getUrlIncluded: vi.fn(() => ''),
  handlerJsonApiParams: vi.fn(() => ({ type: '', params: '' })),
});

export const createStorageServiceMock = () => ({
  retrieve: vi.fn(() => null),
  store: vi.fn(),
  clear: vi.fn(),
  observe: vi.fn(() => new Subject()),
});

export const createMatDialogMock = () => ({
  open: vi.fn(() => ({
    afterClosed: vi.fn(() => of(undefined)),
    afterOpened: vi.fn(() => of(undefined)),
    close: vi.fn(),
    componentInstance: {},
  })),
  closeAll: vi.fn(),
  openDialogs: [],
  getDialogById: vi.fn(() => undefined),
});

export const createMatDialogRefMock = () => ({
  close: vi.fn(),
  afterClosed: vi.fn(() => of(undefined)),
  afterOpened: vi.fn(() => of(undefined)),
  backdropClick: vi.fn(() => new Subject()),
  keydownEvents: vi.fn(() => new Subject()),
});

export const createMatSnackBarMock = () => ({
  open: vi.fn(),
  openFromComponent: vi.fn(),
  dismiss: vi.fn(),
});

export const createBreakpointObserverMock = () => ({
  observe: vi.fn(() => of({ matches: false, breakpoints: {} })),
  isMatched: vi.fn(() => false),
});

/**
 * 核心令牌 + 常用单例服务的一揽子 mock。
 * 典型用法:
 * ```ts
 * await TestBed.configureTestingModule({
 *   imports: [XxxComponent],
 *   providers: [provideRouter([]), ...provideCoreMocks()],
 * }).compileComponents();
 * ```
 */
export function provideCoreMocks(): (Provider | EnvironmentProviders)[] {
  return [
    // 未被 mock 覆盖的真实服务(如 ConfigCheckService)兜底用的 HttpClient 测试后端
    provideHttpClient(),
    provideHttpClientTesting(),
    importProvidersFrom(TranslateModule.forRoot()),
    // tokens
    { provide: API_URL, useValue: '' },
    { provide: CORE_CONFIG, useValue: {} },
    { provide: BRANDING, useValue: of({}) },
    { provide: PAGE_CONTENT, useValue: signal(undefined) },
    { provide: LANG, useValue: { label: 'English', langCode: 'en', default: true } },
    { provide: THEME, useValue: 'light' },
    { provide: USER, useValue: signal(false) },
    { provide: NOTIFY_CONTENT, useValue: signal(false) },
    { provide: MEDIA_ASSETS, useValue: signal(false) },
    { provide: BUILDER_CONFIG, useValue: of({}) },
    { provide: BUILDER_CURRENT_PAGE, useValue: signal(undefined) },
    { provide: DEBUG_ANIMATE, useValue: signal(false) },
    { provide: BUILDER_FULL_SCREEN, useValue: signal(false) },
    { provide: UIUX, useValue: of([]) },
    // states & services
    { provide: BuilderState, useValue: createBuilderStateMock() },
    { provide: ScreenState, useValue: createScreenStateMock() },
    { provide: ScreenService, useValue: createScreenServiceMock() },
    { provide: UtilitiesService, useValue: createUtilitiesServiceMock() },
    { provide: ApiService, useValue: createApiServiceMock() },
    { provide: NodeService, useValue: createNodeServiceMock() },
    { provide: BuilderService, useValue: createBuilderServiceMock() },
    { provide: ContentService, useValue: createContentServiceMock() },
    { provide: UserService, useValue: createUserServiceMock() },
    { provide: RouteService, useValue: createRouteServiceMock() },
    { provide: TagsService, useValue: createTagsServiceMock() },
    { provide: ManageService, useValue: createManageServiceMock() },
    { provide: LocalStorageService, useValue: createStorageServiceMock() },
    { provide: SessionStorageService, useValue: createStorageServiceMock() },
    { provide: MatDialog, useValue: createMatDialogMock() },
    { provide: MatDialogRef, useValue: createMatDialogRefMock() },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatSnackBar, useValue: createMatSnackBarMock() },
    { provide: BreakpointObserver, useValue: createBreakpointObserverMock() },
  ];
}
