import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { ArticleComponent } from '@uiux/combs/node/article/article.component';
import { NodeModule } from '@uiux/combs/node/node.module';
import { CaseComponent } from '@uiux/combs/node/case/case.component';
import { LawCaseComponent } from '@uiux/combs/node/law/law-case/law-case.component';
export default {
  title: 'Components/node/case',
  component: LawCaseComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        NodeModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
} as Meta;

const Template: Story<LawCaseComponent> = (args) => ({
  component: LawCaseComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    title:
      '“细胞治疗产品隔离系统制备工艺无菌保障相关评价标准研究” 课题合作协议0414-修2-0415-2(1)(1)',
    date: [
      {
        label: '更新',
        value: '张三 周五 09:50 2022/03/31',
      },
      {
        label: '提交',
        value: '李四 周六 08:10 2022/03/27',
      },
    ],
    actions: [
      {
        type: 'btn',
        label: '编辑',
        icon: {
          name: 'editor',
          inline: true,
        },
        href: 'https://admin.zhaobg.com/manage/content/50/edit',
        target: '_blank',
      },
      {
        type: 'flag',
        label: '收藏',
        icon: {
          name: 'star',
          inline: true,
        },
        params: {
          type: 'flagging--favorite',
          entity_type: 'node',
          entity_id: '1312',
          relationships: {
            flagged_entity: {
              type: 'node--case',
              id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
            },
          },
        },
      },
    ],
    form: [
      {
        type: 'select',
        key: 'transaction_level',
        value: 'general',
      },
      {
        type: 'select',
        key: 'case_procedure',
        value: 'aff056e8-4638-4901-b866-8cc6ea7a05c9',
      },
    ],
    block: [
      {
        type: 'showcase',
        elements: [
          {
            header: [
              {
                label: '客户标签',
                key: 'customer',
              },
              {
                label: '内容',
                key: 'contentOfCustomer',
              },
              {
                label: '法院标签',
                key: 'court',
              },
              {
                label: '内容',
                key: 'contentOfCourt',
              },
            ],
            elements: [
              {
                customer: '客户名称',
                contentOfCustomer: {
                  type: 'link',
                  label: '三字柒有限公司',
                  href: '/node/3',
                },
                court: '法院名称',
                contentOfCourt: {
                  type: 'link',
                  label: '苏州人民法院',
                  href: '/node/3',
                },
              },
              {
                customer: '经办人员',
                contentOfCustomer: {
                  type: 'link',
                  label: '张三',
                  href: '/node/4',
                },
                court: '法官名称',
                contentOfCourt: {
                  type: 'link',
                  label: '张三',
                  href: '/node/4',
                },
              },
              {
                customer: '业务对方',
                contentOfCustomer: [
                  {
                    type: 'link',
                    label: '南宁一建',
                    href: '/node/6',
                  },
                  {
                    type: 'link',
                    label: '南宁一建',
                    href: '/node/6',
                  },
                ],
                court: '法官电话',
                contentOfCourt: '0512-6587459',
              },
              {
                customer: '案件类型',
                contentOfCustomer: '诉讼',
                court: '案件阶段',
                contentOfCourt: {
                  type: 'select',
                  key: 'case_procedure',
                  options: [
                    {
                      label: '一审上诉完成',
                      value: '10',
                    },
                    {
                      label: '二审上诉完成',
                      value: '11',
                    },
                  ],
                },
              },
              {
                customer: '经办律师',
                contentOfCustomer: '杜长明',
                court: '案件编号',
                contentOfCourt: '（2022）苏05民终3823',
              },
              {
                customer: '优先等级',
                contentOfCustomer: {
                  type: 'select',
                  key: 'transaction_level',
                  options: [
                    {
                      label: '普通事务',
                      value: 'general',
                    },
                    {
                      label: '重大事务',
                      value: 'important',
                    },
                    {
                      label: '紧急事务',
                      value: 'exigence',
                    },
                  ],
                },
                court: '开庭日期',
                contentOfCourt: '周五 22:59 03/04/2022',
              },
            ],
          },
        ],
      },
      {
        type: 'files',
        title: {
          label: '案件文件',
          style: 'style-v4',
        },
        icon: {
          name: 'case',
        },
        elements: [
          {
            label: '律师文件',
            elements: [
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
            ],
          },
          {
            label: '法院文件',
            elements: [
              {
                type: 'link',
                label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                href: 'xxx.pdf',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
            ],
          },
          {
            label: '客户文件',
            elements: [
              {
                type: 'link',
                label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                href: 'xxx.pdf',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
            ],
          },
          {
            label: '其他文件',
            elements: [
              {
                type: 'link',
                label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                href: 'xxx.pdf',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
              {
                type: 'link',
                label: '第二次起诉签字-易思远-刘冰清.docx',
                href: 'xxx.docx',
              },
            ],
          },
        ],
      },
      {
        type: 'table',
        title: {
          label: '发票管理',
          style: 'style-v4',
        },
        header: [
          {
            label: '发票名称',
            key: 'name',
          },
          {
            label: '开票金额',
            key: 'money',
          },
          {
            label: '交票时间',
            key: 'billingTime',
          },
          {
            label: '发票时间',
            key: 'deliveryTime',
          },
          {
            label: '发票图片',
            key: 'images',
          },
          {
            label: '付款凭证',
            key: 'voucher',
          },
          {
            label: '发票快递',
            key: 'express',
          },
          {
            label: '备注',
            key: 'remarks',
          },
        ],
        elements: [
          {
            name: '受理费',
            money: '3679',
            billingTime: '2022-03-03',
            deliveryTime: '2022-03-04',
            images: {
              type: 'inline-lightbox',
              label: ['受理费第一次', '受理费-补交', '受理费第二次'],
              elements: [
                {
                  src: '/assets/images/cases/porto1.jpg',
                  caption: '受理费第一次',
                  thumb: '/assets/images/cases/porto1.jpg',
                },
                {
                  src: '/assets/images/cases/porto2.jpg',
                  caption: '受理费-补交',
                  thumb: '/assets/images/cases/porto2.jpg',
                },
                {
                  src: '/assets/images/cases/porto3.jpg',
                  caption: '受理费第二次',
                  thumb: '/assets/images/cases/porto3.jpg',
                },
              ],
            },
            voucher: {
              label: ['发票凭证'],
              type: 'inline-lightbox',
              elements: [
                {
                  src: '/assets/images/cases/porto4.jpg',
                  caption: '发票凭证',
                  thumb: '/assets/images/cases/porto4.jpg',
                },
              ],
            },
            express: {
              type: 'inline-lightbox',
              label: ['户籍信息'],
              elements: [
                {
                  src: '/assets/images/cases/porto5.jpg',
                  caption: '户籍信息',
                  thumb: '/assets/images/cases/porto5.jpg',
                },
              ],
            },
            remarks: '已收到',
          },
          {
            name: '鉴定费',
            money: '4879',
            billingTime: '2022-03-03',
            deliveryTime: '2022-03-04',
            images: {
              type: 'inline-lightbox',
              label: ['受理费第一次', '受理费-补交', '受理费第二次'],
              elements: [
                {
                  src: '/assets/images/cases/porto1.jpg',
                  caption: '受理费第一次',
                  thumb: '/assets/images/cases/porto1.jpg',
                },
                {
                  src: '/assets/images/cases/porto2.jpg',
                  caption: '受理费-补交',
                  thumb: '/assets/images/cases/porto2.jpg',
                },
                {
                  src: '/assets/images/cases/porto3.jpg',
                  caption: '受理费第二次',
                  thumb: '/assets/images/cases/porto3.jpg',
                },
              ],
            },
            voucher: {
              label: ['发票凭证'],
              type: 'inline-lightbox',
              elements: [
                {
                  src: '/assets/images/cases/porto4.jpg',
                  caption: '发票凭证',
                  thumb: '/assets/images/cases/porto4.jpg',
                },
              ],
            },
            express: {
              type: 'inline-lightbox',
              label: ['户籍信息'],
              elements: [
                {
                  src: '/assets/images/cases/porto5.jpg',
                  caption: '户籍信息',
                  thumb: '/assets/images/cases/porto5.jpg',
                },
              ],
            },
            remarks: '已收到',
          },
          {
            name: '保全费',
            money: '123423',
            billingTime: '2022-03-03',
            deliveryTime: '2022-03-04',
            images: {
              type: 'inline-lightbox',
              label: ['受理费第一次', '受理费-补交', '受理费第二次'],
              elements: [
                {
                  src: '/assets/images/cases/porto1.jpg',
                  caption: '受理费第一次',
                  thumb: '/assets/images/cases/porto1.jpg',
                },
                {
                  src: '/assets/images/cases/porto2.jpg',
                  caption: '受理费-补交',
                  thumb: '/assets/images/cases/porto2.jpg',
                },
                {
                  src: '/assets/images/cases/porto3.jpg',
                  caption: '受理费第二次',
                  thumb: '/assets/images/cases/porto3.jpg',
                },
              ],
            },
            voucher: {
              label: ['发票凭证'],
              type: 'inline-lightbox',
              elements: [
                {
                  src: '/assets/images/cases/porto4.jpg',
                  caption: '发票凭证',
                  thumb: '/assets/images/cases/porto4.jpg',
                },
              ],
            },
            express: {
              type: 'inline-lightbox',
              label: ['户籍信息'],
              elements: [
                {
                  src: '/assets/images/cases/porto5.jpg',
                  caption: '户籍信息',
                  thumb: '/assets/images/cases/porto5.jpg',
                },
              ],
            },
            remarks: '未收到',
          },
        ],
      },
      {
        type: 'table',
        title: {
          label: '诉讼金额',
          style: 'style-v4',
        },
        header: [
          {
            label: '诉讼标的',
            key: 'name',
          },
          {
            label: '本金',
            key: 'principal',
          },
          {
            label: '利息期间',
            key: 'InterestPeriod',
          },
          {
            label: '利息',
            key: 'interest',
          },
          {
            label: '违约期间',
            key: 'defaultPeriod',
          },
          {
            label: '违约金',
            key: 'damages',
          },
          {
            label: '其他本金',
            key: 'OtherPrincipal',
          },
          {
            label: '分项合计',
            key: 'total',
          },
        ],
        elements: [
          {
            name: '租金',
            principal: '12323.00元',
            InterestPeriod: '2022/03/05-2022/05/01',
            interest: '5000.00元',
            defaultPeriod: '2022/03/05-2022/05/01',
            damages: '5089.00元',
            OtherPrincipal:
              '律师费 2000.00元<br>担保费 5000.00元</br>赔偿金 55.00元',
            total: '4846.00元',
          },
          {
            name: '工程款',
            principal: '12323.00元',
            InterestPeriod: '2022/03/05-2022/05/01',
            interest: '5000.00元',
            defaultPeriod: '',
            damages: '',
            OtherPrincipal: '',
            total: '4845.00元',
          },
          {
            name: '劳务费',
            principal: '12323.00元',
            InterestPeriod: '2022/03/05-2022/05/01',
            interest: '5000.00元',
            defaultPeriod: '',
            damages: '',
            OtherPrincipal: '',
            total: '4845.00元',
          },
          {
            name: '合计',
            principal: '68751.00元',
            InterestPeriod: '',
            interest: '9000.00元',
            defaultPeriod: '',
            damages: '8455.00元',
            OtherPrincipal: '7894.00元',
            total: '48456.00元',
          },
        ],
      },
      {
        type: 'table',
        title: {
          label: '案件执行',
          style: 'style-v4',
        },
        header: [
          {
            label: '还款次数',
            key: 'no',
          },
          {
            label: '执行款',
            key: 'paymentOne',
          },
          {
            label: '执行款二',
            key: 'paymentTwo',
          },
          {
            label: '执行款二',
            key: 'paymentThree',
          },
          {
            label: '利息',
            key: 'interest',
          },
          {
            label: '违约金',
            key: 'damages',
          },
          {
            label: '逾期罚息',
            key: 'PenaltyInterest',
          },
          {
            label: '总合计',
            key: 'total',
          },
          {
            label: '还款日期',
            key: 'date',
          },
        ],
        elements: [
          {
            no: '1',
            paymentOne: '12000.00元',
            paymentTwo: '13000.00元',
            paymentThree: '13520.00元',
            interest:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            damages:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            PenaltyInterest:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            total: '17658.00元',
            date: '2022/03/06',
          },
          {
            no: '2',
            paymentOne: '12000.00元',
            paymentTwo: '13000.00元',
            paymentThree: '13520.00元',
            interest:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            damages:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            PenaltyInterest:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            total: '17658.00元',
            date: '2022/03/06',
          },
          {
            no: '3',
            paymentOne: '12000.00元',
            paymentTwo: '13000.00元',
            paymentThree: '13520.00元',
            interest:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            damages:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            PenaltyInterest:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            total: '17658.00元',
            date: '2022/03/06',
          },
          {
            no: '合计',
            paymentOne: '32000.00元',
            paymentTwo: '33000.00元',
            paymentThree: '33520.00元',
            interest:
              '8000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            damages:
              '8000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            PenaltyInterest:
              '8000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            total: '57658.00元',
            date: '',
          },
        ],
      },
      {
        type: 'text',
        title: {
          label: '案件说明',
          style: 'style-v4',
        },
        spacer: 'none',
        body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
    ],
    params: {
      comment: {
        type: 'comment--comment',
        attributes: {
          entity_type: 'node',
          field_name: 'comment',
        },
        relationships: {
          comment_type: {
            data: {
              type: 'comment_type--comment_type',
              id: 'a395ac8e-3c9a-43d5-8ec8-cea74116d5f3',
            },
          },
          entity_id: {
            data: {
              type: 'node--article',
              id: 'b59a2767-89b8-418d-91fe-6f0e6a5638ec',
            },
          },
        },
      },
    },
    editor: {
      title: {
        label: '添加工作跟踪',
        style: 'style-v4',
      },
      actions: [
        {
          label: '提交',
          type: 'submit',
          color: 'primary',
        },
      ],
      succes: {
        label: '成功发布！',
      },
      empty: {
        label: '暂时还没有工作日志。',
      },
    },
    comment: {
      actions: ['update', 'delete'],
      title: true,
    },
  },
};

export const Meeting = Template.bind({});

Meeting.args = {
  content: {
    type: 'law-case',
    title: '两中心住房保障工作联席会议',
    date: [
      {
        label: '更新',
        value: '张三 周五 09:50 2022/03/31',
      },
      {
        label: '提交',
        value: '李四 周六 08:10 2022/03/27',
      },
    ],
    actions: [
      {
        type: 'btn',
        label: '编辑',
        icon: {
          name: 'editor',
          inline: true,
        },
        href: 'https://admin.zhaobg.com/manage/content/50/edit',
        target: '_blank',
      },
      {
        type: 'flag',
        label: '收藏',
        icon: {
          name: 'star',
          inline: true,
        },
        params: {
          type: 'flagging--favorite',
          entity_type: 'node',
          entity_id: '1312',
          relationships: {
            flagged_entity: {
              type: 'node--case',
              id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
            },
          },
        },
      },
    ],
    block: [
      {
        type: 'showcase',
        elements: [
          {
            header: [
              {
                label: '标签1',
                key: 'label1',
              },
              {
                label: '内容1',
                key: 'content1',
              },
              {
                label: '标签2',
                key: 'label2',
              },
              {
                label: '内容2',
                key: 'content2',
              },
            ],
            elements: [
              {
                label1: '客户名称',
                content1: {
                  type: 'link',
                  label: '国家药审分中心',
                  href: '/node/3',
                },
                label2: '主办律师',
                content2: {
                  type: 'link',
                  label: '杜长明',
                  href: '/node/3',
                },
              },
              {
                label1: '经办人',
                content1: {
                  type: 'link',
                  label: '张三',
                  href: '/node/4',
                },
                label2: '业务时间',
                content2: '2022-04-15',
              },
            ],
          },
        ],
      },
      {
        type: 'card',
        title: {
          label: '会议详情',
          style: 'style-v4',
        },
        elements: [
          {
            header: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">第一次会议</span>',
                },
                {
                  label: '会议期间',
                  value: '周一，04/11/2022 11:30<br>周一，04/11/2022 16:30',
                },
                {
                  label: '会议地址',
                  value: '中国上海市浦东新区 线上会议',
                },
                {
                  label: '参会人员',
                  value:
                    '<a href="/node/1">庞博</a>,<a href="/node/2">杜长明</a>',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
              ],
            },
            feature: {
              type: 'feature-box',
              hoverIcon: true,
              fullIcon: 'fullscreen',
              ratios: 'media-16-9',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto1.jpg',
                alt: 'lazyload',
              },
            },
            footer: {
              meta: [
                {
                  label: '相关项目',
                  value: '<a href="/node/1">药审分中心制度修改</a>',
                },
                {
                  label: '会议文件',
                  value: {
                    label: ['文件名1', '文件名2'],
                    elements: [
                      {
                        src: '/assets/images/cases/porto1.jpg',
                        caption: '文件名1',
                        thumb: '/assets/images/cases/porto1.jpg',
                      },
                      {
                        src: '/assets/images/cases/porto2.jpg',
                        caption: '文件名2',
                        thumb: '/assets/images/cases/porto2.jpg',
                      },
                    ],
                  },
                  params: {
                    lightbox: true,
                  },
                },
                {
                  label: '会议内容',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
                {
                  label: '信息备注',
                  value:
                    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
              ],
            },
            progressBar: {
              mode: 'determinate',
              value: 33,
              'value-': '当前次数除以总次数',
            },
          },
          {
            header: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">第二次会议</span>',
                },
                {
                  label: '会议期间',
                  value: '周一，04/11/2022 11:30<br>周一，04/11/2022 16:30',
                },
                {
                  label: '会议地址',
                  value: '中国上海市浦东新区 线上会议',
                },
                {
                  label: '参会人员',
                  value:
                    '<a href="/node/1">庞博</a>,<a href="/node/2">杜长明</a>',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
              ],
            },
            feature: {
              type: 'feature-box',
              hoverIcon: true,
              fullIcon: 'fullscreen',
              ratios: 'media-16-9',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto2.jpg',
                alt: 'lazyload',
              },
            },
            footer: {
              meta: [
                {
                  label: '相关项目',
                  value: '<a href="/node/1">药审分中心制度修改</a>',
                },
                {
                  label: '会议文件',
                  value: {
                    label: ['文件名2'],
                    elements: [
                      {
                        src: '/assets/images/cases/porto1.jpg',
                        caption: '文件名2',
                        thumb: '/assets/images/cases/porto1.jpg',
                      },
                    ],
                  },
                  params: {
                    lightbox: true,
                  },
                },
                {
                  label: '会议内容',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
                {
                  label: '信息备注',
                  value:
                    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
              ],
            },
            progressBar: {
              mode: 'determinate',
              value: 66,
            },
          },
          {
            header: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">第三次会议</span>',
                },
                {
                  label: '会议期间',
                  value: '周一，04/11/2022 11:30<br>周一，04/11/2022 16:30',
                },
                {
                  label: '会议地址',
                  value: '中国上海市浦东新区 线上会议',
                },
                {
                  label: '参会人员',
                  value: '<a href="/node/1">庞博</a>',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
              ],
            },
            feature: {
              type: 'feature-box',
              hoverIcon: true,
              fullIcon: 'fullscreen',
              ratios: 'media-16-9',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto3.jpg',
                alt: 'lazyload',
              },
            },
            footer: {
              meta: [
                {
                  label: '相关项目',
                  value: '<a href="/node/1">药审分中心制度修改</a>',
                },
                {
                  label: '会议文件',
                  value: {
                    label: ['文件名3'],
                    elements: [
                      {
                        src: '/assets/images/cases/porto1.jpg',
                        caption: '文件名3',
                        thumb: '/assets/images/cases/porto1.jpg',
                      },
                    ],
                  },
                  params: {
                    lightbox: true,
                  },
                },
                {
                  label: '会议内容',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
                {
                  label: '信息备注',
                  value:
                    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
              ],
            },
            progressBar: {
              mode: 'determinate',
              value: 100,
            },
          },
          {
            header: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">第三次会议</span>',
                },
                {
                  label: '会议期间',
                  value: '周一，04/11/2022 11:30<br>周一，04/11/2022 16:30',
                },
                {
                  label: '会议地址',
                  value: '中国上海市浦东新区 线上会议',
                },
                {
                  label: '参会人员',
                  value: '<a href="/node/1">庞博</a>',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
              ],
            },
            feature: {
              type: 'feature-box',
              hoverIcon: true,
              fullIcon: 'fullscreen',
              ratios: 'media-16-9',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto3.jpg',
                alt: 'lazyload',
              },
            },
            footer: {
              meta: [
                {
                  label: '相关项目',
                  value: '<a href="/node/1">药审分中心制度修改</a>',
                },
                {
                  label: '会议文件',
                  value: {
                    label: ['文件名3'],
                    elements: [
                      {
                        src: '/assets/images/cases/porto1.jpg',
                        caption: '文件名3',
                        thumb: '/assets/images/cases/porto1.jpg',
                      },
                    ],
                  },
                  params: {
                    lightbox: true,
                  },
                },
                {
                  label: '会议内容',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
                {
                  label: '信息备注',
                  value:
                    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
              ],
            },
            progressBar: {
              mode: 'determinate',
              value: 100,
            },
          },
          {
            header: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">第三次会议</span>',
                },
                {
                  label: '会议期间',
                  value: '周一，04/11/2022 11:30<br>周一，04/11/2022 16:30',
                },
                {
                  label: '会议地址',
                  value: '中国上海市浦东新区 线上会议',
                },
                {
                  label: '参会人员',
                  value: '<a href="/node/1">庞博</a>',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
              ],
            },
            feature: {
              type: 'feature-box',
              hoverIcon: true,
              fullIcon: 'fullscreen',
              ratios: 'media-16-9',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto3.jpg',
                alt: 'lazyload',
              },
            },
            footer: {
              meta: [
                {
                  label: '相关项目',
                  value: '<a href="/node/1">药审分中心制度修改</a>',
                },
                {
                  label: '会议文件',
                  value: {
                    label: ['文件名3'],
                    elements: [
                      {
                        src: '/assets/images/cases/porto1.jpg',
                        caption: '文件名3',
                        thumb: '/assets/images/cases/porto1.jpg',
                      },
                    ],
                  },
                  params: {
                    lightbox: true,
                  },
                },
                {
                  label: '会议内容',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
                {
                  label: '信息备注',
                  value:
                    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
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
      {
        type: 'text',
        title: {
          label: '信息备注',
          style: 'style-v4',
        },
        spacer: 'none',
        body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
    ],
    params: {
      comment: {
        type: 'comment--comment',
        attributes: {
          entity_type: 'node',
          field_name: 'comment',
        },
        relationships: {
          comment_type: {
            data: {
              type: 'comment_type--comment_type',
              id: 'a395ac8e-3c9a-43d5-8ec8-cea74116d5f3',
            },
          },
          entity_id: {
            data: {
              type: 'node--article',
              id: 'b59a2767-89b8-418d-91fe-6f0e6a5638ec',
            },
          },
        },
      },
    },
    editor: {
      title: {
        label: '添加工作跟踪',
        style: 'style-v4',
      },
      actions: [
        {
          label: '提交',
          type: 'submit',
          color: 'primary',
        },
      ],
      succes: {
        label: '成功发布！',
      },
      empty: {
        label: '暂时还没有工作日志。',
      },
    },
  },
};

export const Project = Template.bind({});

Project.args = {
  content: {
    title: '人才公寓',
    date: [
      {
        label: '更新',
        value: '张三 周五 09:50 2022/03/31',
      },
      {
        label: '提交',
        value: '李四 周六 08:10 2022/03/27',
      },
    ],
    actions: [
      {
        type: 'btn',
        label: '编辑',
        icon: {
          name: 'editor',
          inline: true,
        },
        href: 'https://admin.zhaobg.com/manage/content/50/edit',
        target: '_blank',
      },
      {
        type: 'flag',
        label: '收藏',
        icon: {
          name: 'star',
          inline: true,
        },
        params: {
          type: 'flagging--favorite',
          entity_type: 'node',
          entity_id: '1312',
          relationships: {
            flagged_entity: {
              type: 'node--case',
              id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
            },
          },
        },
      },
    ],
    block: [
      {
        type: 'showcase',
        elements: [
          {
            header: [
              {
                label: '标签1',
                key: 'label1',
              },
              {
                label: '内容1',
                key: 'content1',
              },
              {
                label: '标签2',
                key: 'label2',
              },
              {
                label: '内容2',
                key: 'content2',
              },
            ],
            elements: [
              {
                label1: '客户名称',
                content1: {
                  type: 'link',
                  label: '国家药审分中心',
                  href: '/node/3',
                },
                label2: '业务类型',
                content2: '合同审核',
              },
              {
                label1: '经办人员',
                content1: {
                  type: 'link',
                  label: '张三',
                  href: '/node/4',
                },
                label2: '主办律师',
                content2: {
                  type: 'link',
                  label: '李四',
                  href: '/node/4',
                },
              },
              {
                label1: '业务对方',
                content1: {
                  type: 'link',
                  label: '王五',
                  href: '/node/4',
                },
                label2: '业务时间',
                content2: '2022-04-15',
              },
            ],
          },
        ],
      },
      {
        type: 'card',
        title: {
          label: '项目详情',
          style: 'style-v4',
        },
        elements: [
          {
            header: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">{分标标题}</span>',
                },
                {
                  label: '项目时间',
                  value: '周一，04/11/2022 11:30',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
              ],
            },
            footer: {
              meta: [
                {
                  label: '相关项目',
                  value: '<a href="/node/1">药审分中心制度修改</a>',
                },
                {
                  label: '项目文件',
                  value: {
                    label: ['文件名1', '文件名2'],
                    elements: [
                      {
                        src: '/assets/images/cases/porto1.docx',
                        caption: '文件名1',
                        thumb: '/assets/images/cases/porto1.jpg',
                      },
                      {
                        src: '/assets/images/cases/porto2.jpg',
                        caption: '文件名2',
                        thumb: '/assets/images/cases/porto2.jpg',
                      },
                    ],
                  },
                  params: {
                    lightbox: true,
                  },
                },
                {
                  label: '关联内容',
                },
                {
                  label: '项目备注',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
              ],
            },
            progressBar: {
              mode: 'determinate',
              value: 33,
              'value-': '当前次数除以总次数',
            },
          },
          {
            header: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">{分标标题}</span>',
                },
                {
                  label: '项目时间',
                  value: '周一，04/11/2022 11:30',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
              ],
            },
            footer: {
              meta: [
                {
                  label: '相关项目',
                  value: '<a href="/node/1">药审分中心制度修改</a>',
                },
                {
                  label: '项目文件',
                  value: {
                    label: ['文件名1', '文件名2'],
                    elements: [
                      {
                        src: '/assets/images/cases/porto1.docx',
                        caption: '文件名1',
                        thumb: '/assets/images/cases/porto1.jpg',
                      },
                      {
                        src: '/assets/images/cases/porto2.jpg',
                        caption: '文件名2',
                        thumb: '/assets/images/cases/porto2.jpg',
                      },
                    ],
                  },
                  params: {
                    lightbox: true,
                  },
                },
                {
                  label: '关联内容',
                },
                {
                  label: '项目备注',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
              ],
            },
            progressBar: {
              mode: 'determinate',
              value: 33,
              'value-': '当前次数除以总次数',
            },
          },
        ],
      },
      {
        type: 'text',
        title: {
          label: '信息备注',
          style: 'style-v4',
        },
        spacer: 'none',
        body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
    ],
    params: {
      comment: {
        type: 'comment--comment',
        attributes: {
          entity_type: 'node',
          field_name: 'comment',
        },
        relationships: {
          comment_type: {
            data: {
              type: 'comment_type--comment_type',
              id: 'a395ac8e-3c9a-43d5-8ec8-cea74116d5f3',
            },
          },
          entity_id: {
            data: {
              type: 'node--article',
              id: 'b59a2767-89b8-418d-91fe-6f0e6a5638ec',
            },
          },
        },
      },
    },
    editor: {
      title: {
        label: '添加工作跟踪',
        style: 'style-v4',
      },
      actions: [
        {
          label: '提交',
          type: 'submit',
          color: 'primary',
        },
      ],
      succes: {
        label: '成功发布！',
      },
      empty: {
        label: '暂时还没有工作日志。',
      },
    },
  },
};
