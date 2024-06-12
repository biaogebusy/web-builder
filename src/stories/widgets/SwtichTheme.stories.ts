import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { SwitchThemeComponent } from '@uiux/widgets/switch-theme/switch-theme.component';

const meta: Meta<MyComponent> = {
  title: '全局配置/页头/切换主题',
  id: 'switch-theme',
  component: SwitchThemeComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '切换主题';
