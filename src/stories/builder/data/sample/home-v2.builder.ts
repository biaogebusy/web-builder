import { hero2v3 } from '@stories/builder/data/combs/hero.builder';
import {
  showcase1v1_v3,
  showcase2v1_card1v1,
  showcase3v4_background,
  showcase4v1_default,
} from '@stories/builder/data/combs/showcase.builder';

import { carousel1v1 } from '@stories/builder/data/combs/carousel.builder';
import { action1v1 } from '../base/common.builder';
export const home_v2 = {
  title: '首页 v2',
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
  config: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  body: [
    { ...hero2v3?.content },
    { ...showcase1v1_v3?.content },
    { ...showcase2v1_card1v1?.content },
    { ...action1v1?.content },
    {
      ...showcase3v4_background?.content,
      bg: { classes: 'bg-fill-width bg-' },
    },
    {
      ...showcase4v1_default?.content,
      bg: { classes: 'bg-fill-width bg-shadow' },
    },
    { ...carousel1v1?.content },
  ],
};
