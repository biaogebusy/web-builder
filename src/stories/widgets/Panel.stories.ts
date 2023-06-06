import { StorysModule } from '@core/module/storys.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { PanelComponent } from '@uiux/widgets/panel/panel.component';

export default {
  title: '基础组件/面板',
  id: 'panel',
  component: PanelComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
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

Default.args = {
  content: {
    type: 'panel',
    title: {
      label: 'About',
      style: 'style-v4',
    },
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
};
