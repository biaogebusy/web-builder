import { FormlyFieldConfig } from '@ngx-formly/core';

export function getTab1v1(widget: any): FormlyFieldConfig {
  return {
    key: 'tab-1v1',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_PARAMS',
        },
        fieldGroup: [
          {
            key: 'params',
            fieldGroup: [
              {
                key: 'type',
                type: 'input',
                className: 'w-full',
                defaultValue: widget?.params?.type ?? '',
                props: {
                  label: 'BUILDER.FACTORY.PAGE_TYPE',
                },
              },
            ],
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
