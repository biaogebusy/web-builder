import type { FormlyFieldConfig } from '@ngx-formly/core';

/** Keep the shared card image fields on their existing feature paths. */
export function getCardFeatureFields(
  feature:
    | {
        link?: string;
        img?: { src?: string; alt?: string };
        ratios?: string;
      }
    | undefined
): FormlyFieldConfig[] {
  return [
    {
      key: 'link',
      type: 'input',
      defaultValue: feature?.link,
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
          defaultValue: feature?.img?.src,
          props: {
            updateLabel: 'BUILDER.FACTORY.IMG_UPDATE',
            addLabel: 'BUILDER.FACTORY.IMG_ADD',
            deleteLabel: 'BUILDER.FACTORY.IMG_DELETE',
            fileName: feature?.img?.src?.split('/').pop(),
            alt: feature?.img?.alt ?? '',
          },
        },
      ],
    },
    {
      key: 'ratios',
      type: 'select',
      defaultValue: feature?.ratios,
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
  ];
}
