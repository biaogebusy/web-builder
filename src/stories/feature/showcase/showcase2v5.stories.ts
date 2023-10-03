import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase2v5Component } from '@uiux/combs/showcase/showcase2v5/showcase2v5.component';
import * as ContentTextCenterStories from '@stories/base/ContentTextCenter.stories';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase2v5 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/展示 Showcase/2v5',
  id: 'showcase-2v5',
  component: Showcase2v5Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
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
export const Default = Template.bind({});
const contentTextCenter: any = ContentTextCenterStories.Base.args;

const content: IShowcase2v5 = {
  type: 'showcase-2v5',
  text: {
    title: {
      label: 'Drupal 数据统计报告',
      style: 'style-v1',
      classes: 'mat-display-1',
    },
    body: '<p class="text-center">Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。</p>',
  },
  spacer: 'md',
  fullWidth: true,
  bg: { classes: '' },
  classes: '',
  elements: [
    {
      ...contentTextCenter.content,
      type: 'content-text-center',
    },
    {
      type: 'content-text-center',
      width: '25',
      ratios: 'media-140',
      text: '<p>全球有超过100万个网站采用 Drupal 进行构建和管理</p>',
      img: {
        classes: 'object-fit',
        src: '/assets/images/showcase/info02.png',
        alt: 'alt',
      },
    },
    {
      type: 'content-text-center',
      width: '25',
      ratios: 'media-140',
      text: '<p>全球约有200,000名活跃的 Drupal 开发者和贡献者</p>',
      img: {
        classes: 'object-fit',
        src: '/assets/images/showcase/info03.png',
        alt: 'alt',
      },
    },
    {
      type: 'content-text-center',
      width: '25',
      ratios: 'media-140',
      text: '<p>Drupal 支持超过100种不同语言的本地化和翻译</p>',
      img: {
        classes: 'object-fit',
        src: '/assets/images/showcase/info04.png',
        alt: 'alt',
      },
    },
    {
      type: 'content-text-center',
      width: '25',
      ratios: 'media-140',
      text: '<p>超过50,000个可用模块和主题，可根据不同需求轻松扩展和定制网站功能</p>',
      img: {
        classes: 'object-fit',
        src: '/assets/images/showcase/info05.png',
        alt: 'alt',
      },
    },
    {
      type: 'content-text-center',
      width: '25',
      ratios: 'media-140',
      text: '<p>全球一些知名的品牌和机构，如纽约时报、华盛顿邮报、红十字会等，都选择使用 Drupal 构建和管理其官方网站。</p>',
      img: {
        classes: 'object-fit',
        src: '/assets/images/showcase/info01.png',
        alt: 'alt',
      },
    },
    {
      type: 'content-text-center',
      width: '25',
      ratios: 'media-140',
      text: '<p>Drupal 社区每年都会举办全球各地的 DrupalCon 大会和其他相关活动，汇聚开发者、用户和专家，促进知识共享和交流。根据统计数据，DrupalCon 已在全球超过30个国家举办过。',
      img: {
        classes: 'object-fit',
        src: '/assets/images/showcase/info02.png',
        alt: 'alt',
      },
    },
    {
      type: 'content-text-center',
      width: '25',
      ratios: 'media-140',
      text: '<p>全球超过70%的 Drupal 网站具有响应式设计，能够适应不同设备和屏幕尺寸，提供优质的移动浏览体验</p>',
      img: {
        classes: 'object-fit',
        src: '/assets/images/showcase/info05.png',
        alt: 'alt',
      },
    },
  ],
};
Default.args = {
  content,
};
