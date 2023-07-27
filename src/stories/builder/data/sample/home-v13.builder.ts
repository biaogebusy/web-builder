import { hero1v3V2 } from '@stories/builder/data/combs/hero.builder';
import {
  carousel1v3_client,
  carousel2v2,
} from '@stories/builder/data/combs/carousel.builder';
import {
  showcase1v1_primary,
  showcase1v3_video,
  showcase1v4_price,
  showcase3v6_background,
  showcase3v9_video,
  showcase4v1_img,
} from '@stories/builder/data/combs/showcase.builder';
import { text } from '@stories/builder/data/widgets/base.builder';
export const home_v13 = {
  title: '首页 v13',
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
    { ...hero1v3V2?.content },
    { ...carousel2v2?.content, bg: { classes: 'bg-fill-width bg-' } },
    { ...showcase1v1_primary?.content },
    { ...showcase3v9_video?.content },
    { ...showcase3v6_background?.content },
    { ...showcase4v1_img?.content },
    { ...showcase1v3_video?.content },
    { ...showcase1v4_price?.content },
    { ...showcase3v9_video?.content },
    { ...carousel1v3_client?.content },
    { ...text?.content },
  ],
};
