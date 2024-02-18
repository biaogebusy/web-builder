import { FormlyFieldConfig } from '@ngx-formly/core';

export function getIcon(widget: any): FormlyFieldConfig[] {
  return [
    {
      key: 'icon',
      fieldGroupClassName: 'width-100',
      fieldGroup: [
        {
          key: 'svg',
          type: 'input',
          defaultValue: widget.svg,
          templateOptions: {
            label: 'Icon',
          },
        },
        {
          key: 'color',
          type: 'select',
          defaultValue: widget.color,
          templateOptions: {
            label: '颜色',
            options: [
              {
                label: '主色',
                value: 'primary',
              },
              {
                label: '强调色',
                value: 'accent',
              },
              {
                label: '警告色',
                value: 'warn',
              },
              {
                label: '默认',
                value: 'undefined',
              },
            ],
          },
        },
        {
          template:
            '<a href="https://pictogrammers.com/library/mdi/" target="_blank">浏览图标库</a>',
        },
      ],
    },
  ];
}
