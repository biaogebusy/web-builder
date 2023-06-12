import * as s1v1 from '../feature/showcase/showcase1v1.stories';
import * as s1v2 from '../feature/showcase/showcase1v2.stories';
const {
  Default: {
    args: { content: s1v1Default },
  },
  StyleV1: {
    args: { content: s1v1V1 },
    storyName: s1v1V1Name,
  },
  StyleV2: {
    args: { content: s1v1V2 },
    storyName: s1v1V2Name,
  },
  StyleV3: {
    args: { content: s1v1V3 },
    storyName: s1v1V3Name,
  },
  StyleV4: {
    args: { content: s1v1V4 },
    storyName: s1v1V4Name,
  },
  StyleV5: {
    args: { content: s1v1V5 },
    storyName: s1v1V5Name,
  },
  StyleV6: {
    args: { content: s1v1V6 },
    storyName: s1v1V6Name,
  },
  StyleV7: {
    args: { content: s1v1V7 },
    storyName: s1v1V7Name,
  },
} = s1v1 as any;
const {
  Default: {
    args: { content: s1v2Defult },
    storyName: s1v2DefaultName,
  },
  Primary: {
    args: { content: s1v2Primary },
    storyName: s1v2PrimaryName,
  },
} = s1v2 as any;
export const showcase = [
  s1v1Default,
  { ...s1v1V1, ...{ name: s1v1V1Name } },
  { ...s1v1V2, ...{ name: s1v1V2Name } },
  { ...s1v1V3, ...{ name: s1v1V3Name } },
  { ...s1v1V4, ...{ name: s1v1V4Name } },
  { ...s1v1V5, ...{ name: s1v1V5Name } },
  { ...s1v1V6, ...{ name: s1v1V6Name } },
  { ...s1v1V7, ...{ name: s1v1V7Name } },
  {
    ...s1v2Defult,
    ...{ name: s1v2DefaultName },
  },
  {
    ...s1v2Primary,
    ...{ name: s1v2PrimaryName },
  },
];
