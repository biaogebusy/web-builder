import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { SpacerComponent } from '@uiux/widgets/spacer/spacer.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '主题/间距',
  id: 'spacer',
  component: SpacerComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative bg-shadow" style="z-index:1">${story}</div>`
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: '间距是 UI 元素与元素之间的间隔，组件与组件之间的间距。',
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Xs = Template.bind({});

Xs.args = {
  size: 'xs',
};

export const Sm = Template.bind({});

Sm.args = {
  size: 'sm',
};

export const Md = Template.bind({});

Md.args = {
  size: 'md',
};

export const Lg = Template.bind({});

Lg.args = {
  size: 'lg',
};

export const Xl = Template.bind({});

Xl.args = {
  size: 'xl',
};
