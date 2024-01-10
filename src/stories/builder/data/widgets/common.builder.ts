import * as iframeStory from '@stories/widgets/Iframe.stories';
import * as lightboxStory from '@stories/widgets/InlineLightbox.stories';
import * as shapeStory from '@stories/widgets/Shape.stories';
import * as stepperStory from '@stories/widgets/Stepper.stories';

export const {
  CustomSize: { args: iframe },
} = iframeStory;

export const {
  Default: { args: lightbox },
} = lightboxStory;

export const {
  Default: { args: shape },
} = shapeStory;

export const {
  Horizontal: { args: stepper },
} = stepperStory;

export const common = [
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
    label: '形状',
    icon: {
      svg: 'cosine-wave',
    },
    ...shape,
  },
  {
    label: '进步器',
    forLayout: true,
    icon: {
      svg: 'debug-step-over',
    },
    ...stepper,
  },
];
