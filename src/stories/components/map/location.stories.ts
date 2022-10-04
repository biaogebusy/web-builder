import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { LocationComponent } from '@uiux/combs/map/location/location.component';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { AmapService } from '@core/service/amap.service';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { coreConfigFactory, apiUrlFactory } from '@core/factory/factory';
import { ContentService } from '@core/service/content.service';
export default {
  title: '组件/地图/位置',
  component: LocationComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        SwiperModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        AmapService,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: APP_INITIALIZER,
          useFactory: coreConfigFactory,
          deps: [ContentService, [new Inject(CORE_CONFIG)]],
          multi: true,
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `位置信息常用于展示指定位置的地理位置，方便用户查看。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    title: {
      label: 'My Location',
      style: 'banner-title',
      classes: 'm-bottom-0',
    },
    style: {
      height: '500px',
    },
    city: '南宁市',
    params: {
      zoomEnable: false,
      draggable: false,
    },
    elements: [
      {
        company: {
          setCenter: true,
          address: '高新区8号创客城',
        },
      },
    ],
  },
};
