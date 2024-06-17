import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { Showcase1v4Component } from '@uiux/combs/showcase/showcase1v4/showcase1v4.component';
import { IShowcase1v4 } from '@core/interface/combs/IShowcase';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Showcase1v4Component> = {
  title: '特色组件/图文 Showcase/1v4',
  id: 'showcase-1v4',
  component: Showcase1v4Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Showcase1v4Component>;
export const Default: Story = {};
Default.storyName = '默认';
const content: IShowcase1v4 = {
  type: 'showcase-1v4',
  spacer: 'lg',
  bg: {
    classes: 'bg- bg-fill-width',
  },
  row: 4,
  classes: '',
  text: {
    title: {
      label: '使用 <strong class="text-primary">Storybook</strong> 开发组件',
      style: 'style-v1',
      classes: 'mat-display-2 bold',
    },
    classes: 'text-center',
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
      type: 'btn',
      label: '了解更多',
      mode: 'raised',
      color: 'primary',
      href: '#',
    },
  ],
};
Default.args = {
  content,
};

export const Price: Story = {};
Price.storyName = '价格组件';
const price: IShowcase1v4 = {
  type: 'showcase-1v4',
  spacer: 'lg',
  bg: {
    classes: 'bg- bg-fill-width',
  },
  row: 3,
  classes: '',
  text: {
    title: {
      label: '会员等级与专属服务',
      style: 'style-v1',
      classes: 'mat-display-2 bold',
    },
    classes: 'text-center',
    body: '<p class="text-center">我们为您提供了一系列多样化的会员等级和相应的专属服务，旨在打造个性化的艺术设计体验。无论您是刚起步的爱好者还是专业设计师，我们的会员计划将满足您不同层次和需求。</p>',
  },
  elements: [
    {
      title: {
        label: '免费',
        classes: '',
      },
      type: 'card-1v6',
      prefix: '¥',
      number: '0',
      suffix: '/月',
      body: '<ul class="list-done"><li>获得免费访问平台的权限</li><li>浏览平台上公开的内容和资源</li><li>参与在线社区讨论和互动</li></ul>',
      actionsAlign: 'start center',
      actions: [
        {
          type: 'btn',
          href: '/node/1',
          target: '_blank',
          label: '立即注册',
          mode: 'raised',
          color: 'primary',
        },
      ],
    },
    {
      title: {
        label: '初级会员',
        classes: 'text-primary',
      },
      type: 'card-1v6',
      prefix: '¥',
      number: '99',
      suffix: '/月',
      classes: 'bg-light',
      body: '<ul class="list-done"><li>所有免费会员功能</li><li>享受高质量、独家的内容和教程</li><li>获得快速响应的客户支持服务</li><li>参与平台举办的活动和专属优惠</li></ul>',
      actionsAlign: 'start center',
      actions: [
        {
          type: 'btn',
          href: '/node/1',
          target: '_blank',
          label: '立即购买',
          mode: 'raised',
          color: 'primary',
        },
      ],
    },
    {
      title: {
        label: '高级会员',
        classes: '',
      },
      type: 'card-1v6',
      prefix: '¥',
      number: '899',
      suffix: '/月',
      body: '<ul class="list-done"><li>所有初级会员功能</li><li>获取深入的教程和指导</li><li>允许下载平台上的资源和素材</li><li>获得个性化的设计建议和反馈</li></ul>',
      actionsAlign: 'start center',
      actions: [
        {
          type: 'btn',
          href: '/node/1',
          target: '_blank',
          label: '立即购买',
          mode: 'raised',
          color: 'primary',
        },
      ],
    },
    {
      title: {
        label: '白金会员',
        classes: '',
      },
      type: 'card-1v6',
      prefix: '¥',
      number: '2889',
      suffix: '/月',
      body: '<ul class="list-done"><li>所有高级会员功能</li><li>使用平台提供的高级设计工具和插件</li><li>参与专业会员专属的培训和活动</li><li>与专业设计师一对一的指导</li></ul>',
      actionsAlign: 'start center',
      actions: [
        {
          type: 'btn',
          href: '/node/1',
          target: '_blank',
          label: '立即购买',
          mode: 'raised',
          color: 'primary',
        },
      ],
    },
  ],
};
Price.args = {
  content: price,
};

export const Dynamic: Story = {};
Dynamic.storyName = '动态';
const dynamic: IShowcase1v4 = {
  type: 'showcase-1v4',
  spacer: 'lg',
  bg: {
    classes: 'bg- bg-fill-width',
  },
  row: 6,
  classes: '',
  text: {
    title: {
      label: '艺术设计之旅：探索创意与美学的奇妙世界',
      style: 'style-v1',
      classes: 'mat-display-2 bold',
    },
    classes: 'text-center',
    body: '<p class="text-center">这次艺术设计之旅不仅仅是一次观赏和欣赏的体验，更是一个与艺术创造亲密接触的机会。参与者们通过参观展览、讲座和工作坊，自己动手创作和表达，发掘了自己内在的艺术潜能和表达能力。</p>',
  },
  elements: [
    {
      type: 'card-1v1',
      link: {
        href: '#',
        label: '"创意之夜：探索艺术设计的无限可能"',
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
          src: '/assets/images/showcase/1.jpg',
          alt: 'alt',
        },
      },
      moreLabel: '查看更多',
    },
    {
      type: 'card-1v1',
      link: {
        href: '#',
        label: '艺术与科技的交汇点：体验前沿艺术设计活动',
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
          src: '/assets/images/showcase/2.jpg',
          alt: 'alt',
        },
      },
      moreLabel: '查看更多',
    },
    {
      type: 'card-1v1',
      link: {
        href: '#',
        label: '美学探险：发现艺术设计的独特魅力',
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
          src: '/assets/images/showcase/3.jpg',
          alt: 'alt',
        },
      },
      moreLabel: '查看更多',
    },
    {
      type: 'card-1v1',
      link: {
        href: '#',
        label: '创造与表达：参与互动艺术设计工作坊',
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
          src: '/assets/images/showcase/4.jpg',
          alt: 'alt',
        },
      },
      moreLabel: '查看更多',
    },
  ],
  actions: [
    {
      type: 'btn',
      label: '了解更多',
      mode: 'raised',
      color: 'primary',
      href: '#',
    },
  ],
};

Dynamic.args = {
  content: dynamic,
};
