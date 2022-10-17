import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { MenuListComponent } from '@uiux/widgets/menu-list/menu-list.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: '基础/菜单项',
  component: MenuListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
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
export const Base = Template.bind({});

Base.args = {
  content: {
    title: '标签',
    elements: [
      {
        link: {
          href: '#',
          label: 'Angular',
        },
        label: '3',
      },
      {
        link: {
          href: '#',
          label: 'Drupal',
        },
        label: '3',
      },
      {
        link: {
          href: '#',
          label: 'Jsonapi',
        },
        label: '2',
      },
    ],
  },
};
