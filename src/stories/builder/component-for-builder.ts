import { hero } from './components/hero.builder';
import { showcase } from './components/showcase.builder';
import { drupal } from './components/drupal.builder';
import { others } from './components/other.builder';
import { tools } from './components/tools.builder';
import { carousels } from './components/carousel.builder';
import { masonry } from './components/masonry.builder';
import { manage } from './components/manage.builder';
import { map } from './components/map.builder';

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
    label: 'Manage',
    elements: [...manage],
  },
  {
    label: 'Drupal',
    elements: [...drupal],
  },
  {
    label: 'Map',
    elements: [...map],
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
