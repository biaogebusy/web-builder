import { FormlyFieldConfig } from '@ngx-formly/core';

export const getBgClasses = [
  {
    label: 'BUILDER.FACTORY.NONE',
    value: '',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_PRIMARY',
    value: 'bg-primary',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_WHITE',
    value: 'bg-white',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_BLACK',
    value: 'bg-black',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_GRAY',
    value: 'bg-gray',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_NEUTRAL',
    value: 'bg-neutral',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_RED',
    value: 'bg-red',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_ORANGE',
    value: 'bg-orange',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_YELLOW',
    value: 'bg-yellow',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_GREEN',
    value: 'bg-green',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_BLUE',
    value: 'bg-blue',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_PURPLE',
    value: 'bg-purple',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_AMBER',
    value: 'bg-amber',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_LIME',
    value: 'bg-lime',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_SKY',
    value: 'bg-sky',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_INDIGO',
    value: 'bg-indigo',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_VIOLET',
    value: 'bg-violet',
  },
  {
    label: 'BUILDER.FACTORY.COLOR_PINK',
    value: 'bg-pink',
  },
];

export const getSpacerOptions = [
  {
    label: 'BUILDER.FACTORY.NONE',
    value: 'none',
  },
  {
    label: 'BUILDER.FACTORY.SIZE_XS',
    value: 'xs',
  },
  {
    label: 'BUILDER.FACTORY.SIZE_SM',
    value: 'sm',
  },
  {
    label: 'BUILDER.FACTORY.SIZE_MD',
    value: 'md',
  },
  {
    label: 'BUILDER.FACTORY.SIZE_LG',
    value: 'lg',
  },
  {
    label: 'BUILDER.FACTORY.SIZE_XL',
    value: 'xl',
  },
];

export const getOverlay = [
  {
    label: 'BUILDER.FACTORY.NONE',
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
        label: 'BUILDER.FACTORY.GAP_XS',
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
        label: 'BUILDER.FACTORY.GAP_SM',
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
        label: 'BUILDER.FACTORY.GAP_MD',
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
        label: 'BUILDER.FACTORY.GAP_LG',
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
        label: 'BUILDER.FACTORY.ALIGN_CONTENT',
        options: getHorizontalOption,
      },
    },
    {
      type: 'select',
      key: 'vertical',
      className: 'w-full',
      defaultValue: content.vertical,
      props: {
        label: 'BUILDER.FACTORY.ALIGN_CELL_H',
        options: getVerticalOption,
      },
    },
    {
      type: 'select',
      key: 'alignItems',
      className: 'w-full',
      defaultValue: content.alignItems,
      props: {
        label: 'BUILDER.FACTORY.ALIGN_CELL_V',
        options: getVerticalOption,
      },
    },
    {
      key: 'gap',
      fieldGroup: getGapsGroup(content),
    },
  ];
}
