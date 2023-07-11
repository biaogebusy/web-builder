import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { IframeComponent } from '@uiux/widgets/iframe/iframe.component';
import { StorysModule } from '@core/module/storys.module';
import { IIframe } from '@core/interface/widgets/IWidgets';

export default {
  title: '基础组件/Iframe',
  id: 'iframe',
  component: IframeComponent,
  subcomponents: { TitleComponent },
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
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
const content: IIframe = {
  type: 'iframe',
  url: '?path=/story/full-calendar--default',
};
Default.args = {
  content,
};

export const CustomSize = Template.bind({});
CustomSize.storyName = '自定义';
const custom: IIframe = {
  type: 'iframe',
  url: '?path=/story/spacer--default',
  width: '800',
  height: '800',
};
CustomSize.args = {
  content: custom,
};

export const FullScreenHeight = Template.bind({});
FullScreenHeight.storyName = '全屏高';
const full: IIframe = {
  type: 'iframe',
  url: '?path=/story/full-calendar--default',
  width: '100%',
  classes: 'height-100vh',
};
FullScreenHeight.args = {
  content: full,
};
