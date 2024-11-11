import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { ContentBoxComponent } from '@uiux/widgets/content-box/content-box.component';
import { StorysModule } from '@core/module/storys.module';
import { IContentBox } from '@core/interface/widgets/IContentWidget';
import { importProvidersFrom } from '@angular/core';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';

const meta: Meta<ContentBoxComponent> = {
  title: '基本元素/内容块',
  id: 'content-box',
  component: ContentBoxComponent,
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
      story => `<div style="width:40%" class="widget relative">${story}</div>`
    ),
  ],
};

export default meta;
type Story = StoryObj<ContentBoxComponent>;
export const Default: Story = {};
const content: IContentBox = {
  type: 'content-box',
  ratios: 'media-140',
  subTitle: {
    label: '信使',
    href: '/search',
  },
  title: {
    label: '基于 Drupal 的 Angular 前端框架',
    href: '/search',
  },
  img: {
    classes: 'object-fit',
    src: '/assets/images/cases/porto1.jpg',
    alt: 'alt',
  },
};
Default.args = {
  content,
};
