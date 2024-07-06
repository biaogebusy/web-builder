import { IUiux } from '@core/interface/IBuilder';
import { system } from './system-for-builder';
import { base } from './base-for-builder';
import { components } from './components-for-builder';

export const uiux: IUiux[] = [
  {
    label: '基础组件',
    icon: {
      svg: 'youtube-subscription',
    },
    type: 'component',
    elements: base,
  },
  {
    label: '复合组件',
    icon: {
      svg: 'land-plots',
    },
    type: 'component',
    elements: components,
  },
  {
    label: '系统页面',
    type: 'system',
    icon: {
      svg: 'tune',
    },
    elements: system,
  },
];
