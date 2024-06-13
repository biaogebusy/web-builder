import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { ContentTextCenterComponent } from '@uiux/widgets/content-text-center/content-text-center.component';
import { StorysModule } from '@core/module/storys.module';
import { IContentTextCenter } from '@core/interface/widgets/IContentWidget';
import { importProvidersFrom } from '@angular/core';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';

const meta: Meta<ContentTextCenterComponent> = {
  title: '基本元素/内容居中块',
  id: 'content-text-center',
  component: ContentTextCenterComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [
        ...StorysModule.forEntryComponents(),
        ReqRolesDirective,
        SafeHtmlPipe,
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="width:40%" class="widget relative text-light">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<ContentTextCenterComponent>;
const content: IContentTextCenter = {
  type: 'content-text-center',
  ratios: 'media-140',
  text: '<p style="font-size:45px">118k</p><p>活跃的模块</p><p style="font-size:45px">46k<sup>+</sup></p><p>开发者</p><p style="font-size:45px">1.4M<sup></sup></p><p>使用</p><p>Drupal 统计</p>',
  img: {
    classes: 'object-fit',
    src: '/assets/images/showcase/4.jpg',
    alt: 'alt',
  },
};
export const Base: Story = {
  args: {
    content,
  },
};
