import { FormlyFieldConfig } from '@ngx-formly/core';

export function getCustomTemplate(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'customTemplate',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: '自定义组件',
        },
        fieldGroup: [
          {
            key: 'isAPI',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget.isAPI ?? false,
            props: {
              label: 'API 数据来源',
            },
          },
          {
            key: 'api',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.api ?? '',
            props: {
              type: 'text',
              label: 'api',
              required: true,
            },
            hideExpression: '!model.isAPI',
          },
        ],
      },
    ],
  };

  return fields;
}
