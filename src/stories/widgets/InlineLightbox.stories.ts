import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { InlineLightboxComponent } from '@uiux/widgets/lightbox/inline-lightbox/inline-lightbox.component';
import { StorysModule } from '@core/module/storys.module';
import { IInlineLightbox } from '@core/interface/widgets/IWidgets';
const meta: Meta<MyComponent> = {
  title: '基础组件/Lightbox',
  id: 'inline-lightbox',
  component: InlineLightboxComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
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
type Story = StoryObj<MyComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '预览';
const content: IInlineLightbox = {
  type: 'inline-lightbox',
  label: ['查看图片', 'Word 下载', 'PDF 预览'],
  elements: [
    {
      src: '/assets/images/cases/porto1.jpg',
      caption: '描述',
      thumb: '/assets/images/cases/porto1.jpg',
    },
    {
      src: '/assets/images/cases/porto2.doc',
      preview: '/assets/images/cases/porto2.pdf',
      thumb: '',
    },
    {
      src: '/assets/images/cases/porto3.pdf',
      preview: '/assets/images/cases/porto3.pdf',
      thumb: '',
    },
  ],
};
Default.args = {
  content,
};
