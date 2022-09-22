import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { BannerSimpleComponent } from '../../../app/uiux/combs/banner/banner-simple/banner-simple.component';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
export default {
  title: '组件/Banner/Banner simple',
  component: BannerSimpleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
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

const Template: Story<BannerSimpleComponent> = (args) => ({
  component: BannerSimpleComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    style: 'no-bg',
    title: 'Contact Us',
    breadcrumb: [
      {
        label: 'Home',
        href: '#',
      },
      {
        label: 'Contact Us',
        href: '/about',
      },
    ],
  },
};
export const BannerWithBg = Template.bind({});

BannerWithBg.args = {
  content: {
    style: 'normal',
    bannerBg: {
      classes: 'bg-fill-width overlay',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/banner-01.jpeg',
        alt: 'page title',
      },
    },
    title: 'Contact Us',
    breadcrumb: [
      {
        label: 'Home',
        href: '#',
      },
      {
        label: 'Contact Us',
        href: '/about',
      },
    ],
  },
};
