import * as iframeStory from '../../widgets/Iframe.stories';
import * as lightboxStory from '../../widgets/InlineLightbox.stories';
import * as locationStory from '../../components/map/location.stories';
import * as shapeStory from '../../widgets/Shape.stories';
import * as stepperStory from '../../widgets/Stepper.stories';
import * as swiperStory from '../../widgets/Swiper.stories';
import * as searchActionStory from '../../widgets/actions/SearchAction.stories';
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
  Default: { args: shape },
} = shapeStory;

const {
  Horizontal: { args: stepper },
} = stepperStory;

const {
  Default: { args: swiper },
} = swiperStory;

const {
  Default: { args: searchAction },
} = searchActionStory;

export const common = [
  {
    label: 'SearchBar',
    icon: { svg: 'magnify' },
    ...searchAction,
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
    label: 'Map',
    icon: {
      svg: 'map-marker',
    },
    ...location,
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
