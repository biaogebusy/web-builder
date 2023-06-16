import * as packeryStory from '@stories/components/masonry/packery.stories';
import * as shuffleStory from '@stories/components/masonry/shuffle.stories';

const {
  Default: { args: shuffle },
} = shuffleStory;

const {
  Default: { args: packery },
  ContentBox: { args: contentBox, storyName: contentBoxName },
} = packeryStory;

export const masonry = [
  packery,
  { ...contentBox, name: contentBoxName },
  shuffle,
];
