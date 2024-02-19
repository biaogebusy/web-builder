import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v2Component } from '@uiux/combs/showcase/showcase3v2/showcase3v2.component';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase3v2 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/图文 Showcase/3v2',
  id: 'showcase-3v2',
  component: Showcase3v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
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
export const Default = Template.bind({});
const content: IShowcase3v2 = {
  type: 'showcase-3v2',
  text: {
    title: {
      label:
        '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
      style: 'style-v1',
      classes: 'mat-display-2 bold',
    },
    body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。 ',
  },
  classes: '',
  bg: {
    classes: 'bg-fill-width',
    img: {
      hostClasses: '',
      src: '/assets/images/bg/home-shape.png',
      mobile: '/assets/images/bg/home-shape.png',
    },
  },
  elements: [
    {
      img: {
        src: '/assets/images/svg/vscode.svg',
        alt: '',
      },
      content: {
        type: 'text',
        spacer: 'sm',
        title: {
          label: '组件驱动开发',
          style: 'style-v4',
          classes: 'mat-display-2',
        },
        body: '<strong class="text-primary">Storybook</strong> 采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。<ul class="list-done">\r\n\t<li>为每个UI组件创建"stories"</li>\r\n\t<li>描述组件在不同状态和交互方式下的行为和外观</li>\r\n\t<li>提高组件的可重用性和可测试性</li>\r\n</ul>\r\n',
        actions: [
          {
            type: 'btn',
            color: 'primary',
            mode: 'raised',
            href: '#',
            label: '马上体验',
          },
        ],
      },
    },
    {
      img: {
        src: '/assets/images/svg/storybook-mock-ui.svg',
        alt: '',
      },
      content: {
        type: 'text',
        spacer: 'sm',
        title: {
          label: '组件展示和测试',
          style: 'style-v4',
          classes: 'mat-display-2',
        },
        body: '<strong class="text-primary">Storybook</strong> 提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
        actions: [
          {
            type: 'btn',
            color: 'primary',
            mode: 'raised',
            href: '#',
            label: '马上体验',
          },
        ],
      },
    },
    {
      img: {
        src: '/assets/images/svg/monday-com.webp',
        alt: '',
      },
      content: {
        type: 'text',
        spacer: 'sm',
        title: {
          label: '文档化',
          style: 'style-v4',
          classes: 'mat-display-2',
        },
        body: '<strong class="text-primary">Storybook</strong> 不仅可以展示和测试组件，还可以自动生成组件的文档。<ul class="list-done">\r\n\t<li>使用Markdown或其他文档格式编写组件文档，并将其与组件关联</li>\r\n\t<li>团队成员可以更好地理解和使用组件，减少了沟通成本</li></ul>\r\n',
        actions: [
          {
            type: 'btn',
            color: 'primary',
            mode: 'raised',
            href: '#',
            label: '马上体验',
          },
        ],
      },
    },
  ],
};
Default.args = {
  content,
};

export const List = Template.bind({});
List.storyName = '列表';
const list: IShowcase3v2 = {
  type: 'showcase-3v2',
  text: {
    title: {
      label: '音乐',
      style: 'style-v1',
      classes: 'mat-display-1 bold',
    },
  },
  bg: {
    classes: 'bg-fill-width',
    img: {
      hostClasses: '',
      src: '/assets/images/bg/home-shape.png',
    },
  },
  classes: '',
  elements: [
    {
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
            type: 'btn',
            label: '更多',
            href: '#',
            mode: 'raised',
            color: 'primary',
          },
        ],
      },
    },
    {
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
            type: 'btn',
            label: '更多',
            href: '#',
            mode: 'raised',
            color: 'primary',
          },
        ],
      },
    },
    {
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
            type: 'btn',
            label: '更多',
            href: '#',
            mode: 'raised',
            color: 'primary',
          },
        ],
      },
    },
    {
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
            type: 'btn',
            label: '更多',
            href: '#',
            mode: 'raised',
            color: 'primary',
          },
        ],
      },
    },
  ],
};

List.args = {
  content: list,
};
