import { IBuilderComponent } from '@core/interface/IBuilder';
import { card } from './widgets/card.builder';
import { feedback } from './widgets/feedback.builder';
import { base } from './widgets/base.builder';
import { common } from './widgets/common.builder';
import { medias } from './widgets/media.builder';

export const widgets: IBuilderComponent[] = [
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
