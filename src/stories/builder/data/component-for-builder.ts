import { hero } from '../components/hero.builder';
import { showcase } from '../components/showcase.builder';
import { drupal } from '../components/drupal.builder';
import { others } from '../components/other.builder';
import { tools } from '../components/tools.builder';
import { carousels } from '../components/carousel.builder';
import { masonry } from '../components/masonry.builder';
import { manage } from '../components/manage.builder';
import { map } from '../components/map.builder';

export const components: any[] = [
  {
    label: 'Hero',
    id: 'hero',
    elements: [...hero],
  },
  {
    label: 'Showcase',
    id: 'showcase',
    elements: [...showcase],
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
