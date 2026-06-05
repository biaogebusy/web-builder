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

export function getInlineText(ele: any): FormlyFieldConfig {
  let view: any;
  if (ele.querySelector('p')) {
    view = ele.querySelector('p');
  } else {
    view = ele;
  }
  return {
    key: 'style',
    fieldGroup: [
      {
        fieldGroupClassName: 'grid grid-cols-12 gap-3',
        fieldGroup: [
          {
            key: 'fontSize',
            type: 'input',
            defaultValue: view.style.fontSize ?? 'inherit',
            className: 'col-span-6',
            props: {
              label: 'Size',
            },
          },
          {
            type: 'input',
            key: 'width',
            defaultValue: view.style.width ?? 'auto',
            className: 'col-span-6',
            props: {
              label: 'W',
            },
          },
          {
            type: 'input',
            key: 'height',
            className: 'col-span-6',
            defaultValue: view.style.height ?? 'auto',
            props: {
              label: 'H',
            },
          },
          {
            key: 'textAlign',
            type: 'select',
            defaultValue: view.style.textAlign ?? 'start',
            className: 'col-span-6',
            props: {
              label: 'BUILDER.FACTORY.TEXT_ALIGN',
              options: [
                {
                  label: 'BUILDER.FACTORY.ALIGN_LEFT',
                  value: 'start',
                },
                {
                  label: 'BUILDER.FACTORY.ALIGN_CENTER',
                  value: 'center',
                },
                {
                  label: 'BUILDER.FACTORY.ALIGN_RIGHT',
                  value: 'end',
                },
                {
                  label: 'BUILDER.FACTORY.ALIGN_JUSTIFY',
                  value: 'justify',
                },
              ],
            },
          },
          {
            key: 'lineHeight',
            type: 'input',
            defaultValue: view.style.lineHeight ?? 'normal',
            className: 'col-span-6',
            props: {
              label: 'BUILDER.FACTORY.LINE_HEIGHT',
              unit: '',
            },
          },
          {
            type: 'input',
            key: 'opacity',
            className: 'col-span-6',
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
        fieldGroupClassName: 'grid grid-cols-12 gap-3',
        fieldGroup: [
          {
            key: 'color',
            type: 'input',
            defaultValue: rgbToHex(view.style.color),
            className: 'col-span-6',
            props: {
              label: 'BUILDER.FACTORY.COLOR',
              type: 'color',
            },
          },
          {
            key: 'backgroundColor',
            type: 'input',
            defaultValue: rgbToHex(view.style.backgroundColor),
            className: 'col-span-6',
            props: {
              label: 'BUILDER.FACTORY.BG_COLOR',
              type: 'color',
            },
          },
        ],
      },
    ],
  };
}
