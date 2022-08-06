import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { Carousel1v1Component } from '@uiux/combs/carousel/carousel1v1/carousel1v1.component';
export default {
  title: 'Components/carousel/1v1',
  component: Carousel1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
  ],
} as Meta;

const Template: Story<Carousel1v1Component> = (args) => ({
  component: Carousel1v1Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    spacer: 'lg',
    title: {
      label: 'Meet the team',
      icon: 'email',
      style: 'style-v2',
      classes: 'mat-display-1',
    },
    bg: {
      classes: 'bg-white bg-fill-width',
    },
    sliders: {
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
  },
};

export const TextHero = Template.bind({});
TextHero.args = {
  content: {
    spacer: 'none',
    disableContainer: true,
    sliders: {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: false,
        pagination: false,
      },
      classes: 'p-bottom',
      elements: [
        {
          type: 'text-hero',
          theme: 'text-light',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: '私募基金业务',
              style: 'style-v4',
              classes: 'mat-display-2 bold',
            },
            classes: 'y-center',
            style: [],
            bg: {
              classes: 'bg-shadow overlay overlay-20',
              img: {
                src: '/assets/images/hero/1-3.jpg',
                hostClasses: '',
              },
            },
            body: '<p>精通私募股权投资和风险投资所涉诸多法律事务，并在该领域拥有广泛的客户群体</p>\r\n',
            actionsAlign: 'start center',
            actions: [
              {
                href: '',
                label: '了解更多',
              },
            ],
          },
        },
        {
          type: 'text-hero',
          theme: 'text-light',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: '风险投资、收购兼并',
              style: 'style-v4',
              classes: 'mat-display-2 bold',
            },
            classes: 'y-center',
            style: [],
            bg: {
              classes: 'bg-shadow overlay overlay-',
              img: {
                src: '/assets/images/hero/1-6.jpg',
                hostClasses: '',
              },
            },
            body: '<p>在并购与重组领域拥有丰富的经验，多年来处于市场领先地位并得到广泛认可，曾代表众多国内和跨境并购交易</p>\r\n',
            actionsAlign: 'start center',
            actions: [
              {
                href: '',
                label: '了解更多',
              },
            ],
          },
        },
        {
          type: 'text-hero',
          theme: 'text-light',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: '新架构介绍，使用指南',
              style: 'style-v4',
              classes: 'mat-display-2 bold',
            },
            classes: 'y-center',
            style: [],
            bg: {
              classes: 'bg-shadow overlay overlay-',
              img: {
                src: '/assets/images/hero/182.jpg',
                hostClasses: '',
              },
            },
            body: '<p>全新的用户前台框架，体验更高效和流畅，为工作带来更多的效率</p>\r\n',
            actionsAlign: 'start center',
            actions: [
              {
                href: '',
                label: '了解更多',
              },
            ],
          },
        },
      ],
    },
  },
};
