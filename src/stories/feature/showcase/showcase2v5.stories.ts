import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase2v5Component } from '@uiux/combs/showcase/showcase2v5/showcase2v5.component';
import * as ContentTextCenterStories from 'src/stories/widgets/base/ContentTextCenter.stories';
import { StorysModule } from '@core/module/storys.module';

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
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const contentTextCenter: any = ContentTextCenterStories.Base.args;
Default.args = {
  content: {
    type: 'showcase-2v5',
    text: {
      title: {
        label: '我们的产品',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      body: '<p class="text-center">Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。</p>',
    },
    spacer: 'md',
    fullWidth: true,
    elements: [
      {
        ...contentTextCenter.content,
        type: 'content-text-center',
      },
      {
        type: 'content-text-center',
        width: '25',
        ratios: 'media-140',
        text: '<p><span>1,300<sup>+</sup></span> Lawyers and advisors worldwide</p> Lawyers and advisors worldwide',
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
        text: '<p><span>20<sup>+</sup></span> Leading Regulatory Practices</p><p><span>120<sup>+</sup></span> Former Government Officials and Diplomats</p>',
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
        text: '<p><span>550<sup>+</sup></span> M&amp;A Deals</p><p><span><sup>$</sup>750<sup>B</sup></span> Aggregate Value</p>',
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
        text: '<p><span>225,000<sup>+</sup></span> Pro Bono Hours Provided in 2021</p>',
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
        text: '<p><span>50<sup>+</sup></span> Trial Wins</p><p><span>80<sup>+</sup></span> Appellate Victories</p><p><span>30<sup>+</sup></span> Government Declinations</p>',
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
        text: '<p><span>1,300<sup>+</sup></span> Lawyers and advisors worldwide</p> Lawyers and advisors worldwide',
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
        text: '<p><span>225,000<sup>+</sup></span> Pro Bono Hours Provided in 2021</p>',
        img: {
          classes: 'object-fit',
          src: '/assets/images/showcase/info05.png',
          alt: 'alt',
        },
      },
    ],
  },
};
