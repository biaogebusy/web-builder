import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import * as TextStories from './Text.stories';
import { StorysModule } from '@core/module/storys.module';
import { LinkComponent } from '@uiux/widgets/link/link.component';

export default {
  title: '基础组件/基本元素/链接',
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

Default.args = {
  content: {
    type: 'link',
    label: '内推',
    classes: '',
    href: '/lists/jobs',
  },
};

export const queryParams = Template.bind({});
queryParams.storyName = 'QueryParams 参数';
queryParams.args = {
  content: {
    ...Default.args.content,
    queryParams: {
      demo: '466',
    },
    fragment: 'title',
  },
};

export const fragment = Template.bind({});
fragment.storyName = 'Fragment 片段';
fragment.args = {
  content: {
    ...Default.args.content,
    fragment: 'title',
  },
};

export const dialog = Template.bind({});
dialog.storyName = 'Dialog';
const textContent: any = TextStories.List.args;
dialog.args = {
  content: {
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
  },
};

export const Drawer = Template.bind({});
Drawer.args = {
  content: {
    ...Default.args.content,
    rel: 'drawer',
  },
};
