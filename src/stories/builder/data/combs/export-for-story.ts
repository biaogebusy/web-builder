import { hero } from './hero.builder';
import { showcase } from './showcase.builder';
import { drupal } from './drupal.builder';
import { tools } from './tools.builder';
import { carousels } from './carousel.builder';
import { masonry } from './masonry.builder';
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
    label: '轮播图',
    id: 'carousel',
    elements: [...carousels],
  },
  { label: '瀑布流', id: 'masonry', elements: [...masonry] },
  {
    label: 'Drupal',
    id: 'drupal',
    elements: [...drupal],
  },
  {
    label: '地图应用',
    id: 'map',
    elements: [...map],
  },
  {
    label: '工具',
    id: 'tools',
    elements: [...tools],
  },
];
