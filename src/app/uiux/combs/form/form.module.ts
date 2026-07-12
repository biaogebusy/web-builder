import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BaseModule } from '@uiux/base/base.module';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { TranslateService } from '@ngx-translate/core';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DateRangeComponent } from './formly-type/date-range/date-range.component';
import { ImgPickerComponent } from './formly-type/img-picker/img-picker.component';
import { MatSelectComponent } from './formly-type/mat-select/mat-select.component';
import { RepeatTypeComponent } from './formly-type/repeat.type';
import { RichTextComponent } from './formly-type/rich-text/rich-text.component';
import { SliderComponent } from './formly-type/slider/slider.component';
import { TabsTypeComponent } from './formly-type/tabs/tabs.component';
import { FormlyComponent } from './formly/formly.component';
import { TermsServiceComponent } from './terms-service/terms-service.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { QuillModule } from 'ngx-quill';
import { JsonFieldType } from './formly-type/json/json.component';
import { RichEditorComponent } from './formly-type/rich-editor/rich-editor.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DialogRepeatComponent } from './formly-type/dialog-repeat/dialog-repeat.component';
import { registerTranslateExtension, XINSHI_FORMLY_CONFIG } from './formly-feature.config';

const standaloneComponents = [
  SliderComponent,
  FormlyComponent,
  RichTextComponent,
  TabsTypeComponent,
  ImgPickerComponent,
  MatSelectComponent,
  DateRangeComponent,
  RichEditorComponent,
  RepeatTypeComponent,
  DatepickerComponent,
  DynamicFormComponent,
  TermsServiceComponent,
  DialogRepeatComponent,
];

const components = [...standaloneComponents];

@NgModule({
  imports: [
    ShareModule,
    FormlyMatSliderModule,
    FormlyMatToggleModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    NgxMatSelectSearchModule,
    WidgetsModule,
    MatDatepickerModule,
    MatSliderModule,
    JsonFieldType,
    ...standaloneComponents,

    QuillModule.forRoot(),
    FormlyModule.forChild(XINSHI_FORMLY_CONFIG),
  ],
  providers: [
    MatDatepickerModule,
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'zh-cn' },
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: registerTranslateExtension,
      deps: [TranslateService],
    },
  ],
  exports: [...components],
})
export class FormModule extends BaseModule {
  dynamicComponents = [...components];
}
