import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '基础组件/基本元素/富文本',
  id: 'text',
  component: TextComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});
Base.storyName = '基础文本';
Base.args = {
  content: {
    type: 'text',
    body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 Storybook 页面时添加组件到预览页面。<ul class="list-done"><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li><li>可以直接编辑组件的 JSON，所见即所得；</li></ul><p>Builder 与众不同的是它完全融入到了 Storybook 的测试框架当中，示例由 Storybook 导入并维护。</p>使用人员：<ul class="list-done"><li>前端开发：开发测试维护组件</li><li>产品经理：快速构建和预览页面</li><li>运维人员：构建页面和测试UI</li><li>市场营销人员：给客户演示数字创新能力</li></ul><br><p>拖动组件到这里进行创作，或者点击右上角智能生成。</p>',
  },
};

export const Title = Template.bind({});
Title.storyName = '带标题风格';
Title.args = {
  content: {
    ...Base.args.content,
    spacer: 'sm',
    title: {
      label: '欢迎使用 Builder 快速构建页面',
      style: 'style-v1',
    },
  },
};

export const Actions = Template.bind({});
Actions.storyName = '带 Actions 风格';
Actions.args = {
  content: {
    ...Title.args.content,
    bg: {
      classes: 'bg-shadow bg-fill-width',
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
};

export const Center = Template.bind({});
Center.storyName = '居中';
Center.args = {
  content: {
    ...Title.args.content,
    bg: {
      classes: 'bg-shadow bg-fill-width',
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
};

export const SearchAction = Template.bind({});
SearchAction.storyName = '搜索';
SearchAction.args = {
  content: {
    ...Title.args.content,
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    actionsAlign: 'center center',
    actions: [
      {
        type: 'search-action',
        button: {
          label: '搜索',
          color: 'primary',
        },
        form: [
          {
            type: 'select',
            key: 'skill',
            label: '技能',
            options: [
              {
                label: '无',
                value: '',
              },
              {
                label: 'Angular',
                value: 'angular',
              },
              {
                label: 'React',
                value: 'react',
              },
              {
                label: 'Vue',
                value: 'vue',
              },
            ],
          },
          {
            type: 'select',
            key: 'cms',
            label: 'CMS',
            options: [
              {
                label: '无',
                value: '',
              },
              {
                label: 'Drupal',
                value: 'drupal',
              },
              {
                label: 'WP',
                value: 'wp',
              },
              {
                label: 'Joomla',
                value: 'joomla',
              },
            ],
          },
          {
            type: 'input',
            key: 'keys',
            placeholder: '请输入关键词搜索',
            controlType: 'search',
            label: '关键词',
            appearance: 'legacy',
          },
        ],
      },
    ],
  },
};

export const BtnVideoAction = Template.bind({});
BtnVideoAction.storyName = '视频播放';
BtnVideoAction.args = {
  content: {
    ...Title.args.content,
    spacer: 'lg',
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    actionsAlign: 'center center',
    actions: [
      {
        type: 'btn-video',
        color: 'primary',
        video: {
          options: {
            controls: true,
            aspectRatio: '16:9',
            poster: '/assets/images/16-9/business-02.jpg',
            sources: [
              { src: '/assets/video/afterglow.mp4', type: 'video/mp4' },
            ],
          },
        },
      },
    ],
  },
};

export const List = Template.bind({});
List.storyName = '带列表风格';
List.args = {
  content: {
    ...Title.args.content,
    bg: {
      classes: 'bg-fill-width',
      img: {
        src: '/assets/images/map.png',
      },
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
    actionsAlign: 'start center',
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
};

export const DisableAnimate = Template.bind({});
DisableAnimate.storyName = '禁用动画';
DisableAnimate.args = {
  content: {
    ...List.args.content,
    animate: {
      disable: true,
    },
  },
};
