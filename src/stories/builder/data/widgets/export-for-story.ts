import { IBuilderComponent } from '@core/interface/IBuilder';
import { card } from './card.builder';
import { feedback } from './feedback.builder';
import { base } from './base.builder';
import { common } from './common.builder';
import { medias } from './media.builder';

export const widgets: any[] = [
  {
    label: '基础',
    elements: [...base],
  },
  {
    label: '卡片',
    elements: [...card],
  },
  {
    label: '常用',
    elements: [...common],
  },
  {
    label: '媒体',
    elements: [...medias],
  },
  {
    label: '反馈',
    elements: [...feedback],
  },
];
