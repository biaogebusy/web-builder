import { FormlyFieldConfig } from '@ngx-formly/core';

export function getIcon(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'icon',
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: {
            label: '图标',
          },
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
      ],
    },
  ];

  if (options) {
    fields[0].fieldGroup.push(...options);
  }

  return fields;
}
