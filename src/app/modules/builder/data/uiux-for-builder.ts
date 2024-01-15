import { IUiux } from '@core/interface/IBuilder';
import components from './components-for-builder.json';
import systems from './system-for-builder.json';
import { samples } from './samples-for-builder';
import { base } from './base-for-builder';

export const uiux: IUiux[] = [
  {
    label: '基础组件',
    icon: {
      svg: 'youtube-subscription',
      inline: true,
    },
    type: 'component',
    elements: base,
  },
  {
    label: '复合组件',
    icon: {
      svg: 'land-plots',
      inline: true,
    },
    type: 'component',
    elements: components.data,
  },
  {
    label: '示例页面',
    icon: {
      svg: 'lightbulb-on-30',
      inline: true,
    },
    type: 'sample',
    elements: samples,
  },
  {
    label: '系统页面',
    type: 'system',
    icon: {
      svg: 'tune',
      inline: true,
    },
    elements: systems.data,
  },
];
