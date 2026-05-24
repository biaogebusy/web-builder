import { FormlyFieldConfig } from '@ngx-formly/core';
import { getAspectRatio, getObjectFix } from './getCommon';

export function getInlineImg(ele: any): FormlyFieldConfig[] {
  return [
    {
      type: 'img-picker',
      key: 'src',
      defaultValue: ele.src,
      className: 'mb-5',
      props: {
        updateLabel: 'BUILDER.FACTORY.IMG_UPDATE',
        addLabel: 'BUILDER.FACTORY.IMG_ADD',
        deleteLabel: 'BUILDER.FACTORY.IMG_DELETE',
        fileName: ele.getAttribute('src').split('/').pop(),
        alt: ele.getAttribute('alt'),
      },
    },
    {
      key: 'style',
      fieldGroup: [
        {
          fieldGroupClassName: 'grid grid-cols-12 gap-3',
          fieldGroup: [
            {
              type: 'input',
              key: 'width',
              defaultValue: parseInt(ele.getAttribute('width')) ?? ele.width,
              className: 'col-span-6',
              props: {
                label: 'W',
                type: 'number',
              },
            },
            {
              type: 'input',
              key: 'height',
              className: 'col-span-6',
              defaultValue: parseInt(ele.getAttribute('height')) ?? ele.height,
              props: {
                label: 'H',
                type: 'number',
              },
            },
            {
              type: 'input',
              key: 'opacity',
              className: 'col-span-6',
              defaultValue: ele.style.opacity ?? 1,
              props: {
                label: 'Opacity',
                type: 'number',
                step: 0.1,
              },
            },
            {
              type: 'input',
              key: 'borderRadius',
              className: 'col-span-6',
              defaultValue: ele.style.borderRadius ?? 0,
              props: {
                label: 'BUILDER.FACTORY.RADIUS',
              },
            },
          ],
        },
        {
          type: 'select',
          key: 'boxShadow',
          className: 'w-full',
          defaultValue: ele.style.boxShadow ?? 'none',
          props: {
            label: 'BUILDER.FACTORY.SHADOW',
            options: [
              {
                label: 'BUILDER.FACTORY.NONE',
                value: 'none',
              },
              {
                label: 'BUILDER.FACTORY.SIZE_SM',
                value: 'rgba(0, 0, 0, 0.1) 0 2px 4px',
              },
              {
                label: 'BUILDER.FACTORY.SIZE_MD',
                value: 'rgba(0, 0, 0, 0.1) 0 4px 8px',
              },
              {
                label: 'BUILDER.FACTORY.SIZE_LG',
                value: 'rgba(0, 0, 0, 0.1) 0 6px 12px',
              },
            ],
          },
        },
        {
          type: 'select',
          key: 'aspectRatio',
          className: 'w-full',
          defaultValue: ele.style.aspectRatio ?? 'auto',
          props: {
            label: 'BUILDER.FACTORY.ASPECT_RATIO',
            options: getAspectRatio,
          },
        },
        {
          type: 'select',
          key: 'objectFit',
          className: 'w-full',
          defaultValue: ele.style.objectFit ?? 'initial',
          props: {
            label: 'BUILDER.FACTORY.FILL_TYPE',
            options: getObjectFix,
          },
        },
      ],
    },
  ];
}
