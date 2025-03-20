import { importProvidersFrom } from '@angular/core';
import { IDownload } from '@core/interface/widgets/IDownload';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { DownloadComponent } from '@uiux/widgets/actions/download/download.component';

const meta: Meta<DownloadComponent> = {
  title: '基础组件/Actions/下载',
  id: 'download',
  component: DownloadComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
    componentWrapperDecorator(story => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `下载组件一般用作文档的下载，现有逻辑是会根据详情页的权限参数，是否是会员或者是否需要购买，有权限时下拉提供word文档或者pdf文档。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DownloadComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '预览';
const content: IDownload = {
  type: 'download',
  label: '下载',
  icon: {
    name: 'file_download',
    inline: true,
  },
  elements: [
    {
      type: 'link',
      label: 'Doc',
      icon: {
        name: 'description',
      },
      href: '#',
    },
    {
      type: 'link',
      label: 'Pdf',
      icon: {
        name: 'picture_as_pdf',
      },
      href: '#',
    },
  ],
};
Default.args = {
  content,
};
