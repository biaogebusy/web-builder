import * as hero1v1 from '../feature/hero/hero1v1.stories';
import * as hero1v2 from '../feature/hero/hero1v2.stories';
import * as hero1v3 from '../feature/hero/hero1v3.stories';
import * as hero1v4 from '../feature/hero/hero1v4.stories';
import * as hero2v1 from '../feature/hero/hero2v1.stories';
import * as hero2v2 from '../feature/hero/hero2v2.stories';
import * as hero2v3 from '../feature/hero/hero2v3.stories';
const { content: hero1v1Content } = hero1v1.Default.args as any;
const { content: hero1v2Content } = hero1v2.Default.args as any;
const {
  V1: {
    args: { content: h1v3V1 },
    storyName: h1v3V1Name,
  },
  V2: {
    args: { content: h1v3V2 },
    storyName: h1v3V2Name,
  },
} = hero1v3 as any;
const {
  Default: {
    args: { content: h1v4Default },
    storyName: h1v4DefaultName,
  },
  Order: {
    args: { content: h1v1Order },
    storyName: h1v1OrderName,
  },
} = hero1v4 as any;

const {
  Default: {
    args: { content: h2v1Default },
    storyName: h2v1DefaultName,
  },
  YCenter: {
    args: { content: yCenter },
    storyName: yCenterName,
  },
  YCenterXCustom: {
    args: { content: yCenterXCustom },
    storyName: yCenterXCustomName,
  },
  XYCustom: {
    args: { content: xyCustom },
    storyName: xyCustomName,
  },
} = hero2v1 as any;

const {
  Default: {
    args: { content: h2v2 },
  },
} = hero2v2 as any;

const {
  Default: {
    args: { content: h2v3 },
  },
} = hero2v3 as any;

export const hero = [
  hero1v1Content,
  hero1v2Content,
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
