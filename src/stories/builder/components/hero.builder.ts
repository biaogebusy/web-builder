import { IBuilderComponent } from '@core/interface/IBuilder';
import * as hero1v1Story from '@stories/feature/hero/hero1v1.stories';
import * as hero1v2Story from '@stories/feature/hero/hero1v2.stories';
import * as hero1v3Story from '@stories/feature/hero/hero1v3.stories';
import * as hero1v4Story from '@stories/feature/hero/hero1v4.stories';
import * as hero2v1Story from '@stories/feature/hero/hero2v1.stories';
import * as hero2v2Story from '@stories/feature/hero/hero2v2.stories';
import * as hero2v3Story from '@stories/feature/hero/hero2v3.stories';
const {
  Default: { args: hero1v1 },
} = hero1v1Story;
const {
  Default: { args: hero1v2 },
} = hero1v2Story;
const {
  V1: { args: h1v3V1, storyName: h1v3V1Name },
  V2: { args: h1v3V2, storyName: h1v3V2Name },
} = hero1v3Story;

const {
  Default: { args: h1v4Default, storyName: h1v4DefaultName },
  Order: { args: h1v4Order, storyName: h1v4OrderName },
} = hero1v4Story;

const {
  Default: { args: h2v1Default },
  YCenter: { args: yCenter, storyName: yCenterName },
  YCenterXCustom: { args: yCenterXCustom, storyName: yCenterXCustomName },
  XYCustom: { args: xyCustom, storyName: xyCustomName },
  Animate: { args: animate, storyName: animateName },
} = hero2v1Story;

const {
  Default: { args: h2v2 },
} = hero2v2Story;

const {
  Default: { args: h2v3 },
} = hero2v3Story as any;

export const hero: IBuilderComponent[] = [
  hero1v1,
  hero1v2,
  {
    content: {
      child: [
        {
          label: 'hero-1v3',
          elements: [
            { ...h1v3V1, name: h1v3V1Name },
            { ...h1v3V2, name: h1v3V2Name },
          ],
        },
      ],
    },
  },
  {
    content: {
      child: [
        {
          label: 'hero-1v4',
          elements: [
            { ...h1v4Default, name: h1v4DefaultName },
            { ...h1v4Order, name: h1v4OrderName },
          ],
        },
      ],
    },
  },
  {
    content: {
      child: [
        {
          label: 'hero-2v1',
          elements: [
            h2v1Default,
            { ...yCenter, name: yCenterName },
            { ...yCenterXCustom, name: yCenterXCustomName },
            { ...xyCustom, name: xyCustomName },
            {
              ...animate,
              name: animateName,
            },
          ],
        },
      ],
    },
  },
  h2v2,
  h2v3,
];
