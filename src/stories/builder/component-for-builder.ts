import { hero } from './components/hero.builder';
import { showcase } from './components/showcase.builder';
import { drupal } from './components/drupal.builder';
import { others } from './components/other.builder';
import { tools } from './components/tools.builder';
import { carousels } from './components/carousel.builder';
import { masonry } from './components/masonry.builder';

export const components: any[] = [
  {
    label: 'Hero',
    elements: [...hero],
  },
  {
    label: 'Showcase',
    elements: [...showcase],
  },
  {
    label: 'Carousel',
    elements: [...carousels],
  },
  { label: 'Masonry', elements: [...masonry] },
  {
    label: 'Drupal',
    elements: [...drupal],
  },
  {
    label: 'Other',
    elements: [...others],
  },
  {
    label: 'Tools',
    elements: [...tools],
  },
];
