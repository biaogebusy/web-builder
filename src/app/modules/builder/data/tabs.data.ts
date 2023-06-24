import { IBuilderTab } from '@core/interface/IBuilder';
import components from './components.json';
import widgets from './widgets.json';

export const tabs: IBuilderTab[] = [
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
