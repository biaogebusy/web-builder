import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Carousel1v1Component } from '@uiux/combs/carousel/carousel1v1/carousel1v1.component';
import { StorysModule } from '@core/module/storys.module';
import { swiper } from '@stories/builder/data/widgets/common.builder';
import { ICarouselBase } from '@core/interface/combs/ICarousel';
import * as c1v1Story from '@stories/components/carousel/carousel1v1.stories';
import * as c2v1Story from '@stories/components/carousel/carousel2v1.stories';
import * as hero1v1Story from '@stories/feature/hero/hero1v1.stories';
import * as hero1v2Story from '@stories/feature/hero/hero1v2.stories';
export default {
  title: '复合组件/幻灯片/1v1',
  id: 'carousel-1v1',
  component: Carousel1v1Component,
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
const defaultContent: ICarouselBase = {
  spacer: 'lg',
  type: 'carousel-1v1',
  title: {
    label: '你将喜欢上 Drupal 的原因',
    icon: 'email',
    style: 'style-v2',
    classes: 'mat-display-1',
  },
  classes: '',
  bg: {
    classes: 'bg-white bg-fill-width',
  },
  sliders: swiper?.content,
};
Default.args = {
  content: defaultContent,
};

export const TextHero = Template.bind({});
TextHero.storyName = '图片带文本';
const textHeroContent: ICarouselBase = {
  type: 'carousel-1v1',
  spacer: 'none',
  disableContainer: true,
  bg: {
    classes: '',
  },
  classes: '',
  sliders: {
    params: {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: false,
      pagination: false,
    },
    classes: 'p-bottom',
    elements: [
      {
        type: 'text-hero',
        theme: 'text-light',
        params: {
          height: '750px',
        },
        text: {
          title: {
            label: '高性能',
            style: 'style-v4',
            classes: 'mat-display-2 bold',
          },
          classes: 'y-center',
          style: [],
          bg: {
            classes: 'bg-shadow overlay overlay-20',
            img: {
              src: '/assets/images/hero/1-3.jpg',
              hostClasses: '',
            },
          },
          body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              mode: 'raised',
              color: 'primary',
              href: '',
              label: '了解更多',
            },
          ],
        },
      },
      {
        type: 'text-hero',
        theme: 'text-light',
        params: {
          height: '750px',
        },
        text: {
          title: {
            label: '易用的编辑器',
            style: 'style-v4',
            classes: 'mat-display-2 bold',
          },
          classes: 'y-center',
          style: [],
          bg: {
            classes: 'bg-shadow overlay overlay-',
            img: {
              src: '/assets/images/hero/1-6.jpg',
              hostClasses: '',
            },
          },
          body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              mode: 'raised',
              color: 'primary',
              href: '',
              label: '了解更多',
            },
          ],
        },
      },
      {
        type: 'text-hero',
        theme: 'text-light',
        params: {
          height: '750px',
        },
        text: {
          title: {
            label: '多语言',
            style: 'style-v4',
            classes: 'mat-display-2 bold',
          },
          classes: 'y-center',
          style: [],
          bg: {
            classes: 'bg-shadow overlay overlay-',
            img: {
              src: '/assets/images/hero/182.jpg',
              hostClasses: '',
            },
          },
          body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              mode: 'raised',
              color: 'primary',
              href: '',
              label: '了解更多',
            },
          ],
        },
      },
    ],
  },
};
TextHero.args = {
  content: textHeroContent,
};

export const {
  Default: { args: carousel1v1 },
} = c1v1Story;
export const {
  Default: { args: carousel2v1 },
} = c2v1Story;
export const {
  Default: { args: hero1v1 },
} = hero1v1Story;
export const {
  Default: { args: hero1v2 },
} = hero1v2Story;
export const FullScreen = Template.bind({});
FullScreen.storyName = '满屏';
FullScreen.args = {
  content: {
    type: 'carousel-1v1',
    spacer: 'none',
    disableContainer: true,
    bg: {
      classes: '',
    },
    sliders: {
      classes: 'full-screen',
      params: {
        direction: 'vertical',
        slidesPerView: 1,
        speed: 600,
        mousewheel: true,
        effect: 'slide',
        pagination: {
          clickable: true,
        },
        navigation: true,
        autoplay: false,
      },
      elements: [
        {
          sliderClasses: 'slider-center',
          spacer: 'none',
          type: 'hero-1v1',
          classes: 'text-light text-center',
          bg: {
            classes: '',
          },
          sliders: {
            params: {
              slidesPerView: 1,
              spaceBetween: 0,
              pagination: false,
            },
            classes: '',
            elements: [
              {
                type: 'text',
                spacer: 'xl',
                title: {
                  label: '组件驱动开发',
                  style: 'style-v1',
                  classes: 'mat-display-3 bold',
                },
                classes: 'xy-center',
                bg: {
                  classes: 'bg-center overlay overlay-80',
                  img: {
                    src: '/assets/images/16-9/business-14.jpeg',
                    mobile: '/assets/images/mobile/mobile-03.jpg',
                  },
                },
                body: '<p style="font-size:18px">Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"</p>',
                actionsAlign: 'center center',
                actions: [
                  {
                    type: 'btn',
                    mode: 'raised',
                    color: 'primary',
                    href: '#',
                    label: '立刻体验',
                  },
                ],
              },
              {
                type: 'text',
                title: {
                  label: '组件展示和测试',
                  style: 'style-v1',
                  classes: 'mat-display-3 bold',
                },
                spacer: 'xl',
                classes: 'xy-center text-light',
                bg: {
                  classes: 'bg-shadow  overlay overlay-80',
                  img: {
                    src: '/assets/images/16-9/business-15.jpeg',
                    mobile: '/assets/images/mobile/mobile-04.jpg',
                  },
                },
                body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。',
                actionsAlign: 'center center',
                actions: [
                  {
                    type: 'btn',
                    mode: 'raised',
                    color: 'primary',
                    href: '#',
                    label: '立刻体验',
                  },
                ],
              },
              {
                type: 'text',
                title: {
                  label: '文档化',
                  style: 'style-v1',
                  classes: 'mat-display-3 bold',
                },
                spacer: 'xl',
                classes: 'xy-center text-light',
                bg: {
                  classes: 'bg-shadow  overlay overlay-80',
                  img: {
                    src: '/assets/images/16-9/business-15.jpeg',
                    mobile: '/assets/images/mobile/mobile-04.jpg',
                  },
                },
                body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。',
                actionsAlign: 'center center',
                actions: [
                  {
                    type: 'btn',
                    mode: 'raised',
                    color: 'primary',
                    href: '#',
                    label: '立刻体验',
                  },
                ],
              },
            ],
          },
        },
        {
          sliderClasses: 'slider-center',
          type: 'showcase-1v4',
          spacer: 'lg',
          bg: {
            classes: 'bg- bg-fill-width',
          },
          row: 3,
          classes: '',
          text: {
            title: {
              label:
                '使用 <strong class="text-primary">Storybook</strong> 开发组件',
              style: 'style-v1',
              classes: 'mat-display-3 bold',
            },
            animate: {
              disable: true,
            },
            body: '<p class="text-center">Storybook是一个面向UI组件开发的工具，它提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。</p>',
          },
          elements: [
            {
              type: 'card-1v5',
              title: '初始化 ',
              body: '使用 Npm 安装初始化 Storybook，在配置文件中定义组件库的入口和存放的目录。',
              more: {
                href: '/node/1',
                target: '_blank',
                label: '查看详情',
              },
              footer: {
                label: 'Step 01.',
                icon: {
                  svg: 'chevron-double-right',
                },
              },
            },
            {
              type: 'card-1v5',
              title: '创建和编写组件Story',
              body: '在组件库中创建stories，导入要展示的组件，使用装饰器添加样式、数据和事件。',
              more: {
                href: '/node/1',
                target: '_blank',
                label: '查看详情',
              },
              footer: {
                label: 'Step 02.',
                icon: {
                  svg: 'chevron-double-right',
                },
              },
            },
            {
              type: 'card-1v5',
              title: '启动',
              body: '在浏览器中打开预览页面，查看和交互组件的各个示例和文档。',
              more: {
                href: '/node/1',
                target: '_blank',
                label: '查看详情',
              },
              footer: {
                label: 'Step 03.',
                icon: {
                  svg: 'check-all',
                },
              },
            },
          ],
          actions: [
            {
              type: 'btn-animate',
              label: '了解更多',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
        {
          sliderClasses: 'slider-center',
          type: 'showcase-3v4',
          title: {
            label: '为什么你将会喜欢这个前端框架？',
            style: 'style-v1',
          },
          bg: {
            classes: 'bg-light bg-fill-width',
          },
          classes: '',
          img: {
            src: '/assets/images/1-1/business-02.png',
            alt: 'OUR FEATURES',
          },
          elements: [
            {
              type: 'box',
              style: 'style-v7',
              icon: {
                name: 'verified_user',
              },
              title: {
                href: '/',
                label: '组件编辑',
              },
              content: '通过简单的管理界面对复杂的可视化编辑',
              more: {
                href: '#',
                label: '更多',
              },
            },
            {
              type: 'box',
              style: 'style-v7',
              icon: {
                name: 'fingerprint',
              },
              title: {
                href: '/',
                label: '多语言',
              },
              content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
              more: {
                href: '#',
                label: '更多',
              },
            },
            {
              type: 'box',
              style: 'style-v7',
              icon: {
                name: 'favorite',
              },
              title: {
                href: '/',
                label: '高性能',
              },
              content:
                '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
              more: {
                href: '#',
                label: '更多',
              },
            },
            {
              type: 'box',
              style: 'style-v7',
              icon: {
                name: 'android',
              },
              title: {
                href: '/',
                label: '易用的编辑器',
              },
              content:
                '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
              more: {
                href: '#',
                label: '更多',
              },
            },
          ],
        },
        {
          sliderClasses: 'slider-center',
          type: 'showcase-3v5',
          id: '',
          bg: {
            classes: 'bg-shadow bg-fill-width',
          },
          classes: '',
          img: {
            src: '/assets/images/illustration/27.png',
            alt: 'OUR FEATURES',
          },
          elements: [
            {
              type: 'box',
              style: 'style-v8',
              icon: {
                name: 'verified_user',
              },
              title: {
                href: '/',
                label: '组件编辑',
              },
              content: '通过简单的管理界面对复杂的可视化编辑',
              more: {},
            },
            {
              type: 'box',
              style: 'style-v8',
              icon: {
                name: 'favorite',
              },
              title: {
                href: '/',
                label: '多语言',
              },
              content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
              more: {},
            },
            {
              type: 'box',
              style: 'style-v8',
              icon: {
                name: 'android',
              },
              title: {
                href: '/',
                label: '高性能',
              },
              content:
                '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
              more: {},
            },
            {
              type: 'box',
              style: 'style-v8',
              icon: {
                name: 'devices',
              },
              title: {
                href: '/',
                label: '易用的编辑器',
              },
              content:
                '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
              more: {},
            },
            {
              icon: {
                name: 'border_all',
              },
              style: 'style-v8',
              title: {
                href: '#',
                label: '更有弹性',
              },
              content: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建',
            },
            {
              icon: {
                name: 'functions',
              },
              style: 'style-v8',
              title: {
                href: '#',
                label: '安全性',
              },
              content:
                '超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一',
            },
          ],
        },
        {
          sliderClasses: 'slider-center',
          type: 'showcase-3v7',
          bg: {
            classes: 'bg-shadow bg-fill-width',
          },
          classes: '',
          img: {
            src: '/assets/images/illustration/27.png',
            alt: 'OUR FEATURES',
          },
          left: [
            {
              type: 'box',
              style: 'style-v10',
              icon: {
                name: 'verified_user',
              },
              title: {
                href: '/',
                label: '组件编辑',
              },
              content: '通过简单的管理界面对复杂的可视化编辑',
              more: {},
            },
            {
              type: 'box',
              style: 'style-v10',
              icon: {
                name: 'favorite',
              },
              title: {
                href: '/',
                label: '多语言',
              },
              content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
              more: {},
            },
            {
              type: 'box',
              style: 'style-v10',
              icon: {
                name: 'android',
              },
              title: {
                href: '/',
                label: '高性能',
              },
              content:
                '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
              more: {},
            },
          ],
          right: [
            {
              type: 'box',
              style: 'style-v8',
              icon: {
                name: 'devices',
              },
              title: {
                href: '/',
                label: '易用的编辑器',
              },
              content:
                '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
              more: {},
            },
            {
              icon: {
                name: 'border_all',
              },
              style: 'style-v8',
              title: {
                href: '#',
                label: '更有弹性',
              },
              content: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建',
            },
            {
              icon: {
                name: 'functions',
              },
              style: 'style-v8',
              title: {
                href: '#',
                label: '安全性',
              },
              content:
                '超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一',
            },
          ],
        },
        {
          type: 'text',
          spacer: 'md',
          animate: {
            disable: true,
          },
          body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。<ul class="list-done"><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li><li>可以直接编辑组件的 JSON，所见即所得；</li></ul>',
          title: {
            label:
              '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
            style: 'style-v1',
            classes: 'mat-display-2 bold',
          },
          bg: {
            classes: 'bg- bg-fill-width',
          },
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn',
              mode: 'raised',
              color: 'primary',
              href: '#',
              label: '开始',
            },
            {
              type: 'closeDialog',
              label: 'Ok',
            },
            {
              type: 'btn-animate',
              label: '了解更多',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      ],
    },
  },
};
