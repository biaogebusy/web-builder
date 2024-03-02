import { FormlyFieldConfig } from '@ngx-formly/core';

export function getChart(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'chart',
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: {
            label: '图表',
          },
          fieldGroup: [
            {
              key: 'title',
              fieldGroupClassName: 'width-100',
              fieldGroup: [
                {
                  key: 'text',
                  type: 'input',
                  defaultValue: widget.title.text,
                  templateOptions: {
                    label: '标题',
                  },
                },
                {
                  key: 'subtext',
                  type: 'input',
                  defaultValue: widget.title.subtext,
                  templateOptions: {
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
