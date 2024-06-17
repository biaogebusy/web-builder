import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { MediaMetaComponent } from '@uiux/widgets/media/media-meta/media-meta.component';
import { StorysModule } from '@core/module/storys.module';
import { formatDate } from '@angular/common';
import { IMediaMeta } from '@core/interface/widgets/IMediaMeta';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<MediaMetaComponent> = {
  title: '基础组件/媒体/媒体 meta',
  id: 'media-meta',
  component: MediaMetaComponent,
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
type Story = StoryObj<MediaMetaComponent>;
export const Default: Story = {};
const content: IMediaMeta = {
  type: 'media-meta',
  link: {
    href: '#',
    label: 'Storybook 是什么？',
  },
  more: {
    href: '#',
    label: '更多',
  },
  date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
  body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。...',
};
Default.args = {
  content,
};
