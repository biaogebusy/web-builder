import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { LightboxModule } from 'ngx-lightbox';
import { ShareModule } from '@share/share.module';
import { SwiperModule } from 'swiper/angular';
import { CountToModule } from 'angular-count-to';
import { TreeModule } from '@circlon/angular-tree-component';
import { CdkTableModule } from '@angular/cdk/table';

// Material
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';

// Form
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';

// Core
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
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
import { InputComponent } from './form/input/input.component';
import { PanelComponent } from './panel/panel.component';
import { SwiperComponent } from './swiper/swiper.component';
import { SpacerComponent } from './spacer/spacer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TextareaComponent } from './form/textarea/textarea.component';
import { ChipListComponent } from './chip-list/chip-list.component';
import { LineYearComponent } from './line-year/line-year.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BtnAnimateComponent } from './btn-animate/btn-animate.component';
import { FeatureBoxComponent } from './feature-box/feature-box.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { NumberAnimateComponent } from './number-animate/number-animate.component';
import { DynamicWidgetsComponent } from './dynamic-widgets/dynamic-widgets.component';

import { IconComponent } from './icon/icon.component';
import { ProgressGroupComponent } from './progress-group/progress-group.component';
import { MediaListComponent } from './media/media-list/media-list.component';
import { MediaObjectComponent } from './media/media-object/media-object.component';
import { MediaObjectGroupComponent } from './media/media-object-group/media-object-group.component';
import { DialogComponent } from './dialog/dialog.component';
import { DynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { SelectComponent } from './form/select/select.component';
import { PaginationLinksComponent } from './pagination/pagination-links/pagination-links.component';
import { FlagComponent } from './actions/flag/flag.component';
import { ShapeComponent } from './shape/shape.component';
import { BgImgComponent } from './bg-img/bg-img.component';
import { ShareComponent } from './actions/share/share.component';
import { TreeComponent } from './tree/tree.component';
import { Card1v1Component } from './card/card1v1/card1v1.component';
import { BtnComponent } from './btn/btn.component';
import { Card1v2Component } from './card/card1v2/card1v2.component';
import { Card1v3Component } from './card/card1v3/card1v3.component';
import { CardMetaComponent } from './card/card-meta/card-meta.component';
import { DownloadComponent } from './actions/download/download.component';
import { MediaMetaComponent } from './media/media-meta/media-meta.component';
import { TextHeroComponent } from './text-hero/text-hero.component';
import { FontChangeComponent } from './font-change/font-change.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { ContentBoxComponent } from './content-box/content-box.component';
import { TermsServiceComponent } from './form/terms-service/terms-service.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { InlineLightboxComponent } from './lightbox/inline-lightbox/inline-lightbox.component';
import { ContentTextCenterComponent } from './content-text-center/content-text-center.component';
import { CalendarComponent } from './date/calendar/calendar.component';
import { DatepickerComponent } from './form/datepicker/datepicker.component'; // a plugin!
import { ViewListComponent } from './view-list/view-list.component';
import { SearchActionComponent } from './actions/search-action/search-action.component';
import { SearchSidebarComponent } from './sidebar/search-sidebar/search-sidebar.component';
import { LoopWidgetsComponent } from './loop-widgets/loop-widgets.component';
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
import { MenuComponent } from './menu/menu.component';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
]);

const components = [
  BgComponent,
  ImgComponent,
  MapComponent,
  BoxComponent,
  TextComponent,
  TextHeroComponent,
  LinkComponent,
  BtnComponent,
  TabComponent,
  CardComponent,
  IconComponent,
  TitleComponent,
  PanelComponent,
  InputComponent,
  SelectComponent,
  SwiperComponent,
  SpacerComponent,
  SpinnerComponent,
  Card1v1Component,
  Card1v2Component,
  Card1v3Component,
  UserCardComponent,
  CheckboxComponent,
  ContentBoxComponent,
  ChipListComponent,
  TextareaComponent,
  LineYearComponent,
  ContactUsComponent,
  BtnAnimateComponent,
  FeatureBoxComponent,
  BreadcrumbComponent,
  TestimonialComponent,
  DropdownMenuComponent,
  UserCardCountComponent,
  NumberAnimateComponent,
  DynamicWidgetsComponent,
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
  TreeComponent,
  IframeComponent,
  CalendarComponent,
  DownloadComponent,
  CardMetaComponent,
  ViewListComponent,
  DatepickerComponent,
  FontChangeComponent,
  LoopWidgetsComponent,
  TermsServiceComponent,
  DynamicTableComponent,
  SearchActionComponent,
  SearchSidebarComponent,
  InlineLightboxComponent,
  MediaObjectGroupComponent,
  ContentTextCenterComponent,
  DynamicFormControlComponent,
  DateRangeComponent,
  MatSelectComponent,
  ChartComponent,
  StepperComponent,
  FormlyComponent,
  PlayerComponent,
  BtnVideoComponent,
  MenuComponent,
];

@NgModule({
  declarations: [...components, SafeHtmlPipe, SafeUrlPipe, DataSourcePipe],
  imports: [
    MatChipsModule,
    ShareModule,
    TreeModule,
    LightboxModule,
    CountToModule,
    CdkTableModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    FormlyMatDatepickerModule,
    FormlyMaterialModule,
    MatSliderModule,
    FormlyMatSliderModule,
    FormlyMatToggleModule,
    MatCheckboxModule,
    SwiperModule,
    MatSortModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormlyModule.forRoot({
      types: [
        {
          name: 'mat-select',
          component: MatSelectComponent,
        },
        {
          name: 'date-range',
          component: DateRangeComponent,
        },
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
  exports: [...components, SafeHtmlPipe, SafeUrlPipe, DataSourcePipe],
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
