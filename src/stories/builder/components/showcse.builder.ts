import { IBuilderComponent } from '@core/interface/IBuilder';
import * as s1v1Story from '../../feature/showcase/showcase1v1.stories';
import * as s1v2Story from '../../feature/showcase/showcase1v2.stories';
import * as s1v3Story from '../../feature/showcase/showcase1v3.stories';
import * as s1v4Story from '../../feature/showcase/showcase1v4.stories';
import * as s2v1Story from '../../feature/showcase/showcase2v1.stories';
import * as s2v2Story from '../../feature/showcase/showcase2v2.stories';
import * as s2v3Story from '../../feature/showcase/showcase2v3.stories';
import * as s2v4Story from '../../feature/showcase/showcase2v4.stories';
import * as s2v5Story from '../../feature/showcase/showcase2v5.stories';
import * as s2v6Story from '../../feature/showcase/showcase2v5.stories';
import * as s3v1Story from '../../feature/showcase/showcase3v1.stories';
import * as s3v2Story from '../../feature/showcase/showcase3v2.stories';
import * as s3v3Story from '../../feature/showcase/showcase3v3.stories';
import * as s3v4Story from '../../feature/showcase/showcase3v4.stories';
import * as s3v5Story from '../../feature/showcase/showcase3v5.stories';
import * as s3v6Story from '../../feature/showcase/showcase3v6.stories';
import * as s3v7Story from '../../feature/showcase/showcase3v7.stories';
import * as s3v8Story from '../../feature/showcase/showcase3v8.stories';
import * as s3v9Story from '../../feature/showcase/showcase3v9.stories';
import * as s4v1Story from '../../feature/showcase/showcase4v1.stories';

const {
  Default: { args: s1v1Default },
  StyleV1: { args: s1v1V1, storyName: s1v1V1Name },
  StyleV2: { args: s1v1V2, storyName: s1v1V2Name },
  StyleV3: { args: s1v1V3, storyName: s1v1V3Name },
  StyleV4: { args: s1v1V4, storyName: s1v1V4Name },
  StyleV5: { args: s1v1V5, storyName: s1v1V5Name },
  StyleV6: { args: s1v1V6, storyName: s1v1V6Name },
  StyleV7: { args: s1v1V7, storyName: s1v1V7Name },
} = s1v1Story;
const {
  Default: { args: s1v2Defult, storyName: s1v2DefaultName },
  Primary: { args: s1v2Primary, storyName: s1v2PrimaryName },
} = s1v2Story;
const {
  Default: { args: s1v3Default, storyName: s1v3DefaultName },
  Contact: { args: s1v3Contact, storyName: sv1v3ContactName },
  Video: { args: s1v3Video, storyName: s1v3VideoName },
} = s1v3Story;

const {
  Default: { args: s1v4Default, storyName: s1v4DefaultName },
  Price: { args: s1v4Price, storName: s1v4PriceName },
  Dynamic: { args: s1v4Dynamic, storyName: s1v4DynamciName },
} = s1v4Story as any;

const {
  Default: { args: s2v1Default, storyName: s2v1DefaultName },
  Card1v1: { args: s2v1Card1v1, storyName: s2v1Card1v1Name },
  Card1v1FromApi: {
    args: s2v1Card1v1FromApi,
    storyName: s2v1Card1v1FromApiName,
  },
} = s2v1Story;

const {
  Default: { args: s2v2Default },
} = s2v2Story;
const {
  Default: { args: s2v3Default },
} = s2v3Story;
const {
  Default: { args: s2v4Default },
} = s2v4Story;
const {
  Default: { args: s2v5Default },
} = s2v5Story;
const {
  Default: { args: s2v6Default },
} = s2v6Story;
const {
  Default: { args: s3v1Default },
} = s3v1Story;
const {
  Default: { args: s3v2Default },
  List: { args: s3v2List, storyName: s3v2ListName },
} = s3v2Story;

const {
  Default: { args: s3v3Default },
  Image: { args: s3v3Image, storyName: s3v3ImageName },
} = s3v3Story;

const {
  Default: { args: s3v4Default },
  Background: { args: s3v4Background, storyName: s3v4BackgroundName },
} = s3v4Story;

const {
  Default: { args: s3v5Default },
} = s3v5Story;

const {
  Default: { args: s3v6Default },
  WithLink: { args: s3v6WithLink, storyName: s3v6WithLinkName },
  Background: { args: s3v6Background, storyName: s3v6BackgroundName },
} = s3v6Story;

const {
  Default: { args: s3v7Default },
} = s3v7Story;
const {
  Default: { args: s3v8Default },
} = s3v8Story;

const {
  Default: { args: s3v9Default },
  Reverse: { args: s3v9Reverse, storyName: s3v9ReverseName },
  Video: { args: s3v9Video, storyName: s3v9VideoName },
} = s3v9Story;

const {
  Default: { args: s4v1Default },
  Img: { args: s4v1Img, storyName: s4v1ImgName },
} = s4v1Story;

export const showcase: IBuilderComponent[] = [
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
    name: s1v2DefaultName,
  },
  {
    ...s1v2Primary,
    name: s1v2PrimaryName,
  },
  {
    ...s1v3Default,
    name: s1v3DefaultName,
  },
  {
    ...s1v3Contact,
    name: sv1v3ContactName,
  },
  {
    ...s1v3Video,
    name: s1v3VideoName,
  },
  {
    ...s1v4Default,
    name: s1v4DefaultName,
  },
  {
    ...s1v4Price,
    name: s1v4PriceName,
  },
  {
    ...s1v4Dynamic,
    name: s1v4DynamciName,
  },
  {
    ...s2v1Default,
    name: s2v1DefaultName,
  },
  {
    ...s2v1Card1v1,
    name: s2v1Card1v1Name,
  },
  {
    ...s2v1Card1v1FromApi,
    name: s2v1Card1v1FromApiName,
  },
  s2v2Default,
  s2v3Default,
  s2v4Default,
  s2v5Default,
  s2v6Default,
  s3v1Default,
  s3v2Default,
  {
    ...s3v2List,
    name: s3v2ListName,
  },
  s3v3Default,
  { ...s3v3Image, name: s3v3ImageName },
  s3v4Default,
  { ...s3v4Background, name: s3v4BackgroundName },
  s3v5Default,
  s3v6Default,
  {
    ...s3v6WithLink,
    name: s3v6WithLinkName,
  },
  {
    ...s3v6Background,
    name: s3v6BackgroundName,
  },
  s3v7Default,
  s3v8Default,
  s3v9Default,
  {
    ...s3v9Reverse,
    name: s3v9ReverseName,
  },
  {
    ...s3v9Video,
    name: s3v9VideoName,
  },
  s4v1Default,
  { ...s4v1Img, name: s4v1ImgName },
];
