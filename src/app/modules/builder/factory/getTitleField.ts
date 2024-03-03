import { FormlyFieldConfig } from '@ngx-formly/core';

export function getTitleField(
  widget: any,
  options?: any[]
): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'title',
      type: 'tabs',
      fieldGroup: [
        {
          templateOptions: {
            label: '样式',
          },
          fieldGroup: [
            {
              type: 'select',
              key: 'style',
              className: 'width-100',
              defaultValue: widget.style,
              templateOptions: {
                label: '风格',
                options: [
                  {
                    label: '无',
                    value: 'none',
                  },
                  {
                    label: 'V1',
                    value: 'style-v1',
                  },
                  {
                    label: 'V3',
                    value: 'style-v3',
                  },
                  {
                    label: 'V4',
                    value: 'style-v4',
                  },
                  {
                    label: 'V5',
                    value: 'style-v5',
                  },
                ],
              },
            },
            {
              type: 'select',
              key: 'classes',
              className: 'width-100',
              defaultValue: widget.classes,
              templateOptions: {
                label: '大小',
                options: [
                  {
                    label: '无',
                    value: '',
                  },
                  {
                    label: '1级',
                    value: 'mat-display-1 bold',
                  },
                  {
                    label: '2级',
                    value: 'mat-display-2 bold',
                  },
                  {
                    label: '3级',
                    value: 'mat-display-3 bold',
                  },
                  {
                    label: '4级',
                    value: 'mat-display-4 bold',
                  },
                ],
              },
            },
          ],
        },
        {
          templateOptions: {
            label: '特效',
          },
          fieldGroup: [
            {
              key: 'typed',
              fieldGroup: [
                {
                  key: 'enable',
                  type: 'toggle',
                  defaultValue: widget?.typed?.enable || false,
                  templateOptions: {
                    label: '开启打字效果',
                  },
                },
                {
                  key: 'config',
                  fieldGroup: [
                    {
                      key: 'loop',
                      type: 'toggle',
                      defaultValue: widget?.typed?.config?.loop,
                      templateOptions: {
                        label: '循环',
                      },
                    },
                    {
                      key: 'typeSpeed',
                      type: 'slider',
                      defaultValue: widget?.typed?.config?.typeSpeed || 120,
                      templateOptions: {
                        label: '速度',
                        min: 10,
                        max: 1000,
                        step: 2,
                        unit: 'ms',
                      },
                    },
                  ],
                },
                {
                  key: 'strings',
                  type: 'repeat',
                  defaultValue: widget?.typed?.strings || [
                    { label: 'web builder' },
                  ],
                  fieldArray: {
                    fieldGroup: [
                      {
                        key: 'label',
                        type: 'input',
                        defaultValue:
                          widget?.typed?.strings[0]['label'] || 'web builder',
                        modelOptions: {
                          debounce: {
                            default: 2000,
                          },
                        },
                        templateOptions: {
                          label: '文字',
                        },
                      },
                    ],
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
