import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v2Component } from '@uiux/combs/showcase/showcase3v2/showcase3v2.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '特色组件/展示 Showcase/3v2',
  id: 'showcase-3v2',
  component: Showcase3v2Component,
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
    title: {
      label: '- ALD R&D Team -',
      style: 'style-v1',
      classes: 'mat-display-1 bold',
    },
    subTitle:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren. ',
    classes: '',
    bg: {
      classes: 'bg-fill-width',
      img: {
        hostClasses: '',
        src: '/assets/images/illustration/home-shape.png',
        mobile: '/assets/images/illustration/home-shape.png',
      },
    },
    elements: [
      {
        img: {
          src: '/assets/images/illustration/24.png',
          alt: '',
        },
        content: {
          title: {
            label: 'The independent R&D elite team',
            style: 'style-v4',
            classes: 'mat-display-1 bold',
          },
          body: 'Since its establishment, ALD has been focusing on the innovation of electronic atomization technology and product research and development. <ul class="list-done"><li>Now it has formed an independent R&D</li><li>elite team of more than 200 people</li><li>accounting for more than 80%</li></ul>',
          actions: [
            {
              type: 'btn-animate',
              label: 'Read more',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      },
      {
        img: {
          src: '/assets/images/illustration/25.png',
          alt: '',
        },
        content: {
          title: {
            label: 'Cooperation with Domestic Famous Universities',
            style: 'style-v4',
            classes: 'mat-display-1 bold',
          },
          body: 'ALD established postdoctoral workstations in 2012, and then successively established cooperative relations with well-known universities and research institutions in China.',
          lists: {
            params: {
              icon: true,
            },
            elements: [
              {
                type: 'link',
                label: '使用 DevTools 对 Angular 前端应用性能分析',
                href: '#',
              },
              {
                type: 'link',
                label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                href: '#',
              },
              {
                type: 'link',
                label: '你应该了解的 Angular 最佳实践',
                href: '#',
              },
              {
                type: 'link',
                label:
                  'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
                href: '#',
              },
              {
                type: 'link',
                label: 'Angular 有哪几种不同类型的绑定',
                href: '#',
              },
            ],
          },
          actions: [
            {
              type: 'btn-animate',
              label: 'Read more',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      },
      {
        img: {
          src: '/assets/images/illustration/25.png',
          alt: '',
        },
        content: {
          title: {
            label: 'More than 200 technical patents at home and abroad',
            style: 'style-v4',
            classes: 'mat-display-1 bold',
          },
          body: 'ALD has made extensive achievements in the core technology field of electronic atomization and forged strong technology brands-SILMO™ and MICROFEEL™. It is the first manufacturing enterprise to realize the batch automatic production of ceramic substrate thick film printing heater. Its research covers many fields such as polymer materials.',
          actions: [
            {
              type: 'btn-animate',
              label: 'Read more',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      },
      {
        img: {
          src: '/assets/images/illustration/08.png',
          alt: '',
        },
        content: {
          title: {
            label: 'Annual R&D Investment Accounts for More Than',
            style: 'style-v4',
            classes: 'mat-display-1 bold',
          },
          body: 'ALD attaches great importance to the R&D and innovation of technology, and the R&D investment accounts for more than 10% of the total revenue every year. Since the establishment, the R&D team has been actively innovating and exporting high-quality results. On the other hand, after years of hard study in the electronic atomization technology industry.',
          actions: [
            {
              type: 'btn-animate',
              label: 'Read more',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      },
      {
        img: {
          src: '/assets/images/illustration/10.png',
          alt: '',
        },
        content: {
          title: {
            label: 'Introduce IPD management system',
            style: 'style-v4',
            classes: 'mat-display-1 bold',
          },
          body: 'Pioneering in atomization area, ALD keeps enlarging its R&D team. In order to manage product planning, development and life cycle management more scientifically, ALD introduced IPD management system. Taking market demand as the driving force of product development, ALD converts customer requirements into product and service attributes.  ',
          actions: [
            {
              href: '#',
              label: 'Get Started',
            },
            {
              type: 'closeDialog',
              label: 'Ok',
            },
            {
              type: 'btn-animate',
              label: 'Read more',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      },
    ],
  },
};

export const List = Template.bind({});

List.args = {
  content: {
    title: {
      '@label': '分类标题',
      label: '音乐',
      style: 'style-v1',
      classes: 'mat-display-1 bold',
    },
    subTitle: '音乐分类描述信息',
    bg: {
      classes: 'bg-fill-width',
      img: {
        hostClasses: '',
        '@src': '先固定写死',
        src: '/assets/images/illustration/home-shape.png',
      },
    },
    elements: [
      {
        '@img': '分类图片',
        img: {
          src: '/assets/images/illustration/24.png',
          alt: '',
        },
        content: {
          title: {
            label: '专题文章',
            style: 'style-v4',
            classes: 'bold',
          },
          '@lists': '分类对应的文章列表',
          lists: {
            params: {
              icon: true,
            },
            elements: [
              {
                type: 'link',
                label: '使用 DevTools 对 Angular 前端应用性能分析',
                href: '#',
              },
              {
                type: 'link',
                label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                href: '#',
              },
              {
                type: 'link',
                label: '你应该了解的 Angular 最佳实践',
                href: '#',
              },
              {
                type: 'link',
                label:
                  'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
                href: '#',
              },
              {
                type: 'link',
                label: 'Angular 有哪几种不同类型的绑定',
                href: '#',
              },
            ],
          },
          actions: [
            {
              type: 'btn-animate',
              label: '更多',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      },
      {
        '@img': '分类图片',
        img: {
          src: '/assets/images/illustration/24.png',
          alt: '',
        },
        content: {
          title: {
            label: '案例研究',
            style: 'style-v4',
            classes: 'bold',
          },
          '@lists': '分类对应的文章列表',
          lists: {
            params: {
              icon: true,
            },
            elements: [
              {
                type: 'link',
                label: '使用 DevTools 对 Angular 前端应用性能分析',
                href: '#',
              },
              {
                type: 'link',
                label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                href: '#',
              },
              {
                type: 'link',
                label: '你应该了解的 Angular 最佳实践',
                href: '#',
              },
              {
                type: 'link',
                label:
                  'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
                href: '#',
              },
              {
                type: 'link',
                label: 'Angular 有哪几种不同类型的绑定',
                href: '#',
              },
            ],
          },
          actions: [
            {
              type: 'btn-animate',
              label: '更多',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      },
      {
        '@img': '分类图片',
        img: {
          src: '/assets/images/illustration/24.png',
          alt: '',
        },
        content: {
          title: {
            label: '行业资讯',
            style: 'style-v4',
            classes: 'bold',
          },
          '@lists': '分类对应的文章列表',
          lists: {
            params: {
              icon: true,
            },
            elements: [
              {
                type: 'link',
                label: '使用 DevTools 对 Angular 前端应用性能分析',
                href: '#',
              },
              {
                type: 'link',
                label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                href: '#',
              },
              {
                type: 'link',
                label: '你应该了解的 Angular 最佳实践',
                href: '#',
              },
              {
                type: 'link',
                label:
                  'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
                href: '#',
              },
              {
                type: 'link',
                label: 'Angular 有哪几种不同类型的绑定',
                href: '#',
              },
            ],
          },
          actions: [
            {
              type: 'btn-animate',
              label: '更多',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      },
      {
        '@img': '分类图片',
        img: {
          src: '/assets/images/illustration/24.png',
          alt: '',
        },
        content: {
          title: {
            label: '合同模板',
            style: 'style-v4',
            classes: 'bold',
          },
          '@lists': '分类对应的文章列表',
          lists: {
            params: {
              icon: true,
            },
            elements: [
              {
                type: 'link',
                label: '使用 DevTools 对 Angular 前端应用性能分析',
                href: '#',
              },
              {
                type: 'link',
                label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                href: '#',
              },
              {
                type: 'link',
                label: '你应该了解的 Angular 最佳实践',
                href: '#',
              },
              {
                type: 'link',
                label:
                  'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
                href: '#',
              },
              {
                type: 'link',
                label: 'Angular 有哪几种不同类型的绑定',
                href: '#',
              },
            ],
          },
          actions: [
            {
              type: 'btn-animate',
              label: '更多',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      },
    ],
  },
};
