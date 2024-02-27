import { FormlyFieldConfig } from '@ngx-formly/core';

function rgbToHex(rgb: string) {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (match) {
    return (
      '#' +
      ('0' + parseInt(match[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(match[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(match[3], 10).toString(16)).slice(-2)
    );
  }
  return rgb;
}

export function getInlineText(ele: any): FormlyFieldConfig[] {
  let view: any;
  if (ele.querySelector('p')) {
    view = ele.querySelector('p');
  } else {
    view = ele;
  }
  return [
    {
      key: 'style',
      fieldGroup: [
        {
          key: 'color',
          type: 'input',
          defaultValue: rgbToHex(view.style.color),
          className: 'width-100',
          templateOptions: {
            label: '颜色',
            type: 'color',
          },
        },
        {
          key: 'backgroundColor',
          type: 'input',
          defaultValue: rgbToHex(view.style.backgroundColor),
          className: 'width-100',
          templateOptions: {
            label: '背景颜色',
            type: 'color',
          },
        },
        {
          key: 'fontSize',
          type: 'slider',
          defaultValue: parseFloat(view.style.fontSize.replace('px', '')) || 0,
          className: 'width-100',
          templateOptions: {
            type: 'number',
            min: 10,
            max: 100,
            step: 1,
          },
          expressionProperties: {
            'templateOptions.label': '"大小: " + model.fontSize + "px"',
          },
        },
        {
          type: 'slider',
          key: 'width',
          defaultValue: parseFloat(view.style.width.replace('px', '')) || 0,
          className: 'width-100',
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            thumbLabel: true,
          },
          expressionProperties: {
            'templateOptions.label': '"宽度: " + model.width + "px"',
          },
        },
        {
          type: 'slider',
          key: 'height',
          className: 'width-100',
          defaultValue: parseFloat(view.style.height.replace('px', '')) || 0,
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            thumbLabel: true,
          },
          expressionProperties: {
            'templateOptions.label': '"高度: " + model.height + "px"',
          },
        },
        {
          type: 'slider',
          key: 'maxWidth',
          className: 'width-100',
          defaultValue: parseFloat(view.style.maxWidth.replace('px', '')) || 0,
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            thumbLabel: true,
          },
          expressionProperties: {
            'templateOptions.label': '"最大宽度: " + model.maxWidth + "px"',
          },
        },
        {
          type: 'slider',
          key: 'maxHeight',
          className: 'width-100',
          defaultValue: parseFloat(view.style.maxHeight.replace('px', '')) || 0,
          templateOptions: {
            label: '最大高度',
            min: 0,
            max: 2000,
            step: 2,
            thumbLabel: true,
          },
          expressionProperties: {
            'templateOptions.label': '"最大高度: " + model.maxHeight + "px"',
          },
        },
        {
          type: 'slider',
          key: 'opacity',
          className: 'width-100',
          defaultValue: view.style.opacity || 1,
          templateOptions: {
            min: 0,
            max: 1,
            thumbLabel: true,
            step: 0.1,
          },
          expressionProperties: {
            'templateOptions.label': '"不透明度: " + model.opacity',
          },
        },
      ],
    },
  ];
}
