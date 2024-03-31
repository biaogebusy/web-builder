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
              key: 'spacer',
              type: 'select',
              className: 'width-100',
              defaultValue: widget.spacer,
              templateOptions: spacerOption,
            },
            {
              key: 'body',
              type: 'textarea',
              className: 'width-100',
              defaultValue: widget.body,
              templateOptions: {
                label: '文本',
                rows: 10,
              },
            },
            {
              key: 'classes',
              type: 'input',
              className: 'width-100',
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
