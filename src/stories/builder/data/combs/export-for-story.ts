import { hero } from './hero.builder';
import { showcase } from './showcase.builder';
import { tools } from './tools.builder';
import { carousels } from './carousel.builder';
import { masonry } from './masonry.builder';
import { base } from './base.builder';

export const components: any[] = [
  {
    label: '基础',
    id: 'base',
    elements: base,
  },
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
