import { NgModule } from '@angular/core';
import { BuilderComponent } from './builder.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareModule } from '@share/share.module';
import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderShowcaseComponent } from './main/builder-showcase/builder-showcase.component';
import { BuilderPanelComponent } from './sidebar/builder-panel/builder-panel.component';
import { BuilderGeneraterComponent } from './main/builder-generater/builder-generater.component';
import { BuilderPageComponent } from './sidebar/builder-page/builder-page.component';
import { BuilderListComponent } from './main/builder-list/builder-list.component';
import { SwitchPreviewComponent } from './toolbar/switch-preview/switch-preview.component';
import { BaseModule } from '@uiux/base/base.module';
import {
  BUILDER_CURRENT_PAGE,
  WIDGETS,
  UIUX,
  BUILDER_CONFIG,
  MEDIA_ASSETS,
} from '@core/token/token-providers';
import { uiux } from './data/uiux-for-builder';
import { PreviewComponent } from './preview/preview.component';
import { BuilderToolbarComponent } from './toolbar/builder-toolbar/builder-toolbar.component';
import { BtnGeneraterComponent } from './toolbar/btn-generater/btn-generater.component';
import { BuilderVersionComponent } from './sidebar/builder-version/builder-version.component';
import {
  builderCurrentPageFactory,
  getBuilderConfig,
  mediaAssetsFactory,
} from '@core/factory/factory';
import { InlineEditComponent } from './main/inline-editor/inline-editor.component';
import { LayoutBuilderComponent } from './layout-builder/layout-builder.component';
import { WidgetPickerComponent } from './main/widget-picker/widget-picker.component';
import { LayoutSettingComponent } from './layout-builder/layout-setting/layout-setting.component';
import { widgets } from './data/widgets-for-builder';
import { BrandingModule } from '@core/branding/branding.module';
import { BuilderUiuxComponent } from './sidebar/builder-uiux/builder-uiux.component';
import { BuilderSettingsComponent } from './sidebar/builder-settings/builder-settings.component';
import { PageListComponent } from './sidebar/page-list/page-list.component';
import { BuilderSidebarComponent } from './sidebar/builder-sidebar/builder-sidebar.component';
import { BuilderTemplateComponent } from './main/builder-template/builder-template.component';
import { LayoutToolbarComponent } from './layout-builder/layout-toolbar/layout-toolbar.component';
import { PageSettingComponent } from './main/page-setting/page-setting.component';
import { BuilderWorkspaceComponent } from './main/builder-workspace/builder-workspace.component';
import { ManagePageComponent } from './main/manage-page/manage-page.component';
import { JsonComponent } from './main/json/json.component';
import { CardListComponent } from './main/card-list/card-list.component';
import { CardPageComponent } from './main/card-list/card-page/card-page.component';
import { DefaultPageComponent } from './main/default-page/default-page.component';
import { FormModule } from '@uiux/combs/form/form.module';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { CollectorComponent } from './main/collector/collector.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

const components = [
  JsonComponent,
  BuilderComponent,
  BuilderListComponent,
  BuilderGeneraterComponent,
  BtnGeneraterComponent,
  InlineEditComponent,
  LayoutBuilderComponent,
  WidgetPickerComponent,
  LayoutSettingComponent,
  BuilderTemplateComponent,
  PageSettingComponent,
  CardListComponent,
  CardPageComponent,
];

@NgModule({
  declarations: [
    ...components,
    BuilderToolbarComponent,
    BuilderShowcaseComponent,
    BuilderPanelComponent,
    SwitchPreviewComponent,
    BuilderPageComponent,
    PreviewComponent,
    BuilderVersionComponent,
    InlineEditComponent,
    BuilderUiuxComponent,
    BuilderSettingsComponent,
    PageListComponent,
    BuilderSidebarComponent,
    LayoutToolbarComponent,
    BuilderWorkspaceComponent,
    ManagePageComponent,
    DefaultPageComponent,
    CollectorComponent,
  ],
  imports: [
    ShareModule,
    MatSidenavModule,
    MatCheckboxModule,
    WidgetsModule,
    BrandingModule,
    DragDropModule,
    BuilderRoutingModule,
    FormModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [
    {
      provide: BUILDER_CONFIG,
      useFactory: getBuilderConfig,
    },
    {
      provide: UIUX,
      useValue: uiux,
    },
    {
      provide: WIDGETS,
      useValue: widgets,
    },
    {
      provide: BUILDER_CURRENT_PAGE,
      useFactory: builderCurrentPageFactory,
    },
    {
      provide: MEDIA_ASSETS,
      useFactory: mediaAssetsFactory,
    },
  ],
  exports: [...components],
})
export class BuilderModule extends BaseModule {
  dynamicComponents = [...components];
}
