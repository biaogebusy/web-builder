import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { TitleComponent } from '@uiux/widgets/title/title.component';
import { IframeComponent } from '@uiux/widgets/iframe/iframe.component';
import { StorysModule } from '@core/module/storys.module';
import { IIframe } from '@core/interface/widgets/IWidgets';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<IframeComponent> = {
  title: '基础组件/Iframe',
  id: 'iframe',
  component: IframeComponent,
  subcomponents: { TitleComponent },
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(story => {
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
};

export default meta;
type Story = StoryObj<IframeComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '默认';
const content: IIframe = {
  type: 'iframe',
  url: '?path=/story/full-calendar--default',
};
Default.args = {
  content,
};

export const CustomSize: Story = {};
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

export const FullScreenHeight: Story = {};
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
