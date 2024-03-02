import { hero1v2 } from '@stories/builder/data/combs/hero.builder';
import { carousel1v2 } from '@stories/builder/data/combs/carousel.builder';
export const home_v11 = {
  title: '首页 v11',
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
  body: [{ ...hero1v2?.content }, { ...carousel1v2?.content }],
};
