import { IBuilderWidget } from '@core/interface/IBuilder';
import * as textStory from '../widgets/base/Text.stories';
import * as imgStory from '../widgets/base/Img.stories';
const {
  Center: {
    args: { content: text },
  },
} = textStory as any;

const {
  Default: {
    args: { content: img },
  },
} = imgStory as any;
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
    ],
  },
];
