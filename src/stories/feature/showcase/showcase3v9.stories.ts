import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Showcase3v9Component } from '@uiux/combs/showcase/showcase3v9/showcase3v9.component';
import * as btnVideoStory from '@stories/widgets/base/BtnVideo.stories';

export default {
  title: '特色组件/展示 Showcase/3v9',
  id: 'showcase-3v9',
  component: Showcase3v9Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
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
    type: 'showcase-3v9',
    bg: {
      classes: 'bg-fill-width',
      img: {
        classes: 'object-fit',
        src: '/assets/images/bg/bg-01.png',
      },
    },
    order: {
      left: 1,
      right: 0,
    },
    left: [
      {
        type: 'img',
        src: '/assets/images/illustration/13.png',
        classes: 'mover',
        hostClasses: 'position-relative img-bg-shape',
        actions: [
          {
            type: 'btn-video',
            color: 'default',
            video: {
              options: {
                controls: true,
                aspectRatio: '16:9',
                poster: '/assets/video/poster01.png',
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
    right: [
      {
        type: 'text',
        spacer: 'sm',
        title: {
          label:
            '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
          style: 'style-v4',
          classes: 'mat-display-4 bold',
        },
        body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。<ul class="list-done"><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li><li>可以直接编辑组件的 JSON，所见即所得；</li></ul><p>Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。</p><br><p>马上拖动组件到这里进行创作，或者点击右上角智能生成。</p>',
        actions: [
          {
            href: '#',
            label: '立即体验',
          },
        ],
      },
    ],
  },
};

export const Reverse = Template.bind({});
Reverse.storyName = '反向';
Reverse.args = {
  content: {
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
        src: '/assets/images/illustration/12.png',
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
};

const {
  Default: {
    args: { content: btnVideo },
  },
} = btnVideoStory as any;

export const Video = Template.bind({});
Video.storyName = '视频';
Video.args = {
  content: {
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
        src: '/assets/images/showcase/7.jpg',
        hostClasses: 'position-relative',
        actions: [
          {
            color: 'default',
            ...btnVideo,
          },
        ],
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
        body: '为所有开发者、所有应用场景而设计，让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。<ul class="list-done"><li>通过 Docker 隔离</li><li>每个 workflow 独享1核虚拟CPU</li><li>在 yml 配置文件中可以使用上下文环境变量</li><li>每个workflow 排队和执行时间最多58分钟</li></ul>',
      },
    ],
  },
};
