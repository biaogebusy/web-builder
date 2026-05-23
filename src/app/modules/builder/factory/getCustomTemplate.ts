import { FormlyFieldConfig } from '@ngx-formly/core';

const KEY_PATTERN = '^[-a-zA-Z0-9_]+$';

const WIDTH_OPTIONS = [
  { label: '小 (480px)', value: '480px' },
  { label: '中 (800px)', value: '800px' },
  { label: '大 (1000px)', value: '1000px' },
  { label: '全屏 (95vw)', value: '95vw' },
  { label: '自适应 (auto)', value: 'auto' },
];

const HEIGHT_OPTIONS = [
  { label: '自适应 (auto)', value: 'auto' },
  { label: '中 (400px)', value: '400px' },
  { label: '大 (600px)', value: '600px' },
  { label: '满屏 (90vh)', value: '90vh' },
];

export function getCustomTemplate(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'customTemplate',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: '自定义组件',
        },
        fieldGroup: [
          {
            key: 'isAPI',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget.isAPI ?? false,
            props: {
              label: 'API 数据来源',
            },
          },
          {
            key: 'api',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.api ?? '',
            props: {
              type: 'text',
              label: 'api',
              required: true,
            },
            hideExpression: '!model.isAPI',
          },
        ],
      },
      {
        props: {
          label: '弹窗',
        },
        fieldGroup: [
          {
            key: 'dialogs',
            type: 'dialog-repeat',
            defaultValue: widget.dialogs ?? [],
            className: 'w-full',
            props: {
              html: widget.html ?? '',
            },
            fieldArray: {
              fieldGroup: [
                {
                  key: 'key',
                  type: 'input',
                  className: 'w-full',
                  props: {
                    label: '触发 key（对应 data-dialog="..." 的值）',
                    required: true,
                    pattern: KEY_PATTERN,
                    description: '支持字母、数字、_、-',
                  },
                  validation: {
                    messages: {
                      pattern: '只允许字母、数字、_、-',
                    },
                  },
                },
                {
                  key: 'params',
                  fieldGroup: [
                    {
                      key: 'width',
                      type: 'select',
                      className: 'w-full',
                      defaultValue: 'auto',
                      props: {
                        label: '宽度',
                        options: WIDTH_OPTIONS,
                      },
                    },
                    {
                      key: 'height',
                      type: 'select',
                      className: 'w-full',
                      defaultValue: 'auto',
                      props: {
                        label: '高度',
                        options: HEIGHT_OPTIONS,
                      },
                    },
                  ],
                },
                {
                  key: 'content',
                  type: 'json',
                  className: 'w-full',
                  props: {
                    required: true,
                    rows: 12,
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  };

  return fields;
}
