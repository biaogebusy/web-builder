import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Carousel1v3Component } from '@uiux/combs/carousel/carousel1v3/carousel1v3.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '复合组件/幻灯片/1v3',
  id: 'carousel-1v3',
  component: Carousel1v3Component,
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

Default.args = {
  content: {
    type: 'carousel-1v3',
    spacer: 'lg',
    text: {
      spacer: 'none',
      title: {
        label: '选择Drupal的原因',
        icon: '',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      body: '<p class="text-center">Drupal是数据管理中心，提供集中的地方来访问所有平台的数据</p><br>',
    },
    classes: '',
    bg: {
      classes: 'bg-shadow',
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
            spaceBetween: 30,
          },
        },
      },
      classes: 'p-bottom',
      elements: [
        {
          type: 'box',
          img: {
            src: '/assets/images/amazon.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: '组件编辑',
          },
          content: '通过简单的管理界面对复杂的可视化编辑',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/google.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: '企业营销',
          },
          content: '与企业营销工具整合，实现对内容和表单的管理',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/shopify.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: '数据收集',
          },
          content: '对数据进行收集和删除，符合政策的合规',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/paypal.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: '简化管理',
          },
          content: '简化了内容管理和用户角色管理，易于提高服务器性能',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/amazon.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: '存储集成',
          },
          content: '与云存储集成以实现解耦的文件管理',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/google.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: 'API 优先',
          },
          content: 'API First 易于与外部系统集成',
        },
      ],
    },
  },
};

export const Client = Template.bind({});
Client.storyName = '客户评价';
Client.args = {
  content: {
    type: 'carousel-1v3',
    spacer: 'lg',
    text: {
      spacer: 'none',
      title: {
        label: 'Whats Our Clients Said About Landrick Project',
        icon: '',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
    },
    classes: '',
    bg: {
      classes: 'bg-shadow',
    },
    sliders: {
      params: {
        slidesPerView: 1.1,
        spaceBetween: 20,
        navigation: false,
        breakpoints: {
          600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      },
      classes: 'p-bottom',
      elements: [
        {
          type: 'card-1v4',
          img: {
            classes: 'object-fit',
            src: '/assets/images/avatar/01.jpeg',
          },
          star: 5,
          title: '- 张明',
          subTitle: '前端开发',
          body: '"信使是一个令人惊叹的前端框架！它的灵活性和可扩展性让我能够快速构建出富有交互性和响应式的用户界面。我喜欢它的简洁和直观的API，使得编写代码变得非常愉快。"',
        },
        {
          type: 'card-1v4',
          img: {
            classes: 'object-fit',
            src: '/assets/images/avatar/02.jpeg',
          },
          star: 5,
          title: '- 王丽',
          subTitle: '前端开发',
          body: ' "使用信使前端框架，我能够以更高效的方式开发Web应用程序。它提供了一套强大的工具和组件，帮助我快速搭建界面和处理用户交互。文档也非常详细，让我能够迅速上手并解决问题。"',
        },
        {
          type: 'card-1v4',
          img: {
            classes: 'object-fit',
            src: '/assets/images/avatar/03.jpeg',
          },
          star: 5,
          title: '- 李军',
          subTitle: '前端开发',
          body: '"信使的性能和优化能力真是太棒了！它的虚拟DOM和差异更新算法使得应用程序在处理大规模数据和复杂UI时保持流畅。我特别喜欢它的性能监测工具，让我能够精确地了解我的应用程序在哪些方面可以进行优化。"',
        },
        {
          type: 'card-1v4',
          img: {
            classes: 'object-fit',
            src: '/assets/images/avatar/04.jpeg',
          },
          star: 5,
          title: '- 张燕',
          subTitle: '前端开发',
          body: ' "我使用信使来构建跨平台的移动应用程序，它的响应式设计和移动优化让我的应用在各种设备上都表现出色。它提供了许多有用的UI组件和手势操作支持，使得用户体验非常好。"',
        },
        {
          type: 'card-1v4',
          img: {
            classes: 'object-fit',
            src: '/assets/images/avatar/05.jpeg',
          },
          star: 5,
          title: '- 王刚',
          subTitle: '前端开发',
          body: '"信使框架的社区生态系统非常活跃，我能够轻松找到大量的扩展和插件来增强我的应用功能。它还与其他流行的库和工具很好地集成在一起，使得开发过程更加顺畅。"',
        },
        {
          type: 'card-1v4',
          img: {
            classes: 'object-fit',
            src: '/assets/images/avatar/06.jpeg',
          },
          star: 5,
          title: '- 李丽',
          subTitle: '前端开发',
          body: '"作为一个前端开发者，我一直在寻找一个简洁、高效的框架来满足我的需求。信使不仅提供了一套出色的工具和功能，而且还有一个友好的社区和优秀的支持团队。使用信使框架是我在前端开发中做出的最佳决策之一！"',
        },
      ],
    },
  },
};
