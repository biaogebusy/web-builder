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
import { MediaListComponent } from '../../../app/uiux/widgets/media/media-list/media-list.component';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';

export default {
  title: 'Widgets/Media/MediaList',
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
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<MediaListComponent> = (args) => ({
  component: MediaListComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    title: '热门文章',
    elements: [
      {
        link: {
          label: '使用 DevTools 对 Angular 前端应用性能分析优化',
          href: '#',
        },
        img: {
          src: '../assets/images/showcase/blog1-large.jpeg',
          alt: '',
        },
        changed: '2021/02/07',
      },
      {
        link: {
          label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
          href: '#',
        },
        img: {
          src: '../assets/images/showcase/blog2-large.jpeg',
          alt: '',
        },
        changed: '2021/02/07',
      },
      {
        link: {
          label: '你应该了解的 Angular 最佳实践',
          href: '#',
        },
        img: {
          src: '../assets/images/showcase/blog3-large.jpeg',
          alt: '',
        },
        changed: '2021/02/07',
      },
      {
        link: {
          label: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
          href: '#',
        },
        img: {
          src: '../assets/images/showcase/blog4-large.jpeg',
          alt: '',
        },
        changed: '2021/02/07',
      },
    ],
  },
};
