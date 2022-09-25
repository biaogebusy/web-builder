import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { ShareModule } from '../../app/share/share.module';
import {
  storiesOf,
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { TextComponent } from '../../app/uiux/widgets/text/text.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { CORE_CONFIG } from '@core/token/core.config';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';

export default {
  title: '基础/富文本',
  component: TextComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          userValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
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
export const Default = Template.bind({});
Default.storyName = '基础文本';
Default.args = {
  content: {
    body: '<p><strong>Github</strong> <a href="#">actions</a> 从2019年就<em>免费</em>开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p><p>查了些文档文章，Github Actions有几个重要的信息如下：</p><ul class="list-done"><li>通过 Docker 隔离</li><li>每个 workflow 独享1核虚拟CPU, 3.75GB内存，包括网络权限和100GB 磁盘</li><li>在 yml 配置文件中可以使用上下文环境变量，比如分支或者不公开变量</li><li>每个workflow 排队和执行时间最多 58 分钟，最多可以包含100个action，每个仓库同一时刻只能运行两个 workflow</li></ul>',
  },
};

export const Title = Template.bind({});
Title.storyName = '带标题风格';
Title.args = {
  content: {
    ...Default.args.content,
    spacer: 'sm',
    title: {
      label:
        '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
      style: 'style-v1',
    },
  },
};

export const Actions = Template.bind({});
Actions.storyName = '带 Actions 风格';
Actions.args = {
  content: {
    ...Default.args.content,
    spacer: 'lg',
    title: {
      label:
        '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
      style: 'style-v1',
    },
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    actionsAlign: 'center center',
    actions: [
      {
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

export const List = Template.bind({});
List.storyName = '带列表风格';
List.args = {
  content: {
    ...Default.args.content,
    spacer: 'xl',
    title: {
      label:
        '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
      style: 'style-v4',
    },
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
