import { hero1v4Shape } from '@stories/builder/data/combs/hero.builder';
import {
  carousel1v3_client,
  carousel2v2,
} from '@stories/builder/data/combs/carousel.builder';
import {
  showcase3v6_background,
  showcase3v9_video,
  showcase4v1_img,
} from '@stories/builder/data/combs/showcase.builder';
import { text } from '@stories/builder/data/widgets/base.builder';
export const home_v8 = {
  title: '首页 v8',
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
    { ...hero1v4Shape?.content },
    { ...carousel2v2?.content },
    {
      ...showcase3v6_background?.content,
      bg: { classes: 'bg-fill-width bg-' },
    },
    { ...showcase3v9_video?.content },
    { ...carousel1v3_client?.content },
    { ...showcase4v1_img?.content, bg: { classes: 'bg-fill-width bg-shadow' } },
    { ...text?.content },
  ],
};
