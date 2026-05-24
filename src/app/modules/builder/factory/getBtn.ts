import { FormlyFieldConfig } from '@ngx-formly/core';

export function getBtn(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'btn',
    type: 'tabs',
    className: 'w-full',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_BTN',
        },
        fieldGroup: [
          {
            key: 'color',
            type: 'select',
            className: 'w-full',
            defaultValue: widget.color ?? null,
            props: {
              label: 'BUILDER.FACTORY.COLOR',
              options: [
                {
                  label: 'BUILDER.FACTORY.MAT_BASIC',
                  value: null,
                },
                {
                  label: 'BUILDER.FACTORY.PRIMARY',
                  value: 'primary',
                },
                {
                  label: 'BUILDER.FACTORY.ACCENT',
                  value: 'accent',
                },
                {
                  label: 'BUILDER.FACTORY.WARN',
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
              label: 'BUILDER.FACTORY.TEXT_LABEL',
            },
            hideExpression: 'model.mode === "icon"',
          },
          {
            key: 'mode',
            type: 'select',
            className: 'w-full',
            defaultValue: widget.mode ?? 'basic',
            props: {
              label: 'BUILDER.FACTORY.BTN_TYPE',
              options: [
                {
                  label: 'BUILDER.FACTORY.MAT_BASIC',
                  value: 'basic',
                },
                {
                  label: 'BUILDER.FACTORY.MAT_RAISED',
                  value: 'raised',
                },
                {
                  label: 'BUILDER.FACTORY.MAT_STROKED',
                  value: 'stroked',
                },
                {
                  label: 'BUILDER.FACTORY.MAT_ICON',
                  value: 'icon',
                },
                {
                  label: 'BUILDER.FACTORY.MAT_FLAT',
                  value: 'flat',
                },
                {
                  label: 'BUILDER.FACTORY.FAB',
                  value: 'fab',
                },
                {
                  label: 'BUILDER.FACTORY.MINI_FAB',
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
              label: 'BUILDER.FACTORY.HREF',
            },
          },
          {
            key: 'target',
            type: 'select',
            className: 'w-full',
            defaultValue: widget.target ?? '_blank',
            props: {
              label: 'BUILDER.FACTORY.OPEN_HOW',
              options: [
                {
                  label: 'BUILDER.FACTORY.CURRENT_WINDOW',
                  value: '',
                },
                {
                  label: 'BUILDER.FACTORY.NEW_WINDOW',
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
                  label: 'BUILDER.FACTORY.ICON',
                  type: 'icon',
                  search: true,
                  options: [
                    {
                      label: 'BUILDER.FACTORY.NONE',
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
              label: 'BUILDER.FACTORY.ICON_POSITION',
              options: [
                {
                  label: 'BUILDER.FACTORY.LEFT_SIDE',
                  value: 'left',
                },
                {
                  label: 'BUILDER.FACTORY.RIGHT_SIDE',
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
              label: 'BUILDER.FACTORY.PILL_STYLE',
            },
          },
          {
            key: 'containerClasses',
            type: 'input',
            className: '!hidden',
            defaultValue: '!overflow-visible',
            props: {
              label: 'BUILDER.FACTORY.CONTAINER_CLASS',
            },
          },
        ],
      },
    ],
  };

  return fieldsConfig;
}
