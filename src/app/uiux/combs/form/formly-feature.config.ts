import type { Provider } from '@angular/core';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {
  FORMLY_CONFIG,
  FormlyConfig,
  FormlyFormBuilder,
  type ConfigOption,
  type FormlyFieldConfig,
  provideFormlyCore,
} from '@ngx-formly/core';
import { withFormlyMaterial } from '@ngx-formly/material';
import { withFormlyFieldDatepicker } from '@ngx-formly/material/datepicker';
import { withFormlyFieldToggle } from '@ngx-formly/material/toggle';
import { TranslateService } from '@ngx-translate/core';
import { DateRangeComponent } from './formly-type/date-range/date-range.component';
import { DialogRepeatComponent } from './formly-type/dialog-repeat/dialog-repeat.component';
import { ImgPickerComponent } from './formly-type/img-picker/img-picker.component';
import { JsonFieldType } from './formly-type/json/json.component';
import { MatSelectComponent } from './formly-type/mat-select/mat-select.component';
import { RepeatTypeComponent } from './formly-type/repeat.type';
import { RichEditorComponent } from './formly-type/rich-editor/rich-editor.component';
import { RichTextComponent } from './formly-type/rich-text/rich-text.component';
import { SliderComponent } from './formly-type/slider/slider.component';
import { TabsTypeComponent } from './formly-type/tabs/tabs.component';

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

export const XINSHI_FORMLY_CONFIG: ConfigOption = {
  types: [
    { name: 'rich-text', component: RichTextComponent },
    { name: 'rich-editor', component: RichEditorComponent },
    { name: 'mat-select', component: MatSelectComponent },
    { name: 'date-range', component: DateRangeComponent },
    { name: 'repeat', component: RepeatTypeComponent },
    { name: 'dialog-repeat', component: DialogRepeatComponent },
    { name: 'tabs', component: TabsTypeComponent },
    { name: 'img-picker', component: ImgPickerComponent },
    {
      name: 'slider',
      component: SliderComponent,
      wrappers: ['form-field'],
    },
    { name: 'json', component: JsonFieldType },
  ],
};

export function provideXinshiFormly(): Provider[] {
  return [
    provideFormlyCore([
      ...withFormlyMaterial(),
      withFormlyFieldDatepicker(),
      withFormlyFieldToggle(),
      XINSHI_FORMLY_CONFIG,
    ]),
    FormlyConfig,
    FormlyFormBuilder,
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'zh-cn' },
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: registerTranslateExtension,
      deps: [TranslateService],
    },
  ];
}

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
            if (typeof field.template === 'string' && TRANSLATION_KEY_RE.test(field.template)) {
              field.template = translate.instant(field.template);
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
