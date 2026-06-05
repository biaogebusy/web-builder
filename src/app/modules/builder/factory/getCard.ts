import { FormlyFieldConfig } from '@ngx-formly/core';

export function getCard(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'card',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.CARD_TAB',
        },
        fieldGroup: [
          {
            key: 'title',
            type: 'input',
            defaultValue: widget?.title,
            props: {
              label: 'BUILDER.FACTORY.TITLE',
              placeholder: 'BUILDER.FACTORY.TITLE_PLACEHOLDER',
            },
          },
          {
            key: 'subTitle',
            type: 'input',
            defaultValue: widget?.subTitle,
            props: {
              label: 'BUILDER.FACTORY.SUBTITLE',
              placeholder: 'BUILDER.FACTORY.SUBTITLE_PLACEHOLDER',
            },
          },
          {
            key: 'classes',
            type: 'select',
            defaultValue: widget?.classes,
            props: {
              label: 'Class',
              options: [
                {
                  label: 'BUILDER.FACTORY.DEFAULT_CLASS',
                  value: '',
                },
                {
                  label: 'BUILDER.FACTORY.NO_SHADOW',
                  value: 'card-no-shadow',
                },
              ],
            },
          },
          {
            key: 'body',
            type: 'textarea',
            defaultValue: widget?.body,
            props: {
              label: 'BUILDER.FACTORY.CONTENT',
              placeholder: 'BUILDER.FACTORY.CONTENT_PLACEHOLDER',
              rows: 3,
            },
          },
          {
            key: 'feature',
            fieldGroup: [
              {
                key: 'link',
                type: 'input',
                defaultValue: widget?.feature?.link,
                props: {
                  label: 'BUILDER.FACTORY.LINK',
                  placeholder: 'BUILDER.FACTORY.LINK_PLACEHOLDER',
                },
              },
              {
                key: 'img',
                fieldGroup: [
                  {
                    type: 'img-picker',
                    key: 'src',
                    defaultValue: widget?.feature?.img?.src,
                    props: {
                      updateLabel: 'BUILDER.FACTORY.IMG_UPDATE',
                      addLabel: 'BUILDER.FACTORY.IMG_ADD',
                      deleteLabel: 'BUILDER.FACTORY.IMG_DELETE',
                      fileName: widget?.feature?.img?.src.split('/').pop(),
                      alt: widget?.feature?.img?.alt ?? '',
                    },
                  },
                ],
              },
              {
                key: 'ratios',
                type: 'select',
                defaultValue: widget?.feature?.ratios,
                props: {
                  label: 'BUILDER.FACTORY.IMG_RATIO',
                  options: [
                    {
                      label: '1:1',
                      value: 'media-1-1',
                    },
                    {
                      label: '2:1',
                      value: 'media-1-2',
                    },
                    {
                      label: '4:3',
                      value: 'media-4-3',
                    },
                    {
                      label: '16:9',
                      value: 'media-16-9',
                    },
                    {
                      label: '2:1',
                      value: 'media-2-1',
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
      },
    ],
  };

  return fieldsConfig;
}
