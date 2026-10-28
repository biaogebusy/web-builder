import { getCardFeatureFields } from './getCardFeatureFields';
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
                defaultValue: widget?.link?.label,
                props: {
                  label: 'BUILDER.FACTORY.TITLE',
                  placeholder: 'BUILDER.FACTORY.TITLE_PLACEHOLDER',
                },
              },
              {
                key: 'href',
                type: 'input',
                defaultValue: widget?.link?.href,
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
            fieldGroup: getCardFeatureFields(widget?.feature),
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
