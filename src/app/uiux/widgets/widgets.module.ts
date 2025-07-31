import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { CdkTableModule } from '@angular/cdk/table';

// Material
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { ClipboardModule } from '@angular/cdk/clipboard';

// Core
import { DataSourcePipe } from '@core/pipe/dataSource.pipe';
import { SafeUrlPipe } from '@core/pipe/safe-url.pipe';

// Components
import { BgComponent } from './bg/bg.component';
import { ImgComponent } from './img/img.component';
import { BoxComponent } from './box/box.component';
import { TabComponent } from './tab/tab.component';
import { LinkComponent } from './link/link.component';
import { CardComponent } from './card/card.component';
import { TextComponent } from './text/text.component';
import { TitleComponent } from './title/title.component';
import { PanelComponent } from './panel/panel.component';
import { SpacerComponent } from './spacer/spacer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ChipListComponent } from './chip-list/chip-list.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FeatureBoxComponent } from './feature-box/feature-box.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NumberAnimateComponent } from './number-animate/number-animate.component';
import { IconComponent } from './icon/icon.component';
import { ProgressGroupComponent } from './progress-group/progress-group.component';
import { MediaListComponent } from './media/media-list/media-list.component';
import { MediaObjectComponent } from './media/media-object/media-object.component';
import { MediaObjectGroupComponent } from './media/media-object-group/media-object-group.component';
import { DialogComponent } from './dialog/dialog.component';
import { PaginationLinksComponent } from './pagination/pagination-links/pagination-links.component';
import { FlagComponent } from './actions/flag/flag.component';
import { ShapeComponent } from './shape/shape.component';
import { BgImgComponent } from './bg-img/bg-img.component';
import { Card1v1Component } from './card/card1v1/card1v1.component';
import { BtnComponent } from './btn/btn.component';
import { Card1v2Component } from './card/card1v2/card1v2.component';
import { Card1v3Component } from './card/card1v3/card1v3.component';
import { Card1v4Component } from './card/card1v4/card1v4.component';
import { CardMetaComponent } from './card/card-meta/card-meta.component';
import { DownloadComponent } from './actions/download/download.component';
import { MediaMetaComponent } from './media/media-meta/media-meta.component';
import { TextHeroComponent } from './text-hero/text-hero.component';
import { ContentBoxComponent } from './content-box/content-box.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { InlineLightboxComponent } from './lightbox/inline-lightbox/inline-lightbox.component';
import { ContentTextCenterComponent } from './content-text-center/content-text-center.component';
import { ViewListComponent } from './view-list/view-list.component';
import { IframeComponent } from './iframe/iframe.component';
import { UserCardComponent } from './card/user-card/user-card.component';
import { UserCardCountComponent } from './card/user-card/user-card-count/user-card-count.component';
import { StepperComponent } from './stepper/stepper.component';
import { BtnVideoComponent } from './actions/btn-video/btn-video.component';
import { BaseModule } from '@uiux/base/base.module';
import { AccordionComponent } from './accordion/accordion.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { Card1v5Component } from './card/card1v5/card1v5.component';
import { Card1v6Component } from './card/card1v6/card1v6.component';
import { DynamicComponentComponent } from './builder/dynamic-component/dynamic-component.component';
import { ComponentToolbarComponent } from './builder/component-toolbar/component-toolbar.component';
import { BuilderMenuComponent } from './builder/builder-menu/builder-menu.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NotifyComponent } from './notify/notify.component';
import { LogoComponent } from './img/logo/logo.component';
import { GotopComponent } from './actions/gotop/gotop.component';
import { SwitchThemeComponent } from './switch-theme/switch-theme.component';
import { GithubStarComponent } from './github-star/github-star.component';
import { DividerComponent } from './divider/divider.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { NgOptimizedImage } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { LayoutToolbarComponent } from './builder/layout-builder/layout-toolbar/layout-toolbar.component';
import { LayoutBuilderComponent } from './builder/layout-builder/layout-builder.component';

const components = [
  BgComponent,
  ImgComponent,
  LogoComponent,
  BoxComponent,
  TextComponent,
  LinkComponent,
  BtnComponent,
  TabComponent,
  CardComponent,
  IconComponent,
  TitleComponent,
  PanelComponent,
  SpacerComponent,
  SpinnerComponent,
  Card1v1Component,
  Card1v2Component,
  Card1v3Component,
  Card1v4Component,
  Card1v5Component,
  Card1v6Component,
  UserCardComponent,
  TextHeroComponent,
  ChipListComponent,
  ContentBoxComponent,
  FeatureBoxComponent,
  BreadcrumbComponent,
  SwitchThemeComponent,
  UserCardCountComponent,
  NumberAnimateComponent,
  SidebarComponent,
  MediaListComponent,
  MediaMetaComponent,
  MediaObjectComponent,
  MenuListComponent,
  PaginationComponent,
  PaginationLinksComponent,
  ProgressBarComponent,
  ProgressGroupComponent,
  DialogComponent,
  FlagComponent,
  ShapeComponent,
  BgImgComponent,
  IframeComponent,
  DownloadComponent,
  CardMetaComponent,
  ViewListComponent,
  DynamicTableComponent,
  InlineLightboxComponent,
  MediaObjectGroupComponent,
  ContentTextCenterComponent,
  StepperComponent,
  BtnVideoComponent,
  AccordionComponent,
  DropdownMenuComponent,
  NotifyComponent,
  DynamicComponentComponent,
  ComponentToolbarComponent,
  BuilderMenuComponent,
  LayoutBuilderComponent,
  GotopComponent,
  GithubStarComponent,
  DividerComponent,
  LoadingComponent,
];

@NgModule({
  declarations: [...components, SafeUrlPipe, DataSourcePipe, SafeHtmlPipe, LayoutToolbarComponent],
  imports: [
    MatChipsModule,
    MatBadgeModule,
    ShareModule,
    LightgalleryModule,
    CdkTableModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSortModule,
    ClipboardModule,
    NgOptimizedImage,
  ],
  exports: [...components, SafeUrlPipe, DataSourcePipe, SafeHtmlPipe],
})
export class WidgetsModule extends BaseModule {
  dynamicComponents = [...components];
}
