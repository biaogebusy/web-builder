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
      (story) => `<div class="relative p-10 z-10">${story}</div>`
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
export const Base = Template.bind({});
Base.storyName = '基础文本';
const base: IText = {
  type: 'text',
  spacer: 'md',
  body: '从左侧选择组件拖动到编辑区：<ul class="list-done"><li>可视化编辑组件图文数据，所见即所得；</li><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li></ul><p>欢迎入群一起探索更多的可能性和数字创新体验，QQ 交流群：<span class="text-primary">1176468251</span></p><p style="display:flex"><img width="120px" src="/assets/icons/large-left-arrow.svg"><video muted="" autoplay="" loop="" width="120px" src="/assets/video/drag-drop.mp4"></video></p>',
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
    style: 'style-v4',
    classes: 'mat-display-1 bold',
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
    classes: '',
  },
  actionsAlign: 'start center',
  actions: [
    {
      type: 'btn-generater',
      label: '生成页面',
      color: 'primary',
      mode: 'raised',
    },
    {
      type: 'btn',
      color: 'primary',
      mode: 'stroked',
      label: '演示视频',
      href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
      target: '_blank',
      icon: {
        inline: true,
        svg: 'play-circle-outline',
      },
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
  type: 'text',
  title: {
    ...Title.args.content.title,
    style: 'style-v1',
  },
  bg: {
    classes: 'bg- bg-fill-width',
  },
  body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
  classes: 'text-center',
  actionsAlign: 'center center',
  actions: [...Actions.args.content.actions],
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
    classes: 'bg-fill-width',
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
      type: 'btn',
      mode: 'raised',
      color: 'primary',
      href: '/builder',
      label: '了解更多',
    },
  ],
};
List.args = {
  content: list,
};

export const MaxWidth = Template.bind({});
MaxWidth.storyName = '最大宽度';
MaxWidth.args = {
  content: {
    type: 'text',
    title: {
      label:
        '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
      style: 'style-v1',
      classes: 'mat-display-1 bold',
    },
    bg: {
      classes: 'bg- bg-fill-width',
    },
    body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
    classes: 'text-center md:max-w-3/4 mx-auto',
    actionsAlign: 'center center',
    actions: [
      {
        type: 'btn-generater',
        label: '生成页面',
        color: 'primary',
        mode: 'raised',
      },
      {
        type: 'btn',
        color: 'primary',
        mode: 'stroked',
        label: '演示视频',
        href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
        target: '_blank',
        icon: {
          inline: true,
          svg: 'play-circle-outline',
        },
      },
    ],
  },
};
