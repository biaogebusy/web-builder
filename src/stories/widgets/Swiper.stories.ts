import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/core.config';
import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { SwiperComponent } from '@uiux/widgets/swiper/swiper.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: 'Widgets/Swiper',
  component: SwiperComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
  ],
} as Meta;

const Template: Story<SwiperComponent> = (args) => ({
  component: SwiperComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    params: {
      slidesPerView: 1.2,
      spaceBetween: 20,
      navigation: false,
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
    },
    classes: 'p-bottom',
    elements: [
      {
        type: 'card',
        title: 'JOHNSON',
        subTitle: 'Frontend Devel',
        classes: 'card-no-shadow',
        body: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. ',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto1.jpg',
            alt: 'alt',
          },
        },
      },
      {
        type: 'card',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto7.jpg',
            alt: 'alt',
          },
        },
        title: 'JOHNSON',
        subTitle: 'Frontend Devel',
        classes: 'card-no-shadow',
        body: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. ',
      },
      {
        type: 'card',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto2.jpg',
            alt: 'alt',
          },
        },
        title: 'Will',
        subTitle: 'Frontend Devel',
        classes: 'card-no-shadow',
        body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr. ',
      },
      {
        type: 'card',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto3.jpg',
            alt: 'alt',
          },
        },
        title: 'Tamy',
        subTitle: 'Backend Devel',
        classes: 'card-no-shadow',
        body: 'Sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
      },
      {
        type: 'card',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto4.jpg',
            alt: 'alt',
          },
        },
        title: 'Ada',
        subTitle: 'Frontend Devel',
        classes: 'card-no-shadow',
        body: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.',
      },
      {
        type: 'card',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto5.jpg',
            alt: 'alt',
          },
        },
        title: 'MeiMei',
        subTitle: 'Frontend Devel',
        classes: 'card-no-shadow',
        body: 'Vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.',
      },
      {
        type: 'card',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto6.jpg',
            alt: 'alt',
          },
        },
        title: 'Nikki',
        subTitle: 'BA Test',
        classes: 'card-no-shadow',
        body: 'Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      },
    ],
  },
};
