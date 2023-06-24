import { hero1v4Shape } from '@stories/builder/data/components/hero.builder';
import {
  carousel1v3_client,
  carousel2v2,
} from '@stories/builder/data/components/carousel.builder';
import {
  showcase3v6_background,
  showcase3v9_video,
  showcase4v1_img,
} from '@stories/builder/data/components/showcase.builder';
import { text } from '@stories/builder/data/widgets/base.builder';
export const home_v8 = {
  title: '首页 v8 Marketing',
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
    hero1v4Shape,
    carousel2v2,
    showcase3v6_background,
    showcase3v9_video,
    carousel1v3_client,
    showcase4v1_img,
    text,
  ],
};
