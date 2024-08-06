import { IBuilderComponent } from '@core/interface/IBuilder';
import { common } from './common-for-story';
import { layoutBuilder } from './layout-builder-for-story';
import { sections } from './sections-for-story';
import { tailwind } from './custom-for-story';

export const base: IBuilderComponent[] = [
  {
    label: '动态构建',
    id: 'layout',
    elements: layoutBuilder,
  },
  {
    label: 'Tailwind 组件',
    id: 'tailwind',
    elements: tailwind,
  },
  {
    label: '常用 Section',
    id: 'section',
    elements: sections,
  },
  {
    label: '常用组件',
    id: 'base',
    elements: common,
  },
];
