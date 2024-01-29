import { FormlyFieldConfig } from '@ngx-formly/core';

export function getChart(widget: any): FormlyFieldConfig[] {
  return [
    {
      key: 'chart',
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
  ];
}
