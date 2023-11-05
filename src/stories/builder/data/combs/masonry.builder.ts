import * as packeryStory from '@stories/components/masonry/packery.stories';
import * as shuffleStory from '@stories/components/masonry/shuffle.stories';

export const {
  Default: { args: shuffle },
} = shuffleStory;

export const {
  Default: { args: packery },
  ContentBox: { args: contentBox, storyName: contentBoxName },
} = packeryStory;

export const masonry = [
  {
    label: 'packery',
    ...packery,
  },
  {
    label: contentBoxName,
    ...contentBox,
  },
  {
    label: '洗牌',
    ...shuffle,
  },
];
