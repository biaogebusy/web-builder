import { FormlyFieldConfig } from '@ngx-formly/core';
import { getText } from './getText';

export function getHero2v1(widget: any): FormlyFieldConfig {
  return {
    key: 'hero-2v1',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_PARAMS',
        },
        fieldGroup: [
          {
            key: 'theme',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.theme ?? '',
            props: {
              label: 'BUILDER.FACTORY.THEME_CLASS',
            },
          },
          getText(widget.text ?? {}),
        ],
      },
    ],
  };
}
