import { FormlyFieldConfig } from '@ngx-formly/core';

export function getCard1v1(widget: any): FormlyFieldConfig {
  const fieldsConfig = {
    key: 'card1v1',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.CARD_1V1_TAB',
        },
        fieldGroup: [
          {
            key: 'link',
            fieldGroup: [
              {
                key: 'label',
                type: 'input',
                defaultValue: widget?.link.label,
                props: {
                  label: 'BUILDER.FACTORY.TITLE',
                  placeholder: 'BUILDER.FACTORY.TITLE_PLACEHOLDER',
                },
              },
              {
                key: 'href',
                type: 'input',
                defaultValue: widget?.link.href,
                props: {
                  label: 'BUILDER.FACTORY.LINK',
                  placeholder: 'BUILDER.FACTORY.LINK_PLACEHOLDER',
                },
              },
            ],
          },
          {
            key: 'user',
            type: 'input',
            defaultValue: widget?.user,
            props: {
              label: 'BUILDER.FACTORY.USER',
              placeholder: 'BUILDER.FACTORY.USERNAME_PLACEHOLDER',
            },
          },
          {
            key: 'time',
            type: 'input',
            defaultValue: widget?.time,
            props: {
              label: 'BUILDER.FACTORY.TIME',
              placeholder: 'BUILDER.FACTORY.TIME',
              type: 'date',
            },
          },

          {
            key: 'moreLabel',
            type: 'input',
            defaultValue: widget?.moreLabel,
            props: {
              label: 'BUILDER.FACTORY.MORE',
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
                      fileName: widget.feature.img.src.split('/').pop(),
                      alt: widget.alt ?? '',
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
            ],
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
