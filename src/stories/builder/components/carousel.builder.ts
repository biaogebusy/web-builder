import * as c1v1Story from '@stories/components/carousel/carousel1v1.stories';
import * as c1v2Story from '@stories/components/carousel/carousel1v2.stories';
import * as c1v3Story from '@stories/components/carousel/carousel1v3.stories';
import * as c1v4Story from '@stories/components/carousel/carousel1v4.stories';
import * as c2v1Story from '@stories/components/carousel/carousel2v1.stories';
import * as c2v2Story from '@stories/components/carousel/carousel2v2.stories';
import * as lineyearStory from '@stories/components/carousel/lineyear.stories';

const {
  Default: { args: lineyear, storyName: lineyearName },
} = lineyearStory;
const {
  Default: { args: c2v2 },
} = c2v2Story;
const {
  Default: { args: c2v1 },
} = c2v1Story;
const {
  Default: { args: c1v4 },
} = c1v4Story;
const {
  Default: { args: c1v2 },
} = c1v2Story;
const {
  Default: { args: c1v3 },
  Client: { args: client, storyName: clientName },
} = c1v3Story;

const {
  Default: { args: c1v1 },
  TextHero: { args: textHero, storyName: textHeroName },
} = c1v1Story;

export const carousels = [
  c1v1,
  { ...textHero, name: textHeroName },
  { ...lineyear, name: lineyearName },
  c1v2,
  c1v3,
  { ...client, name: clientName },
  c1v4,
  c2v1,
  c2v2,
];
