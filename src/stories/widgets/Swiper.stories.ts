import { ISwiper } from '@core/interface/widgets/ISwiper';
import { StorysModule } from '@core/module/storys.module';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/token-providers';
import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';

import { SwiperComponent } from '@uiux/widgets/swiper/swiper.component';

const meta: Meta<SwiperComponent> = {
  title: '基础组件/Swiper',
  id: 'swiper',
  component: SwiperComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<SwiperComponent>;
export const Default: Story = {};
const content: ISwiper = {
  type: 'swiper',
  params: {
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
  classes: '',
  elements: [
    {
      type: 'card',
      title: '高性能',
      subTitle: 'High Performance',
      classes: 'card-no-shadow',
      body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
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
      title: '易用的编辑器',
      subTitle: 'Simplicity for Editors',
      classes: 'card-no-shadow',
      body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
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
      title: '多语言',
      subTitle: 'Leader in Multilingual',
      classes: 'card-no-shadow',
      body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
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
      title: '更有弹性',
      subTitle: 'Flexibility',
      classes: 'card-no-shadow',
      body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
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
      title: '安全性',
      subTitle: 'Rigorous Security',
      classes: 'card-no-shadow',
      body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
    },
  ],
};
Default.args = {
  content,
};

export const CustomPagination: Story = {};
CustomPagination.args = {
  content: {
    ...content,
    custom: {
      pagination: {
        bulletsStyle: [
          {
            backgroundColor: '#497261',
            width: '12px',
            height: '12px',
          },
          {
            backgroundColor: '#deca94',
            width: '12px',
            height: '12px',
          },
          {
            backgroundColor: '#2f3c41',
            width: '12px',
            height: '12px',
          },
          {
            backgroundColor: '#393939',
            width: '12px',
            height: '12px',
          },
        ],
      },
    },
  },
};
