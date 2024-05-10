import { FormlyFieldConfig } from '@ngx-formly/core';
import { getFlexLayoutConfig } from './getCommon';
export function getBuilder(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'builder',
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: {
            label: '布局',
          },
          fieldGroup: [
            ...getFlexLayoutConfig(widget),
            {
              type: 'input',
              key: 'wrapperClass',
              className: 'w-full',
              defaultValue: widget.wrapperClass || '',
              templateOptions: {
                label: 'Wrapper Classes',
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
