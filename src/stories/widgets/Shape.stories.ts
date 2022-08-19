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
import { ShapeComponent } from '../../app/uiux/widgets/shape/shape.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Widgets/Shape',
  component: ShapeComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
        `<div class="shape-inner position-relative p-y-lg m-top-lg bg-primary">
  ${story}
</div>
        `
    ),
  ],
} as Meta;

const Template: Story<ShapeComponent> = (args) => ({
  component: ShapeComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {};
