import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NgxPackeryModule } from 'ngx-packery';
import { PackeryComponent } from '@uiux/combs/masonry/packery/packery.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '组件/瀑布流/packery',
  id: 'packery',
  component: PackeryComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot(), NgxPackeryModule],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    config: {
      gutter: 0,
      imagesLoaded: true,
      percentPosition: true,
    },
    spacer: 'md',
    text: {
      title: {
        label: 'Our Products',
        style: 'style-v1',
        classes: 'mat-display-1 text-light',
      },
      body: '<p class="text-light text-center">Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。</p>',
    },
    bg: {
      classes: 'bg-fill-width bg-shadow overlay overlay-80',
      img: {
        hostClasses: '',
        src: '/assets/images/illustration/home-shape.png',
        mobile: '/assets/images/illustration/home-shape.png',
      },
    },
    elements: [
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto1.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto2.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '40',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto3.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto4.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto5.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto6.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto7.jpg',
          alt: 'alt',
        },
      },
    ],
  },
};

export const ContentBox = Template.bind({});

ContentBox.args = {
  content: {
    config: {
      gutter: 0,
      imagesLoaded: true,
      percentPosition: true,
    },
    spacer: 'md',
    text: {
      title: {
        label: 'Our Products',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      body: '<p class="text-center">Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。</p>',
    },
    bg: {
      classes: 'bg-fill-width bg-shadow',
      img: {
        hostClasses: '',
        src: '/assets/images/illustration/home-shape.png',
        mobile: '/assets/images/illustration/home-shape.png',
      },
    },
    fullWidth: true,
    elements: [
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-4-3',
        subTitle: {
          label: '音乐',
          href: '/search',
          queryParams: {
            law_category: 25,
          },
        },
        title: {
          label: '音乐版权发行代理顾问服务',
          href: '/search',
          queryParams: {
            law_category: 25,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto1.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-4-3',
        subTitle: {
          label: '影视',
          href: '/search',
          queryParams: {
            law_category: 27,
          },
        },
        title: {
          label: '影视项目投融资法律顾问，影视电视拍摄全程法律顾问',
          href: '/search',
          queryParams: {
            law_category: 27,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto2.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-4-3',
        subTitle: {
          label: '商务代言',
          href: '/search',
          queryParams: {
            law_category: 13,
          },
        },
        title: {
          label: '电视影视作品联合拍摄、外资引进专项法律顾问',
          href: '/search',
          queryParams: {
            law_category: 13,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto3.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '25',
        ratios: 'media-4-3',
        subTitle: {
          label: '直播',
          href: '/search',
          queryParams: {
            law_category: 28,
          },
        },
        title: {
          label: '直播平台、电视台等媒体法律风险防控',
          href: '/search',
          queryParams: {
            law_category: 28,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto4.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '25',
        ratios: 'media-4-3',
        subTitle: {
          label: '综艺',
          href: '/search',
          queryParams: {
            law_category: 35,
          },
        },
        title: {
          label: '综艺作品内容法律风险审查与规避',
          href: '/search',
          queryParams: {
            law_category: 35,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto6.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '25',
        ratios: 'media-4-3',
        subTitle: {
          label: '经济合同',
          href: '/search',
          queryParams: {
            law_category: 36,
          },
        },
        title: {
          label: '项目投融资法律顾问',
          href: '/search',
          queryParams: {
            law_category: 25,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto7.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '25',
        ratios: 'media-4-3',
        subTitle: {
          label: '维权与公关',
          href: '/search',
          queryParams: {
            law_category: 37,
          },
        },
        title: {
          label: '明星艺人/演员/模特/网红经纪法律服务',
          href: '/search',
          queryParams: {
            law_category: 37,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto5.jpg',
          alt: 'alt',
        },
      },
    ],
  },
};
