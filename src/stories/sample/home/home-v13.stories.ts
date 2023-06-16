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
import { defaultHeader, footerInverse } from '../../global/Branding.json';
import { BRANDING } from '@core/token/token-providers';

export default {
  title: '示例页面/首页示例/13 现代商业',
  id: 'home-v13',
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
  title: '现代商业',
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
          label: 'Powerful Solution For Your Startup Business',
          classes: 'mat-display-4 bold',
          style: 'style-v4',
        },
        classes: 'p-x text-light',
        body: 'Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.',
        actions: [
          {
            type: 'btn',
            mode: 'raised',
            color: 'primary',
            href: '#',
            label: '立刻体验',
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
                  { src: '/assets/video/storybook.mp4', type: 'video/mp4' },
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
          src: '/assets/images/hero/hero-component.svg',
        },
      ],
      bg: {
        classes: 'bg-fill-width bg-primary bg-center',
        img: {
          src: '/assets/images/bg/bg-hero.svg',
          mobile: '/assets/images/bg/bg-hero.svg',
        },
      },
    },
    {
      type: 'carousel-2v2',
      id: '',
      spacer: 'xl',
      classes: 'bg-shadow',
      sliders: {
        params: {
          slidesPerView: 1.2,
          pagination: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: {
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          },
        },
        elements: [
          {
            type: 'img',
            src: '/assets/images/logo/amazon.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/google.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/lenovo.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/paypal.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/shopify.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/spotify.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/logo10.png',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
        ],
      },
    },
    {
      type: 'showcase-1v1',
      title: {
        label: 'Beautiful & Creative Interfaces',
        style: 'style-v2',
      },
      subTitle: {
        spacer: 'none',
        body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p><br>',
      },
      bg: {
        classes: 'bg- bg-fill-width',
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
            label: 'Design & Development',
          },
          content:
            'Nisi aenean vulputate eleifend tellus vitae eleifend enim a eleifend Aliquam aenean elementum semper.',
        },
        {
          img: {
            src: '/assets/images/svg/Asset189.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: 'Management & Marketing',
          },
          content:
            'Allegedly, a Latin scholar established the origin of the text established by compiling unusual word.',
        },
        {
          img: {
            src: '/assets/images/svg/Asset190.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: 'Stratagy & Research',
          },
          content:
            'It seems that only fragments of the original text remain in the Lorem the original Ipsum texts used today.',
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
          src: '/assets/images/showcase/7.jpg',
          alt: '',
          hostClasses: 'position-relative',
          actions: [
            {
              type: 'btn-video',
              color: 'default',
              video: {
                options: {
                  controls: true,
                  aspectRatio: '16:9',
                  poster: '/assets/images/16-9/business-02.jpg',
                  sources: [
                    { src: '/assets/video/storybook.mp4', type: 'video/mp4' },
                  ],
                },
              },
            },
          ],
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: 'Startup Business Solution',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: 'Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.<ul class="list-done"><li>Digital Marketing Solutions for Tomorrow</li><li>Our Talented & Experienced Marketing Agency</li><li>Create your own skin to match your brand</li></ul>',
          actions: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: 'Buy Now',
              color: 'primary',
              mode: 'raised',
            },
          ],
        },
      ],
    },
    {
      type: 'showcase-3v6',
      id: '',
      title: {
        type: 'text',
        spacer: 'sm',
        title: {
          label: '为所有开发者、所有应用场景而设计',
          style: 'style-v1',
        },
        body: '<p class="text-center">让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>',
      },
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      row: '3',
      elements: [
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: 'logo',
          },
          css3: true,
          title: '响应式设计',
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: 'logo',
          },
          css3: true,
          title: '支持 SSR 服务端渲染',
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: 'logo',
          },
          css3: true,
          title: '支持多主题、暗黑模式',
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: 'logo',
          },
          css3: true,
          title: 'MDI 6000多个icons',
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: 'logo',
          },
          css3: true,
          title: 'Storybook 全覆盖测试',
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: 'logo',
          },
          css3: true,
          title: '动态组件动态表单',
        },
      ],
      action: {
        label: '查看更多',
        href: '#',
        style: 'style-v1',
        icon: 'open_in_new',
      },
    },
    {
      type: 'showcase-4v1',
      spacer: 'lg',
      text: {
        title: {
          label: 'See everything about your Landrick',
          style: 'style-v1',
          classes: 'mat-display-1',
        },
        body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
      },
      paramsBak: {
        api: 'api/v1/tab/order_process_statistics',
      },
      elements: [
        {
          img: {
            src: '/assets/images/svg/Asset187.svg',
          },
          digit: {
            value: 69,
            label: '%',
          },
          title: 'Happy Client',
        },
        {
          img: {
            src: '/assets/images/svg/Asset189.svg',
          },
          digit: {
            value: 396,
            label: '+',
          },
          title: 'Awards',
        },
        {
          img: {
            src: '/assets/images/svg/Asset190.svg',
          },
          digit: {
            value: 245,
            label: 'K',
          },
          title: 'Job Placement',
        },
        {
          img: {
            src: '/assets/images/svg/Asset192.svg',
          },
          digit: {
            value: 88,
            label: '%',
          },
          title: 'Project Complete',
        },
      ],
    },
    {
      type: 'showcase-1v3',
      title: {
        label: 'We Are Creative Dreamers and Innovators',
        style: 'style-v1',
        classes: 'mat-display-1 bold',
      },
      classes: 'text-light p-y-lg',
      bg: {
        classes: 'bg-fill-width overlay overlay-80',
        img: {
          hostClasses: 'bg-center',
          src: '/assets/images/showcase/8.jpg',
          alt: 'page title',
        },
      },
      elements: [
        {
          type: 'text',
          spacer: 'none',
          style: {
            margin: '0 auto',
            'text-align': 'center',
            width: '600px',
          },
          body: 'Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn-video',
              color: 'default',
              video: {
                options: {
                  controls: true,
                  aspectRatio: '16:9',
                  poster: '/assets/images/16-9/business-02.jpg',
                  sources: [
                    {
                      src: '/assets/video/storybook.mp4',
                      type: 'video/mp4',
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    {
      type: 'showcase-1v4',
      spacer: 'lg',
      bg: {
        classes: 'bg- bg-fill-width',
      },
      row: 4,
      text: {
        title: {
          label: 'Charge your creative inspiration',
          style: 'style-v1',
          clsses: 'mat-display-4',
        },
        body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
      },
      elements: [
        {
          title: {
            label: 'FREE',
            classes: '',
          },
          type: 'card-1v6',
          prefix: '$',
          number: '0',
          suffix: '/mo',
          body: '<ul class="list-done"><li>Full Access</li><li>Source Files</li></ul>',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: 'Buy Now',
              mode: 'raised',
              color: 'primary',
            },
          ],
        },
        {
          title: {
            label: 'STARTER',
            classes: 'text-primary',
          },
          type: 'card-1v6',
          prefix: '$',
          number: '39',
          suffix: '/mo',
          classes: 'bg-light',
          body: '<ul class="list-done"><li>Full Access</li><li>Source Files</li><li>Free Installment</li></ul>',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: 'Buy Now',
              mode: 'raised',
              color: 'primary',
            },
          ],
        },
        {
          title: {
            label: 'PROFESSIONAL',
            classes: '',
          },
          type: 'card-1v6',
          prefix: '$',
          number: '59',
          suffix: '/mo',
          body: '<ul class="list-done"><li>Full Access</li><li>Source Files</li><li>1 Domain Free</li><li>Enhanced Security</li></ul>',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: 'Buy Now',
              mode: 'raised',
              color: 'primary',
            },
          ],
        },
        {
          title: {
            label: 'ULTIMATE',
            classes: '',
          },
          type: 'card-1v6',
          prefix: '$',
          number: '79',
          suffix: '/mo',
          body: '<ul class="list-done"><li>Full Access</li><li>Enhanced Security</li><li>Source Files</li><li>1 Domain Free</li><li>Free Installment</li></ul>',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: 'Buy Now',
              mode: 'raised',
              color: 'primary',
            },
          ],
        },
      ],
    },
    {
      id: '',
      type: 'showcase-3v9',
      spacer: 'xl',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-02.png',
        },
      },
      order: {
        left: 0,
        right: 1,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/13.png',
          hostClasses: 'position-relative',
          actions: [
            {
              type: 'btn-video',
              color: 'default',
              video: {
                options: {
                  controls: true,
                  aspectRatio: '16:9',
                  poster: '/assets/images/16-9/business-02.jpg',
                  sources: [
                    { src: '/assets/video/storybook.mp4', type: 'video/mp4' },
                  ],
                },
              },
            },
          ],
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: 'A better compose with landrick marketing',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: 'You can combine all the Landrick templates into a single one, you can take a component from the Application theme and use it in the Website.<ul class="list-done"><li>通过 Docker 隔离</li><li>每个 workflow 独享1核虚拟CPU</li><li>在 yml 配置文件中可以使用上下文环境变量</li><li>每个workflow 排队和执行时间最多58分钟</li></ul>',
        },
      ],
    },
    {
      type: 'carousel-1v3',
      spacer: 'lg',
      text: {
        spacer: 'none',
        title: {
          label: 'Important Clients Review',
          icon: '',
          style: 'style-v1',
          classes: 'mat-display-4',
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
  ],
});
Page.args = {
  pageContent$: content,
};
