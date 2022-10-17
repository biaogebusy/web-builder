import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';

import { InlineLightboxComponent } from '@uiux/widgets/lightbox/inline-lightbox/inline-lightbox.component';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { DynamicWidgetsComponent } from '@uiux/widgets/dynamic-widgets/dynamic-widgets.component';
import { StorysModule } from '@core/storys.module';
export default {
  title: '基础/行内 Lightbox',
  id: 'inline-lightbox',
  component: InlineLightboxComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [DialogComponent, DynamicWidgetsComponent],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `行内元素a标签可以触发lightbox弹窗显示图片，非图片使用dialog显示内容。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
// Raname Story
Default.storyName = '预览';
Default.args = {
  content: {
    type: 'inline-lightbox',
    label: ['查看图片', 'Word 下载', 'PDF 预览'],
    elements: [
      {
        src: '/assets/images/cases/porto1.jpg',
        caption: '受理费第一次',
        thumb: '/assets/images/cases/porto1.jpg',
      },
      {
        src: '/assets/images/cases/porto2.doc',
        preview: '/assets/images/cases/porto2.pdf',
      },
      {
        src: '/assets/images/cases/porto3.pdf',
        preview: '/assets/images/cases/porto3.pdf',
      },
    ],
  },
};
