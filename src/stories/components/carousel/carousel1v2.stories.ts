import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { Carousel1v2Component } from '@uiux/combs/carousel/carousel1v2/carousel1v2.component';
import { StorysModule } from '@core/module/storys.module';
import { ICarouselBase } from '@core/interface/combs/ICarousel';

export default {
  title: '复合组件/幻灯片/1v2',
  id: 'carousel-1v2',
  component: Carousel1v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: ICarouselBase = {
  type: 'carousel-1v2',
  title: {
    label: '近期作品',
    style: 'style-v5',
  },
  classes: '',
  bg: {
    classes: 'bg-white bg-fill-width',
  },
  sliders: {
    params: {
      slidesPerView: 1.2,
      spaceBetween: 10,
      navigation: false,
      pagination: false,
      breakpoints: {
        '600': {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        '960': {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    },
    classes: 'p-bottom',
    elements: [
      {
        type: 'card',
        link: {
          href: '#',
          label: '知乎社区问答平台',
        },
        classes: 'card-no-shadow',
        body: '面向广大用户提供知识分享和交流的问答社区，具有简洁清晰的界面设计和消息通知系统，支持多种方式的分享和交流。',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/5.jpg',
            alt: 'alt',
          },
        },
      },
      {
        type: 'card',
        link: {
          href: '#',
          label: 'Shopify电商平台',
        },
        classes: 'card-no-shadow',
        body: '提供全面电商解决方案的科技公司的官方网站，拥有富有创意的设计和易于使用的交互功能，让用户轻松创建自己的电商网站并实现商业目标。',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/6.jpg',
            alt: 'alt',
          },
        },
      },
      {
        type: 'card',
        classes: 'card-no-shadow',
        link: {
          href: '#',
          label: '酷狗音乐web版',
        },
        body: '支持在线听歌的音乐网站，提供海量音乐资源，拥有个性化的推荐和电台功能。',
        moreLabel: 'Learn More',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/1.jpg',
            alt: 'alt',
          },
        },
      },
      {
        type: 'card',
        link: {
          href: '#',
          label: '全职高手小说官网',
        },
        classes: 'card-no-shadow',
        body: '基于网络文学改编的小说官网，为读者提供轻松愉悦的用户界面和舒适的阅读体验。',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/2.jpg',
            alt: 'alt',
          },
        },
      },
      {
        type: 'card',
        link: {
          href: '#',
          label: '匠人联盟电商平台',
        },
        classes: 'card-no-shadow',
        body: '面向手工艺爱好者的电商平台，提供独立设计师的手工作品和教程，让用户可以轻松地DIY定制自己的物品。',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/3.jpg',
            alt: 'alt',
          },
        },
      },
      {
        type: 'card',
        link: {
          href: '#',
          label: '美之味食品官网',
        },
        classes: 'card-no-shadow',
        body: '为用户提供极致美食品味体验的食品官网，展现诱人的图片和独特的设计，吸引用户的注意力并增加销售。',
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/showcase/4.jpg',
            alt: 'alt',
          },
        },
      },
    ],
  },
};

Default.args = {
  content,
};

Default.play = async () => {
  const Next = screen.getByTestId('next');
  await userEvent.click(Next);
};
