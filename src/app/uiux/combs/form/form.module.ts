import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BaseModule } from '@uiux/base/base.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
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
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { QuillModule } from 'ngx-quill';
import { JsonFieldType } from './formly-type/json/json.component';

const components = [
  SliderComponent,
  FormlyComponent,
  RichTextComponent,
  TabsTypeComponent,
  ImgPickerComponent,
  ContactUsComponent,
  MatSelectComponent,
  DateRangeComponent,
  RepeatTypeComponent,
  DatepickerComponent,
  TermsServiceComponent,
];
@NgModule({
  declarations: [...components],
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

    QuillModule.forRoot(),
    FormlyModule.forRoot({
      types: [
        {
          name: 'rich-text',
          component: RichTextComponent,
        },
        {
          name: 'mat-select',
          component: MatSelectComponent,
        },
        {
          name: 'date-range',
          component: DateRangeComponent,
        },
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'tabs', component: TabsTypeComponent },
        { name: 'img-picker', component: ImgPickerComponent },
        {
          name: 'slider',
          component: SliderComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'json',
          component: JsonFieldType,
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
  providers: [MatDatepickerModule, { provide: MAT_DATE_LOCALE, useValue: 'zh-cn' }],
  exports: [...components],
})
export class FormModule extends BaseModule {
  dynamicComponents = [...components];
}
