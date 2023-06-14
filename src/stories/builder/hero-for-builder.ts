import { IBuilderComponent } from '@core/interface/IBuilder';
import * as hero1v1Story from '../feature/hero/hero1v1.stories';
import * as hero1v2Story from '../feature/hero/hero1v2.stories';
import * as hero1v3Story from '../feature/hero/hero1v3.stories';
import * as hero1v4Story from '../feature/hero/hero1v4.stories';
import * as hero2v1Story from '../feature/hero/hero2v1.stories';
import * as hero2v2Story from '../feature/hero/hero2v2.stories';
import * as hero2v3Story from '../feature/hero/hero2v3.stories';
const {
  Default: { args: hero1v1 },
} = hero1v1Story as any;
const {
  Default: { args: hero1v2 },
} = hero1v2Story as any;
const {
  V1: { args: h1v3V1, storyName: h1v3V1Name },
  V2: { args: h1v3V2, storyName: h1v3V2Name },
} = hero1v3Story as any;
const {
  Default: { args: h1v4Default, storyName: h1v4DefaultName },
  Order: { args: h1v1Order, storyName: h1v1OrderName },
} = hero1v4Story as any;

const {
  Default: { args: h2v1Default, storyName: h2v1DefaultName },
  YCenter: { args: yCenter, storyName: yCenterName },
  YCenterXCustom: { args: yCenterXCustom, storyName: yCenterXCustomName },
  XYCustom: { args: xyCustom, storyName: xyCustomName },
} = hero2v1Story as any;

const {
  Default: { args: h2v2 },
} = hero2v2Story as any;

const {
  Default: { args: h2v3 },
} = hero2v3Story as any;

export const hero: IBuilderComponent[] = [
  hero1v1,
  hero1v2,
  { ...h1v3V1, ...{ name: h1v3V1Name } },
  { ...h1v3V2, ...{ name: h1v3V2Name } },
  { ...h1v4Default, ...{ name: h1v4DefaultName } },
  { ...h1v1Order, ...{ name: h1v1OrderName } },
  { ...h2v1Default, ...{ name: h2v1DefaultName } },
  { ...yCenter, ...{ name: yCenterName } },
  { ...yCenterXCustom, ...{ name: yCenterXCustomName } },
  { ...xyCustom, ...{ name: xyCustomName } },
  h2v2,
  h2v3,
];
