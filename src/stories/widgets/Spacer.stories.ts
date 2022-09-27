import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/core.config';
import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { SpacerComponent } from '@uiux/widgets/spacer/spacer.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: '基础/间距',
  component: SpacerComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative bg-primary" style="z-index:1">${story}</div>`
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: '间距信使 UI 元素与元素之间的间隔，组件与组件之间的间距。',
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
