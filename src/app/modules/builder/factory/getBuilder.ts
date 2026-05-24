import { FormlyFieldConfig } from '@ngx-formly/core';
import { getGridLayoutConfig, getSpacerOptions } from './getCommon';
export function getBuilder(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'builder',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.BUILDER_LAYOUT_TAB',
        },
        fieldGroup: [
          ...getGridLayoutConfig(widget),
          {
            type: 'input',
            key: 'wrapperClass',
            className: 'w-full',
            defaultValue: widget.wrapperClass ?? '',
            props: {
              label: 'BUILDER.FACTORY.WRAPPER_CLASSES',
            },
          },
          {
            type: 'select',
            key: 'spacer',
            defaultValue: widget.spacer ?? 'md',
            className: 'w-2/5',
            props: {
              label: 'BUILDER.FACTORY.VERTICAL_GAP',
              options: getSpacerOptions,
            },
          },
        ],
      },
    ],
  };

  return fields;
}
