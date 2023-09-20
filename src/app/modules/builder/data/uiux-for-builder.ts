import { IUiux } from '@core/interface/IBuilder';
import components from './components-for-builder.json';
import widgets from './widgets-for-builder.json';
import systems from './system-for-builder.json';
import { samples } from './samples-for-builder';

export const uiux: IUiux[] = [
  {
    label: '基础组件',
    type: 'base',
    icon: {
      svg: 'plus-circle-outline',
      inline: true,
    },
    elements: widgets.data,
  },
  {
    label: '复合组件',
    icon: {
      svg: 'tune',
      inline: true,
    },
    type: 'component',
    elements: components.data,
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
  {
    label: '系统页面',
    type: 'system',
    icon: {
      svg: 'tune-variant',
      inline: true,
    },
    elements: systems,
  },
];
