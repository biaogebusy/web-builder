import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Showcase2v6Component } from '@uiux/combs/showcase/showcase2v6/showcase2v6.component';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import * as Card1v2Stories from 'src/stories/widgets/card/Card1v2.stories';
export default {
  title: '组件/展示/2v6',
  component: Showcase2v6Component,
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
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
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
const card1v2: any = Card1v2Stories.Base.args;
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
    row: '2',
    fullWidth: true,
    elements: [
      {
        type: 'card-1v2',
        ...card1v2.content,
      },
      {
        type: 'card-1v2',
        link: {
          href: '#',
          label:
            '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
        },
        subTitle: '高性能',
        img: {
          href: '#',
          src: '/assets/images/showcase/card-1v2-2.jpg',
          alt: 'alt',
        },
        bg: {
          classes: 'object-fit',
          img: {
            hostClasses: '',
            src: '/assets/images/showcase/pattern-02.png',
          },
        },
      },
    ],
  },
};
