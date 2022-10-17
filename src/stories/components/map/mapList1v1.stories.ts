import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { initConfig } from 'src/app/app.module';
import { AmapService } from '@core/service/amap.service';
import { ShareModule } from '@share/share.module';
import { MapListV1Component } from '@uiux/combs/map/map-list-v1/map-list-v1.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import * as Card1v3Stories from 'src/stories/widgets/card/Card1v3.stories';
import * as MediaObjectStories from 'src/stories/widgets/media/MediaObject.stories';

export default {
  title: '组件/地图/位置列表 1v1',
  component: MapListV1Component,
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
          useFactory: initConfig,
          deps: [AppState, [new Inject(CORE_CONFIG)]],
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
        component: `通过点击左侧的位置列表可定位到具体的地理位置。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});
const card1v3: any = Card1v3Stories.Base.args;
Base.args = {
  content: {
    title: {
      label: '良庆区人民法院',
      style: 'style-v4',
    },
    meta: [
      {
        label: '地址',
        value: '良庆区玉洞街道玉洞大道8-1号',
      },
      {
        label: '电话',
        value: '0771-4509585',
      },
    ],
    map: {
      citi: '南宁市',
      elements: card1v3.content.elements,
    },
  },
};

export const Sidebar = Template.bind({});
const mediaObject: any = MediaObjectStories.Base.args;
Sidebar.args = {
  content: {
    ...Base.args.content,
    sidebarRight: [
      {
        type: 'title',
        label: '关联案件',
        style: 'style-v4',
      },
      {
        type: 'media-object-group',
        elements: [mediaObject.content],
      },
    ],
  },
};
