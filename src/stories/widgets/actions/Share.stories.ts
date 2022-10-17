import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ShareComponent } from '@uiux/widgets/actions/share/share.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '基础/Actions/分享',
  id: 'share',
  component: ShareComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `根据页面url可分享到微博、QQ、微信朋友圈。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
// Raname Story
Default.storyName = '预览';
Default.args = {
  content: {
    type: 'share',
    button: {
      icon: 'share',
      label: '分享',
    },
    params: {
      url: '/',
    },
  },
};
