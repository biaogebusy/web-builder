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
  },
  V2: {
    args: { content: h1v3V2 },
  },
} = hero1v3 as any;
const {
  Default: {
    args: { content: h1v4Default },
  },
  Order: {
    args: { content: h1v1Order },
  },
} = hero1v4 as any;

const {
  Default: {
    args: { content: h2v1Default },
  },
  YCenter: {
    args: { content: yCenter },
  },
  YCenterXCustom: {
    args: { content: yCenterXCustom },
  },
  XYCustom: {
    args: { content: xyCustom },
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
  h1v3V1,
  h1v3V2,
  h1v4Default,
  h1v1Order,
  h2v1Default,
  yCenter,
  yCenterXCustom,
  xyCustom,
  h2v2,
  h2v3,
];
