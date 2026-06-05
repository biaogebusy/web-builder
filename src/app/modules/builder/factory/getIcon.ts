import { FormlyFieldConfig } from '@ngx-formly/core';

export function getIcon(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'icon',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_ICON',
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
                  label: 'BUILDER.FACTORY.NONE',
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
              label: 'BUILDER.FACTORY.COLOR',
              options: [
                {
                  label: 'BUILDER.FACTORY.MAIN_COLOR',
                  value: 'primary',
                },
                {
                  label: 'BUILDER.FACTORY.ACCENT_COLOR',
                  value: 'accent',
                },
                {
                  label: 'BUILDER.FACTORY.WARN_COLOR',
                  value: 'warn',
                },
                {
                  label: 'BUILDER.FACTORY.DEFAULT_COLOR',
                  value: 'undefined',
                },
              ],
            },
          },
          {
            template:
              '<a class="text-xs text-gray-500" href="https://pictogrammers.com/library/mdi/" target="_blank">浏览图标库</a>',
          },
        ],
      },
    ],
  };

  return fields;
}
