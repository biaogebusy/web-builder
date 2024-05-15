import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { BuilderComponent } from './builder.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareModule } from '@share/share.module';
import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderShowcaseComponent } from './main/builder-showcase/builder-showcase.component';
import { BuilderPanelComponent } from './sidebar/builder-panel/builder-panel.component';
import { BuilderGeneraterComponent } from './main/builder-generater/builder-generater.component';
import { BuilderSampleComponent } from './sidebar/builder-sample/builder-sample.component';
import { BuilderListComponent } from './main/builder-list/builder-list.component';
import { BuilderEmptyComponent } from './main/builder-empty/builder-empty.component';
import { SwitchPreviewComponent } from './toolbar/switch-preview/switch-preview.component';
import { PreviewListComponent } from './main/preview-list/preview-list.component';
import { BaseModule } from '@uiux/base/base.module';
import {
  BUILDER_CURRENT_PAGE,
  BUILDER_SAMPLE_PAGE,
  WIDGETS,
  UIUX,
  COLOR_TEST,
} from '@core/token/token-providers';
import { uiux } from './data/uiux-for-builder';
import { PreviewComponent } from './preview/preview.component';
import { BuilderToolbarComponent } from './toolbar/builder-toolbar/builder-toolbar.component';
import { samples } from './data/samples-for-builder';
import { BtnGeneraterComponent } from './toolbar/btn-generater/btn-generater.component';
import { BuilderVersionComponent } from './sidebar/builder-version/builder-version.component';
import { builderCurrentPageFactory } from '@core/factory/factory';
import { LocalStorageService } from 'ngx-webstorage';
import { InlineEditComponent } from './main/inline-editor/inline-editor.component';
import { LayoutBuilderComponent } from './layout-builder/layout-builder.component';
import { WidgetPickerComponent } from './main/widget-picker/widget-picker.component';
import { LayoutSettingComponent } from './layout-builder/layout-setting/layout-setting.component';
import { widgets } from './data/widgets-for-builder';
import { of } from 'rxjs';
import { BrandingModule } from '@core/branding/branding.module';
import { colorTest } from './data/theme-preview-for-builder';
import { BuilderUiuxComponent } from './sidebar/builder-uiux/builder-uiux.component';
import { BuilderSettingsComponent } from './sidebar/builder-settings/builder-settings.component';
import { PageListComponent } from './sidebar/page-list/page-list.component';
import { BuilderSidebarComponent } from './sidebar/builder-sidebar/builder-sidebar.component';
import { BuilderTemplateComponent } from './main/builder-template/builder-template.component';
import { LayoutToolbarComponent } from './layout-builder/layout-toolbar/layout-toolbar.component';
import { BlockToolbarComponent } from './layout-builder/block-toolbar/block-toolbar.component';
import { CountdownModule } from 'ngx-countdown';
import { CustomTemplateComponent } from './custom-template/custom-template.component';

const components = [
  BuilderComponent,
  BuilderListComponent,
  BuilderGeneraterComponent,
  BtnGeneraterComponent,
  InlineEditComponent,
  LayoutBuilderComponent,
  WidgetPickerComponent,
  LayoutSettingComponent,
  BuilderTemplateComponent,
  CustomTemplateComponent,
];

@NgModule({
  declarations: [
    ...components,
    BuilderToolbarComponent,
    BuilderEmptyComponent,
    BuilderShowcaseComponent,
    BuilderPanelComponent,
    SwitchPreviewComponent,
    BuilderSampleComponent,
    PreviewListComponent,
    PreviewComponent,
    BuilderVersionComponent,
    InlineEditComponent,
    BuilderUiuxComponent,
    BuilderSettingsComponent,
    PageListComponent,
    BuilderSidebarComponent,
    LayoutToolbarComponent,
    BlockToolbarComponent,
  ],
  imports: [
    ShareModule,
    MatSidenavModule,
    WidgetsModule,
    BrandingModule,
    DragDropModule,
    CountdownModule,
    BuilderRoutingModule,
  ],
  providers: [
    {
      provide: UIUX,
      useValue: uiux,
    },
    {
      provide: WIDGETS,
      useValue: of(widgets),
    },
    {
      provide: BUILDER_SAMPLE_PAGE,
      useValue: samples,
    },
    {
      provide: BUILDER_CURRENT_PAGE,
      useFactory: builderCurrentPageFactory,
      deps: [LocalStorageService],
    },
    {
      provide: COLOR_TEST,
      useValue: colorTest,
    },
  ],
  exports: [...components],
})
export class BuilderModule extends BaseModule {
  dynamicComponents = [...components];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}
