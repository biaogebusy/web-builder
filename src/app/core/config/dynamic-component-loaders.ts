import type { Type } from '@angular/core';

export type ComponentLoader = () => Promise<Type<unknown>>;

const loadBaseWidgets = () => import('@uiux/widgets/dynamic-widgets');
const loadCardWidgets = () => import('./dynamic-components/widgets-card');
const loadContentWidgets = () => import('./dynamic-components/widgets-content');
const loadUtilityWidgets = () => import('./dynamic-components/widgets-utility');
const loadChart = () => import('./dynamic-components/chart');
const loadCarousel = () => import('./dynamic-components/carousel');
const loadHero = () => import('./dynamic-components/hero');
const loadList = () => import('./dynamic-components/list');
const loadMap = () => import('./dynamic-components/map');
const loadNodeLight = () => import('./dynamic-components/node-light');
const loadNodeContent = () => import('./dynamic-components/node-content');
const loadForm = () => import('./dynamic-components/form');
const loadOtherLight = () => import('./dynamic-components/other-light');
const loadProfile = () => import('./dynamic-components/profile');
const loadShowcase = () => import('./dynamic-components/showcase');
const loadTab = () => import('./dynamic-components/tab');
const loadVideo = () => import('./dynamic-components/video');
const loadDashboard = () => import('./dynamic-components/dashboard');
const loadBuilder = () => import('./dynamic-components/builder');
const loadManage = () => import('./dynamic-components/manage');
const loadUser = () => import('./dynamic-components/user');

/* eslint-disable quote-props -- component type keys mirror CMS values */
export const DYNAMIC_COMPONENT_LOADERS: Readonly<Record<string, ComponentLoader>> = {
  bg: () => loadBaseWidgets().then(m => m.BgComponent),
  img: () => loadBaseWidgets().then(m => m.ImgComponent),
  box: () => loadBaseWidgets().then(m => m.BoxComponent),
  btn: () => loadBaseWidgets().then(m => m.BtnComponent),
  text: () => loadBaseWidgets().then(m => m.TextComponent),
  card: () => loadBaseWidgets().then(m => m.CardComponent),
  link: () => loadBaseWidgets().then(m => m.LinkComponent),
  icon: () => loadBaseWidgets().then(m => m.IconComponent),
  shape: () => loadBaseWidgets().then(m => m.ShapeComponent),
  panel: () => loadBaseWidgets().then(m => m.PanelComponent),
  title: () => loadBaseWidgets().then(m => m.TitleComponent),
  divider: () => loadBaseWidgets().then(m => m.DividerComponent),
  spacer: () => loadBaseWidgets().then(m => m.SpacerComponent),
  'bg-img': () => loadBaseWidgets().then(m => m.BgImgComponent),
  spinner: () => loadBaseWidgets().then(m => m.SpinnerComponent),

  'card-1v1': () => loadCardWidgets().then(m => m.Card1v1Component),
  'card-1v2': () => loadCardWidgets().then(m => m.Card1v2Component),
  'card-1v4': () => loadCardWidgets().then(m => m.Card1v4Component),
  'card-1v5': () => loadCardWidgets().then(m => m.Card1v5Component),
  'card-1v6': () => loadCardWidgets().then(m => m.Card1v6Component),
  'user-card': () => loadCardWidgets().then(m => m.UserCardComponent),

  'btn-video': () => loadContentWidgets().then(m => m.BtnVideoComponent),
  'view-list': () => loadContentWidgets().then(m => m.ViewListComponent),
  'text-hero': () => loadContentWidgets().then(m => m.TextHeroComponent),
  'menu-list': () => loadContentWidgets().then(m => m.MenuListComponent),
  'media-list': () => loadContentWidgets().then(m => m.MediaListComponent),
  'feature-box': () => loadContentWidgets().then(m => m.FeatureBoxComponent),
  'media-meta': () => loadContentWidgets().then(m => m.MediaMetaComponent),
  'content-box': () => loadContentWidgets().then(m => m.ContentBoxComponent),
  'media-object': () => loadContentWidgets().then(m => m.MediaObjectComponent),
  'media-object-group': () => loadContentWidgets().then(m => m.MediaObjectGroupComponent),
  'content-text-center': () => loadContentWidgets().then(m => m.ContentTextCenterComponent),

  'github-star': () => loadUtilityWidgets().then(m => m.GithubStarComponent),
  'custom-theme': () => loadUtilityWidgets().then(m => m.CustomThemeComponent),
  'progress-bar': () => loadUtilityWidgets().then(m => m.ProgressBarComponent),
  'dynamic-table': () => loadUtilityWidgets().then(m => m.DynamicTableComponent),
  'dropdown-menu': () => loadUtilityWidgets().then(m => m.DropdownMenuComponent),
  'number-animate': () => loadUtilityWidgets().then(m => m.NumberAnimateComponent),
  'progress-group': () => loadUtilityWidgets().then(m => m.ProgressGroupComponent),
  'inline-lightbox': () => loadUtilityWidgets().then(m => m.InlineLightboxComponent),

  'layout-builder': () =>
    import('@uiux/widgets/builder/layout-builder/layout-builder.component').then(
      m => m.LayoutBuilderComponent
    ),

  chart: () => loadChart().then(m => m.ChartComponent),
  'chart-box': () => loadChart().then(m => m.ChartBoxComponent),
  'full-calendar': () =>
    import('@uiux/combs/calendar/full-calendar/full-calendar.component').then(
      m => m.FullCalendarComponent
    ),
  swiper: () => loadCarousel().then(m => m.SwiperComponent),
  'carousel-1v1': () => loadCarousel().then(m => m.Carousel1v1Component),
  'carousel-1v2': () => loadCarousel().then(m => m.Carousel1v2Component),
  'carousel-1v3': () => loadCarousel().then(m => m.Carousel1v3Component),
  'carousel-2v1': () => loadCarousel().then(m => m.Carousel2v1Component),
  'carousel-2v2': () => loadCarousel().then(m => m.Carousel2v2Component),
  'hero-1v1': () => loadHero().then(m => m.Hero1v1Component),
  'hero-2v1': () => loadHero().then(m => m.Hero2v1Component),
  'hero-2v3': () => loadHero().then(m => m.Hero2v3Component),
  'dynamic-card-list': () => loadList().then(m => m.DynamicCardListComponent),
  'dynamic-card-list-1v1': () => loadList().then(m => m.DynamicCardList1v1Component),
  'dynamic-media-list': () => loadList().then(m => m.DynamicMediaListComponent),
  'dynamic-text-list': () => loadList().then(m => m.DynamicTextListComponent),
  list: () => loadList().then(m => m.ListComponent),
  'list-thin': () => loadList().then(m => m.ListThinComponent),
  'taxonomy-list': () => loadList().then(m => m.TaxonomyListComponent),
  'taxonomy-thin-list': () => loadList().then(m => m.TaxonomyThinListComponent),
  map: () => loadMap().then(m => m.MapComponent),
  location: () => loadMap().then(m => m.LocationComponent),
  'map-list-v1': () => loadMap().then(m => m.MapListV1Component),
  'view-map': () => loadMap().then(m => m.ViewMapComponent),
  shuffle: () =>
    import('@uiux/combs/masonry/shuffle/shuffle.component').then(m => m.ShuffleComponent),
  article: () => loadNodeContent().then(m => m.ArticleComponent),
  question: () => loadNodeContent().then(m => m.QuestionComponent),
  report: () => loadNodeContent().then(m => m.ReportComponent),
  'banner-simple': () => loadNodeLight().then(m => m.BannerSimpleComponent),
  breadcrumb: () => loadNodeLight().then(m => m.BreadcrumbComponent),
  formly: () => loadForm().then(m => m.FormlyComponent),
  datepicker: () => loadForm().then(m => m.DatepickerComponent),
  'dynamic-form': () => loadForm().then(m => m.DynamicFormComponent),
  flag: () => loadOtherLight().then(m => m.FlagComponent),
  iframe: () => loadOtherLight().then(m => m.IframeComponent),
  stepper: () => loadOtherLight().then(m => m.StepperComponent),
  download: () => loadOtherLight().then(m => m.DownloadComponent),
  'chip-list': () => loadOtherLight().then(m => m.ChipListComponent),
  autoclose: () => loadOtherLight().then(m => m.AutocloseComponent),
  jsoneditor: () =>
    import('@uiux/combs/other/jsoneditor/jsoneditor.component').then(m => m.JsoneditorComponent),
  'code-editor': () =>
    import('@uiux/combs/other/code-editor/code-editor.component').then(
      m => m.CodeEditorComponent
    ),
  'custom-template': () =>
    import('@uiux/combs/other/custom-template/custom-template.component').then(
      m => m.CustomTemplateComponent
    ),
  'profile-1v1': () => loadProfile().then(m => m.Profile1v1Component),
  search: () => import('@uiux/combs/search/search.component').then(m => m.SearchComponent),
  'showcase-1v1': () => loadShowcase().then(m => m.Showcase1v1Component),
  'showcase-3v3': () => loadShowcase().then(m => m.Showcase3v3Component),
  'showcase-3v9': () => loadShowcase().then(m => m.Showcase3v9Component),
  'showcase-4v1': () => loadShowcase().then(m => m.Showcase4v1Component),
  'tab-1v1': () => loadTab().then(m => m.Tab1v1Component),
  tab: () => loadTab().then(m => m.TabComponent),
  'video-bg': () => loadVideo().then(m => m.VideoBgComponent),
  video: () => loadVideo().then(m => m.VideoComponent),
  dashboard: () => loadDashboard().then(m => m.DashboardComponent),
  'dashboard-box': () => loadDashboard().then(m => m.DashboardBoxComponent),
  json: () => loadBuilder().then(m => m.JsonFieldType),
  'card-list': () => loadBuilder().then(m => m.CardListComponent),
  'inline-editor': () => loadBuilder().then(m => m.InlineEditComponent),
  'page-setting': () => loadBuilder().then(m => m.PageSettingComponent),
  'widget-picker': () => loadBuilder().then(m => m.WidgetPickerComponent),
  'layout-setting': () => loadBuilder().then(m => m.LayoutSettingComponent),
  'builder-template': () => loadBuilder().then(m => m.BuilderTemplateComponent),
  'manage-media': () => loadManage().then(m => m.ManageMediaComponent),
  'upload-media': () => loadManage().then(m => m.UploadMediaComponent),
  taxonomy: () => loadManage().then(m => m.TaxonomyComponent),
  login: () => loadUser().then(m => m.LoginComponent),
  'user-setting': () => loadUser().then(m => m.UserSettingComponent),
};
/* eslint-enable quote-props */
