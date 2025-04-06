import { FormlyFieldConfig } from '@ngx-formly/core';

export function getIcon(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'icon',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: '图标',
        },
        fieldGroup: [
          {
            key: 'svg',
            type: 'mat-select',
            defaultValue: widget.svg,
            props: {
              label: 'Icon',
              type: 'icon',
              search: true,
              options: [
                {
                  label: '无',
                  value: '',
                },
              ],
            },
          },
          {
            key: 'color',
            type: 'select',
            defaultValue: widget.color,
            props: {
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
  };

  return fields;
}
