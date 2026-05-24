import { FormlyFieldConfig } from '@ngx-formly/core';

export function getBox(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'box',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.CONTAINER_BOX',
        },
        fieldGroup: [
          {
            key: 'title',
            fieldGroup: [
              {
                key: 'label',
                type: 'input',
                defaultValue: widget?.title?.label,
                props: {
                  label: 'BUILDER.FACTORY.TITLE',
                  placeholder: 'BUILDER.FACTORY.TITLE_PLACEHOLDER',
                },
              },
              {
                key: 'href',
                type: 'input',
                defaultValue: widget?.title?.href,
                props: {
                  label: 'BUILDER.FACTORY.TITLE_LINK',
                },
              },
            ],
          },
          {
            key: 'content',
            type: 'textarea',
            defaultValue: widget?.content,
            props: {
              label: 'BUILDER.FACTORY.CONTENT',
              placeholder: 'BUILDER.FACTORY.CONTENT_PLACEHOLDER',
              rows: 3,
            },
          },
          {
            key: 'icon',
            fieldGroup: [
              {
                type: 'mat-select',
                key: 'svg',
                defaultValue: widget?.icon?.svg,
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
              },
            ],
          },
          {
            key: 'img',
            fieldGroup: [
              {
                type: 'img-picker',
                key: 'src',
                defaultValue: widget?.img?.src,
                props: {
                  updateLabel: 'BUILDER.FACTORY.IMG_UPDATE',
                  addLabel: 'BUILDER.FACTORY.IMG_ADD',
                  deleteLabel: 'BUILDER.FACTORY.IMG_DELETE',
                  fileName: widget?.img?.src.split('/').pop(),
                  alt: widget?.img?.alt ?? '',
                },
              },
            ],
          },
          {
            key: 'more',
            fieldGroup: [
              {
                type: 'input',
                key: 'label',
                defaultValue: widget?.more?.label,
                props: {
                  label: 'BUILDER.FACTORY.MORE',
                },
              },
              {
                type: 'input',
                key: 'href',
                defaultValue: widget?.more?.href,
                props: {
                  label: 'BUILDER.FACTORY.MORE_LINK',
                },
              },
            ],
          },
          {
            key: 'style',
            type: 'select',
            defaultValue: widget?.style,
            props: {
              label: 'BUILDER.FACTORY.STYLE_VARIANT',
              options: [
                {
                  label: 'BUILDER.FACTORY.VARIANT_V1',
                  value: 'style-v1',
                },
                {
                  label: 'BUILDER.FACTORY.VARIANT_V2',
                  value: 'style-v2',
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
                {
                  label: 'BUILDER.FACTORY.VARIANT_V6',
                  value: 'style-v6',
                },
                {
                  label: 'BUILDER.FACTORY.VARIANT_V7',
                  value: 'style-v7',
                },
                {
                  label: 'BUILDER.FACTORY.VARIANT_V8',
                  value: 'style-v8',
                },
                {
                  label: 'BUILDER.FACTORY.VARIANT_V9',
                  value: 'style-v9',
                },
                {
                  label: 'BUILDER.FACTORY.VARIANT_V10',
                  value: 'style-v10',
                },
              ],
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
