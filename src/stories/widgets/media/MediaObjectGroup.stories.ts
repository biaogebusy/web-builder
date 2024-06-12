import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { MediaObjectGroupComponent } from '@uiux/widgets/media/media-object-group/media-object-group.component';
import * as MediaObjectStories from './MediaObject.stories';
import { StorysModule } from '@core/module/storys.module';
import { formatDate } from '@angular/common';
import { IMediaObjectGroup } from '@core/interface/widgets/IMediaObject';

const meta: Meta<MediaObjectGroupComponent> = {
  title: '基础组件/媒体/媒体对象组',
  id: 'media-object-group',
  component: MediaObjectGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="relative p-x p-y" style="z-index:1">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<MediaObjectGroupComponent>;
export const Default: Story = {};
const mediaObject: any = MediaObjectStories.Default.args;
const content: IMediaObjectGroup = {
  label: '工作经历',
  type: 'media-object-group',
  elements: [
    {
      ...mediaObject.content,
    },
    {
      img: {
        src: '/assets/images/avatar/03.jpeg',
        style: {
          width: '45px',
          height: '45px',
        },
        alt: 'logo',
      },
      meta: formatDate(new Date(), 'yyyy-MM', 'en-US'),
      title: '前端架构师',
      subTitle: '阿里蚂蚁',
      content:
        '深入产品和行业场景，深入行业技术，分析影响稳定性和质量的潜在异常节点，把握蚂蚁金服强大的监控能力，设计和制定监控方案。',
    },
  ],
};
Default.args = {
  content,
};
