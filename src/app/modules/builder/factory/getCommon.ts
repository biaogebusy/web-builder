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
    label: '白色',
    value: 'bg-white bg-fill-width',
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

export const getSpacerOptions = [
  {
    label: '无',
    value: 'none',
  },
  {
    label: '超小',
    value: 'xs',
  },
  {
    label: '小',
    value: 'sm',
  },
  {
    label: '正常',
    value: 'md',
  },
  {
    label: '大',
    value: 'lg',
  },
  {
    label: '超大',
    value: 'xl',
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

export const getHorizontalOption = [
  {
    label: 'stretch',
    value: 'stretch',
  },
  {
    label: 'start',
    value: 'start',
  },
  {
    label: 'end',
    value: 'end',
  },
  {
    label: 'center',
    value: 'center',
  },
  {
    label: 'between',
    value: 'between',
  },
  {
    label: 'around',
    value: 'around',
  },
  {
    label: 'evenly',
    value: 'evenly',
  },
];

export const getVerticalOption = [
  {
    label: 'stretch',
    value: 'stretch',
  },
  {
    label: 'start',
    value: 'start',
  },
  {
    label: 'end',
    value: 'end',
  },
  {
    label: 'center',
    value: 'center',
  },
  {
    label: 'baseline',
    value: 'baseline',
  },
];

export function getGapsGroup(content: any): FormlyFieldConfig[] {
  return [
    {
      key: 'xs',
      type: 'slider',
      defaultValue: content.gap?.xs,
      props: {
        min: 0,
        max: 20,
        step: 1,
        label: '移动端间距',
      },
    },
    {
      key: 'sm',
      type: 'slider',
      defaultValue: content.gap?.sm,
      props: {
        min: 0,
        max: 20,
        step: 1,
        label: '平板端间距',
      },
    },
    {
      key: 'md',
      type: 'slider',
      defaultValue: content.gap?.md,
      props: {
        min: 0,
        max: 20,
        step: 1,
        label: '桌面端间距',
      },
    },
    {
      key: 'lg',
      type: 'slider',
      defaultValue: content.gap?.lg,
      props: {
        min: 0,
        max: 20,
        step: 1,
        label: '超大桌面间距',
      },
    },
  ];
}

export function getGridLayoutConfig(content: any): FormlyFieldConfig[] {
  return [
    {
      type: 'select',
      key: 'horizontal',
      className: 'w-full',
      defaultValue: content.horizontal,
      props: {
        label: '整个内容区域对齐',
        options: getHorizontalOption,
      },
    },
    {
      type: 'select',
      key: 'vertical',
      className: 'w-full',
      defaultValue: content.vertical,
      props: {
        label: '单元格水平对齐',
        options: getVerticalOption,
      },
    },
    {
      type: 'select',
      key: 'alignItems',
      className: 'w-full',
      defaultValue: content.alignItems,
      props: {
        label: '单元格垂直对齐',
        options: getVerticalOption,
      },
    },
    {
      key: 'gap',
      fieldGroup: getGapsGroup(content),
    },
  ];
}
