import { FormlyFieldConfig } from '@ngx-formly/core';
import { getChart } from './getChart';

export function getChartBox(widget: any): FormlyFieldConfig {
  return {
    key: 'chart-box',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_PARAMS',
        },
        fieldGroup: [
          {
            key: 'label',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.label ?? '',
            props: {
              label: 'BUILDER.FACTORY.TEXT_LABEL',
            },
          },
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
      // Forward the inner chart config so the chart type, legend, axes etc.
      // are all editable from the chart-box panel without opening a child.
      ...getChart(widget.chart ?? {}, ''),
    ],
  };
}
