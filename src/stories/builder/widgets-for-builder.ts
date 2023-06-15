import { IBuilderWidget } from '@core/interface/IBuilder';
import * as textStory from '../widgets/base/Text.stories';
import * as imgStory from '../widgets/base/Img.stories';
import * as chartStory from '../widgets/chart/ChartBar.stories';
import * as spacerStory from '../theme/Spacer.stories';
import * as formStory from '../widgets/Form.stories';

const {
  Center: { args: text },
} = textStory as any;

const {
  Default: { args: img },
} = imgStory as any;

const {
  Bar: { args: chart },
} = chartStory as any;

const {
  Normal: { args: spacer },
} = spacerStory as any;

const {
  Default: { args: form },
} = formStory as any;

export const widgets: IBuilderWidget[] = [
  {
    label: 'Basic',
    elements: [
      {
        label: 'Text',
        icon: {
          svg: 'format-size',
        },
        ...text,
      },
      {
        label: 'Image',
        icon: {
          svg: 'image-outline',
        },
        ...img,
      },
      {
        label: 'Chart',
        icon: {
          svg: 'chart-line',
        },
        ...chart,
      },
      {
        label: 'Spacer',
        icon: {
          svg: 'color-helper',
        },
        ...spacer,
      },
      {
        label: 'Form',
        icon: {
          svg: 'form-select',
        },
        content: {
          type: 'formly',
          fields: form.fields,
        },
      },
    ],
  },
];
