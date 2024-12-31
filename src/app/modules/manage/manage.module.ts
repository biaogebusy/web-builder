import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BaseModule } from '@uiux/base/base.module';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { NgOptimizedImage } from '@angular/common';
import { TaxonomyComponent } from './taxonomy/taxonomy.component';
import { FormModule } from '@uiux/combs/form/form.module';
const components = [ManageMediaComponent, UploadMediaComponent, TaxonomyComponent];

@NgModule({
  declarations: [...components],
  imports: [
    MatSidenavModule,
    MatSliderModule,
    MatCheckboxModule,
    ShareModule,
    WidgetsModule,
    NgxFileDropModule,
    NgOptimizedImage,
    FormModule,
  ],

  exports: [...components],
})
export class ManageModule extends BaseModule {
  dynamicComponents = [...components];

  static forStorybook(): any {
    return [...components];
  }
}
