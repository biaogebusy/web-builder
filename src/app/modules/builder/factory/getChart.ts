import { FormlyFieldConfig } from '@ngx-formly/core';

export function getChart(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'chart',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.CHART_TAB',
        },
        fieldGroup: [
          {
            key: 'title',
            fieldGroupClassName: 'w-full',
            fieldGroup: [
              {
                key: 'text',
                type: 'input',
                defaultValue: widget?.title?.text,
                props: {
                  label: 'BUILDER.FACTORY.TITLE',
                },
              },
              {
                key: 'subtext',
                type: 'input',
                defaultValue: widget?.title?.subtext,
                props: {
                  label: 'BUILDER.FACTORY.SUBTITLE',
                },
              },
            ],
          },
        ],
      },
    ],
  };

  return fields;
}
