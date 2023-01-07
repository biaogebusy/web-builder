import { moduleMetadata, Meta } from '@storybook/angular';
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
    label: '内推',
    classes: 'bold',
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
