import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MediaMetaComponent } from '@uiux/widgets/media/media-meta/media-meta.component';
import { StorysModule } from '@core/module/storys.module';
import { formatDate } from '@angular/common';

export default {
  title: '基础组件/媒体/媒体 meta',
  id: 'media-meta',
  component: MediaMetaComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
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
export const Default = Template.bind({});

Default.args = {
  content: {
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
  },
};
