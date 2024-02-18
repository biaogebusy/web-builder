import { FormlyFieldConfig } from '@ngx-formly/core';
import { spacerOption } from './getSpacer';

export function getText(widget: any): FormlyFieldConfig[] {
  return [
    {
      key: 'text',
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
      ],
    },
  ];
}
