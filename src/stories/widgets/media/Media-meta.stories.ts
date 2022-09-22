import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '../../../app/core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '../../../app/core/token/core.config';
import { ShareModule } from '../../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MediaMetaComponent } from '../../../app/uiux/widgets/media/media-meta/media-meta.component';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';

export default {
  title: '基础/媒体/媒体 meta',
  component: MediaMetaComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        SafeHtmlPipe,
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
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<MediaMetaComponent> = (args) => ({
  component: MediaMetaComponent,
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
