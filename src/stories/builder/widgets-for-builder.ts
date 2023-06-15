import { IBuilderWidget } from '@core/interface/IBuilder';
import * as textStory from '../widgets/base/Text.stories';
import * as imgStory from '../widgets/base/Img.stories';
import * as chartStory from '../widgets/chart/ChartBar.stories';
import * as spacerStory from '../theme/Spacer.stories';
import * as formStory from '../widgets/Form.stories';
import * as iframeStory from '../widgets/Iframe.stories';
import * as lightboxStory from '../widgets/InlineLightbox.stories';
import * as locationStory from '../components/map/location.stories';
import * as panelStory from '../widgets/Panel.stories';
import * as shapeStory from '../widgets/Shape.stories';
import * as stepperStory from '../widgets/Stepper.stories';

const {
  Center: { args: text },
} = textStory;

const {
  Default: { args: img },
} = imgStory;

const {
  Bar: { args: chart },
} = chartStory;

const {
  Normal: { args: spacer },
} = spacerStory as any;

const {
  Default: { args: form },
} = formStory as any;

const {
  CustomSize: { args: iframe },
} = iframeStory;

const {
  Default: { args: lightbox },
} = lightboxStory;

const {
  Default: { args: location },
} = locationStory;

const {
  Default: { args: panel },
} = panelStory;

const {
  Default: { args: shape },
} = shapeStory;

const {
  Horizontal: { args: stepper },
} = stepperStory;

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
      {
        label: 'Iframe',
        icon: {
          svg: 'application-array-outline',
        },
        ...iframe,
      },
      {
        label: 'Lightbox',
        icon: {
          svg: 'view-carousel-outline',
        },
        ...lightbox,
      },
      {
        label: 'Map',
        icon: {
          svg: 'map-marker',
        },
        ...location,
      },
      {
        label: 'Panel',
        icon: {
          svg: 'format-line-weight',
        },
        ...panel,
      },
      {
        label: '形状',
        icon: {
          svg: 'cosine-wave',
        },
        ...shape,
      },
      {
        label: 'Stepper',
        icon: {
          svg: 'debug-step-over',
        },
        ...stepper,
      },
    ],
  },
];
