import * as iframeStory from '@stories/widgets/Iframe.stories';
import * as lightboxStory from '@stories/widgets/InlineLightbox.stories';
import * as shapeStory from '@stories/widgets/Shape.stories';
import * as stepperStory from '@stories/widgets/Stepper.stories';
import * as swiperStory from '@stories/widgets/Swiper.stories';
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

export const {
  Default: { args: swiper },
} = swiperStory;

export const common = [
  {
    label: 'SearchBar',
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
    label: 'Swiper',
    icon: {
      svg: 'view-array-outline',
    },
    ...swiper,
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
];
