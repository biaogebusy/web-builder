import { FormlyFieldConfig } from '@ngx-formly/core';

export function getDivider(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fieldsConfig = [
    {
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
    },
  ];
  if (options) {
    fieldsConfig[0].fieldGroup.push(...options);
  }

  return fieldsConfig;
}
