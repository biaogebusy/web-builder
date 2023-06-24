import { hero2v1Default } from '@stories/builder/data/components/hero.builder';
import {
  showcase2v2_default,
  showcase4v1_img,
} from '@stories/builder/data/components/showcase.builder';
import { carousel1v2 } from '@stories/builder/data/components/carousel.builder';
import { list2v1 } from '@stories/builder/data/components/drupal.builder';
export const home_v9 = {
  title: 'Science',
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
    hero2v1Default,
    showcase2v2_default,
    showcase4v1_img,
    carousel1v2,
    list2v1,
  ],
};
