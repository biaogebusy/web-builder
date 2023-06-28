import { IUiux } from '@core/interface/IBuilder';
import { components } from './combs/export-for-story';
import { widgets } from './widgets/export-for-story';

export const uiux: IUiux[] = [
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
