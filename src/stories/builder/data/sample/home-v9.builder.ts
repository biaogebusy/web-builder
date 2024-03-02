import { hero2v1Default } from '@stories/builder/data/combs/hero.builder';
import {
  showcase2v2_default,
  showcase4v1_img,
} from '@stories/builder/data/combs/showcase.builder';
import { carousel1v2 } from '@stories/builder/data/combs/carousel.builder';
export const home_v9 = {
  title: '首页 v9',
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
    { ...hero2v1Default?.content },
    { ...showcase2v2_default?.content },
    { ...showcase4v1_img?.content, bg: { classes: 'bg-fill-width bg-shadow' } },
    { ...carousel1v2?.content },
  ],
};
