import { IUiux } from '@core/interface/IBuilder';
import { components } from './combs/export-for-story';
import { samples } from './sample/samples-for-story';
import { systems } from './system/system-fot-story';
import { base } from './base/export-for-story';

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
    type: 'component',
    icon: {
      svg: 'land-plots',
      inline: true,
    },
    elements: components,
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
