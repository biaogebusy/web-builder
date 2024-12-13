import { FormlyFieldConfig } from '@ngx-formly/core';

export function getTitle(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'title',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: '样式',
        },
        fieldGroup: [
          {
            type: 'select',
            key: 'style',
            className: 'w-full',
            defaultValue: widget.style,
            props: {
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
            className: 'w-full',
            defaultValue: widget.classes,
            props: {
              label: '大小',
              options: [
                {
                  label: '无',
                  value: '',
                },
                {
                  label: '1级',
                  value: 'mat-headline-1 bold',
                },
                {
                  label: '2级',
                  value: 'mat-headline-2 bold',
                },
                {
                  label: '3级',
                  value: 'mat-headline-3 bold',
                },
                {
                  label: '4级',
                  value: 'mat-headline-4 bold',
                },
              ],
            },
          },
        ],
      },
      {
        props: {
          label: '特效',
        },
        fieldGroup: [
          {
            key: 'typed',
            fieldGroup: [
              {
                key: 'enable',
                type: 'toggle',
                defaultValue: widget?.typed?.enable ?? false,
                props: {
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
                    props: {
                      label: '循环',
                    },
                  },
                  {
                    key: 'typeSpeed',
                    type: 'slider',
                    defaultValue: widget?.typed?.config?.typeSpeed ?? 120,
                    props: {
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
                defaultValue: widget?.typed?.strings ?? [{ label: 'web builder' }],
                fieldArray: {
                  fieldGroup: [
                    {
                      key: 'label',
                      type: 'input',
                      defaultValue: widget?.typed?.strings[0]['label'] ?? 'web builder',
                      modelOptions: {
                        debounce: {
                          default: 2000,
                        },
                      },
                      props: {
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
  };

  return fields;
}
