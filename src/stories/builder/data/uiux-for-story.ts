import { IUiux } from '@core/interface/IBuilder';
import { components } from './combs/export-for-story';
import { samples } from './sample/samples-for-story';
import { systems } from './system/system-fot-story';

export const uiux: IUiux[] = [
  {
    label: '页面组件',
    icon: {
      svg: 'land-plots',
      inline: true,
    },
    type: 'component',
    elements: components,
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
    icon: {
      svg: 'tune-variant',
      inline: true,
    },
    type: 'system',
    elements: systems,
  },
];
