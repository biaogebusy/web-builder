import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { of } from 'rxjs';
import { defaultHeader, footerInverse } from '../../branding/Branding.json';
import { BRANDING } from '@core/token/token-providers';

export default {
  title: '示例页面/首页示例/10 App 应用',
  id: 'home-v10',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [StorysModule.forRoot(), BlockModule, BrandingModule],
      providers: [
        {
          provide: BRANDING,
          useValue: of({
            ...defaultHeader,
            ...footerInverse,
          }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      <app-header></app-header>
      <div style="overflow:hidden">
      ${story}
      </div>
      <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
const content = of({
  title: '首页 v6 App 应用',
  configBak: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '',
    },
  ],
  body: [
    {
      type: 'hero-1v3',
      spacer: 'xl',
      text: {
        title: {
          label: 'We build best apps that users love',
          classes: 'mat-display-4 bold',
          style: 'style-v4',
        },
        classes: 'p-x',
        body: 'Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.',
        actions: [
          {
            type: 'btn',
            mode: 'raised',
            color: 'primary',
            href: '#',
            label: 'Install Now',
            target: '_blank',
          },
          {
            type: 'btn-video',
            color: 'primary',
            video: {
              options: {
                controls: true,
                aspectRatio: '16:9',
                poster: '/assets/images/16-9/business-02.jpg',
                sources: [
                  {
                    src: '/assets/video/afterglow.mp4',
                    type: 'video/mp4',
                  },
                ],
              },
            },
          },
        ],
      },
      right: [
        {
          type: 'img',
          hostClasses: 'img-bg-shape',
          classes: 'mover',
          src: '/assets/images/illustration/12.png',
        },
      ],
    },
    {
      type: 'showcase-1v1',
      title: {
        label: 'What We Do ?',
        style: 'style-v1',
      },
      subTitle: {
        spacer: 'none',
        body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p><br>',
      },
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      row: '3',
      elements: [
        {
          img: {
            src: '/assets/images/svg/Asset187.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '高性能',
          },
          content:
            '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
        },
        {
          img: {
            src: '/assets/images/svg/Asset189.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image primary',
          title: {
            href: '#',
            label: '易用的编辑器',
          },
          content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
        },
        {
          img: {
            src: '/assets/images/svg/Asset190.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '多语言',
          },
          content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
        },
      ],
    },
    {
      id: '',
      spacer: 'xl',
      type: 'showcase-3v9',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-01.png',
        },
      },
      order: {
        left: 0,
        right: 1,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/12.png',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: 'We Build High Performing Application',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: 'Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.\r\n\r\n<ul class="list-done">\r\n\t<li>Digital Marketing Solutions for Tomorrow</li>\r\n\t<li>Our Talented & Experienced Marketing Agency</li>\r\n\t<li>Create your own skin to match your brand</li>\r\n</ul>\r\n',
          actions: [
            {
              href: '#',
              label: 'Find Out More',
            },
          ],
        },
      ],
    },
    {
      id: '',
      spacer: 'xl',
      type: 'showcase-3v9',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-02.png',
        },
      },
      order: {
        left: 1,
        right: 0,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/12.png',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: 'Easy And Best Solution<br>For Your App',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: 'Launch your Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet eligendi expedita ducimus fuga sed possimus veritatis eum voluptates. Ab ex odio sed atque. Quam delectus, voluptatibus rem harum nihil minus. campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.',
          actions: [
            {
              href: '#',
              label: 'Find Out More',
            },
          ],
        },
      ],
    },
    {
      id: '',
      spacer: 'xl',
      type: 'showcase-3v9',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-01.png',
        },
      },
      order: {
        left: 0,
        right: 1,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/12.png',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: 'Beautiful, Simple & Easy to Use',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: 'Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.\r\n\r\n<ul class="list-done">\r\n\t<li>Digital Marketing Solutions for Tomorrow</li>\r\n\t<li>Our Talented & Experienced Marketing Agency</li>\r\n\t<li>Create your own skin to match your brand</li>\r\n</ul>\r\n',
          actions: [
            {
              href: '#',
              label: 'Find Out More',
            },
          ],
        },
      ],
    },
    {
      type: 'carousel-1v3',
      spacer: 'lg',
      text: {
        spacer: 'none',
        title: {
          label: 'What our users says !',
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
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
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
    {
      type: 'text',
      title: {
        label: 'Get Started !',
        style: 'style-v1',
        classes: 'mat-display-2',
      },
      spacer: 'xxl',
      body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
      actionsAlign: 'center center',
      actions: [
        {
          type: 'btn-animate',
          label: 'Sign Up Now',
          href: '#',
          style: 'style-v1',
          icon: 'open_in_new',
        },
      ],
    },
  ],
});
Page.args = {
  pageContent$: content,
};
