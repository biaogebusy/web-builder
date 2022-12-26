import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { IframeComponent } from '@uiux/widgets/iframe/iframe.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '基础组件/Iframe',
  id: 'iframe',
  component: IframeComponent,
  subcomponents: { TitleComponent },
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
        component: `为了安全起见，url 不能跨域`,
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
Default.storyName = '默认';
Default.args = {
  content: {
    url: '/manage/content/shop/add?disable_sidebar=1&destination=/create/shop',
  },
};

export const CustomSize = Template.bind({});
CustomSize.storyName = '自定义';
CustomSize.args = {
  content: {
    url: '/manage/content/shop/add?disable_sidebar=1&destination=/create/shop',
    width: '800',
    classes: '800',
  },
};

export const FullScreenHeight = Template.bind({});
FullScreenHeight.storyName = '全屏高';
FullScreenHeight.args = {
  content: {
    url: '/manage/content/shop/add?disable_sidebar=1&destination=/create/shop',
    width: '100%',
    classes: 'height-100vh',
  },
};
