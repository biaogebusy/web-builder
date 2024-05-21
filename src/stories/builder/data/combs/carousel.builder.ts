import * as c1v1Story from '@stories/components/carousel/carousel1v1.stories';
import * as c1v2Story from '@stories/components/carousel/carousel1v2.stories';
import * as c1v3Story from '@stories/components/carousel/carousel1v3.stories';
import * as c1v4Story from '@stories/components/carousel/carousel1v4.stories';
import * as c2v1Story from '@stories/components/carousel/carousel2v1.stories';
import * as c2v2Story from '@stories/components/carousel/carousel2v2.stories';
import * as lineyearStory from '@stories/components/carousel/lineyear.stories';

export const carousels = [
  {
    label: 'V1',
    child: [
      {
        label: '1v1',
        content: c1v1Story.Default?.args?.content,
      },
      {
        label: '图文',
        content: c1v1Story.TextHero?.args?.content,
      },
      {
        label: '视频',
        content: c1v1Story.Video?.args?.content,
      },
      {
        label: '时间轴',
        content: lineyearStory.Default?.args?.content,
      },
      {
        label: '1v4',
        content: c1v4Story.Default?.args?.content,
      },
      {
        label: '全屏',
        content: c1v1Story.FullScreen?.args?.content,
      },
      {
        label: '1v2',
        content: c1v2Story.Default?.args?.content,
      },
      {
        label: '1v3',
        content: c1v3Story.Default?.args?.content,
      },
      {
        label: '客户评价',
        content: c1v3Story.Client?.args?.content,
      },
    ],
  },
  {
    label: 'V2',
    child: [
      {
        label: '2v1',
        content: c2v1Story.Default?.args?.content,
      },
      {
        label: '2v2',
        content: c2v2Story.Default?.args?.content,
      },
    ],
  },
];
