import { FormlyFieldConfig } from '@ngx-formly/core';

export const getBgClasses = [
  {
    label: '无',
    value: 'bg- bg-fill-width',
  },
  {
    label: '品牌色',
    value: 'bg-primary bg-fill-width',
  },
  {
    label: '灰色',
    value: 'bg-shadow bg-fill-width',
  },
  {
    label: '蓝色',
    value: 'bg-blue bg-fill-width',
  },
  {
    label: '绿色',
    value: 'bg-green bg-fill-width',
  },
  {
    label: '黄色',
    value: 'bg-yellow bg-fill-width',
  },
  {
    label: '红色',
    value: 'bg-red bg-fill-width',
  },
  {
    label: '警告色',
    value: 'bg-warn bg-fill-width',
  },
  {
    label: '粉色',
    value: 'bg-pink bg-fill-width',
  },
  {
    label: '橙色',
    value: 'bg-orange bg-fill-width',
  },
  {
    label: '紫色',
    value: 'bg-purple bg-fill-width',
  },
  {
    label: '灰色 50',
    value: 'bg-grey-50 bg-fill-width',
  },
  {
    label: '灰色 100',
    value: 'bg-grey-100 bg-fill-width',
  },
  {
    label: '灰色 200',
    value: 'bg-grey-200 bg-fill-width',
  },
  {
    label: '灰色 300',
    value: 'bg-grey-300 bg-fill-width',
  },
  {
    label: '灰色 400',
    value: 'bg-grey-400 bg-fill-width',
  },
  {
    label: '灰色 500',
    value: 'bg-grey-500 bg-fill-width',
  },
  {
    label: '灰色 600',
    value: 'bg-grey-600 bg-fill-width',
  },
  {
    label: '灰色 700',
    value: 'bg-grey-700 bg-fill-width',
  },
  {
    label: '灰色 800',
    value: 'bg-grey-800 bg-fill-width',
  },
  {
    label: '灰色 900',
    value: 'bg-grey-900 bg-fill-width',
  },
];

export const getOverlay = [
  {
    label: '无',
    value: ' ',
  },
  {
    label: '0.8',
    value: 'overlay overlay-80',
  },
  {
    label: '0.6',
    value: 'overlay overlay-60',
  },
  {
    label: '0.4',
    value: 'overlay overlay-40',
  },
  {
    label: '0.2',
    value: 'overlay overlay-20',
  },
];

export const getAspectRatio = [
  {
    label: 'auto',
    value: 'auto',
  },
  {
    label: '1:1',
    value: '1 / 1',
  },
  {
    label: '1:2',
    value: '1 / 2',
  },
  {
    label: '2:1',
    value: '2 / 1',
  },
  {
    label: '2:3',
    value: '2 / 3',
  },
  {
    label: '3:2',
    value: '3 / 2',
  },
  {
    label: '4:3',
    value: '4 / 3',
  },
  {
    label: '9:16',
    value: '9 / 16',
  },
  {
    label: '16:9',
    value: '16 / 9',
  },
];

export const getObjectFix = [
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
];

export const getDirectionOption = [
  {
    label: 'Row Wrap',
    value: 'row wrap',
  },
  {
    label: 'Row',
    value: 'row',
  },
  {
    label: 'Column',
    value: 'column',
  },
];

export const getHorizontalOption = [
  {
    label: 'None',
    value: 'flex-start',
  },
  {
    label: 'start',
    value: 'flex-start',
  },
  {
    label: 'center',
    value: 'center',
  },
  {
    label: 'end',
    value: 'flex-end',
  },
  {
    label: 'space-around',
    value: 'space-around',
  },
  {
    label: 'space-between',
    value: 'space-between',
  },
  {
    label: 'space-evenly',
    value: 'space-evenly',
  },
];

export const getVerticalOption = [
  {
    label: 'None',
    value: 'stretch',
  },
  {
    label: 'start',
    value: 'flex-start',
  },
  {
    label: 'center',
    value: 'center',
  },
  {
    label: 'end',
    value: 'flex-end',
  },
  {
    label: 'stretch',
    value: 'stretch',
  },
];

export function getGapsGroup(content: any): FormlyFieldConfig[] {
  return [
    {
      key: 'xs',
      type: 'slider',
      defaultValue: content.gap?.xs || 0,
      templateOptions: {
        min: 0,
        max: 80,
        step: 2,
        label: '移动端间距',
        unit: 'px',
      },
    },
    {
      key: 'sm',
      type: 'slider',
      defaultValue: content.gap?.sm || 0,
      templateOptions: {
        min: 0,
        max: 80,
        step: 2,
        label: '平板端间距',
        unit: 'px',
      },
    },
    {
      key: 'md',
      type: 'slider',
      defaultValue: content.gap?.md || 0,
      templateOptions: {
        min: 0,
        max: 80,
        step: 2,
        label: '桌面端间距',
        unit: 'px',
      },
    },
    {
      key: 'lg',
      type: 'slider',
      defaultValue: content.gap?.lg || 0,
      templateOptions: {
        min: 0,
        max: 80,
        step: 2,
        label: '超大桌面间距',
        unit: 'px',
      },
    },
  ];
}
