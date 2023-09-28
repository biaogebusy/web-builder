import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import * as TextStories from './Text.stories';
import { StorysModule } from '@core/module/storys.module';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { ILink } from '@core/interface/widgets/ILink';

export default {
  title: '基本元素/链接',
  id: 'link',
  component: LinkComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget position-relative p-x-md p-y-md">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: ILink = {
  type: 'link',
  label: '链接',
  classes: '',
  href: '/manage',
};
Default.args = {
  content,
};

export const QueryParams = Template.bind({});
QueryParams.storyName = 'QueryParams 参数';
const query: ILink = {
  ...Default.args.content,
  queryParams: {
    demo: '466',
  },
  fragment: 'title',
};
QueryParams.args = {
  content: query,
};

export const Fragment = Template.bind({});
Fragment.storyName = 'Fragment 片段';
const fragment: ILink = {
  ...Default.args.content,
  fragment: 'title',
};
Fragment.args = {
  content: fragment,
};

export const Dialog = Template.bind({});
Dialog.storyName = 'Dialog';
const textContent: any = TextStories.List.args;
const dialog: ILink = {
  ...Default.args.content,
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

export const Drawer = Template.bind({});
const drawer: ILink = {
  ...Default.args.content,
  rel: 'drawer',
};
Drawer.args = {
  content: drawer,
};

export const ReqRoles = Template.bind({});
ReqRoles.storyName = '根据权限显示';
const roles: ILink = {
  ...Default.args.content,
  params: {
    reqRoles: ['administrator'],
  },
};
ReqRoles.args = {
  content: roles,
};
