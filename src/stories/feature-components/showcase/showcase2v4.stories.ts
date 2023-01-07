import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase2v4Component } from '@uiux/combs/showcase/showcase2v4/showcase2v4.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '特色组件/展示 Showcase/2v4',
  id: 'showcase-2v4',
  component: Showcase2v4Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
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
    text: {
      title: {
        label: 'Our Products',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      body: '<p class="text-center">Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。</p>',
    },
    spacer: 'md',
    fullWidth: true,
    elements: [
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-140',
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
        ratios: 'media-140',
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
        ratios: 'media-140',
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
    ],
  },
};
