import { FormlyFieldConfig } from '@ngx-formly/core';

export function getShowcase4v1(widget: any): FormlyFieldConfig {
  return {
    key: 'showcase-4v1',
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
                key: 'api',
                type: 'input',
                className: 'w-full',
                defaultValue: widget?.params?.api ?? '',
                props: {
                  label: 'BUILDER.FACTORY.API_URL',
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
