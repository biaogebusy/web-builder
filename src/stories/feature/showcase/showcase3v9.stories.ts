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
          label: 'Storybook 是什么？',
          style: 'style-v4',
          classes: 'mat-display-2',
        },
        body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。',
      },
      {
        type: 'panel',
        elements: [
          {
            title: '组件驱动开发',
            icon: 'person',
            params: {
              expanded: true,
            },
            elements: [
              {
                type: 'text',
                spacer: 'none',
                body: 'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
              },
            ],
          },
          {
            title: '组件展示和测试',
            icon: 'faviores',
            elements: [
              {
                type: 'text',
                spacer: 'none',
                body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
              },
            ],
          },
          {
            title: '文档化',
            icon: 'faviores',
            elements: [
              {
                type: 'text',
                spacer: 'none',
                body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
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
