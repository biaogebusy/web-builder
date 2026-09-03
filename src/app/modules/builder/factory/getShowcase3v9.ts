import { FormlyFieldConfig } from '@ngx-formly/core';

export function getShowcase3v9(widget: any): FormlyFieldConfig {
  return {
    key: 'showcase-3v9',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.LAYOUT_TAB',
        },
        fieldGroup: [
          {
            key: 'order',
            fieldGroupClassName: 'grid grid-cols-2 gap-3',
            fieldGroup: [
              {
                key: 'left',
                type: 'select',
                className: 'w-full',
                defaultValue: widget?.order?.left ?? 1,
                props: {
                  label: 'BUILDER.FACTORY.LEFT_SIDE',
                  options: [
                    { label: '1', value: 1 },
                    { label: '2', value: 2 },
                  ],
                },
              },
              {
                key: 'right',
                type: 'select',
                className: 'w-full',
                defaultValue: widget?.order?.right ?? 2,
                props: {
                  label: 'BUILDER.FACTORY.RIGHT_SIDE',
                  options: [
                    { label: '1', value: 1 },
                    { label: '2', value: 2 },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  };
}
