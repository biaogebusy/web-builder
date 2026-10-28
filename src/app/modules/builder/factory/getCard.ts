import { getCardFeatureFields } from './getCardFeatureFields';
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
              ...getCardFeatureFields(widget?.feature),
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
