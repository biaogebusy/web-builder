import { hero2v2 } from '@stories/builder/data/combs/hero.builder';
import { carousel2v2 } from '@stories/builder/data/combs/carousel.builder';
import {
  showcase1v4_default,
  showcase1v4_dynamic,
} from '@stories/builder/data/combs/showcase.builder';
import { text } from '@stories/builder/data/widgets/base.builder';
export const home_v12 = {
  title: '首页 v12',
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
    { ...hero2v2?.content },
    { ...carousel2v2?.content },
    { ...showcase1v4_default?.content },
    { ...showcase1v4_dynamic?.content },
    { ...text?.content },
  ],
};
