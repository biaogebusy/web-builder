import { FormlyFieldConfig } from '@ngx-formly/core';

export function getDivider(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'divider',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.DIVIDER_TAB',
        },
        fieldGroup: [
          {
            key: 'inset',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget?.inset,
            props: {
              label: 'BUILDER.FACTORY.DIVIDER_INSET',
            },
          },
        ],
      },
    ],
  };

  return fieldsConfig;
}
