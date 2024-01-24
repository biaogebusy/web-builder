import * as s1v1Story from '@stories/feature/showcase/showcase1v1.stories';
import * as s1v2Story from '@stories/feature/showcase/showcase1v2.stories';
import * as s1v3Story from '@stories/feature/showcase/showcase1v3.stories';
import * as s1v4Story from '@stories/feature/showcase/showcase1v4.stories';
import * as s2v1Story from '@stories/feature/showcase/showcase2v1.stories';
import * as s2v2Story from '@stories/feature/showcase/showcase2v2.stories';
import * as s2v4Story from '@stories/feature/showcase/showcase2v4.stories';
import * as s2v5Story from '@stories/feature/showcase/showcase2v5.stories';
import * as s2v6Story from '@stories/feature/showcase/showcase2v6.stories';
import * as s3v1Story from '@stories/feature/showcase/showcase3v1.stories';
import * as s3v2Story from '@stories/feature/showcase/showcase3v2.stories';
import * as s3v3Story from '@stories/feature/showcase/showcase3v3.stories';
import * as s3v4Story from '@stories/feature/showcase/showcase3v4.stories';
import * as s3v5Story from '@stories/feature/showcase/showcase3v5.stories';
import * as s3v6Story from '@stories/feature/showcase/showcase3v6.stories';
import * as s3v7Story from '@stories/feature/showcase/showcase3v7.stories';
import * as s3v9Story from '@stories/feature/showcase/showcase3v9.stories';
import * as s4v1Story from '@stories/feature/showcase/showcase4v1.stories';

export const {
  Default: { args: showcase1v1Default },
  StyleV1: { args: showcase1v1_v1, storyName: s1v1V1Name },
  StyleV2: { args: showcase1v1_v2, storyName: s1v1V2Name },
  StyleV3: { args: showcase1v1_v3, storyName: s1v1V3Name },
  Primary: { args: showcase1v1_primary, storyName: s1v1PrimaryName },
  StyleV4: { args: showcase1v1_v4, storyName: s1v1V4Name },
  StyleV5: { args: showcase1v1_v5, storyName: s1v1V5Name },
  Image: { args: shwocase1v1_image, storyName: s1v1ImageName },
} = s1v1Story;
export const {
  Default: { args: showcase1v2_default, storyName: s1v2DefaultName },
  Primary: { args: showcase1v2_primary, storyName: s1v2PrimaryName },
} = s1v2Story;
export const {
  Default: { args: showcase1v3_default, storyName: s1v3DefaultName },
  Contact: { args: showcase1v3_contact, storyName: sv1v3ContactName },
  Video: { args: showcase1v3_video, storyName: s1v3VideoName },
} = s1v3Story;

export const {
  Default: { args: showcase1v4_default, storyName: s1v4DefaultName },
  Price: { args: showcase1v4_price, storyName: s1v4PriceName },
  Dynamic: { args: showcase1v4_dynamic, storyName: s1v4DynamciName },
} = s1v4Story as any;

export const {
  Default: { args: showcase2v1_default, storyName: s2v1DefaultName },
  Card1v1: { args: showcase2v1_card1v1, storyName: s2v1Card1v1Name },
} = s2v1Story;

export const {
  Default: { args: showcase2v2_default },
} = s2v2Story as any;

export const {
  Default: { args: showcase2v4_default },
} = s2v4Story;

export const {
  Default: { args: showcase2v5_default },
} = s2v5Story;

export const {
  Default: { args: showcase2v6_default },
} = s2v6Story;

export const {
  Default: { args: showcase3v1_default },
} = s3v1Story;

export const {
  Default: { args: showcase3v2_default },
  List: { args: showcase3v2_list, storyName: s3v2ListName },
} = s3v2Story;

export const {
  Default: { args: showcase3v3_default },
  Image: { args: showcase3v3_image, storyName: s3v3ImageName },
} = s3v3Story;

export const {
  Default: { args: showcase3v4_default },
  Background: { args: showcase3v4_background, storyName: s3v4BackgroundName },
} = s3v4Story;

export const {
  Default: { args: showcase3v5_default },
} = s3v5Story;

export const {
  Default: { args: showcase3v6_default },
  WithLink: { args: showcase3v6_withLink, storyName: s3v6WithLinkName },
  Background: { args: showcase3v6_background, storyName: s3v6BackgroundName },
} = s3v6Story;

export const {
  Default: { args: showcase3v7_default },
} = s3v7Story;

export const {
  Default: { args: showcase3v9_default },
  Reverse: { args: showcase3v9_reverse, storyName: s3v9ReverseName },
  Video: { args: showcase3v9_video, storyName: s3v9VideoName },
} = s3v9Story;

export const {
  Default: { args: showcase4v1_default },
  Img: { args: showcase4v1_img, storyName: s4v1ImgName },
} = s4v1Story;

export const showcase = [
  {
    label: 'V1',
    child: [
      {
        label: '1v1',
        ...showcase1v1Default,
      },
      {
        label: '1v1-1',
        ...showcase1v1_v1,
      },
      {
        label: '1v1-2',
        ...showcase1v1_v2,
      },
      {
        label: '1v1-3',
        ...showcase1v1_v3,
      },
      {
        label: '1v1 Primary',
        ...showcase1v1_primary,
      },
      {
        label: '1v1-4',
        ...showcase1v1_v4,
      },
      {
        label: '1v1-5',
        ...showcase1v1_v5,
      },
      {
        label: '1v1 Image',
        ...shwocase1v1_image,
      },
      {
        label: '1v2',
        ...showcase1v2_default,
      },
      {
        label: '1v2 Primary',
        ...showcase1v2_primary,
      },
      {
        label: '1v3',
        ...showcase1v3_default,
      },
      {
        label: '1v3 表单',
        ...showcase1v3_contact,
      },
      {
        label: '1v3 视频',
        ...showcase1v3_video,
      },
      {
        label: '1v4',
        ...showcase1v4_default,
      },
      {
        label: '1v4 价格',
        ...showcase1v4_price,
      },
      {
        label: '1v4 动态',
        ...showcase1v4_dynamic,
      },
    ],
  },
  {
    label: 'V2',
    child: [
      {
        label: '2v1',
        ...showcase2v1_default,
      },
      {
        label: '2v1 Card',
        ...showcase2v1_card1v1,
      },
      {
        label: '2v2',
        ...showcase2v2_default,
      },
      {
        label: '2v4',
        ...showcase2v4_default,
      },
      {
        label: '2v5',
        ...showcase2v5_default,
      },
      {
        label: '2v6',
        ...showcase2v6_default,
      },
    ],
  },
  {
    label: 'V3',
    child: [
      {
        label: '3v1',
        ...showcase3v1_default,
      },
      {
        label: '3v2',
        ...showcase3v2_default,
      },
      {
        label: '3v2 列表',
        ...showcase3v2_list,
      },
      {
        label: '3v3',
        ...showcase3v3_default,
      },
      {
        label: '3v3 图片',
        ...showcase3v3_image,
      },
      {
        label: '3v4',
        ...showcase3v4_default,
      },
      {
        label: '3v4 背景',
        ...showcase3v4_background,
      },
      {
        label: '3v5',
        ...showcase3v5_default,
      },
      {
        label: '3v6',
        ...showcase3v6_default,
      },
      {
        label: '3v6 链接',
        ...showcase3v6_withLink,
      },
      {
        label: '3v6 背景',
        ...showcase3v6_background,
      },
      {
        label: '3v7',
        ...showcase3v7_default,
      },
      {
        label: '3v9',
        ...showcase3v9_default,
      },
      {
        label: '3v9 反向',
        ...showcase3v9_reverse,
      },
      {
        label: '3v9 视频',
        ...showcase3v9_video,
      },
    ],
  },
  {
    label: 'V4',
    child: [
      {
        label: '4v1',
        ...showcase4v1_default,
      },
      {
        label: '4v1 图片',
        ...showcase4v1_img,
      },
    ],
  },
];
