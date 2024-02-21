import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NodeModule } from '@uiux/combs/node/node.module';
import { StorysModule } from '@core/module/storys.module';
import { RelateComponent } from '@uiux/combs/node/relate/relate.component';
import { random } from 'lodash-es';
import { IRelate } from '@core/interface/node/IRelate';

export default {
  title: '示例页面/内容类型/相关性',
  id: 'relate',
  component: RelateComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot(), NodeModule],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `主要展示几个不同的数据类型互相关联的展示，预览按钮有Dialog和Drawer展示两种方式。`,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: IRelate = {
  type: 'relate',
  title: {
    label: '团队A中国移动中标发票',
    style: 'style-v4',
    classes: 'mat-display-1 m-bottom-0',
  },
  actions: [
    {
      type: 'btn',
      label: '编辑',
      color: 'primary',
      mode: 'raised',
      icon: {
        svg: 'pencil',
        inline: true,
      },
      href: '#',
      target: '_blank',
    },
  ],
  summary: {
    left: [
      {
        type: 'icon',
        color: 'primary',
        svg: 'credit-card-check',
      },
      {
        type: 'text',
        space: 'none',
        classes: 'mat-h1 m-bottom-0',
        body: `${random(3000, 100000)}¥`,
      },
      {
        type: 'dropdown-menu',
        btn: {
          label: '发票预览 Dialog',
          color: 'primary',
          mode: 'raised',
        },
        child: [
          {
            type: 'link',
            label: '发票A',
            dialog: {
              params: {
                width: '800px',
              },
              data: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '<img src="/assets/images/16-9/business-01.jpg" />',
                },
              ],
            },
          },
          {
            type: 'link',
            label: '发票B',
            dialog: {
              params: {
                width: '800px',
              },
              data: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '<img src="/assets/images/16-9/business-02.jpg" />',
                },
              ],
            },
          },
        ],
      },
    ],
    middle: {
      title: '发票信息',
      elements: [
        [
          {
            label: '类别',
            value: '广告物料',
          },
          {
            label: '开票日期',
            value: '2023/02/23',
          },
        ],
        [
          {
            label: '团队',
            value: 'A公司',
          },
          {
            label: '团队负责人',
            value: '张三',
          },
        ],
        [
          {
            label: '备注',
            value: '<p>该发票类别有误，但是已经告知，下次要及时</p>',
          },
        ],
      ],
    },
    right: {
      title: '更新记录',
      elements: [
        {
          type: 'dynamic-table',
          header: [
            {
              label: '用户',
              key: 'user',
            },
            {
              label: '时间',
              key: 'date',
            },
            {
              label: '操作',
              key: 'action',
            },
          ],
          elements: [
            {
              user: '张三',
              date: '2023/02/21',
              action: '提交',
            },
            {
              user: '李四',
              date: '2023/02/23',
              action: '更新',
            },
          ],
        },
      ],
    },
  },
  showcase: {
    img: {
      src: '/assets/images/logo/logo_default.png',
      alt: 'alt',
    },
    text: {
      spacer: 'none',
      title: {
        label: '中国移动A团队',
        style: 'style-v5',
        classes: 'm-bottom-0 m-top-0',
      },
    },
    meta: [
      [
        {
          label: '类型',
          value: '通信',
        },
        {
          label: '联系人',
          value: '张三，李四',
        },
      ],
      [
        {
          label: '备注',
          value:
            '中国移动通信集团有限公司（简称“中国移动”），成立于2000年，是一家根据中国国家电信体制改革的总体部署而组建的中央企业。作为全球最大的移动通信运营商之一，中国移动在移动语音、数据和增值业务等方面提供全面服务，并且拥有庞大的用户基础和广泛的网络覆盖。',
        },
      ],
    ],
    content: [
      {
        type: 'showcase-2v1',
        row: 5,
        spacer: 'xs',
        elements: [
          {
            type: 'card',
            title: '营业执照',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto1.jpg',
                alt: '营业执照',
              },
            },
            progressBar: {
              mode: 'determinate',
              value: 20,
            },
          },
          {
            type: 'card',
            title: '开户许可证',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto2.jpg',
                alt: '开户许可证',
              },
            },
            progressBar: {
              mode: 'determinate',
              value: 40,
            },
          },
          {
            type: 'card',
            title: '资信证明',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto3.jpg',
                alt: '资信证明',
              },
            },
            progressBar: {
              mode: 'determinate',
              value: 60,
            },
          },
          {
            type: 'card',
            title: '纳税人信用等级',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto4.jpg',
                alt: '纳税人信用等级',
              },
            },
            progressBar: {
              mode: 'determinate',
              value: 80,
            },
          },
          {
            type: 'card',
            title: '法人身份证',
            carousel: {
              params: {
                slidesPerView: 1,
                navigation: false,
                autoplay: {
                  delay: 5000,
                },
                breakpoints: null,
              },
              elements: [
                {
                  type: 'feature-box',
                  hoverIcon: true,
                  fullIcon: 'fullscreen',
                  openIcon: 'open_in_new',
                  link: '#',
                  ratios: 'media-4-3',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/cases/porto1.jpg',
                    alt: 'lazyload',
                  },
                },
                {
                  type: 'feature-box',
                  hoverIcon: false,
                  fullIcon: 'fullscreen',
                  openIcon: 'open_in_new',
                  link: '#',
                  ratios: 'media-4-3',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/cases/porto2.jpg',
                    alt: 'lazyload',
                  },
                },
              ],
            },
            progressBar: {
              mode: 'determinate',
              value: 100,
            },
          },
        ],
      },
    ],
  },
};

Default.args = {
  content,
};

export const RelateV2 = Template.bind({});
const v2: IRelate = {
  ...Default.args.content,
  title: {
    label: 'A公司广告制作年度合作合同2020年',
    style: 'style-v4',
    classes: 'mat-display-1 m-bottom-0',
  },
  summary: {
    left: [
      {
        type: 'icon',
        color: 'primary',
        svg: 'calendar-range',
      },
      {
        type: 'text',
        space: 'none',
        classes: 'mat-h1 m-bottom-0',
        body: '2020年',
      },
      {
        type: 'dropdown-menu',
        btn: {
          label: '合同预览 Drawer',
          color: 'primary',
          mode: 'raised',
        },
        child: [
          {
            type: 'btn',
            label: '合同20230312',
            href: '/assets/doc/frontend.xlsx',
            drawerIframe: true,
          },
          {
            type: 'btn',
            label: '合同快照',
            href: '/assets/images/16-9/business-01.jpg',
            drawerIframe: true,
          },
        ],
      },
    ],
    middle: {
      title: '合同基本信息',
      elements: [
        [
          {
            label: '类别',
            value: '广告物料',
          },
          {
            label: '签约日期',
            value: '2023/02/23',
          },
        ],
        [
          {
            label: '团队',
            value: 'A公司',
          },
          {
            label: '项目负责人',
            value: '张三',
          },
        ],
        [
          {
            label: '备注',
            value: '请留意付款期限',
          },
        ],
      ],
    },
    right: {
      title: '更新记录',
      elements: [
        {
          type: 'dynamic-table',
          header: [
            {
              label: '用户',
              key: 'user',
            },
            {
              label: '时间',
              key: 'date',
            },
            {
              label: '操作',
              key: 'action',
            },
          ],
          elements: [
            {
              user: '张三',
              date: '2023/02/21',
              action: '提交',
            },
            {
              user: '李四',
              date: '2023/02/23',
              action: '更新',
            },
          ],
        },
      ],
    },
  },
};
RelateV2.args = {
  content: v2,
};

export const RelateV3 = Template.bind({});
const v3: IRelate = {
  type: 'relate',
  actions: [
    {
      type: 'btn',
      label: '编辑',
      color: 'primary',
      mode: 'raised',
      icon: {
        svg: 'pencil',
        inline: true,
      },
      href: '#',
      target: '_blank',
    },
  ],
  summary: {
    left: [
      {
        type: 'icon',
        color: 'primary',
        svg: 'domain',
      },
      {
        type: 'text',
        space: 'none',
        classes: 'mat-h1 m-bottom-0',
        body: '南宁三四柒文化传播有限公司',
      },
    ],
    middle: {
      title: '门店信息',
      elements: [
        [
          {
            label: '门店简称',
            value: '南宁三四柒文化传播',
          },
          {
            label: '公司地址',
            value: '南宁市高新区创客城2栋',
          },
        ],
        [
          {
            label: '信用号',
            value: '91450100MA5KEA307N',
          },
          {
            label: '企业法人',
            value: '张三',
          },
        ],
        [
          {
            label: '企业邮箱',
            value: '3212794947@qq.com',
          },
          {
            label: '紧急联系方式',
            value: '0771-77880347',
          },
        ],
        [
          {
            label: '紧急联系人',
            value: '李四',
          },
          {
            label: '法人联系方式',
            value: '0771-77880347',
          },
        ],
      ],
    },
    right: {
      title: '更新记录',
      elements: [
        {
          type: 'dynamic-table',
          header: [
            {
              label: '用户',
              key: 'user',
            },
            {
              label: '时间',
              key: 'date',
            },
            {
              label: '操作',
              key: 'action',
            },
          ],
          elements: [
            {
              user: '张三',
              date: '2023/02/21',
              action: '提交',
            },
            {
              user: '李四',
              date: '2023/02/23',
              action: '更新',
            },
          ],
        },
      ],
    },
  },
  showcase: {
    img: {
      src: '/assets/images/logo/logo_default.png',
      alt: 'alt',
    },
    text: {
      spacer: 'none',
      title: {
        label: '南宁三四柒文化传播有限公司',
        style: 'style-v5',
        classes: 'm-bottom-0 m-top-0',
      },
    },
    meta: [
      [
        {
          label: '门店经营地址',
          value: '广西壮族自治区南宁市西乡塘区高新区科园大道70号',
        },
        {
          label: '纬度',
          value: '22.866611',
        },
        {
          label: '经度',
          value: '108.272937',
        },
      ],
    ],
    content: [
      {
        type: 'showcase-2v1',
        row: 4,
        spacer: 'xs',
        elements: [
          {
            type: 'card',
            title: '营业执照',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto1.jpg',
                alt: '营业执照',
              },
            },
            progressBar: {
              mode: 'determinate',
              value: 20,
            },
          },
          {
            type: 'card',
            title: '门店门头照',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto2.jpg',
                alt: '开户许可证',
              },
            },
            progressBar: {
              mode: 'determinate',
              value: 40,
            },
          },
        ],
      },
    ],
  },
};
RelateV3.args = {
  content: v3,
};
