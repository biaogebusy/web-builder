import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BaseModule } from '@uiux/base/base.module';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { NgOptimizedImage } from '@angular/common';
const components = [ManageMediaComponent, UploadMediaComponent];

@NgModule({
  declarations: [...components],
  imports: [
    MatSidenavModule,
    MatSliderModule,
    ShareModule,
    WidgetsModule,
    NgxFileDropModule,
    NgOptimizedImage,
  ],
  exports: [...components],
})
export class ManageModule extends BaseModule {
  dynamicComponents = [...components];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
  static forStorybook(): any {
    return [...components];
  }
}
