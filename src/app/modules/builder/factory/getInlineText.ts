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
          defaultValue: view.style.fontSize.includes('inherit')
            ? 0
            : parseFloat(view.style.fontSize.replace('px')) || 0,
          className: 'width-100',
          templateOptions: {
            type: 'number',
            min: 0,
            max: 100,
            step: 1,
            label: 'Size',
            unit: 'px',
          },
          expressionProperties: {
            'templateOptions.unit': "model.fontSize === 0 ? 'inherit':'px'",
          },
        },
        {
          key: 'lineHeight',
          type: 'slider',
          defaultValue: view.style.lineHeight.includes('normal')
            ? 0
            : view.style.lineHeight,
          className: 'width-100',
          templateOptions: {
            type: 'number',
            min: 0,
            max: 2,
            step: 0.1,
            label: '行高',
            unit: '',
          },
          expressionProperties: {
            'templateOptions.unit': "model.lineHeight === 0 ? 'normal':''",
          },
        },
        {
          type: 'slider',
          key: 'width',
          defaultValue: view.style.width.includes('auto')
            ? 0
            : parseFloat(view.style.width.replace('px')) || 0,
          className: 'width-100',
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            label: 'Width',
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
          defaultValue: view.style.height.includes('auto')
            ? 0
            : parseFloat(view.style.height.replace('px')) || 0,
          templateOptions: {
            min: 0,
            max: 2000,
            step: 2,
            label: 'Height',
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
          defaultValue: view.style.opacity || 1,
          templateOptions: {
            min: 0,
            max: 1,
            step: 0.1,
            label: 'Opacity',
            unit: 'px',
          },
        },
      ],
    },
  ];
}
