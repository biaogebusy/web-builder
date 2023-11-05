import {
  IBuilderComponent,
  IBuilderComponentElement,
} from '@core/interface/IBuilder';
import * as hero1v1Story from '@stories/feature/hero/hero1v1.stories';
import * as hero1v2Story from '@stories/feature/hero/hero1v2.stories';
import * as hero1v3Story from '@stories/feature/hero/hero1v3.stories';
import * as hero1v4Story from '@stories/feature/hero/hero1v4.stories';
import * as hero2v1Story from '@stories/feature/hero/hero2v1.stories';
import * as hero2v2Story from '@stories/feature/hero/hero2v2.stories';
import * as hero2v3Story from '@stories/feature/hero/hero2v3.stories';
export const {
  Default: { args: hero1v1 },
} = hero1v1Story;
export const {
  Default: { args: hero1v2 },
} = hero1v2Story;
export const {
  V1: { args: hero1v3V1, storyName: h1v3V1Name },
  V2: { args: hero1v3V2, storyName: h1v3V2Name },
} = hero1v3Story;

export const {
  Default: { args: hero1v4Default, storyName: h1v4DefaultName },
  Shape: { args: hero1v4Shape, storyName: h1v4ShapeName },
} = hero1v4Story;

export const {
  Default: { args: hero2v1Default },
  YCenter: { args: yCenter, storyName: yCenterName },
  YCenterXCustom: { args: yCenterXCustom, storyName: yCenterXCustomName },
  XYCustom: { args: xyCustom, storyName: xyCustomName },
  Animate: { args: animate, storyName: animateName },
} = hero2v1Story;

export const {
  Default: { args: hero2v2 },
} = hero2v2Story;

export const {
  Default: { args: hero2v3 },
} = hero2v3Story as any;

export const hero = [
  {
    label: 'V1',
    child: [
      {
        label: 'default',
        icon: {
          svg: 'format-size',
        },
        ...hero1v1,
      },
      {
        label: 'default',
        icon: {
          svg: 'format-size',
        },
        ...hero1v2,
      },
      {
        label: h1v3V1Name,
        icon: {
          svg: 'format-size',
        },
        ...hero1v3V1,
      },
      {
        label: h1v3V2Name,
        icon: {
          svg: 'format-size',
        },
        ...hero1v3V2,
      },
      {
        label: h1v4DefaultName,
        icon: {
          svg: 'format-size',
        },
        ...hero1v4Default,
      },
      {
        label: h1v4ShapeName,
        icon: {
          svg: 'format-size',
        },
        ...hero1v4Shape,
      },
    ],
  },
  {
    label: 'V2',
    child: [
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...hero2v1Default,
      },
      {
        label: yCenterXCustomName,
        icon: {
          svg: 'format-size',
        },
        ...yCenterXCustom,
      },
      {
        label: xyCustomName,
        icon: {
          svg: 'format-size',
        },
        ...xyCustom,
      },
      {
        label: animateName,
        icon: {
          svg: 'format-size',
        },
        ...animate,
      },
      {
        label: 'default',
        icon: {
          svg: 'format-size',
        },
        ...hero2v2,
      },
      {
        label: 'default',
        icon: {
          svg: 'format-size',
        },
        ...hero2v3,
      },
    ],
  },
];
