import { FormlyFieldConfig } from '@ngx-formly/core';
import { spacerOption } from './getSpacer';

export function getText(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'text',
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: {
            label: '文本',
          },
          fieldGroup: [
            {
              key: 'body',
              type: 'rich-text',
              className: 'w-full',
              defaultValue: widget.body,
              templateOptions: {
                label: '文本',
                rows: 10,
              },
            },
            {
              key: 'spacer',
              type: 'select',
              className: 'w-full',
              defaultValue: widget.spacer,
              templateOptions: spacerOption,
            },
            {
              key: 'classes',
              type: 'input',
              className: 'w-full',
              defaultValue: widget.classes,
              templateOptions: {
                label: '自定义Class',
              },
            },
          ],
        },
      ],
    },
  ];

  if (options) {
    fields[0].fieldGroup.push(...options);
  }

  return fields;
}
