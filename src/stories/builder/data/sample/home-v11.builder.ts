import { hero1v2 } from '@stories/builder/data/combs/hero.builder';
import { carousel1v2 } from '@stories/builder/data/combs/carousel.builder';
import { list2v1 } from '@stories/builder/data/combs/drupal.builder';
export const home_v11 = {
  title: 'Stories',
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
  body: [hero1v2, carousel1v2, list2v1],
};
