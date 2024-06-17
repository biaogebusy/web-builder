import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { SwitchThemeComponent } from '@uiux/widgets/switch-theme/switch-theme.component';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<SwitchThemeComponent> = {
  title: '全局配置/页头/切换主题',
  id: 'switch-theme',
  component: SwitchThemeComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
};

export default meta;
type Story = StoryObj<SwitchThemeComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '切换主题';
