import { hero } from './components/hero.builder';
import { showcase } from './components/showcse.builder';
import { drupal } from './components/drupal.builder';

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
    label: 'Drupal',
    elements: [...drupal],
  },
];
