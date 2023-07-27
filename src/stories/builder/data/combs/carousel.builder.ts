import * as c1v1Story from '@stories/components/carousel/carousel1v1.stories';
import * as c1v2Story from '@stories/components/carousel/carousel1v2.stories';
import * as c1v3Story from '@stories/components/carousel/carousel1v3.stories';
import * as c1v4Story from '@stories/components/carousel/carousel1v4.stories';
import * as c2v1Story from '@stories/components/carousel/carousel2v1.stories';
import * as c2v2Story from '@stories/components/carousel/carousel2v2.stories';
import * as lineyearStory from '@stories/components/carousel/lineyear.stories';

export const {
  Default: { args: lineyear, storyName: lineyearName },
} = lineyearStory;
export const {
  Default: { args: carousel2v2 },
} = c2v2Story;
export const {
  Default: { args: carousel2v1 },
} = c2v1Story;
export const {
  Default: { args: carousel1v4, storyName: carousel1v4Name },
} = c1v4Story;
export const {
  Default: { args: carousel1v2 },
} = c1v2Story;
export const {
  Default: { args: carousel1v3 },
  Client: { args: carousel1v3_client, storyName: clientName },
} = c1v3Story;

export const {
  Default: { args: carousel1v1 },
  TextHero: { args: textHero, storyName: textHeroName },
  FullScreen: { args: fullscreen, storyName: fullscreenName },
} = c1v1Story;

export const carousels = [
  {
    content: {
      child: [
        {
          label: 'carousel-1v1',
          elements: [
            carousel1v1,
            { ...textHero, name: textHeroName },
            { ...lineyear, name: lineyearName },
            { ...carousel1v4, name: carousel1v4Name },
            { ...fullscreen, name: fullscreenName },
          ],
        },
      ],
    },
  },
  carousel1v2,
  {
    content: {
      child: [
        {
          label: 'carousel-1v3',
          elements: [carousel1v3, { ...carousel1v3_client, name: clientName }],
        },
      ],
    },
  },
  carousel2v1,
  carousel2v2,
];
