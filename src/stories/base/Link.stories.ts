import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import * as TextStories from './Text.stories';
import { StorysModule } from '@core/module/storys.module';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { ILink } from '@core/interface/widgets/ILink';
import { importProvidersFrom } from '@angular/core';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';

const meta: Meta<LinkComponent> = {
  title: '基本元素/链接',
  id: 'link',
  component: LinkComponent,
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
      (story) => `<div class="widget relative p-x-md p-y-md">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<LinkComponent>;
export const Default: Story = {};
const content: ILink = {
  type: 'link',
  label: '更多',
  classes: '',
  href: '/',
};
Default.args = {
  content,
};

export const QueryParams: Story = {};
QueryParams.storyName = 'QueryParams 参数';
const query: ILink = {
  type: 'link',
  label: '更多',
  classes: '',
  href: '/',
  queryParams: {
    demo: '466',
  },
  fragment: 'title',
};
QueryParams.args = {
  content: query,
};

export const Fragment: Story = {};
Fragment.storyName = 'Fragment 片段';
const fragment: ILink = {
  type: 'link',
  label: '更多',
  classes: '',
  href: '/',
  fragment: 'title',
};
Fragment.args = {
  content: fragment,
};

export const Dialog: Story = {};
Dialog.storyName = 'Dialog';
const textContent: any = TextStories.List.args;
const dialog: ILink = {
  type: 'link',
  label: '更多',
  classes: '',
  href: '/',
  dialog: {
    params: {
      width: '800px',
    },
    data: [
      {
        type: 'text',
        ...textContent.content,
      },
    ],
  },
};
Dialog.args = {
  content: dialog,
};

export const Drawer: Story = {};
const drawer: ILink = {
  type: 'link',
  label: '更多',
  classes: '',
  href: '/',
  rel: 'drawer',
};
Drawer.args = {
  content: drawer,
};

export const ReqRoles: Story = {};
ReqRoles.storyName = '根据权限显示';
const roles: ILink = {
  type: 'link',
  label: '更多',
  classes: '',
  href: '/',
  params: {
    reqRoles: ['administrator'],
  },
};
ReqRoles.args = {
  content: roles,
};
