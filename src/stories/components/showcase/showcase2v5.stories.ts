import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Showcase2v5Component } from '@uiux/combs/showcase/showcase2v5/showcase2v5.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import * as ContentTextCenterStories from 'src/stories/widgets/base/ContentTextCenter.stories';
export default {
  title: '组件/展示/2v5',
  id: 'showcase-2v5',
  component: Showcase2v5Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
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
    text: {
      title: {
        label: 'Our Products',
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
