import { FormlyFieldConfig } from '@ngx-formly/core';
import { getAspectRatio, getObjectFix } from './getCommon';

export function getInlineImg(ele: any): FormlyFieldConfig[] {
  return [
    {
      key: 'style',
      fieldGroup: [
        {
          type: 'slider',
          key: 'width',
          defaultValue: ele.style.width.includes('auto')
            ? 0
            : parseFloat(ele.style.width.replace('px')) || 0,
          className: 'width-100',
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            label: '宽度',
            unit: 'px',
          },
          expressionProperties: {
            'templateOptions.unit': "model.width === 0 ? 'auto':'px'",
          },
        },
        {
          type: 'slider',
          key: 'height',
          className: 'width-100',
          defaultValue: ele.style.height.includes('auto')
            ? 0
            : parseFloat(ele.style.height.replace('px')) || 0,
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            label: '高度',
            unit: 'px',
          },
          expressionProperties: {
            'templateOptions.unit': "model.height === 0 ? 'auto':'px'",
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
          key: 'boxShadow',
          className: 'width-100',
          defaultValue: ele.style.boxShadow || 'none',
          templateOptions: {
            label: '阴影',
            options: [
              {
                label: '无',
                value: 'none',
              },
              {
                label: '小',
                value: 'rgba(0, 0, 0, 0.1) 0 2px 4px',
              },
              {
                label: '中',
                value: 'rgba(0, 0, 0, 0.1) 0 4px 8px',
              },
              {
                label: '大',
                value: 'rgba(0, 0, 0, 0.1) 0 6px 12px',
              },
            ],
          },
        },
        {
          type: 'select',
          key: 'aspectRatio',
          className: 'width-100',
          defaultValue: ele.style.aspectRatio || 'auto',
          templateOptions: {
            label: '宽高比',
            options: getAspectRatio,
          },
        },
        {
          type: 'select',
          key: 'objectFit',
          className: 'width-100',
          defaultValue: ele.style.objectFit || 'initial',
          templateOptions: {
            label: '填充方式',
            options: getObjectFix,
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
