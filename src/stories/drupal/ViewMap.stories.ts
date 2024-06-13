import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { ViewMapComponent } from '@uiux/combs/map/view-map/view-map.component';

const meta: Meta<ViewMapComponent> = {
  title: '特色组件/地图应用',
  id: 'viewMap',
  component: ViewMapComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `通过Drupal view的配置把字段映射到地图上。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ViewMapComponent>;
export const Default: Story = {};
Default.args = {
  content: {
    type: 'view-map',
    params: {
      api: '/api/v2/view-map',
      city: '南宁市',
      drawer: true,
    },
    form: [
      {
        type: 'input',
        key: 'title',
        className: 'm-right-xs width-30',
        props: {
          label: '搜索职位',
        },
      },
      {
        type: 'mat-select',
        key: 'skill',
        className: 'm-right-xs width-30',
        api: '/api/v2/filter/taxonomy/skill',
        props: {
          multiple: true,
          search: true,
          hideSelected: true,
          label: '技能',
          options: [
            {
              value: 1,
              label: 'Angular',
            },
            {
              value: 2,
              label: 'React',
            },
            {
              value: 3,
              label: 'Vue',
            },
          ],
        },
      },
    ],
    elements: [
      {
        subTitle: '产品经理',
        title: '亚马逊 Amazon',
        meta_2: '2021-04-25',
        badge_2: '<div class="item-list"><ul><li>新零售</li></ul></div>',
        meta_1: '<span class="text-primary bold">6-8 k</span>',
        badge_1:
          '<div class="item-list"><ul><li>五险一金</li><li>绩效奖金</li><li>包中餐</li><li>产假</li></ul></div>',
        img: '/assets/images/logo/amazon.svg',
        address: '中国广西壮族自治区南宁市青秀区民族大道159号万丰新新大厦',
        nid: '247',
        url: '/node/247',
        position: [108.407058, 22.815584],
      },
      {
        subTitle: '产品经理',
        title: '亚马逊 Amazon',
        meta_2: '2021-04-25',
        badge_2: '<div class="item-list"><ul><li>新零售</li></ul></div>',
        meta_1: '<span class="text-primary bold">6-8 k</span>',
        badge_1:
          '<div class="item-list"><ul><li>五险一金</li><li>绩效奖金</li><li>包中餐</li><li>产假</li></ul></div>',
        img: '/assets/images/logo/amazon.svg',
        address: '中国广西壮族自治区南宁市青秀区民族大道159号万丰新新大厦',
        nid: '247',
        url: '/node/247',
        latitude: '22.83393',
        longitude: '108.31343',
      },
      {
        subTitle: '新媒体运营',
        title: 'Codepen',
        meta_2: '2021-04-25',
        badge_2: '<div class="item-list"><ul><li>运营</li></ul></div>',
        meta_1: '<span class="text-primary bold">3-6 k</span>',
        badge_1: '<div class="item-list"><ul><li>职位晋升</li></ul></div>',
        img: '/assets/images/logo/codepen.svg',
        address: '中国广西壮族自治区南宁市良庆区平乐大道21号大唐·总部1号1号楼',
        nid: '245',
        url: '/node/245',
        position: [108.384383, 22.750785],
      },
      {
        subTitle: '产品经理',
        title: '中国谷歌 Google',
        meta_2: '2021-04-25',
        badge_2: '<div class="item-list"><ul><li>产品分析</li></ul></div>',
        meta_1: '<span class="text-primary bold">4-6 k</span>',
        badge_1: '<div class="item-list"><ul><li>职位晋升</li></ul></div>',
        img: '/assets/images/logo/google.svg',
        address: '中国广西壮族自治区南宁市良庆区平乐大道21号大唐·总部1号1号楼',
        nid: '244',
        url: '/node/244',
        position: [108.384383, 22.750785],
      },
      {
        subTitle: 'cto首席技术官 ',
        title: '联想集团',
        meta_2: '2021-04-25',
        badge_2: '<div class="item-list"><ul><li>技术机构</li></ul></div>',
        meta_1: '<span class="text-primary bold">15-20 k</span>',
        badge_1:
          '<div class="item-list"><ul><li>绩效奖金</li><li>午餐补助</li><li>美女多</li></ul></div>',
        img: '/assets/images/logo/lenovo.svg',
        address:
          '中国广西壮族自治区南宁市青秀区金洲路琅西56栋-12号(汇发集团)3楼',
        nid: '242',
        url: '/node/242',
        position: [108.364581, 22.808037],
      },
      {
        subTitle: '前端开发工程师 ',
        title: 'Paypal 海外',
        meta_2: '2021-04-30',
        badge_2: '<div class="item-list"><ul><li>VUE</li></ul></div>',
        meta_1: '<span class="text-primary bold">7-10 k</span>',
        badge_1:
          '<div class="item-list"><ul><li>绩效奖金</li><li>午餐补助</li><li>美女多</li></ul></div>',
        img: '/assets/images/logo/paypal.svg',
        address:
          '中国广西壮族自治区南宁市青秀区金洲路琅西56栋-12号(汇发集团)3楼',
        nid: '241',
        url: '/node/241',
        position: [108.364581, 22.808037],
      },
      {
        subTitle: '招软件测试工程师，入职即购买五险一金',
        title: 'Shopify 购物',
        meta_2: '2021-04-24',
        badge_2: '<div class="item-list"><ul><li>Linux</li></ul></div>',
        meta_1: '<span class="text-primary bold">7-9 k</span>',
        badge_1: '<div class="item-list"><ul><li>五险一金</li></ul></div>',
        img: '/assets/images/logo/shopify.svg',
        address: '中国广西壮族自治区南宁市良庆区平乐大道18号东盟信息港',
        nid: '239',
        url: '/node/239',
        position: [108.381459, 22.746694],
      },
      {
        subTitle: 'Java架构师',
        title: 'Spotify',
        meta_2: '2021-04-23',
        badge_2:
          '<div class="item-list"><ul><li>Spring</li><li>Oracle</li></ul></div>',
        meta_1: '<span class="text-primary bold">12-18 k</span>',
        badge_1: '<div class="item-list"><ul><li>周末双休</li></ul></div>',
        img: '/assets/images/logo/spotify.svg',
        address: '中国广西壮族自治区南宁市西乡塘区东盟慧谷13栋15楼1501',
        nid: '237',
        url: '/node/237',
        position: [108.27462, 22.865409],
      },
    ],
  },
};
export const Circle: Story = {};
Circle.storyName = '地图范围圈';
Circle.args = {
  content: {
    ...Default?.args?.content,
    form: [
      {
        type: 'input',
        key: 'title',
        className: 'm-right-xs width-30',
        props: {
          label: '搜索职位',
        },
      },
      {
        type: 'mat-select',
        key: 'skill',
        className: 'm-right-xs width-30',
        api: '/api/v2/filter/taxonomy/skill',
        props: {
          multiple: true,
          search: true,
          hideSelected: true,
          label: '技能',
          options: [
            {
              value: 1,
              label: 'Angular',
            },
            {
              value: 2,
              label: 'React',
            },
            {
              value: 3,
              label: 'Vue',
            },
          ],
        },
      },
      {
        key: 'enableCircle',
        type: 'toggle',
        className: 'w-full',
        props: {
          label: '开启范围圈',
          description: '开启后点击地图获取经纬度',
        },
      },
      {
        key: 'circle',
        className: 'w-full',
        fieldGroupClassName: 'flex flex-wrap w-full',
        fieldGroup: [
          {
            type: 'input',
            key: 'lnglat',
            className: 'm-bottom-sm width-20 m-right-xs',
            props: {
              label: '经纬度',
              appearance: 'outline',
              type: 'text',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'radius',
            defaultValue: 3,
            className: 'm-bottom-sm width-20 m-right-xs',
            props: {
              label: '圆半径/公里',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 1,
              max: 100,
            },
            validation: {
              messages: {
                min: '不能设置小于 1',
                max: '不能设置大于 100',
              },
            },
          },
          {
            type: 'input',
            key: 'bg',
            className: 'm-bottom-sm width-20 m-right-xs',
            defaultValue: '#00a281',
            props: {
              label: '圆背景色',
              appearance: 'outline',
              type: 'color',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'opacity',
            defaultValue: 0.1,
            className: 'm-bottom-sm width-20',
            props: {
              label: '不透明度',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 0.1,
              max: 1,
            },
            validation: {
              messages: {
                min: '不能设置小于 0.1',
                max: '不能设置大于 100',
              },
            },
          },
        ],
      },
    ],
  },
};
