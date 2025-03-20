import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { InlineLightboxComponent } from '@uiux/widgets/lightbox/inline-lightbox/inline-lightbox.component';
import { StorysModule } from '@core/module/storys.module';
import { IInlineLightbox } from '@core/interface/widgets/IWidgets';
import { importProvidersFrom } from '@angular/core';
const meta: Meta<InlineLightboxComponent> = {
  title: '基础组件/Lightbox',
  id: 'inline-lightbox',
  component: InlineLightboxComponent,
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
        component: `行内元素a标签可以触发lightbox弹窗显示图片，非图片使用dialog显示内容。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<InlineLightboxComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '预览';
const content: IInlineLightbox = {
  type: 'inline-lightbox',
  label: ['查看图片', 'Word 下载', 'PDF 预览'],
  elements: [
    {
      src: '/assets/images/cases/porto1.jpg',
    },
    {
      src: '/assets/images/cases/porto2.pdf',
    },
    {
      src: '/assets/images/cases/porto3.pdf',
    },
  ],
};
Default.args = {
  content,
};
