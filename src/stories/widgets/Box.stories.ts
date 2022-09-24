import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '../../app/core/token/core.config';
import { ShareModule } from '../../app/share/share.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BoxComponent } from '../../app/uiux/widgets/box/box.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
export default {
  title: '基础/Box',
  component: BoxComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Box = Template.bind({});

Box.args = {
  content: {
    style: 'style-v9',
    title: {
      href: '/',
      label: 'Best Financial Advice',
    },
    img: {
      classes: 'object-fit',
      src: '/assets/images/cases/porto1.jpg',
      alt: 'alt',
    },
    content: 'The most well-known which is said to have originated',
    more: {
      href: '#',
      label: 'Read More',
    },
  },
};
