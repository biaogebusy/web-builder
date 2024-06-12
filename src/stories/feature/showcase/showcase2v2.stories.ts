import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { Showcase2v2Component } from '@uiux/combs/showcase/showcase2v2/showcase2v2.component';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase2v2 } from '@core/interface/combs/IShowcase';

const meta: Meta<Showcase2v2Component> = {
  title: '特色组件/图文 Showcase/2v2',
  id: 'showcase-2v2',
  component: Showcase2v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Showcase2v2Component>;
export const Default: Story = {};
const content: IShowcase2v2 = {
  type: 'showcase-2v2',
  text: {
    title: {
      label: '本年度<strong class="text-primary">艺术作品</strong>代表作',
      style: 'style-v1',
      classes: 'mat-display-2 bold',
    },
    classes: 'text-center',
    body: '<p class="text-center">突破传统的艺术边界，展示前卫和创新的艺术作品</p>',
  },
  row: 3,
  bg: { classes: '' },
  classes: '',
  elements: [
    {
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto1.jpg',
              alt: 'lazyload',
            },
          },
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto2.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: '《绝望之境》',
      },
      body: '展现了作者内心深处的黑暗情绪，让观者深陷其中，感受到无尽的绝望与孤独。',
    },
    {
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto3.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: '《色彩之舞》',
      },
      body: '如同一幅绚丽的画卷，色彩的交织与流动呈现出动感和活力，令人心旷神怡。',
    },
    {
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto4.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: '《时间的拥抱》',
      },
      body: '将时间的概念与人类情感相融合，通过流动的线条和温暖的色调传递出对美好回忆的珍视与怀念。',
    },
    {
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto5.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: '《自由的翅膀》',
      },
      body: '象征着无拘束和追求自由的欲望，作品中的动感线条和飞扬的形态让人感受到自由的力量与憧憬。',
    },
  ],
};

Default.args = {
  content,
};
