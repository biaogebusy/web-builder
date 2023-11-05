import { IBuilderComponent } from '@core/interface/IBuilder';
import * as s1v1Story from '@stories/feature/showcase/showcase1v1.stories';
import * as s1v2Story from '@stories/feature/showcase/showcase1v2.stories';
import * as s1v3Story from '@stories/feature/showcase/showcase1v3.stories';
import * as s1v4Story from '@stories/feature/showcase/showcase1v4.stories';
import * as s2v1Story from '@stories/feature/showcase/showcase2v1.stories';
import * as s2v2Story from '@stories/feature/showcase/showcase2v2.stories';
import * as s2v3Story from '@stories/feature/showcase/showcase2v3.stories';
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
import * as s3v8Story from '@stories/feature/showcase/showcase3v8.stories';
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
  StyleV6: { args: showcase1v1_v6, storyName: s1v1V6Name },
  StyleV7: { args: showcase1v1_v7, storyName: s1v1V7Name },
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
  Default: { args: showcase2v3_default },
} = s2v3Story;
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
  Default: { args: showcase3v8_default },
} = s3v8Story;

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
        label: 'default',
        icon: {
          svg: 'format-size',
        },
        ...showcase1v1Default,
      },
      {
        label: s1v1V1Name,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v1_v1,
      },
      {
        label: s1v1V2Name,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v1_v2,
      },
      {
        label: s1v1V3Name,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v1_v3,
      },
      {
        label: s1v1PrimaryName,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v1_primary,
      },
      {
        label: s1v1V4Name,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v1_v4,
      },
      {
        label: s1v1V5Name,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v1_v5,
      },
      {
        label: s1v1ImageName,
        icon: {
          svg: 'format-size',
        },
        ...shwocase1v1_image,
      },
      {
        label: s1v1V6Name,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v1_v6,
      },
      {
        label: s1v1V7Name,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v1_v7,
      },
      {
        label: s1v2DefaultName,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v2_default,
      },
      {
        label: s1v2PrimaryName,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v2_primary,
      },
      {
        label: s1v3DefaultName,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v3_default,
      },
      {
        label: sv1v3ContactName,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v3_contact,
      },
      {
        label: s1v3VideoName,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v3_video,
      },
      {
        label: s1v4DefaultName,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v4_default,
      },
      {
        label: s1v4PriceName,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v4_price,
      },
      {
        label: s1v4DynamciName,
        icon: {
          svg: 'format-size',
        },
        ...showcase1v4_dynamic,
      },
    ],
  },
  {
    label: 'V2',
    child: [
      {
        label: s2v1DefaultName,
        icon: {
          svg: 'format-size',
        },
        ...showcase2v1_default,
      },
      {
        label: s2v1Card1v1Name,
        icon: {
          svg: 'format-size',
        },
        ...showcase2v1_card1v1,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase2v2_default,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase2v3_default,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase2v4_default,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase2v5_default,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase2v6_default,
      },
    ],
  },
  {
    label: '3v1',
    child: [
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v1_default,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v2_default,
      },
      {
        label: s3v2ListName,
        icon: {
          svg: 'format-size',
        },
        ...showcase3v2_list,
      },
    ],
  },
  {
    label: '3v3',
    child: [
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v3_default,
      },
      {
        label: s3v3ImageName,
        icon: {
          svg: 'format-size',
        },
        ...showcase3v3_image,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v3_default,
      },
      {
        label: s3v3ImageName,
        icon: {
          svg: 'format-size',
        },
        ...showcase3v3_image,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v4_default,
      },
      {
        label: s3v4BackgroundName,
        icon: {
          svg: 'format-size',
        },
        ...showcase3v4_background,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v5_default,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v6_default,
      },
      {
        label: s3v6WithLinkName,
        icon: {
          svg: 'format-size',
        },
        ...showcase3v6_withLink,
      },
      {
        label: s3v6BackgroundName,
        icon: {
          svg: 'format-size',
        },
        ...showcase3v6_background,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v7_default,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v8_default,
      },
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase3v9_default,
      },
      {
        label: s3v9ReverseName,
        icon: {
          svg: 'format-size',
        },
        ...showcase3v9_reverse,
      },
      {
        label: s3v9VideoName,
        icon: {
          svg: 'format-size',
        },
        ...showcase3v9_video,
      },
    ],
  },
  {
    label: 'V4',
    child: [
      {
        label: '默认',
        icon: {
          svg: 'format-size',
        },
        ...showcase4v1_default,
      },
      {
        label: s4v1ImgName,
        icon: {
          svg: 'format-size',
        },
        ...showcase4v1_img,
      },
    ],
  },
];
