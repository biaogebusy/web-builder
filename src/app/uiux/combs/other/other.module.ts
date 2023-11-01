import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { NotfoundComponent } from './notfound/notfound.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { AutocloseComponent } from './autoclose/autoclose.component';
import { BaseModule } from '@uiux/base/base.module';
import { JsoneditorComponent } from './jsoneditor/jsoneditor.component';
import { ThemePreviewComponent } from './theme-preview/theme-preview.component';

const components = [
  NotfoundComponent,
  DynamicFormComponent,
  AutocloseComponent,
  JsoneditorComponent,
  ThemePreviewComponent,
];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, NgJsonEditorModule],
  exports: [...components],
})
export class OtherModule extends BaseModule {
  dynamicComponents = [...components];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}
