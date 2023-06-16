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
import { defaultHeader, footerInverse } from '../../global/Branding.json';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';

export default {
  title: '示例页面/首页示例/05 在线课程',
  id: 'home-v5',
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
const content = of({
  title: '首页 v5',
  config: {
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
      type: 'hero-1v1',
      spacer: 'none',
      classes: 'text-light text-center',
      sliders: {
        params: {
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: false,
        },
        elements: [
          {
            type: 'text',
            spacer: 'xl',
            title: {
              label: '前端面试全家桶',
              style: 'style-v1',
              classes: 'mat-display-3',
            },
            classes: 'xy-center',
            style: {
              width: '50%',
            },
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/hero/bg01.jpg',
                mobile: '/assets/images/hero/bg01.jpg',
              },
            },
            body: '<p>专业老师带你刷爆大厂前面面试和流程，从求职准备到面试演练</p>\r\n',
            actionsAlign: 'center center',
            actions: [
              {
                href: '#',
                label: '了解更多',
              },
            ],
          },
          {
            type: 'text',
            spacer: 'xl',
            title: {
              label: 'Java 亿级项目架构设计的落地和应用',
              style: 'style-v1',
              classes: 'mat-display-3',
            },
            classes: 'xy-center',
            style: {
              width: '50%',
            },
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/hero/bg02.jpg',
                mobile: '/assets/images/hero/bg02.jpg',
              },
            },
            body: '<p>稀缺好课，实践可落地的架构设计</p>\r\n',
            actionsAlign: 'center center',
            actions: [
              {
                href: '#',
                label: '了解更多',
              },
            ],
          },
          {
            type: 'text',
            spacer: 'xl',
            title: {
              label: '产品经理电商系统实践',
              style: 'style-v1',
              classes: 'mat-display-3',
            },
            classes: 'xy-center',
            style: {
              width: '50%',
            },
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/hero/bg05.jpg',
                mobile: '/assets/images/hero/bg05.jpg',
              },
            },
            body: '<p>全流程搭建企业级应用，全面掌握前后端设计精髓</p>\r\n',
            actionsAlign: 'center center',
            actions: [
              {
                href: 'https://jsonapi.org/format/',
                label: '了解更多',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'showcase-1v1',
      spacer: 'lg',
      classes: 'features-absolute',
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      row: 4,
      elements: [
        {
          icon: {
            name: 'verified_user',
          },
          style: 'style-v9',
          title: {
            href: '#',
            label: '会员无限制访问',
          },
          content:
            '<p>只要支付799元/年，就可以成为会员，无限制观看所有的视频课程</p>\r\n',
          more: {
            href: '#',
            label: '成为会员',
          },
        },
        {
          icon: {
            name: 'favorite',
          },
          style: 'style-v9',
          title: {
            href: '#',
            label: '我们的课程',
          },
          content:
            '<p>课程包括了初入职场的初级课程，也包括进阶高级的精品好课</p>\r\n',
          more: {
            href: '#',
            label: '浏览更多',
          },
        },
        {
          icon: {
            name: 'fingerprint',
          },
          style: 'style-v9',
          title: {
            href: '#',
            label: '优秀的老师',
          },
          content:
            '<p>所有的老师都是层层筛选和把关，为学员提供真实有效的技能和经验</p>\r\n',
          more: {
            href: 'https://jsonapi.org/format/',
            label: '成为老师',
          },
        },
      ],
    },
    {
      type: 'carousel-2v2',
      id: '',
      spacer: 'xl',
      classes: '',
      sliders: {
        params: {
          slidesPerView: 1.2,
          pagination: false,
          loop: true,
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
      type: 'showcase-3v9',
      id: '',
      spacer: 'xl',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-01.png',
        },
      },
      order: {
        left: 1,
        right: 0,
      },
      left: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: '我们的故事',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: '我们一直为在线教育做实践真正提供有价值的课程，并希望得到学员和社会企业的认可。在这短短的三年内，我们得到了大量的反馈和意见，对我们的改进非常有用。',
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
              title: '前端开发',
              subTitle: 'Web developer',
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
              title: 'Java 后端开发',
              subTitle: 'Endback Developer',
              classes: 'card-no-shadow',
              body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/03.jpeg',
                alt: '',
              },
              title: '产品经理',
              subTitle: 'Production manage',
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
      right: [
        {
          type: 'img',
          src: '/assets/images/showcase/education.jpg',
          alt: '',
        },
      ],
    },
    {
      type: 'showcase-1v3',
      title: {
        label: '新的课程学习体验',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      spacer: 'xxl',
      classes: 'text-light',
      bg: {
        classes: 'bg-fill-width overlay overlay-80',
        img: {
          hostClasses: 'bg-center',
          src: '/assets/images/hero/bg01.jpg',
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
          body: '不管你在哪里在何处，都可以通过在线教育平台得到良好的学习体验。',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn-video',
              color: 'primary',
              video: {
                options: {
                  controls: true,
                  aspectRatio: '16:9',
                  poster: '/assets/images/hero/bg02.jpg',
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
      action: {
        label: '查看更多',
        href: '#',
        style: 'style-v1',
        icon: 'open_in_new',
      },
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
          title: '基于 Material',
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
          title: 'Icon 库',
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
          title: '使用 Sass 构建',
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
          title: 'W3C 验证',
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
          title: '易于扩展',
        },
      ],
    },
    {
      type: 'showcase-2v1',
      row: '4',
      text: {
        title: {
          label: '最新课程',
          style: 'style-v1',
          classes: 'mat-display-0 bold',
        },
        body: '<p class="text-center">欢迎分享 Drupal 优秀的数字创新体验，新上好课！</p>',
      },
      elements: [
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '自主搭建5个精品脚手架，助力前端研发全流程提效',
          },
          user: '表歌',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/16-9/business-01.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '立即学习',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '2022全新 Node.js+Express+Koa2 开发Web Server博客',
          },
          user: '表歌',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/16-9/business-02.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '立即学习',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '国家级认证-软考高级，一站式通关课程，全力备战2022',
          },
          user: '表歌',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/16-9/business-03.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '立即学习',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '基于 Vue3 ，打造前台+中台通用提效解决方案',
          },
          user: '表歌',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/16-9/business-04.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '立即学习',
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
          label: '开始学习',
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
