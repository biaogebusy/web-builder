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
  UIUX,
} from '@core/token/token-providers';
import { uiux } from './data/uiux-for-builder';
import { PreviewComponent } from './preview/preview.component';
import { BuilderToolbarComponent } from './toolbar/builder-toolbar/builder-toolbar.component';
import { samples } from './data/samples-for-builder';
import { BtnGeneraterComponent } from './toolbar/btn-generater/btn-generater.component';
import { BuilderVersionComponent } from './sidebar/builder-version/builder-version.component';
import { builderCurrentPageFactory } from '@core/factory/factory';
import { LocalStorageService } from 'ngx-webstorage';
import { MetaEditComponent } from './main/meta-edit/meta-edit.component';

const components = [
  BuilderComponent,
  BuilderListComponent,
  BuilderGeneraterComponent,
  BtnGeneraterComponent,
  MetaEditComponent,
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
    MetaEditComponent,
  ],
  imports: [
    ShareModule,
    MatSidenavModule,
    WidgetsModule,
    DragDropModule,
    BuilderRoutingModule,
  ],
  providers: [
    {
      provide: UIUX,
      useValue: uiux,
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
