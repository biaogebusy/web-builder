import { IBuilderWidget } from '@core/interface/IBuilder';
import * as textStory from '../widgets/base/Text.stories';
import * as imgStory from '../widgets/base/Img.stories';
import * as chartStory from '../widgets/chart/ChartBar.stories';
const {
  Center: { args: text },
} = textStory as any;

const {
  Default: { args: img },
} = imgStory as any;

const {
  Bar: { args: chart },
} = chartStory as any;
export const widgets: IBuilderWidget[] = [
  {
    label: 'Basic',
    elements: [
      {
        label: 'Text',
        icon: {
          svg: 'format-size',
        },
        content: text,
      },
      {
        label: 'Image',
        icon: {
          svg: 'image-outline',
        },
        content: img,
      },
      {
        label: 'Chart',
        icon: {
          svg: 'chart-line',
        },
        content: chart,
      },
    ],
  },
];
