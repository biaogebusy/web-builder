import { hero1v3V1 } from '@stories/builder/data/combs/hero.builder';
import {
  showcase1v3_video,
  showcase2v1_card1v1,
  showcase3v6_background,
  showcase3v6_default,
  showcase3v9_reverse,
  showcase3v9_video,
  shwocase1v1_image,
} from '@stories/builder/data/combs/showcase.builder';
import { carousel1v1 } from '@stories/builder/data/combs/carousel.builder';
import { text } from '@stories/builder/data/widgets/base.builder';

export const home_v4 = {
  title: '首页 v4',
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
    hero1v3V1,
    shwocase1v1_image,
    showcase3v9_video,
    showcase3v9_reverse,
    showcase1v3_video,
    showcase3v6_background,
    carousel1v1,
    showcase2v1_card1v1,
    text,
  ],
};
