import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AmapService } from '../../../app/core/service/amap.service';
import { MapListV1Component } from '../../../app/uiux/combs/map/map-list-v1/map-list-v1.component';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { initConfig } from 'src/app/app.module';

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
export const Default = Template.bind({});

Default.args = {
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
  },
};

export const Sidebar = Template.bind({});

Sidebar.args = {
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
    sidebarRight: [
      {
        type: 'title',
        label: '关联案件',
        style: 'style-v4',
      },
      {
        type: 'media-object-group',
        elements: [
          {
            icon: {
              name: 'gavel',
            },
            meta: '2022/08/01',
            link: {
              label: '南宁三字柒',
              href: '#',
            },
            subTitle: '法官 / 张三',
            content:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
          },
          {
            icon: {
              name: 'gavel',
            },
            meta: '2021/08/16',
            link: {
              label: '南宁三字柒',
              href: '#',
            },
            subTitle: '法官 / 李四',
            content:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
          },
          {
            icon: {
              name: 'gavel',
            },
            meta: '2021/08/16',
            link: {
              label: '南宁三字柒',
              href: '#',
            },
            subTitle: '法官 / 李四',
            content:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
          },
          {
            icon: {
              name: 'gavel',
            },
            meta: '2021/08/16',
            link: {
              label: '南宁三字柒',
              href: '#',
            },
            subTitle: '法官 / 李四',
            content:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
          },
          {
            icon: {
              name: 'gavel',
            },
            meta: '2021/08/16',
            link: {
              label: '南宁三字柒',
              href: '#',
            },
            subTitle: '法官 / 李四',
            content:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
          },
        ],
      },
    ],
  },
};
