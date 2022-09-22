import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '../../app/core/token/core.config';
import { ShareModule } from '../../app/share/share.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MenuListComponent } from '../../app/uiux/widgets/menu-list/menu-list.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';

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

const Template: Story<MenuListComponent> = (args) => ({
  component: MenuListComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
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
