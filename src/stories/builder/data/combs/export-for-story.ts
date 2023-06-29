import { hero } from './hero.builder';
import { showcase } from './showcase.builder';
import { drupal } from './drupal.builder';
import { others } from './other.builder';
import { tools } from './tools.builder';
import { carousels } from './carousel.builder';
import { masonry } from './masonry.builder';
import { manage } from './manage.builder';
import { map } from './map.builder';

export const components: any[] = [
  {
    label: 'Showcase',
    id: 'showcase',
    elements: [...showcase],
  },
  {
    label: 'Hero',
    id: 'hero',
    elements: [...hero],
  },
  {
    label: 'Carousel',
    id: 'carousel',
    elements: [...carousels],
  },
  { label: 'Masonry', id: 'masonry', elements: [...masonry] },
  {
    label: 'Manage',
    id: 'manage',
    elements: [...manage],
  },
  {
    label: 'Drupal',
    id: 'drupal',
    elements: [...drupal],
  },
  {
    label: 'Map',
    id: 'map',
    elements: [...map],
  },
  {
    label: 'Other',
    id: 'other',
    elements: [...others],
  },
  {
    label: 'Tools',
    id: 'tools',
    elements: [...tools],
  },
];
