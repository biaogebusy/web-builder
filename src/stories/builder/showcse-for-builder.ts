import * as s1v1 from '../feature/showcase/showcase1v1.stories';
const {
  Default: {
    args: { content: s1v1Default },
  },
  StyleV1: {
    args: { content: s1v1V1 },
  },
  StyleV2: {
    args: { content: s1v1V2 },
  },
  StyleV3: {
    args: { content: s1v1V3 },
  },
  StyleV4: {
    args: { content: s1v1V4 },
  },
  StyleV5: {
    args: { content: s1v1V5 },
  },
  StyleV6: {
    args: { content: s1v1V6 },
  },
  StyleV7: {
    args: { content: s1v1V7 },
  },
} = s1v1 as any;
export const showcase = [
  s1v1Default,
  s1v1V1,
  s1v1V2,
  s1v1V3,
  s1v1V4,
  s1v1V5,
  s1v1V6,
  s1v1V7,
];
