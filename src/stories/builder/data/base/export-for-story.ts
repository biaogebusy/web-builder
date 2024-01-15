import { IBuilderComponent } from '@core/interface/IBuilder';
import { common } from './common.builder';
import { layoutBuilder } from './layout-builder-for-story';

export const base: IBuilderComponent[] = [
  {
    label: '动态构建',
    id: 'layout',
    description: '任意组合组件',
    elements: layoutBuilder,
  },
  {
    label: '常用组件',
    id: 'base',
    elements: common,
  },
];
