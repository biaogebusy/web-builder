import * as packeryStory from '@stories/components/masonry/packery.stories';
import * as shuffleStory from '@stories/components/masonry/shuffle.stories';

export const masonry = [
  {
    label: 'packery',
    content: packeryStory?.Default?.args?.content,
  },
  {
    label: '内容盒子',
    content: packeryStory?.ContentBox?.args?.content,
  },
  {
    label: '洗牌',
    content: shuffleStory?.Default?.args?.content,
  },
];
