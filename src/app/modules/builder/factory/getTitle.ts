import { FormlyFieldConfig } from '@ngx-formly/core';

export function getTitle(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'title',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.STYLE_TAB',
        },
        fieldGroup: [
          {
            type: 'select',
            key: 'style',
            className: 'w-full',
            defaultValue: widget.style,
            props: {
              label: 'BUILDER.FACTORY.STYLE_VARIANT',
              options: [
                {
                  label: 'BUILDER.FACTORY.NONE',
                  value: 'none',
                },
                {
                  label: 'BUILDER.FACTORY.VARIANT_V1',
                  value: 'style-v1',
                },
                {
                  label: 'BUILDER.FACTORY.VARIANT_V3',
                  value: 'style-v3',
                },
                {
                  label: 'BUILDER.FACTORY.VARIANT_V4',
                  value: 'style-v4',
                },
                {
                  label: 'BUILDER.FACTORY.VARIANT_V5',
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
              label: 'BUILDER.FACTORY.SIZE_LABEL',
              options: [
                {
                  label: 'BUILDER.FACTORY.NONE',
                  value: '',
                },
                {
                  label: 'BUILDER.FACTORY.LEVEL_1',
                  value: 'mat-headline-1 bold',
                },
                {
                  label: 'BUILDER.FACTORY.LEVEL_2',
                  value: 'mat-headline-2 bold',
                },
                {
                  label: 'BUILDER.FACTORY.LEVEL_3',
                  value: 'mat-headline-3 bold',
                },
                {
                  label: 'BUILDER.FACTORY.LEVEL_4',
                  value: 'mat-headline-4 bold',
                },
              ],
            },
          },
        ],
      },
      {
        props: {
          label: 'BUILDER.FACTORY.EFFECTS',
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
                  label: 'BUILDER.FACTORY.TYPED_EFFECT',
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
                      label: 'BUILDER.FACTORY.LOOP',
                    },
                  },
                  {
                    key: 'typeSpeed',
                    type: 'input',
                    defaultValue: widget?.typed?.config?.typeSpeed ?? 120,
                    props: {
                      label: 'BUILDER.FACTORY.TYPE_SPEED',
                      min: 10,
                      max: 1000,
                      step: 2,
                      type: 'number',
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
                        label: 'BUILDER.FACTORY.TEXT',
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
