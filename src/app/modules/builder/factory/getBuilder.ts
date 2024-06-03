import { FormlyFieldConfig } from '@ngx-formly/core';
import { getFlexLayoutConfig, getSpacerOptions } from './getCommon';
export function getBuilder(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'builder',
      type: 'tabs',
      fieldGroup: [
        {
          props: {
            label: '布局',
          },
          fieldGroup: [
            ...getFlexLayoutConfig(widget),
            {
              type: 'input',
              key: 'wrapperClass',
              className: 'w-full',
              defaultValue: widget.wrapperClass ?? '',
              props: {
                label: 'Wrapper Classes',
              },
            },
            {
              type: 'select',
              key: 'spacer',
              defaultValue: widget.spacer ?? 'md',
              className: 'w-2/5',
              props: {
                label: '上下间距',
                options: getSpacerOptions,
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
