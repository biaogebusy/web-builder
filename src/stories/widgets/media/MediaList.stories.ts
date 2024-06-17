import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { MediaListComponent } from '@uiux/widgets/media/media-list/media-list.component';
import { StorysModule } from '@core/module/storys.module';
import { formatDate } from '@angular/common';
import { IMediaList } from '@core/interface/widgets/IMediaList';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<MediaListComponent> = {
  title: '基础组件/媒体/媒体列表',
  id: 'media-list',
  component: MediaListComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="relative p-x p-y" style="z-index:1">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<MediaListComponent>;
export const Default: Story = {};
const content: IMediaList = {
  type: 'media-list',
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
      changed: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
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
      changed: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
    },
    {
      link: {
        label: '你应该了解的 Angular 最佳实践',
        href: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      },
      img: {
        src: '../assets/images/showcase/blog3-large.jpeg',
        alt: '',
      },
      changed: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
    },
    {
      link: {
        label: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
        href: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      },
      img: {
        src: '../assets/images/showcase/blog4-large.jpeg',
        alt: '',
      },
      changed: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
    },
  ],
};
Default.args = {
  content,
};
