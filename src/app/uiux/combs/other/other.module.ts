import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';

import { AutocloseComponent } from './autoclose/autoclose.component';
import { BaseModule } from '@uiux/base/base.module';
import { JsoneditorComponent } from './jsoneditor/jsoneditor.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CustomTemplateComponent } from './custom-template/custom-template.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormModule } from '../form/form.module';

const components = [
  AutocloseComponent,
  JsoneditorComponent,
  CodeEditorComponent,
  CustomTemplateComponent,
];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, FormModule, MonacoEditorModule.forRoot()],
  exports: [...components],
})
export class OtherModule extends BaseModule {
  dynamicComponents = [...components];
}
