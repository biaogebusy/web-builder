import * as s1v1Story from '@stories/feature/showcase/showcase1v1.stories';
import * as s1v2Story from '@stories/feature/showcase/showcase1v2.stories';
import * as s1v3Story from '@stories/feature/showcase/showcase1v3.stories';
import * as s1v4Story from '@stories/feature/showcase/showcase1v4.stories';
import * as s2v1Story from '@stories/feature/showcase/showcase2v1.stories';
import * as s2v2Story from '@stories/feature/showcase/showcase2v2.stories';
import * as s2v4Story from '@stories/feature/showcase/showcase2v4.stories';
import * as s2v5Story from '@stories/feature/showcase/showcase2v5.stories';
import * as s2v6Story from '@stories/feature/showcase/showcase2v6.stories';
import * as s3v2Story from '@stories/feature/showcase/showcase3v2.stories';
import * as s3v3Story from '@stories/feature/showcase/showcase3v3.stories';
import * as s3v4Story from '@stories/feature/showcase/showcase3v4.stories';
import * as s3v5Story from '@stories/feature/showcase/showcase3v5.stories';
import * as s3v6Story from '@stories/feature/showcase/showcase3v6.stories';
import * as s3v7Story from '@stories/feature/showcase/showcase3v7.stories';
import * as s3v9Story from '@stories/feature/showcase/showcase3v9.stories';
import * as s4v1Story from '@stories/feature/showcase/showcase4v1.stories';

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
        content: s1v1Story.Default?.args?.content,
      },
      {
        label: '1v1-1',
        content: s1v1Story.StyleV1?.args?.content,
      },
      {
        label: '1v1-2',
        content: s1v1Story.StyleV2?.args?.content,
      },
      {
        label: '1v1-3',
        content: s1v1Story.StyleV3?.args?.content,
      },
      {
        label: '1v1 Primary',
        content: s1v1Story.Primary?.args?.content,
      },
      {
        label: '1v1-4',
        content: s1v1Story.StyleV4?.args?.content,
      },
      {
        label: '1v1-5',
        content: s1v1Story.StyleV5?.args?.content,
      },
      {
        label: '1v1 Image',
        content: s1v1Story.Image?.args?.content,
      },
      {
        label: '1v2',
        content: s1v2Story.Default?.args?.content,
      },
      {
        label: '1v2 Primary',
        content: s1v2Story.Primary?.args?.content,
      },
      {
        label: '1v3',
        content: s1v3Story.Default?.args?.content,
      },
      {
        label: '1v3 表单',
        content: s1v3Story.Contact?.args?.content,
      },
      {
        label: '1v3 视频',
        content: s1v3Story.Video?.args?.content,
      },
      {
        label: '1v4',
        content: s1v4Story.Default?.args?.content,
      },
      {
        label: '1v4 价格',
        content: s1v4Story.Price?.args?.content,
      },
      {
        label: '1v4 动态',
        content: s1v4Story.Dynamic?.args?.content,
      },
    ],
  },
  {
    label: 'V2',
    child: [
      {
        label: '2v1',
        content: s2v1Story.Default?.args?.content,
      },
      {
        label: '2v1 Card',
        content: s2v1Story.Card1v1?.args?.content,
      },
      {
        label: '2v2',
        content: s2v2Story.Default?.args?.content,
      },
      {
        label: '2v4',
        content: s2v4Story.Default?.args?.content,
      },
      {
        label: '2v5',
        content: s2v5Story.Default?.args?.content,
      },
      {
        label: '2v6',
        content: s2v6Story.Default?.args?.content,
      },
    ],
  },
  {
    label: 'V3',
    child: [
      {
        label: '3v2',
        content: s3v2Story.Default?.args?.content,
      },
      {
        label: '3v3',
        content: s3v3Story.Default?.args?.content,
      },
      {
        label: '3v3 图片',
        content: s3v3Story.Image?.args?.content,
      },
      {
        label: '3v4',
        content: s3v4Story.Default?.args?.content,
      },
      {
        label: '3v5',
        content: s3v5Story.Default?.args?.content,
      },
      {
        label: '3v6',
        content: s3v6Story.Default?.args?.content,
      },
      {
        label: '3v6 链接',
        content: s3v6Story.WithLink?.args?.content,
      },
      {
        label: '3v7',
        content: s3v7Story.Default?.args?.content,
      },
      {
        label: '3v9',
        content: s3v9Story.Default?.args?.content,
      },
      {
        label: '3v9 反向',
        content: s3v9Story.Reverse?.args?.content,
      },
      {
        label: '3v9 视频',
        content: s3v9Story.Video?.args?.content,
      },
    ],
  },
  {
    label: 'V4',
    child: [
      {
        label: '4v1',
        content: s3v9Story.Default?.args?.content,
      },
    ],
  },
];
