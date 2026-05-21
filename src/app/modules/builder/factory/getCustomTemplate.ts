import { FormlyFieldConfig } from '@ngx-formly/core';

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
            template: `
              <div class="text-sm text-gray-500 mb-3">
                在 HTML 中给任意元素加 <code>data-dialog="key"</code>，点击即可打开下方对应 key 的弹窗。
              </div>
            `,
          },
          {
            key: 'dialogs',
            type: 'repeat',
            defaultValue: widget.dialogs ?? [],
            className: 'w-full',
            props: {
              addText: '新增弹窗',
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
                  },
                },
                {
                  key: 'params',
                  fieldGroup: [
                    {
                      fieldGroupClassName: 'flex gap-2',
                      fieldGroup: [
                        {
                          key: 'width',
                          type: 'input',
                          className: 'flex-1',
                          props: {
                            label: '宽度',
                            placeholder: '例如：800px / 80vw',
                          },
                        },
                        {
                          key: 'height',
                          type: 'input',
                          className: 'flex-1',
                          props: {
                            label: '高度',
                            placeholder: '例如：auto / 600px',
                          },
                        },
                      ],
                    },
                    {
                      key: 'panelClass',
                      type: 'input',
                      className: 'w-full',
                      props: {
                        label: 'panelClass（多个用空格分隔）',
                        placeholder: 'close-outside dialog-p-0 close-icon-white',
                      },
                    },
                  ],
                },
                {
                  key: 'content',
                  type: 'json',
                  className: 'w-full',
                  props: {
                    label: '弹窗内容（widget JSON，单个对象或数组）',
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
