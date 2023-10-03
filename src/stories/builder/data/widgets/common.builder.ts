import * as iframeStory from '@stories/widgets/Iframe.stories';
import * as lightboxStory from '@stories/widgets/InlineLightbox.stories';
import * as shapeStory from '@stories/widgets/Shape.stories';
import * as stepperStory from '@stories/widgets/Stepper.stories';
import * as action1v1Story from '@stories/components/action/Action1v1.stories';

export const {
  Default: { args: action1v1 },
} = action1v1Story;

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
    label: '搜索框',
    icon: { svg: 'magnify' },
    ...action1v1,
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
    label: '形状',
    icon: {
      svg: 'cosine-wave',
    },
    ...shape,
  },
  {
    label: '进步器',
    icon: {
      svg: 'debug-step-over',
    },
    ...stepper,
  },
];
