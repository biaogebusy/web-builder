import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG } from '../../app/core/token/core.config';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MapComponent } from '../../app/uiux/widgets/map/map.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { AppState } from '../../app/core/mobx/AppState';
import { AMapState } from '../../app/core/mobx/amap/AMapState';
import { AmapService } from '../../app/core/service/amap.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { initConfig } from 'src/app/app.module';

export default {
  title: 'Widgets/Map',
  component: MapComponent,
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
        AppState,
        AMapState,
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
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1;height:500px;">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<MapComponent> = (args) => ({
  component: MapComponent,
  props: {
    ...args,
  },
});
export const MapList = Template.bind({});

MapList.args = {
  content: {
    citi: '南宁市',
    elements: [
      {
        title: '第一法庭',
        address: '良庆区玉洞街道玉洞大道8-1号',
        params: {
          address: '良庆区玉洞街道玉洞大道8-1号',
          title: '第一法庭',
        },
        meta: [
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '经办人员',
            value: '李四',
          },
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '联系电话',
            value: '18878793xx',
          },
        ],
      },
      {
        title: '第二法庭',
        address: '良庆区玉洞街道玉洞大道86号',
        params: {
          address: '良庆区玉洞街道玉洞大道86号',
          title: '第二法庭',
        },
        meta: [
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '经办人员',
            value: '张三',
          },
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '联系电话',
            value: '0771-78734454',
          },
        ],
      },
      {
        title: '第三法庭',
        address: '良庆区玉洞街道玉洞大道80号',
        params: {
          address: '良庆区玉洞街道玉洞大道80号',
          title: '第三法庭',
        },
        meta: [
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '经办人员',
            value: '王五',
          },
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '联系电话',
            value: '0771-6543976',
          },
        ],
      },
    ],
  },
};
