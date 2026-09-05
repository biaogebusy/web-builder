import { FormlyFieldConfig } from '@ngx-formly/core';

export function getShowcase1v1(widget: any): FormlyFieldConfig {
  return {
    key: 'showcase-1v1',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.LAYOUT_TAB',
        },
        fieldGroup: [
          {
            key: 'row',
            type: 'select',
            className: 'w-full',
            defaultValue: widget.row ?? 3,
            props: {
              label: 'BUILDER.FACTORY.COLS_PER_ROW',
              options: [
                { label: '1', value: 12 },
                { label: '2', value: 6 },
                { label: '3', value: 4 },
                { label: '4', value: 3 },
                { label: '6', value: 2 },
              ],
            },
          },
          {
            key: 'classes',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.classes ?? '',
            props: {
              label: 'BUILDER.FACTORY.WIDGET_CLASS',
            },
          },
        ],
      },
    ],
  };
}
