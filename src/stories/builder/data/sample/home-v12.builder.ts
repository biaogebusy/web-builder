import { hero2v2 } from '@stories/builder/data/components/hero.builder';
import { carousel2v2 } from '@stories/builder/data/components/carousel.builder';
import {
  showcase1v4_default,
  showcase1v4_dynamic,
} from '@stories/builder/data/components/showcase.builder';
import { text } from '@stories/builder/data/widgets/base.builder';
export const home_v12 = {
  title: '工作室',
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
  body: [hero2v2, carousel2v2, showcase1v4_default, showcase1v4_dynamic, text],
};
