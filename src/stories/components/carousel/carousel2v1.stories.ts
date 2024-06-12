import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';

import { Carousel2v1Component } from '@uiux/combs/carousel/carousel2v1/carousel2v1.component';
import { StorysModule } from '@core/module/storys.module';
import { ICarouselBase } from '@core/interface/combs/ICarousel';

const meta: Meta<Carousel2v1Component> = {
  title: '复合组件/幻灯片/2v1',
  id: 'carousel-2v1',
  component: Carousel2v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
};

export default meta;
type Story = StoryObj<Carousel2v1Component>;
export const Default: Story = {};
const content: ICarouselBase = {
  type: 'carousel-2v1',
  title: {
    label: '用户是如何评价 Storybook',
    style: 'style-v1',
  },
  bg: {
    classes: 'bg-fill-width overlay overlay-80',
    img: {
      src: '/assets/images/bg/bg-03.jpeg',
      hostClasses: 'bg-center',
    },
  },
  classes: '',
  sliders: {
    params: {
      slidesPerView: 1,
      pagination: false,
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        600: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        960: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
    },
    classes: 'p-bottom',
    elements: [
      {
        type: 'testimonial',
        style: 'style-v2',
        title: 'Johnson',
        subTitle: 'FrontEnd',
        img: {
          src: '/assets/images/avatar/01.jpeg',
          alt: '',
        },
        body: 'Storybook是一个开发工具和UI组件库，用于构建、测试和文档化可复用的UI组件。它提供了一个独立于主应用程序的环境，让开发者能够以隔离的方式开发和调试组件。',
      },
      {
        type: 'testimonial',
        style: 'style-v2',
        title: 'Will',
        subTitle: 'FrontEnd',
        img: {
          src: '/assets/images/avatar/02.jpeg',
          alt: '',
        },
        body: 'Storybook是我们团队的救星！它使我们能够独立地开发、测试和文档化组件，大大提高了我们的工作效率。非常好用！',
      },
      {
        type: 'testimonial',
        style: 'style-v2',
        title: 'Ammy',
        subTitle: 'Backend',
        img: {
          src: '/assets/images/avatar/03.jpeg',
          alt: '',
        },
        body: '使用Storybook后，我们的组件开发变得更加高效和可靠。它帮助我们定义多个使用场景，清晰地展示组件在各种情景下的表现。我们团队对它赞不绝口！ ',
      },
      {
        type: 'testimonial',
        style: 'style-v2',
        title: 'Alen',
        subTitle: 'FrontEnd',
        img: {
          src: '/assets/images/avatar/04.jpeg',
          alt: '',
        },
        body: 'Storybook为我们的团队带来了极大的协作效益。它提供了一个集中查看和交流的平台，团队成员可以轻松共享和讨论组件。无疑是一个必备工具！ ',
      },
    ],
  },
};
Default.args = {
  content,
};

export const Light: Story = {};
Light.storyName = '自定义背景不透明度';
Light.args = {
  content: {
    ...Default.args.content,
    bg: {
      classes: 'bg-fill-width overlay overlay-60',
    },
  },
};
