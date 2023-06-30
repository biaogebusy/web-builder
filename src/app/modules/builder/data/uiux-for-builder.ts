import { IUiux } from '@core/interface/IBuilder';
import components from './components-for-builder.json';
import widgets from './widgets-for-builder.json';

export const uiux: IUiux[] = [
  {
    label: '基础',
    type: 'base',
    icon: {
      svg: 'view-grid-plus',
      inline: true,
    },
    elements: widgets.data,
  },
  {
    label: '组件',
    icon: {
      svg: 'format-list-bulleted',
      inline: true,
    },
    type: 'component',
    elements: components.data,
  },
];
