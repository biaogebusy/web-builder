import { StorysModule } from '@core/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { DownloadComponent } from '@uiux/widgets/actions/download/download.component';

export default {
  title: '基础组件/Actions/下载',
  id: 'download',
  component: DownloadComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `下载组件一般用作文档的下载，现有逻辑是会根据详情页的权限参数，是否是会员或者是否需要购买，有权限时下拉提供word文档或者pdf文档。`,
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
  },
};
