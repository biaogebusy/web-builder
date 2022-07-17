import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG } from '@core/token/core.config';
import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MapComponent } from '@uiux/widgets/map/map.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { HttpClient } from '@angular/common/http';
import { AppState } from '@core/mobx/AppState';
import { AMapState } from '@core/mobx/amap/AMapState';
import { AmapService } from '@core/service/amap.service';

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
        HttpClient,
      ],
      providers: [
        AppState,
        AMapState,
        AmapService,
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
