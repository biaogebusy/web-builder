import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MediaMetaComponent } from '@uiux/widgets/media/media-meta/media-meta.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '基础组件/媒体/媒体 meta',
  id: 'media-meta',
  component: MediaMetaComponent,
  decorators: [
    moduleMetadata({
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
export const Default = Template.bind({});

Default.args = {
  content: {
    link: {
      href: '#',
      label: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
    },
    more: {
      href: '#',
      label: '更多',
    },
    date: '2022-07-18',
    body: '使用 lighthouse 评分 以南宁IT派[www.nnitpai.com]为例记录分析优化过程，使用 Devtools lighthouse 对首页进行综合的评分： 性能评分勉强及格差强人意，切换到 performance 性能选项卡: 记录的同时，可以依次滚动页面到底部，暂...',
  },
};
