import { FormlyFieldConfig } from '@ngx-formly/core';

export function getBtn(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'btn',
    type: 'tabs',
    className: 'w-full',
    fieldGroup: [
      {
        props: {
          label: '按钮',
        },
        fieldGroup: [
          {
            key: 'color',
            type: 'select',
            className: 'w-full',
            defaultValue: widget.color ?? null,
            props: {
              label: '颜色',
              options: [
                {
                  label: 'Basic',
                  value: null,
                },
                {
                  label: 'Primary',
                  value: 'primary',
                },
                {
                  label: 'Accent',
                  value: 'accent',
                },
                {
                  label: 'Warn',
                  value: 'warn',
                },
              ],
            },
          },
          {
            key: 'label',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.label ?? '',
            props: {
              type: 'text',
              label: '文本',
            },
            hideExpression: 'model.mode === "icon"',
          },
          {
            key: 'mode',
            type: 'select',
            className: 'w-full',
            defaultValue: widget.mode ?? 'basic',
            props: {
              label: '类型',
              options: [
                {
                  label: 'Basic',
                  value: 'basic',
                },
                {
                  label: 'raised',
                  value: 'raised',
                },
                {
                  label: 'stroked',
                  value: 'stroked',
                },
                {
                  label: 'icon',
                  value: 'icon',
                },
                {
                  label: 'flat',
                  value: 'flat',
                },
                {
                  label: 'fab',
                  value: 'fab',
                },
                {
                  label: 'mini-fab',
                  value: 'mini-fab',
                },
              ],
            },
          },
          {
            key: 'href',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.href ?? '/',
            props: {
              type: 'text',
              label: '链接地址',
            },
          },
          {
            key: 'target',
            type: 'select',
            className: 'w-full',
            defaultValue: widget.target ?? '_blank',
            props: {
              label: '打开方式',
              options: [
                {
                  label: '当前窗口',
                  value: '',
                },
                {
                  label: '新窗口',
                  value: '_blank',
                },
              ],
            },
            hideExpression: '!model.href',
          },
          {
            key: 'icon',
            className: 'w-full',
            fieldGroup: [
              {
                key: 'svg',
                type: 'mat-select',
                className: 'w-full',
                defaultValue: widget?.icon?.svg ?? '',
                props: {
                  label: '图标',
                  type: 'icon',
                  search: true,
                  options: [
                    {
                      label: '无',
                      value: '',
                    },
                  ],
                },
                modelOptions: {
                  debounce: {
                    default: 1500,
                  },
                },
              },
            ],
          },
          {
            key: 'iconPosition',
            className: 'w-full',
            defaultValue: widget?.iconPosition ?? 'left',
            type: 'select',
            props: {
              label: '图标位置',
              options: [
                {
                  label: '左侧',
                  value: 'left',
                },
                {
                  label: '右侧',
                  value: 'right',
                },
              ],
            },
          },
          {
            key: 'classes',
            type: 'input',
            className: 'w-full',
            defaultValue: widget.classes ?? '',
            props: {
              type: 'text',
              label: 'Class',
            },
          },
          {
            key: 'pill',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget.pill ?? false,
            props: {
              label: '胶囊样式',
            },
          },
          {
            key: 'containerClasses',
            type: 'input',
            className: '!hidden',
            defaultValue: '!overflow-visible',
            props: {
              label: '容器Class',
            },
          },
        ],
      },
    ],
  };

  return fieldsConfig;
}
