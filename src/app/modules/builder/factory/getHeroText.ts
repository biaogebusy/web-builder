import type { FormlyFieldConfig } from '@ngx-formly/core';
import { getText } from './getText';

/** Build settings for Hero variants with the same theme and text fields. */
export function getHeroText(
  widget: { theme?: string; text?: Parameters<typeof getText>[0] },
  key: string
): FormlyFieldConfig {
  return {
    key,
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
