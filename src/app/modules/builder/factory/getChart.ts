import { FormlyFieldConfig } from '@ngx-formly/core';

export function getChart(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'chart',
      type: 'tabs',
      fieldGroup: [
        {
          props: {
            label: '图表',
          },
          fieldGroup: [
            {
              key: 'title',
              fieldGroupClassName: 'w-full',
              fieldGroup: [
                {
                  key: 'text',
                  type: 'input',
                  defaultValue: widget.title.text,
                  props: {
                    label: '标题',
                  },
                },
                {
                  key: 'subtext',
                  type: 'input',
                  defaultValue: widget.title.subtext,
                  props: {
                    label: '副标题',
                  },
                },
              ],
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
