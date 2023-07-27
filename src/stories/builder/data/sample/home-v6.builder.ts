import { hero1v3V2 } from '@stories/builder/data/combs/hero.builder';
import {
  showcase1v3_video,
  showcase2v1_card1v1,
  showcase3v9_reverse,
  showcase3v9_video,
} from '@stories/builder/data/combs/showcase.builder';
import {
  carousel1v2,
  carousel2v2,
} from '@stories/builder/data/combs/carousel.builder';
import { action1v1 } from '@stories/builder/data/widgets/common.builder';
import { text } from '@stories/builder/data/widgets/base.builder';

export const home_v6 = {
  title: '首页 v6',
  configBak: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '',
    },
  ],
  body: [
    { ...hero1v3V2?.content },
    { ...showcase3v9_video?.content },
    { ...showcase3v9_reverse?.content },
    { ...showcase2v1_card1v1?.content },
    { ...carousel1v2?.content },
    { ...action1v1?.content },
    { ...carousel2v2?.content, bg: { classes: 'bg-fill-width bg-' } },
    { ...showcase1v3_video?.content },
    { ...text?.content },
  ],
};
