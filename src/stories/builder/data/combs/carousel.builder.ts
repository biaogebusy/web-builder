import * as c1v1Story from '@stories/components/carousel/carousel1v1.stories';
import * as c1v2Story from '@stories/components/carousel/carousel1v2.stories';
import * as c1v3Story from '@stories/components/carousel/carousel1v3.stories';
import * as c1v4Story from '@stories/components/carousel/carousel1v4.stories';
import * as c2v1Story from '@stories/components/carousel/carousel2v1.stories';
import * as c2v2Story from '@stories/components/carousel/carousel2v2.stories';
import * as lineyearStory from '@stories/components/carousel/lineyear.stories';

export const {
  Default: { args: lineyear, storyName: lineyearName },
} = lineyearStory;
export const {
  Default: { args: carousel2v2 },
} = c2v2Story;
export const {
  Default: { args: carousel2v1 },
} = c2v1Story;
export const {
  Default: { args: carousel1v4, storyName: carousel1v4Name },
} = c1v4Story;
export const {
  Default: { args: carousel1v2 },
} = c1v2Story;
export const {
  Default: { args: carousel1v3 },
  Client: { args: carousel1v3_client, storyName: clientName },
} = c1v3Story;

export const {
  Default: { args: carousel1v1 },
  TextHero: { args: textHero, storyName: textHeroName },
  FullScreen: { args: fullscreen, storyName: fullscreenName },
  Video: { args: video, storyName: videoStoryName },
} = c1v1Story;

export const carousels = [
  {
    label: 'V1',
    child: [
      {
        label: '1v1',
        ...carousel1v1,
      },
      {
        label: '图文',
        ...textHero,
      },
      {
        label: '视频',
        ...video,
      },
      {
        label: '时间轴',
        ...lineyear,
      },
      {
        label: '1v4',
        ...carousel1v4,
      },
      {
        label: '全屏',
        ...fullscreen,
      },
      {
        label: '1v2',
        ...carousel1v2,
      },
      {
        label: '1v3',
        ...carousel1v3,
      },
      {
        label: '客户评价',
        ...carousel1v3_client,
      },
    ],
  },
  {
    label: 'V2',
    child: [
      {
        label: '2v1',
        ...carousel2v1,
      },
      {
        label: '2v2',
        ...carousel2v2,
      },
    ],
  },
];
