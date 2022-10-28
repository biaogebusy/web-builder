import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v3Component } from '@uiux/combs/showcase/showcase3v3/showcase3v3.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '特色组件/展示 Showcase/3v3',
  id: 'showcase-3v3',
  component: Showcase3v3Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `
      <div fxFlex.gt-sm="60" fxFlexOffset.gt-sm="20">
      ${story}
      </div>
    `
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
    title: {
      label: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
      href: '#',
    },
    spacer: 'none',
    date: '12/09/2022',
    commentCount: '2',
    category: 'Angular',
    body: '使用 lighthouse 评分 以南宁IT派[www.nnitpai.com]为例记录分析优化过程，使用 Devtools lighthouse 对首页进行综合的评分： 性能评分勉强及格差强人意，切换到 performance 性能选项卡: 记录的同时，可以依次滚动页面到底部，暂',
    details: {
      label: '查看更多',
      href: '#',
      style: 'style-v1',
      icon: 'open_in_new',
    },
  },
};

export const Image = Template.bind({});

Image.args = {
  content: {
    ...Default.args.content,
    showImage: true,
    feature: {
      fullIcon: 'fullscreen',
      openIcon: 'open_in_new',
      ratios: 'media-16-9',
      link: '#',
      img: {
        classes: 'object-fit',
        src: '/assets/images/showcase/blog1-large.jpeg',
        alt: 'lazyload',
      },
    },
  },
};
