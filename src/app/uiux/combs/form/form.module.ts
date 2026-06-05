import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BaseModule } from '@uiux/base/base.module';
import { FormlyModule, FormlyFieldConfig, ConfigOption, FORMLY_CONFIG } from '@ngx-formly/core';
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

const TRANSLATABLE_PROPS = [
  'label',
  'placeholder',
  'description',
  'addText',
  'updateLabel',
  'addLabel',
  'deleteLabel',
  'tooltip',
] as const;
const TRANSLATION_KEY_RE = /^[A-Z][A-Z0-9_]*(\.[A-Z0-9_]+)+$/;

export function registerTranslateExtension(translate: TranslateService): ConfigOption {
  return {
    validationMessages: [
      {
        name: 'required',
        message: () => translate.instant('BUILDER.FORM_VALIDATION.REQUIRED'),
      },
      {
        name: 'max',
        message: () => translate.instant('BUILDER.FORM_VALIDATION.MAX'),
      },
      {
        name: 'min',
        message: () => translate.instant('BUILDER.FORM_VALIDATION.MIN'),
      },
    ],
    extensions: [
      {
        name: 'translate',
        extension: {
          prePopulate(field: FormlyFieldConfig) {
            const props = field.props as any;
            if (props && !props._translated) {
              props._translated = true;
              for (const key of TRANSLATABLE_PROPS) {
                const value = props[key];
                if (typeof value === 'string' && TRANSLATION_KEY_RE.test(value)) {
                  props[key] = translate.instant(value);
                }
              }
              if (Array.isArray(props.options)) {
                props.options = props.options.map((opt: any) => {
                  if (opt && typeof opt.label === 'string' && TRANSLATION_KEY_RE.test(opt.label)) {
                    return { ...opt, label: translate.instant(opt.label) };
                  }
                  return opt;
                });
              }
            }
            const messages = (field as any).validation?.messages;
            if (messages && !messages._translated) {
              messages._translated = true;
              for (const key of Object.keys(messages)) {
                if (key === '_translated') continue;
                const value = messages[key];
                if (typeof value === 'string' && TRANSLATION_KEY_RE.test(value)) {
                  messages[key] = () => translate.instant(value);
                }
              }
            }
          },
        },
      },
    ],
  };
}

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
    FormlyModule.forRoot({
      types: [
        {
          name: 'rich-text',
          component: RichTextComponent,
        },
        {
          name: 'rich-editor',
          component: RichEditorComponent,
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
        { name: 'dialog-repeat', component: DialogRepeatComponent },
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
    }),
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
