import {
  hero1v3V1,
  hero1v3V2,
} from '@stories/builder/data/components/hero.builder';
import {
  carousel1v3_client,
  carousel2v2,
} from '@stories/builder/data/components/carousel.builder';
import {
  showcase1v1_primary,
  showcase1v3_video,
  showcase1v4_price,
  showcase3v6_background,
  showcase3v9_video,
  showcase4v1_img,
} from '@stories/builder/data/components/showcase.builder';
import { text } from '@stories/builder/data/widgets/base.builder';
export const home_v13 = {
  title: '现代商业',
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
    hero1v3V2,
    carousel2v2,
    showcase1v1_primary,
    showcase3v9_video,
    showcase3v6_background,
    showcase4v1_img,
    showcase1v3_video,
    showcase1v4_price,
    showcase3v9_video,
    carousel1v3_client,
    text,
  ],
};
