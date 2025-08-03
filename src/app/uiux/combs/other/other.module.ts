import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { MatChipsModule } from '@angular/material/chips';

import { AutocloseComponent } from './autoclose/autoclose.component';
import { BaseModule } from '@uiux/base/base.module';
import { JsoneditorComponent } from './jsoneditor/jsoneditor.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { CustomTemplateComponent } from './custom-template/custom-template.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormModule } from '../form/form.module';
import { DownloadComponent } from './download/download.component';
import { FlagComponent } from './flag/flag.component';
import { StepperComponent } from './stepper/stepper.component';
import { ChipListComponent } from './chip-list/chip-list.component';
import { IframeComponent } from './iframe/iframe.component';

const components = [
  AutocloseComponent,
  JsoneditorComponent,
  CodeEditorComponent,
  CustomTemplateComponent,
  FlagComponent,
  DownloadComponent,
  StepperComponent,
  ChipListComponent,
  IframeComponent,
];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, FormModule, MatChipsModule, MonacoEditorModule.forRoot()],
  exports: [...components],
})
export class OtherModule extends BaseModule {
  dynamicComponents = [...components];
}
