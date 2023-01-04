import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/storys.module';
import { ViewMapComponent } from '@uiux/combs/map/view-map/view-map.component';

export default {
  title: '复合组件/地图/视图地图',
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
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.args = {
  content: {
    type: 'view-map',
    params: {
      apiBak: '/api/v2/view-map',
      city: '南宁市',
      drawer: true,
    },
    form: [
      {
        type: 'input',
        key: 'title',
        templateOptions: {
          label: '搜索职位',
        },
      },
      {
        type: 'mat-select',
        key: 'skill',
        apiBak: '/api/v2/filter/taxonomy/skill',
        templateOptions: {
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
        title: ' 广西桂呈永军科技有限公司',
        meta_2: '2021-04-25',
        badge_2: '<div class="item-list"><ul><li>新零售</li></ul></div>',
        meta_1: '\n\n\n\n\n6-8\n\n\n k',
        badge_1:
          '<div class="item-list"><ul><li>五险一金</li><li>绩效奖金</li><li>包中餐</li><li>产假</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/Cgq2xl6MRb-AOhnJAABwvOeFuTI609.jpg',
        address: '中国广西壮族自治区南宁市青秀区民族大道159号万丰新新大厦',
        nid: '247',
        url: '/node/247',
        position: [108.407058, 22.815584],
      },
      {
        subTitle: '新媒体运营',
        title: '广西猫头鹰科技有限公司',
        meta_2: '2021-04-25',
        badge_2: '<div class="item-list"><ul><li>运营</li></ul></div>',
        meta_1: '\n\n\n\n\n3-6\n\n\n k',
        badge_1: '<div class="item-list"><ul><li>职位晋升</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/QQ20210125-182042%402x.png',
        address: '中国广西壮族自治区南宁市良庆区平乐大道21号大唐·总部1号1号楼',
        nid: '245',
        url: '/node/245',
        position: [108.384383, 22.750785],
      },
      {
        subTitle: '产品经理',
        title: '广西猫头鹰科技有限公司',
        meta_2: '2021-04-25',
        badge_2: '<div class="item-list"><ul><li>产品分析</li></ul></div>',
        meta_1: '\n\n\n\n\n4-6\n\n\n k',
        badge_1: '<div class="item-list"><ul><li>职位晋升</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/QQ20210125-182042%402x.png',
        address: '中国广西壮族自治区南宁市良庆区平乐大道21号大唐·总部1号1号楼',
        nid: '244',
        url: '/node/244',
        position: [108.384383, 22.750785],
      },
      {
        subTitle: 'cto首席技术官 ',
        title: '广西叫酒网络科技有限公司',
        meta_2: '2021-04-25',
        badge_2: '<div class="item-list"><ul><li>技术机构</li></ul></div>',
        meta_1: '\n\n\n\n\n15-20\n\n\n k',
        badge_1:
          '<div class="item-list"><ul><li>绩效奖金</li><li>午餐补助</li><li>美女多</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/CgpOIFrO0p6AQgLVAAAuwmMdjUE904.png',
        address:
          '中国广西壮族自治区南宁市青秀区金洲路琅西56栋-12号(汇发集团)3楼',
        nid: '242',
        url: '/node/242',
        position: [108.364581, 22.808037],
      },
      {
        subTitle: '前端开发工程师 ',
        title: '广西叫酒网络科技有限公司',
        meta_2: '2021-04-30',
        badge_2: '<div class="item-list"><ul><li>VUE</li></ul></div>',
        meta_1: '\n\n\n\n\n7-10\n\n\n k',
        badge_1:
          '<div class="item-list"><ul><li>绩效奖金</li><li>午餐补助</li><li>美女多</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/CgpOIFrO0p6AQgLVAAAuwmMdjUE904.png',
        address:
          '中国广西壮族自治区南宁市青秀区金洲路琅西56栋-12号(汇发集团)3楼',
        nid: '241',
        url: '/node/241',
        position: [108.364581, 22.808037],
      },
      {
        subTitle: '招软件测试工程师，入职即购买五险一金',
        title: '中软国际',
        meta_2: '2021-04-24',
        badge_2: '<div class="item-list"><ul><li>Linux</li></ul></div>',
        meta_1: '\n\n\n\n\n7-9\n\n\n k',
        badge_1: '<div class="item-list"><ul><li>五险一金</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/t0139ad267d7aefb529.png',
        address: '中国广西壮族自治区南宁市良庆区平乐大道18号东盟信息港',
        nid: '239',
        url: '/node/239',
        position: [108.381459, 22.746694],
      },
      {
        subTitle: 'Java架构师',
        title: '佳凯智能技术',
        meta_2: '2021-04-23',
        badge_2:
          '<div class="item-list"><ul><li>Spring</li><li>Oracle</li></ul></div>',
        meta_1: '\n\n\n\n\n12-18\n\n\n k',
        badge_1: '<div class="item-list"><ul><li>周末双休</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/CgotOVvrlYKAXaTLAACs2FwPh24394.png',
        address: '中国广西壮族自治区南宁市西乡塘区东盟慧谷13栋15楼1501',
        nid: '237',
        url: '/node/237',
        position: [108.27462, 22.865409],
      },
      {
        subTitle: '中级Java开发',
        title: '佳凯智能技术',
        meta_2: '2021-04-23',
        badge_2: '<div class="item-list"><ul><li>Java</li></ul></div>',
        meta_1: '\n\n\n\n\n7-11\n\n\n k',
        badge_1: '<div class="item-list"><ul><li>周末双休</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/CgotOVvrlYKAXaTLAACs2FwPh24394.png',
        address: '中国广西壮族自治区南宁市西乡塘区东盟慧谷13栋15楼1501',
        nid: '236',
        url: '/node/236',
        position: [108.27462, 22.865409],
      },
      {
        subTitle: '高级Java开发',
        title: '佳凯智能技术',
        meta_2: '2021-04-23',
        badge_2: '<div class="item-list"><ul><li>Java</li></ul></div>',
        meta_1: '\n\n\n\n\n10-16\n\n\n k',
        badge_1: '<div class="item-list"><ul><li>周末双休</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/CgotOVvrlYKAXaTLAACs2FwPh24394.png',
        address: '中国广西壮族自治区南宁市西乡塘区东盟慧谷13栋15楼1501',
        nid: '235',
        url: '/node/235',
        position: [108.27462, 22.865409],
      },
      {
        subTitle: '急招WEB前端开发工程师',
        title: '掌悦网络科技',
        meta_2: '2021-04-23',
        badge_2: '<div class="item-list"><ul><li>VUE</li></ul></div>',
        meta_1: '\n\n\n\n\n8-12\n\n\n k',
        badge_1:
          '<div class="item-list"><ul><li>五险一金</li><li>节日福利</li><li>年终奖金</li><li>带薪年假</li></ul></div>',
        img: '/sites/admin.nnitpai.com/files/2021-01/CgqKkVePQ7SAK8dOAABQUAlvNu8191.png',
        address: '中国广西壮族自治区南宁市青秀区九洲国际38楼3802b',
        nid: '233',
        url: '/node/233',
        position: [108.395291, 22.810706],
      },
    ],
  },
};
