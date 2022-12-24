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
Default.storyName = '预览';
Default.args = {
  content: {
    url: '/manage/content/shop/add?disable_sidebar=1&destination=/create/shop',
    height: '1200',
  },
};
