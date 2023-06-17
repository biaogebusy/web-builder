import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MediaObjectComponent } from '@uiux/widgets/media/media-object/media-object.component';
import { StorysModule } from '@core/module/storys.module';
import { formatDate } from '@angular/common';

export default {
  title: '基础组件/媒体/媒体对象',
  id: 'media-object',
  component: MediaObjectComponent,
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
    type: 'media-object',
    img: {
      src: '/assets/images/avatar/01.jpeg',
      style: {
        width: '45px',
        height: '45px',
      },
      alt: 'logo',
    },
    meta: formatDate(new Date(), 'yyyy-MM', 'en-US'),
    title: '前端开发工程师',
    subTitle: 'Davyin',
    content:
      '专注于 Drupal 前端主题开发，目前主要从事于 Angular 前端开发，终身学习体验者，热衷于健身，希望明天比今天好一点。',
  },
};
