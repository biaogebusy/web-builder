import { hero } from './hero-for-builder';
import { showcase } from './showcse-for-builder';

export const components: any[] = [
  {
    label: 'Hero',
    elements: [...hero],
  },
  {
    label: 'Showcase',
    elements: [...showcase],
  },
];
