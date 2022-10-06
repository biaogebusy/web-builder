import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { apiUrlFactory } from '@core/factory/factory';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ShareModule } from '@share/share.module';
import { MediaListComponent } from '@uiux/widgets/media/media-list/media-list.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: '基础/媒体/媒体列表',
  id: 'media-list',
  component: MediaListComponent,
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

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});

Base.args = {
  content: {
    title: '热门文章',
    elements: [
      {
        link: {
          label: '使用 DevTools 对 Angular 前端应用性能分析优化',
          href: '/node/417',
        },
        img: {
          src: '../assets/images/showcase/blog1-large.jpeg',
          alt: '',
        },
        changed: '2022/01/08',
      },
      {
        link: {
          label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
          href: '/node/415',
        },
        img: {
          src: '../assets/images/showcase/blog2-large.jpeg',
          alt: '',
        },
        changed: '2022/01/03',
      },
      {
        link: {
          label: '你应该了解的 Angular 最佳实践',
          href: '/node/414',
        },
        img: {
          src: '../assets/images/showcase/blog3-large.jpeg',
          alt: '',
        },
        changed: '2022/01/03',
      },
      {
        link: {
          label: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
          href: '/node/387',
        },
        img: {
          src: '../assets/images/showcase/blog4-large.jpeg',
          alt: '',
        },
        changed: '2021/05/14',
      },
    ],
  },
};
