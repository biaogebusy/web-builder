import { IBuilderTab } from '@core/interface/IBuilder';
import { components } from './component-for-builder';
import { widgets } from './widgets-for-builder';

export const tabs: IBuilderTab[] = [
  {
    label: '基础',
    type: 'base',
    icon: {
      svg: 'view-grid-plus',
      inline: true,
    },
    elements: widgets,
  },
  {
    label: '组件',
    icon: {
      svg: 'format-list-bulleted',
      inline: true,
    },
    type: 'component',
    elements: components,
  },
];
