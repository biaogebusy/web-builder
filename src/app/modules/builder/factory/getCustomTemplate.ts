import { FormlyFieldConfig } from '@ngx-formly/core';

const KEY_PATTERN = '^[-a-zA-Z0-9_]+$';

const WIDTH_OPTIONS = [
  { label: 'BUILDER.FACTORY.WIDTH_SMALL', value: '480px' },
  { label: 'BUILDER.FACTORY.WIDTH_MEDIUM', value: '800px' },
  { label: 'BUILDER.FACTORY.WIDTH_LARGE', value: '1000px' },
  { label: 'BUILDER.FACTORY.WIDTH_FULL', value: '95vw' },
  { label: 'BUILDER.FACTORY.WIDTH_AUTO', value: 'auto' },
];

const HEIGHT_OPTIONS = [
  { label: 'BUILDER.FACTORY.HEIGHT_AUTO', value: 'auto' },
  { label: 'BUILDER.FACTORY.HEIGHT_MEDIUM', value: '400px' },
  { label: 'BUILDER.FACTORY.HEIGHT_LARGE', value: '600px' },
  { label: 'BUILDER.FACTORY.HEIGHT_FULL', value: '90vh' },
];

export function getCustomTemplate(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'customTemplate',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.CUSTOM_WIDGET',
        },
        fieldGroup: [
          {
            key: 'isAPI',
            type: 'toggle',
            className: 'w-full',
            defaultValue: widget.isAPI ?? false,
            props: {
              label: 'BUILDER.FACTORY.API_SOURCE',
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
          label: 'BUILDER.FACTORY.DIALOG_TAB',
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
                    label: 'BUILDER.FACTORY.DIALOG_KEY_LABEL',
                    required: true,
                    pattern: KEY_PATTERN,
                    description: 'BUILDER.FACTORY.DIALOG_KEY_DESC',
                  },
                  validation: {
                    messages: {
                      pattern: 'BUILDER.FACTORY.DIALOG_KEY_PATTERN_ERR',
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
                        label: 'BUILDER.FACTORY.WIDTH',
                        options: WIDTH_OPTIONS,
                      },
                    },
                    {
                      key: 'height',
                      type: 'select',
                      className: 'w-full',
                      defaultValue: 'auto',
                      props: {
                        label: 'BUILDER.FACTORY.HEIGHT',
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
