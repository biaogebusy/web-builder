import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '../../app/core/token/core.config';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BgComponent } from '../../app/uiux/widgets/bg/bg.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';

export default {
  title: 'Widgets/Bg',
  component: BgComponent,
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
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<BgComponent> = (args) => ({
  component: BgComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    classes: 'bg-fill-width bg-primary',
  },
};
