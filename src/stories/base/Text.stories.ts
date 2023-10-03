import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { StorysModule } from '@core/module/storys.module';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import { IText } from '@core/interface/widgets/IText';

export default {
  title: '基本元素/富文本',
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
  parameters: {
    viewMode: 'canvas',
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});
Base.storyName = '基础文本';
const base: IText = {
  type: 'text',
  spacer: 'md',
  body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。<ul class="list-done"><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li><li>可以直接编辑组件的 JSON，所见即所得；</li></ul>',
};
Base.args = {
  content: base,
};

export const Title = Template.bind({});
Title.storyName = '带标题';
const title: IText = {
  ...Base.args.content,
  title: {
    label:
      '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
    style: 'style-v1',
    classes: 'mat-display-2 bold',
  },
};
Title.args = {
  content: title,
};

export const Actions = Template.bind({});
Actions.storyName = '带 Actions';
const action: IText = {
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
};
Actions.args = {
  content: action,
};

export const Center = Template.bind({});
// for builder sample
Center.storyName = '居中';
const center: IText = {
  ...Title.args.content,
  bg: {
    classes: 'bg- bg-fill-width',
  },
  body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
  classes: 'text-center',
  actionsAlign: 'center center',
  actions: [
    {
      type: 'btn',
      mode: 'raised',
      color: 'primary',
      href: '/builder',
      label: '开始体验',
    },
  ],
};
Center.args = {
  content: center,
};

export const SearchAction = Template.bind({});
SearchAction.storyName = '搜索';
const searchAction: IText = {
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
};
SearchAction.args = {
  content: searchAction,
};

const {
  Default: {
    args: { content: btnVideo },
  },
} = btnVideoStory as any;

export const BtnVideoAction = Template.bind({});
BtnVideoAction.storyName = '视频播放';
const video: IText = {
  ...Title.args.content,
  spacer: 'lg',
  bg: {
    classes: 'bg-shadow bg-fill-width',
  },
  actionsAlign: 'center center',
  actions: [
    {
      ...btnVideo,
      color: 'primary',
    },
  ],
};
BtnVideoAction.args = {
  content: video,
};

export const List = Template.bind({});
List.storyName = '带列表';
const list: IText = {
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
};
List.args = {
  content: list,
};

export const DisableAnimate = Template.bind({});
DisableAnimate.storyName = '禁用动画';
const disableAnimate: IText = {
  ...List.args.content,
  animate: {
    disable: true,
  },
};
DisableAnimate.args = {
  content: disableAnimate,
};
