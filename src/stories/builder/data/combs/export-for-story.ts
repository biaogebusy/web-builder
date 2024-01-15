import { hero } from './hero.builder';
import { showcase } from './showcase.builder';
import { tools } from './tools.builder';
import { carousels } from './carousel.builder';
import { masonry } from './masonry.builder';
import { IBuilderComponent } from '@core/interface/IBuilder';

export const components: IBuilderComponent[] = [
  {
    label: '首屏',
    id: 'hero',
    elements: [...hero],
  },
  {
    label: '图文',
    id: 'showcase',
    elements: [...showcase],
  },
  {
    label: '幻灯片',
    id: 'carousel',
    elements: [...carousels],
  },
  {
    label: '瀑布流',
    id: 'masonry',
    elements: [...masonry],
  },

  {
    label: '工具',
    id: 'tools',
    elements: [...tools],
  },
];
