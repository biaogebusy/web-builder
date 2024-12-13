import { FormlyFieldConfig } from '@ngx-formly/core';
import { spacerOption } from './getSpacer';

export function getText(widget: any): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'text',
      type: 'tabs',
      fieldGroup: [
        {
          props: {
            label: '文本',
          },
          fieldGroup: [
            {
              key: 'body',
              type: 'rich-text',
              className: 'w-full',
              defaultValue: widget.body,
              props: {
                label: '文本',
                rows: 10,
              },
            },
            {
              key: 'spacer',
              type: 'select',
              className: 'w-full',
              defaultValue: widget.spacer,
              props: spacerOption,
            },
            {
              key: 'classes',
              type: 'input',
              className: 'w-full',
              defaultValue: widget.classes,
              props: {
                label: '自定义Class',
              },
            },
          ],
        },
      ],
    },
  ];

  return fields;
}
