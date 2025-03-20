import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { MediaObjectComponent } from '@uiux/widgets/media/media-object/media-object.component';
import { StorysModule } from '@core/module/storys.module';
import { formatDate } from '@angular/common';
import { IMediaObject } from '@core/interface/widgets/IMediaObject';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<MediaObjectComponent> = {
  title: '基础组件/媒体/媒体对象',
  id: 'media-object',
  component: MediaObjectComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
    componentWrapperDecorator(
      story => `<div class="relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
};

export default meta;
type Story = StoryObj<MediaObjectComponent>;
export const Default: Story = {};
const content: IMediaObject = {
  type: 'media-object',
  img: {
    src: '/assets/images/avatar/01.jpeg',
    width: 45,
    height: 45,
    alt: 'logo',
  },
  meta: formatDate(new Date(), 'yyyy-MM', 'en-US'),
  title: '前端开发工程师',
  subTitle: 'Davyin',
  content:
    '专注于 Drupal 前端主题开发，目前主要从事于 Angular 前端开发，终身学习体验者，热衷于健身，希望明天比今天好一点。',
};
Default.args = {
  content,
};
