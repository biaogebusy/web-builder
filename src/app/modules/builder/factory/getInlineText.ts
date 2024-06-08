import { FormlyFieldConfig } from '@ngx-formly/core';

function rgbToHex(rgb: string): string {
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
          fieldGroupClassName: 'flex flex-wrap',
          fieldGroup: [
            {
              key: 'fontSize',
              type: 'input',
              defaultValue: view.style.fontSize ?? 'inherit',
              className: 'width-30 m-right-xs',
              props: {
                label: 'Size',
              },
            },
            {
              type: 'input',
              key: 'width',
              defaultValue: view.style.width ?? 'auto',
              className: 'width-30 m-right-xs',
              props: {
                label: 'W',
              },
            },
            {
              type: 'input',
              key: 'height',
              className: 'width-30',
              defaultValue: view.style.height ?? 'auto',
              props: {
                label: 'H',
              },
            },
            {
              key: 'textAlign',
              type: 'select',
              defaultValue: view.style.textAlign ?? 'start',
              className: 'width-30 m-right-xs',
              props: {
                label: '对齐',
                options: [
                  {
                    label: '左',
                    value: 'start',
                  },
                  {
                    label: '中',
                    value: 'center',
                  },
                  {
                    label: '右',
                    value: 'end',
                  },
                  {
                    label: '两端对齐',
                    value: 'justify',
                  },
                ],
              },
            },
            {
              key: 'lineHeight',
              type: 'input',
              defaultValue: view.style.lineHeight ?? 'normal',
              className: 'width-30 m-right-xs',
              props: {
                label: '行高',
                unit: '',
              },
            },
            {
              type: 'input',
              key: 'opacity',
              className: 'width-30',
              defaultValue: view.style.opacity ?? 1,
              props: {
                label: 'Opacity',
                type: 'number',
                step: 0.1,
              },
            },
          ],
        },
        {
          fieldGroupClassName: 'flex flex-wrap',
          fieldGroup: [
            {
              key: 'color',
              type: 'input',
              defaultValue: rgbToHex(view.style.color),
              className: 'width-30 m-right-xs',
              props: {
                label: '颜色',
                type: 'color',
              },
            },
            {
              key: 'backgroundColor',
              type: 'input',
              defaultValue: rgbToHex(view.style.backgroundColor),
              className: 'width-30 m-right-xs',
              props: {
                label: '背景颜色',
                type: 'color',
              },
            },
          ],
        },
      ],
    },
  ];
}
