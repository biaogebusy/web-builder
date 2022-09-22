import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BreadcrumbComponent } from '../../app/uiux/widgets/breadcrumb/breadcrumb.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CORE_CONFIG } from '@core/token/core.config';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
export default {
  title: '基础/面包屑',
  component: BreadcrumbComponent,
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
    componentWrapperDecorator(
      (story) => `<div class="bg-primary bg-fill-width p-x p-y">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<BreadcrumbComponent> = (args) => ({
  component: BreadcrumbComponent,
  props: {
    ...args,
  },
});
export const Breadcrumb = Template.bind({});

Breadcrumb.args = {
  content: [
    {
      label: 'Home',
      href: '#',
    },
    {
      label: 'Contact Us',
      href: '/about',
    },
  ],
};
