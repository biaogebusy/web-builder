import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { CdkTableModule } from '@angular/cdk/table';

// Material
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { ClipboardModule } from '@angular/cdk/clipboard';

// Form
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';

// Core
import { DataSourcePipe } from '@core/pipe/dataSource.pipe';
import { SafeUrlPipe } from '@core/pipe/safe-url.pipe';

// Components
import { BgComponent } from './bg/bg.component';
import { ImgComponent } from './img/img.component';
import { BoxComponent } from './box/box.component';
import { MapComponent } from './map/map.component';
import { TabComponent } from './tab/tab.component';
import { LinkComponent } from './link/link.component';
import { CardComponent } from './card/card.component';
import { TextComponent } from './text/text.component';
import { TitleComponent } from './title/title.component';
import { PanelComponent } from './panel/panel.component';
import { SwiperComponent } from './swiper/swiper.component';
import { SpacerComponent } from './spacer/spacer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ChipListComponent } from './chip-list/chip-list.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FeatureBoxComponent } from './feature-box/feature-box.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
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
import { ShareComponent } from './actions/share/share.component';
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
import { TermsServiceComponent } from './form/terms-service/terms-service.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { InlineLightboxComponent } from './lightbox/inline-lightbox/inline-lightbox.component';
import { ContentTextCenterComponent } from './content-text-center/content-text-center.component';
import { DatepickerComponent } from './form/datepicker/datepicker.component'; // a plugin!
import { ViewListComponent } from './view-list/view-list.component';
import { SearchSidebarComponent } from './sidebar/search-sidebar/search-sidebar.component';
import { IframeComponent } from './iframe/iframe.component';
import { UserCardComponent } from './card/user-card/user-card.component';
import { UserCardCountComponent } from './card/user-card/user-card-count/user-card-count.component';

import { DateRangeComponent } from './form/formly-type/date-range/date-range.component';
import { MatSelectComponent } from './form/formly-type/mat-select/mat-select.component';
import { ChartComponent } from './chart/chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { StepperComponent } from './stepper/stepper.component';
import { FormlyComponent } from './form/formly/formly.component';
import { PlayerComponent } from './media/player/player.component';
import { BtnVideoComponent } from './actions/btn-video/btn-video.component';

import { BaseModule } from '@uiux/base/base.module';
import { AccordionComponent } from './accordion/accordion.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { ChartBoxComponent } from './chart/chart-box/chart-box.component';
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
import { RepeatTypeComponent } from './form/formly-type/repeat.type';
import { TabsTypeComponent } from './form/formly-type/tabs/tabs.component';
import { ImgPickerComponent } from './form/formly-type/img-picker/img-picker.component';
import { SliderComponent } from './form/formly-type/slider/slider.component';
import { DividerComponent } from './divider/divider.component';
import { RichTextComponent } from './form/formly-type/rich-text/rich-text.component';
import { QuillModule } from 'ngx-quill';
import { CountUpModule } from 'ngx-countup';
import { LightgalleryModule } from 'lightgallery/angular';

const components = [
  BgComponent,
  ImgComponent,
  LogoComponent,
  MapComponent,
  BoxComponent,
  TextComponent,
  LinkComponent,
  BtnComponent,
  TabComponent,
  CardComponent,
  IconComponent,
  TitleComponent,
  PanelComponent,
  SwiperComponent,
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
  TestimonialComponent,
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
  ShareComponent,
  ShapeComponent,
  BgImgComponent,
  IframeComponent,
  DownloadComponent,
  CardMetaComponent,
  ViewListComponent,
  DatepickerComponent,
  TermsServiceComponent,
  DynamicTableComponent,
  SearchSidebarComponent,
  InlineLightboxComponent,
  MediaObjectGroupComponent,
  ContentTextCenterComponent,
  DateRangeComponent,
  MatSelectComponent,
  ChartComponent,
  ChartBoxComponent,
  StepperComponent,
  FormlyComponent,
  RepeatTypeComponent,
  RichTextComponent,
  TabsTypeComponent,
  ImgPickerComponent,
  PlayerComponent,
  BtnVideoComponent,
  AccordionComponent,
  DropdownMenuComponent,
  NotifyComponent,
  DynamicComponentComponent,
  ComponentToolbarComponent,
  BuilderMenuComponent,
  GotopComponent,
  GithubStarComponent,
  SliderComponent,
  DividerComponent,
];

@NgModule({
  declarations: [...components, SafeUrlPipe, DataSourcePipe],
  imports: [
    MatChipsModule,
    MatBadgeModule,
    ShareModule,
    CountUpModule,
    LightgalleryModule,
    CdkTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    FormlyMatDatepickerModule,
    FormlyMaterialModule,
    MatSliderModule,
    FormlyMatSliderModule,
    FormlyMatToggleModule,
    MatCheckboxModule,
    MatSortModule,
    ClipboardModule,
    QuillModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormlyModule.forRoot({
      types: [
        {
          name: 'rich-text',
          component: RichTextComponent,
        },
        {
          name: 'mat-select',
          component: MatSelectComponent,
        },
        {
          name: 'date-range',
          component: DateRangeComponent,
        },
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'tabs', component: TabsTypeComponent },
        { name: 'img-picker', component: ImgPickerComponent },
        // {
        //   name: 'slider',
        //   component: SliderComponent,
        //   wrappers: ['form-field'],
        // },
      ],
      validationMessages: [
        { name: 'required', message: '该字段必填' },
        {
          name: 'max',
          message: '不能超过最大值',
        },
        {
          name: 'min',
          message: '不能小于最小值',
        },
      ],
    }),
  ],
  exports: [...components, SafeUrlPipe, DataSourcePipe],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'zh-cn' },
  ],
})
export class WidgetsModule extends BaseModule {
  dynamicComponents = [...components];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}
