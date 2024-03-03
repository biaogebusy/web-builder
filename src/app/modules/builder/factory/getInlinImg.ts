import { FormlyFieldConfig } from '@ngx-formly/core';

export function getInlineImg(ele: any): FormlyFieldConfig[] {
  return [
    {
      key: 'style',
      fieldGroup: [
        {
          type: 'slider',
          key: 'width',
          defaultValue: parseFloat(ele.style.width.replace('px')) || 0,
          className: 'width-100',
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            label: '宽度',
            unit: 'px',
          },
        },
        {
          type: 'slider',
          key: 'height',
          className: 'width-100',
          defaultValue: parseFloat(ele.style.height.replace('px', '')) || 0,
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            label: '高度',
            unit: 'px',
          },
        },
        {
          type: 'slider',
          key: 'maxWidth',
          className: 'width-100',
          defaultValue: parseFloat(ele.style.maxWidth.replace('px', '')) || 0,
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            label: '最大宽度',
            unit: 'px',
          },
        },
        {
          type: 'slider',
          key: 'maxHeight',
          className: 'width-100',
          defaultValue: parseFloat(ele.style.maxHeight.replace('px', '')) || 0,
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            label: '最大高度',
            unit: 'px',
          },
        },
        {
          type: 'slider',
          key: 'opacity',
          className: 'width-100',
          defaultValue: ele.style.opacity || 1,
          templateOptions: {
            min: 0,
            max: 1,
            thumbLabel: true,
            step: 0.1,
            label: '不透明度',
          },
        },
        {
          type: 'slider',
          key: 'borderRadius',
          className: 'width-100',
          defaultValue:
            parseFloat(ele.style.borderRadius.replace('px', '')) || 0,
          templateOptions: {
            min: 0,
            max: 500,
            step: 2,
            label: '圆角',
            unit: 'px',
          },
        },
        {
          type: 'select',
          key: 'objectFit',
          className: 'width-100',
          defaultValue: ele.style.objectFit || 'initial',
          templateOptions: {
            label: '填充方式',
            options: [
              {
                label: 'initial',
                value: 'initial',
              },
              {
                label: 'contain',
                value: 'contain',
              },
              {
                label: 'cover',
                value: 'cover',
              },
              {
                label: 'fill',
                value: 'fill',
              },
              {
                label: 'none',
                value: 'none',
              },
              {
                label: 'scale-down',
                value: 'scale-down',
              },
              {
                label: 'inherit',
                value: 'inherit',
              },
              {
                label: 'revert',
                value: 'revert',
              },
              {
                label: 'revert-layer',
                value: 'revert-layer',
              },
              {
                label: 'unset',
                value: 'unset',
              },
            ],
          },
        },
      ],
    },
    {
      type: 'img-picker',
      key: 'src',
      defaultValue: ele.src,
      templateOptions: {
        label: '更新图片',
        fileName: ele.getAttribute('src').split('/').pop(),
        alt: ele.getAttribute('alt'),
      },
    },
  ];
}
