import { FormlyFieldConfig } from '@ngx-formly/core';

export function getDivider(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'divider',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: '分割线',
        },
        fieldGroup: [
          {
            key: 'inset',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget?.inset,
            props: {
              label: '缩进',
            },
          },
        ],
      },
    ],
  };

  return fieldsConfig;
}
