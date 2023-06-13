import { IBuilderComponent } from '@core/interface/IBuilder';
import { hero } from './hero-for-builder';
import { showcase } from './showcse-for-builder';

export const components: IBuilderComponent[] = [
  {
    label: 'Hero',
    elements: [...hero],
  },
  {
    label: 'Showcase',
    elements: [...showcase],
  },
];
