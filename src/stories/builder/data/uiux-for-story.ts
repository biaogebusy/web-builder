import { IUiux } from '@core/interface/IBuilder';
import { components } from './combs/export-for-story';
import { widgets } from './widgets/export-for-story';
import { samples } from './sample/samples-for-story';

export const uiux: IUiux[] = [
  {
    label: '基础组件',
    type: 'base',
    icon: {
      svg: 'plus-circle-outline',
      inline: true,
    },
    elements: widgets,
  },
  {
    label: '复合组件',
    icon: {
      svg: 'tune',
      inline: true,
    },
    type: 'component',
    elements: components,
  },
  {
    label: '示例页面',
    icon: {
      svg: 'folder-multiple-outline',
      inline: true,
    },
    type: 'sample',
    elements: samples,
  },
];
