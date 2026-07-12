import type { Type } from '@angular/core';

export type ComponentLoader = () => Promise<Type<unknown>>;

/* eslint-disable quote-props -- component type keys mirror CMS values */
export const DYNAMIC_COMPONENT_LOADERS: Readonly<Record<string, ComponentLoader>> = {
  bg: () => import('@uiux/widgets/dynamic-widgets').then(m => m.BgComponent),
  img: () => import('@uiux/widgets/dynamic-widgets').then(m => m.ImgComponent),
  box: () => import('@uiux/widgets/dynamic-widgets').then(m => m.BoxComponent),
  btn: () => import('@uiux/widgets/dynamic-widgets').then(m => m.BtnComponent),
  text: () => import('@uiux/widgets/dynamic-widgets').then(m => m.TextComponent),
  card: () => import('@uiux/widgets/dynamic-widgets').then(m => m.CardComponent),
  link: () => import('@uiux/widgets/dynamic-widgets').then(m => m.LinkComponent),
  icon: () => import('@uiux/widgets/dynamic-widgets').then(m => m.IconComponent),
  shape: () => import('@uiux/widgets/dynamic-widgets').then(m => m.ShapeComponent),
  panel: () => import('@uiux/widgets/dynamic-widgets').then(m => m.PanelComponent),
  title: () => import('@uiux/widgets/dynamic-widgets').then(m => m.TitleComponent),
  divider: () => import('@uiux/widgets/dynamic-widgets').then(m => m.DividerComponent),
  spacer: () => import('@uiux/widgets/dynamic-widgets').then(m => m.SpacerComponent),
  'bg-img': () => import('@uiux/widgets/dynamic-widgets').then(m => m.BgImgComponent),
  spinner: () => import('@uiux/widgets/dynamic-widgets').then(m => m.SpinnerComponent),
  'card-1v1': () =>
    import('@uiux/widgets/card/card1v1/card1v1.component').then(m => m.Card1v1Component),
  'card-1v2': () =>
    import('@uiux/widgets/card/card1v2/card1v2.component').then(m => m.Card1v2Component),
  'card-1v4': () =>
    import('@uiux/widgets/card/card1v4/card1v4.component').then(m => m.Card1v4Component),
  'card-1v5': () =>
    import('@uiux/widgets/card/card1v5/card1v5.component').then(m => m.Card1v5Component),
  'card-1v6': () =>
    import('@uiux/widgets/card/card1v6/card1v6.component').then(m => m.Card1v6Component),
  'user-card': () =>
    import('@uiux/widgets/card/user-card/user-card.component').then(m => m.UserCardComponent),
  'btn-video': () =>
    import('@uiux/widgets/actions/btn-video/btn-video.component').then(m => m.BtnVideoComponent),
  'view-list': () =>
    import('@uiux/widgets/view-list/view-list.component').then(m => m.ViewListComponent),
  'text-hero': () =>
    import('@uiux/widgets/text-hero/text-hero.component').then(m => m.TextHeroComponent),
  'menu-list': () =>
    import('@uiux/widgets/menu-list/menu-list.component').then(m => m.MenuListComponent),
  'media-list': () =>
    import('@uiux/widgets/media/media-list/media-list.component').then(m => m.MediaListComponent),
  'feature-box': () =>
    import('@uiux/widgets/feature-box/feature-box.component').then(m => m.FeatureBoxComponent),
  'media-meta': () =>
    import('@uiux/widgets/media/media-meta/media-meta.component').then(m => m.MediaMetaComponent),
  'content-box': () =>
    import('@uiux/widgets/content-box/content-box.component').then(m => m.ContentBoxComponent),
  'github-star': () =>
    import('@uiux/widgets/github-star/github-star.component').then(m => m.GithubStarComponent),
  'custom-theme': () =>
    import('@uiux/widgets/custom-theme/custom-theme.component').then(m => m.CustomThemeComponent),
  'progress-bar': () =>
    import('@uiux/widgets/progress-bar/progress-bar.component').then(m => m.ProgressBarComponent),
  'media-object': () =>
    import('@uiux/widgets/media/media-object/media-object.component').then(
      m => m.MediaObjectComponent
    ),
  'dynamic-table': () =>
    import('@uiux/widgets/dynamic-table/dynamic-table.component').then(
      m => m.DynamicTableComponent
    ),
  'dropdown-menu': () =>
    import('@uiux/widgets/dropdown-menu/dropdown-menu.component').then(
      m => m.DropdownMenuComponent
    ),
  'layout-builder': () =>
    import('@uiux/widgets/builder/layout-builder/layout-builder.component').then(
      m => m.LayoutBuilderComponent
    ),
  'number-animate': () =>
    import('@uiux/widgets/number-animate/number-animate.component').then(
      m => m.NumberAnimateComponent
    ),
  'progress-group': () =>
    import('@uiux/widgets/progress-group/progress-group.component').then(
      m => m.ProgressGroupComponent
    ),
  'inline-lightbox': () =>
    import('@uiux/widgets/lightbox/inline-lightbox/inline-lightbox.component').then(
      m => m.InlineLightboxComponent
    ),
  'media-object-group': () =>
    import('@uiux/widgets/media/media-object-group/media-object-group.component').then(
      m => m.MediaObjectGroupComponent
    ),
  'content-text-center': () =>
    import('@uiux/widgets/content-text-center/content-text-center.component').then(
      m => m.ContentTextCenterComponent
    ),
  chart: () => import('@uiux/combs/chart/chart/chart.component').then(m => m.ChartComponent),
  'chart-box': () =>
    import('@uiux/combs/chart/chart-box/chart-box.component').then(m => m.ChartBoxComponent),
  'full-calendar': () =>
    import('@uiux/combs/calendar/full-calendar/full-calendar.component').then(
      m => m.FullCalendarComponent
    ),
  lottery: () =>
    import('@uiux/combs/calculator/lottery/lottery.component').then(m => m.LotteryComponent),
  swiper: () => import('@uiux/combs/carousel/swiper/swiper.component').then(m => m.SwiperComponent),
  'carousel-1v1': () =>
    import('@uiux/combs/carousel/carousel1v1/carousel1v1.component').then(
      m => m.Carousel1v1Component
    ),
  'carousel-1v2': () =>
    import('@uiux/combs/carousel/carousel1v2/carousel1v2.component').then(
      m => m.Carousel1v2Component
    ),
  'carousel-1v3': () =>
    import('@uiux/combs/carousel/carousel1v3/carousel1v3.component').then(
      m => m.Carousel1v3Component
    ),
  'carousel-2v1': () =>
    import('@uiux/combs/carousel/carousel2v1/carousel2v1.component').then(
      m => m.Carousel2v1Component
    ),
  'carousel-2v2': () =>
    import('@uiux/combs/carousel/carousel2v2/carousel2v2.component').then(
      m => m.Carousel2v2Component
    ),
  'hero-1v1': () =>
    import('@uiux/combs/hero/hero1v1/hero1v1.component').then(m => m.Hero1v1Component),
  'hero-2v1': () =>
    import('@uiux/combs/hero/hero2v1/hero2v1.component').then(m => m.Hero2v1Component),
  'hero-2v3': () =>
    import('@uiux/combs/hero/hero2v3/hero2v3.component').then(m => m.Hero2v3Component),
  'dynamic-card-list': () =>
    import('@uiux/combs/list/dynamic-card-list/dynamic-card-list.component').then(
      m => m.DynamicCardListComponent
    ),
  'dynamic-card-list-1v1': () =>
    import('@uiux/combs/list/dynamic-card-list1v1/dynamic-card-list1v1.component').then(
      m => m.DynamicCardList1v1Component
    ),
  'dynamic-media-list': () =>
    import('@uiux/combs/list/dynamic-media-list/dynamic-media-list.component').then(
      m => m.DynamicMediaListComponent
    ),
  'dynamic-text-list': () =>
    import('@uiux/combs/list/dynamic-text-list/dynamic-text-list.component').then(
      m => m.DynamicTextListComponent
    ),
  list: () => import('@uiux/combs/list/list/list.component').then(m => m.ListComponent),
  'list-thin': () =>
    import('@uiux/combs/list/list/list-thin/list-thin.component').then(m => m.ListThinComponent),
  'taxonomy-list': () =>
    import('@uiux/combs/list/taxonomy-list/taxonomy-list.component').then(
      m => m.TaxonomyListComponent
    ),
  'taxonomy-thin-list': () =>
    import('@uiux/combs/list/taxonomy-thin-list/taxonomy-thin-list.component').then(
      m => m.TaxonomyThinListComponent
    ),
  map: () => import('@uiux/combs/map/map/map.component').then(m => m.MapComponent),
  location: () =>
    import('@uiux/combs/map/location/location.component').then(m => m.LocationComponent),
  'map-list-v1': () =>
    import('@uiux/combs/map/map-list-v1/map-list-v1.component').then(m => m.MapListV1Component),
  'view-map': () =>
    import('@uiux/combs/map/view-map/view-map.component').then(m => m.ViewMapComponent),
  shuffle: () =>
    import('@uiux/combs/masonry/shuffle/shuffle.component').then(m => m.ShuffleComponent),
  article: () => import('@uiux/combs/node/article/article.component').then(m => m.ArticleComponent),
  question: () =>
    import('@uiux/combs/node/question/question.component').then(m => m.QuestionComponent),
  report: () => import('@uiux/combs/node/report/report.component').then(m => m.ReportComponent),
  'banner-simple': () =>
    import('@uiux/combs/node/banner-simple/banner-simple.component').then(
      m => m.BannerSimpleComponent
    ),
  breadcrumb: () =>
    import('@uiux/combs/node/breadcrumb/breadcrumb.component').then(m => m.BreadcrumbComponent),
  formly: () => import('@uiux/combs/form/formly/formly.component').then(m => m.FormlyComponent),
  datepicker: () =>
    import('@uiux/combs/form/datepicker/datepicker.component').then(m => m.DatepickerComponent),
  'dynamic-form': () =>
    import('@uiux/combs/form/dynamic-form/dynamic-form.component').then(
      m => m.DynamicFormComponent
    ),
  flag: () => import('@uiux/combs/other/flag/flag.component').then(m => m.FlagComponent),
  iframe: () => import('@uiux/combs/other/iframe/iframe.component').then(m => m.IframeComponent),
  stepper: () =>
    import('@uiux/combs/other/stepper/stepper.component').then(m => m.StepperComponent),
  download: () =>
    import('@uiux/combs/other/download/download.component').then(m => m.DownloadComponent),
  'chip-list': () =>
    import('@uiux/combs/other/chip-list/chip-list.component').then(m => m.ChipListComponent),
  autoclose: () =>
    import('@uiux/combs/other/autoclose/autoclose.component').then(m => m.AutocloseComponent),
  jsoneditor: () =>
    import('@uiux/combs/other/jsoneditor/jsoneditor.component').then(m => m.JsoneditorComponent),
  'code-editor': () =>
    import('@uiux/combs/other/code-editor/code-editor.component').then(m => m.CodeEditorComponent),
  'custom-template': () =>
    import('@uiux/combs/other/custom-template/custom-template.component').then(
      m => m.CustomTemplateComponent
    ),
  'profile-1v1': () =>
    import('@uiux/combs/profile/profile1v1/profile1v1.component').then(m => m.Profile1v1Component),
  'user-center': () =>
    import('@uiux/combs/profile/user-center/user-center.component').then(
      m => m.UserCenterComponent
    ),
  'user-profile': () =>
    import('@uiux/combs/profile/user-center/user-profile/user-profile.component').then(
      m => m.UserProfileComponent
    ),
  'user-favorite': () =>
    import('@uiux/combs/profile/user-center/user-favorite/user-favorite.component').then(
      m => m.UserFavoriteComponent
    ),
  search: () => import('@uiux/combs/search/search.component').then(m => m.SearchComponent),
  'showcase-1v1': () =>
    import('@uiux/combs/showcase/showcase1v1/showcase1v1.component').then(
      m => m.Showcase1v1Component
    ),
  'showcase-3v3': () =>
    import('@uiux/combs/showcase/showcase3v3/showcase3v3.component').then(
      m => m.Showcase3v3Component
    ),
  'showcase-3v9': () =>
    import('@uiux/combs/showcase/showcase3v9/showcase3v9.component').then(
      m => m.Showcase3v9Component
    ),
  'showcase-4v1': () =>
    import('@uiux/combs/showcase/showcase4v1/showcase4v1.component').then(
      m => m.Showcase4v1Component
    ),
  'tab-1v1': () => import('@uiux/combs/tab/tab1v1/tab1v1.component').then(m => m.Tab1v1Component),
  tab: () => import('@uiux/combs/tab/tab/tab.component').then(m => m.TabComponent),
  'video-bg': () =>
    import('@uiux/combs/video/video-bg/video-bg.component').then(m => m.VideoBgComponent),
  video: () => import('@uiux/combs/video/video/video.component').then(m => m.VideoComponent),
  dashboard: () =>
    import('@uiux/combs/dashboard/dashboard.component').then(m => m.DashboardComponent),
  'dashboard-box': () =>
    import('@uiux/combs/dashboard/dashboard-box/dashboard-box.component').then(
      m => m.DashboardBoxComponent
    ),
  json: () => import('@uiux/combs/form/formly-type/json/json.component').then(m => m.JsonFieldType),
  'card-page': () =>
    import('@modules/builder/main/card-list/card-page/card-page.component').then(
      m => m.CardPageComponent
    ),
  'card-list': () =>
    import('@modules/builder/main/card-list/card-list.component').then(m => m.CardListComponent),
  'inline-editor': () =>
    import('@modules/builder/main/inline-editor/inline-editor.component').then(
      m => m.InlineEditComponent
    ),
  'page-setting': () =>
    import('@modules/builder/main/page-setting/page-setting.component').then(
      m => m.PageSettingComponent
    ),
  'widget-picker': () =>
    import('@modules/builder/main/widget-picker/widget-picker.component').then(
      m => m.WidgetPickerComponent
    ),
  'layout-setting': () =>
    import('@modules/builder/toolbar/layout-setting/layout-setting.component').then(
      m => m.LayoutSettingComponent
    ),
  'builder-template': () =>
    import('@modules/builder/main/builder-template/builder-template.component').then(
      m => m.BuilderTemplateComponent
    ),
  'manage-media': () =>
    import('@modules/manage/manage-media/manage-media.component').then(m => m.ManageMediaComponent),
  'upload-media': () =>
    import('@modules/manage/upload-media/upload-media.component').then(m => m.UploadMediaComponent),
  taxonomy: () =>
    import('@modules/manage/taxonomy/taxonomy.component').then(m => m.TaxonomyComponent),
  login: () => import('@modules/user/login/login.component').then(m => m.LoginComponent),
  'user-setting': () =>
    import('@modules/user/user-setting/user-setting.component').then(m => m.UserSettingComponent),
};
/* eslint-enable quote-props */
