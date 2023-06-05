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
import { defaultHeader, footerInverse } from '../../branding/Branding.json';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';

export default {
  title: '示例页面/首页示例/03 应用推广',
  id: 'home-v3',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
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
const content = of({
  title: '首页 v3',
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
          label: '使用信使构建你们的项目',
          classes: 'mat-display-4 bold',
          style: 'style-v4',
        },
        classes: 'p-x',
        body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
        actions: [
          {
            href: '#',
            label: '立刻体验',
            target: '_blank',
          },
        ],
      },
      right: [
        {
          type: 'img',
          hostClasses: 'img-bg-shape',
          src: '/assets/images/illustration/29.png',
        },
      ],
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
      bg: {
        classes: 'bg-none bg-fill-width',
      },
      row: '4',
      elements: [
        {
          img: {
            src: '/assets/images/svg/user.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '高性能',
          },
          content:
            '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          img: {
            src: '/assets/images/svg/calendar.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '易用的编辑器',
          },
          content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          img: {
            src: '/assets/images/svg/sand-clock.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '多语言',
          },
          content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          img: {
            src: '/assets/images/svg/health.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '更有弹性',
          },
          content: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
          more: {
            href: '#',
            label: '+',
          },
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
          src: '/assets/images/illustration/25.png',
          alt: '',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: '使用信使构建你们的项目',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
        },
        {
          type: 'swiper',
          params: {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: false,
          },
          classes: 'p-bottom',
          elements: [
            {
              type: 'card',
              title: '高性能',
              subTitle: 'High Performance',
              avatar: {
                src: '/assets/images/avatar/01.jpeg',
                alt: '',
              },
              classes: 'card-no-shadow',
              body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/02.jpeg',
                alt: '',
              },
              title: '易用的编辑器',
              subTitle: 'Simplicity for Editors',
              classes: 'card-no-shadow',
              body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/03.jpeg',
                alt: '',
              },
              title: '多语言',
              subTitle: 'Leader in Multilingual',
              classes: 'card-no-shadow',
              body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/04.jpeg',
                alt: '',
              },
              title: '更有弹性',
              subTitle: 'Flexibility',
              classes: 'card-no-shadow',
              body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/05.jpeg',
                alt: '',
              },
              title: '安全性',
              subTitle: 'Rigorous Security',
              classes: 'card-no-shadow',
              body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
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
        left: 1,
        right: 0,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/29.png',
          alt: '',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: '为什么选择我们？',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: '为所有开发者、所有应用场景而设计，让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。',
        },
        {
          type: 'panel',
          elements: [
            {
              title: '关于我们',
              icon: 'person',
              params: {
                expanded: true,
              },
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '远方信使（XINSHI）是一个使用 Drupal 提供 API 的 Angular 前端开发学习框架，拥有丰富的前端组件，通 过 Drupal Pannel 可快速构建 Landing 营销着陆页，常规的 Web 官网通过拖曳的方式即可创建。',
                },
              ],
            },
            {
              title: '我们的故事',
              icon: 'faviores',
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '我们是专业开发 Drupal 多年的前后端开发人员，热衷于分享 Drupal 相关的技术和资讯，创建维护微信公众号：  drupalstudy 从 Drupal 7开始，目前已发布了了四百多期，是国内为数不多的 Drupal 相关的微信公众号。',
                },
              ],
            },
            {
              title: '技术分享',
              icon: 'faviores',
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '我们也及时在知乎更新 Drupal 相关的技术文章，分享给更多感兴趣的人，愿你们能够享受 Drupal 带来的字数创新体验。',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'text',
      title: {
        label: '超过 <span class="text-primary">1000</span> 多位用户在使用',
        style: 'style-v1',
        classes: 'mat-display-2',
      },
      body: '<p class="text-center">信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验，快速构建响应式优先的 Web 项目。</p>',
      actionsAlign: 'center center',
      actions: [
        {
          type: 'btn-animate',
          label: '开始部署',
          href: '#',
          style: 'style-v1',
          icon: 'open_in_new',
        },
      ],
    },
  ],
});
Page.storyName = '预览';
Page.args = {
  pageContent$: content,
};
