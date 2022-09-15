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
import { NodeModule } from '@uiux/combs/node/node.module';
import { LawCaseComponent } from '@uiux/combs/node/law/law-case/law-case.component';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { initConfig } from 'src/app/app.module';
export default {
  title: 'Components/node/case',
  component: LawCaseComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [DialogComponent, TextComponent],
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
    title: 'Angular SSR 服务端渲染技术',
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
        href: '#',
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
                contentOfCustomer: 'Johnson',
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
                elements: [
                  {
                    type: 'link',
                    label: '第二次起诉签字.docx',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'stroked',
                    label: 'PDF',
                    color: 'warn',
                    classes: 'border-primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '第二次起诉签字.docx',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'stroked',
                    label: 'PDF',
                    color: 'warn',
                    classes: 'border-warn',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '第二次起诉签字.docx',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'stroked',
                    label: 'PDF',
                    color: 'warn',
                    classes: 'border-accent',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '第二次起诉签字.docx',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '第二次起诉签字.docx',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
            ],
          },
          {
            label: '法院文件',
            elements: [
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
            ],
          },
          {
            label: '客户文件',
            elements: [
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
            ],
          },
          {
            label: '其他文件',
            elements: [
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                    target: '_blank',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                    target: '_blank',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                    target: '_blank',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                    target: '_blank',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                    target: '_blank',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                    target: '_blank',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label: '易思远-刘冰清-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
              },
              {
                elements: [
                  {
                    type: 'link',
                    label:
                      '易思远-刘冰清-判决书-浦东法院-判决书-浦东法院-202201 _0.pdf',
                    href: 'xxx.docx',
                    classes: 'file one-line',
                  },
                  {
                    type: 'btn',
                    href: '#',
                    mode: 'raised',
                    label: '预览',
                    color: 'primary',
                  },
                ],
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
            remarks: '已收到',
            expand: [
              {
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
              {
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
              {
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
            ],
          },
          {
            name: '受理费',
            money: '3679',
            billingTime: '2022-03-03',
            deliveryTime: '2022-03-04',
            remarks: '已收到',
            expand: [
              {
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
              {
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
              {
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
            ],
          },
          {
            name: '受理费',
            money: '3679',
            billingTime: '2022-03-03',
            deliveryTime: '2022-03-04',
            remarks: '已收到',
            expand: [
              {
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
              {
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
              {
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
            ],
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
            total: '4846.00元',
            expand: [
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '其他本金',
                  style: 'style-v4',
                },
                body: '律师费 2000.00元<br>担保费 5000.00元</br>赔偿金 55.00元',
              },
            ],
          },
          {
            name: '工程款',
            principal: '12323.00元',
            InterestPeriod: '2022/03/05-2022/05/01',
            interest: '5000.00元',
            defaultPeriod: '',
            damages: '',
            total: '4845.00元',
            expand: [
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '其他本金',
                  style: 'style-v4',
                },
                body: '律师费 2000.00元<br>担保费 5000.00元</br>赔偿金 55.00元',
              },
            ],
          },
          {
            name: '劳务费',
            principal: '12323.00元',
            InterestPeriod: '2022/03/05-2022/05/01',
            interest: '5000.00元',
            defaultPeriod: '',
            damages: '',
            total: '4845.00元',
            expand: [
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '其他本金',
                  style: 'style-v4',
                },
                body: '律师费 2000.00元<br>担保费 5000.00元</br>赔偿金 55.00元',
              },
            ],
          },
          {
            name: '合计',
            principal: '68751.00元',
            InterestPeriod: '',
            interest: '9000.00元',
            defaultPeriod: '',
            damages: '8455.00元',
            total: '48456.00元',
            expand: [
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '其他本金',
                  style: 'style-v4',
                },
                body: '律师费 2000.00元<br>担保费 5000.00元</br>赔偿金 55.00元',
              },
            ],
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
            total: '17658.00元',
            date: '2022/03/06',
            expand: [
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '违约金',
                  style: 'style-v4',
                },
                body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
              },
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '逾期罚息',
                  style: 'style-v4',
                },
                body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
              },
            ],
          },
          {
            no: '2',
            paymentOne: '12000.00元',
            paymentTwo: '13000.00元',
            paymentThree: '13520.00元',
            interest:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            total: '17658.00元',
            date: '2022/03/06',
            expand: [
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '违约金',
                  style: 'style-v4',
                },
                body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
              },
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '逾期罚息',
                  style: 'style-v4',
                },
                body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
              },
            ],
          },
          {
            no: '3',
            paymentOne: '12000.00元',
            paymentTwo: '13000.00元',
            paymentThree: '13520.00元',
            interest:
              '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            total: '17658.00元',
            date: '2022/03/06',
            expand: [
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '违约金',
                  style: 'style-v4',
                },
                body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
              },
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '逾期罚息',
                  style: 'style-v4',
                },
                body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
              },
            ],
          },
          {
            no: '合计',
            paymentOne: '32000.00元',
            paymentTwo: '33000.00元',
            paymentThree: '33520.00元',
            interest:
              '8000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
            total: '57658.00元',
            date: '',
            expand: [
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '违约金',
                  style: 'style-v4',
                },
                body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
              },
              {
                type: 'text',
                spacer: 'none',
                title: {
                  label: '逾期罚息',
                  style: 'style-v4',
                },
                body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
              },
            ],
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
      action: {
        label: '提交',
      },
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
                  label: 'Johnson',
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
                    '<a href="/node/1">庞博</a>,<a href="/node/2">Johnson</a>',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
              ],
            },
            feature: {
              type: 'feature-box',
              mode: 'float',
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
                  value: [
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                  ],
                  params: {
                    dynamic: true,
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
                    line: 'one',
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
                    '<a href="/node/1">庞博</a>,<a href="/node/2">Johnson</a>',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
              ],
            },
            feature: {
              type: 'feature-box',
              mode: 'float',
              hoverIcon: true,
              fullIcon: 'fullscreen',
              ratios: 'media-16-9',
              img: {
                classes: 'object-fit',
                src: '/system/files/2022-08/AF.docx',
                preview: '/system/files/xxx.pdf',
                alt: '苏州耀能诉震纶用电纠纷案（10月后的电费案件）',
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
                  value: [
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                  ],
                  params: {
                    dynamic: true,
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
              mode: 'float',
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
                  value: [
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                  ],
                  params: {
                    dynamic: true,
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
              mode: 'float',
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
                  value: [
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                  ],
                  params: {
                    dynamic: true,
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
              mode: 'float',
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
                  value: [
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                  ],
                  params: {
                    dynamic: true,
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
      action: {
        label: '提交',
      },
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
    pdf: {
      logo: {
        data: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/CABEIACgBCgMBIgACEQEDEQH/xAAdAAACAgMBAQEAAAAAAAAAAAAGCAAHAgQFAwkB/9oACAEBAAAAAPqnJJJJKGvbOSSSSSSY5cRVug2klF/q2xuVVcIQ4XpULrVCUHVS9qq7arPG3BXcsn9DzAdpyp2iRRy6NtwK6Fuo99ClfSdhWg21y6TVURU2/dIlmfA1TMDfwoV8Hz+YzSBLxoUzVe9Gu9RcXD56NfUIxS43cpUAfK5xnWsOtyjNiRQqUOubYGXD3lbaEIz7yrEx+UDJmOAvtavH7g2Qk8GQziS9R8go723aq2rZ/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAIBAwUEBv/aAAgBAhAAAACjnutROoABcnK1bJrbh3bgAE8Rp9OyyQ7yABHnb7//xAAbAQACAwEBAQAAAAAAAAAAAAAABQMEBgcBAv/aAAgBAxAAAAB1oVKu3bzAAE2oYUnsbCLccLTnvgFve6zmCyG5906kQAEnS2KP/8QAKhAAAgIDAAIBBAAGAwAAAAAABAUDBgECBwAINxAREhQTFRYXITAYMTb/2gAIAQEAAQwA/wBVx9jud0eynoGurTJkUmk0Wkmv3+3+7O+mN8aflj8/H9lr9VE0KdMYAYLl7cBq2M4SFaKw04v2tW/sJ0L55jdh9e79cYciTqSwVsB0qXrbRpw+e/yrIP2tvci7i6flLUl+mIfca7zR5zFUgN9av0bQ7lY13dwYC0j9tegPWc+lbpMJY/ObaRdqSofzhfpT9v6gXyiqCtxQIjZuE90E6zoeGcLAA37x2BryIFISAtFOyt4gn76tg6M0ZkrDIIsQwxxYz98XvsIdTfhV5Srlfuua9JT9IS4LExgUvxR1vT+vCai+SkpyP7wcw03+2bUt+6v2WQxoGB7SODYnonQA+c1qB0SBMZHr39hj/OOc2byT2BYYxnfbndlxrz+7CX6rjvBhJBY0nX1Jd1PqbUAlMf1S+FUCuCsgRxi5MSR5z9sb65z5Pppr0wPOcfS11NLdERSlqPpJE04ByFIBC1cinG4D3rfZL8nBklRoltuePIdx1Ff0H/mHXVXWqRYxJ5bkQRPVuh2hlWEppCOWab3Y/wDO1Tz1e+FK957k/GC7z1A+JNvOnZrWefv4rExwuW+qPSq9UHzSus5dIdCmqlfLrEWcINJ7n/HCXyuQ2vnIVZ6QqkxmH2euCi989oD5Xv8AeD1r+Eqp51BZ11hDiKlHhCwiA9U4cnLsJFcQTSuuddsbWCKyrkyZI1o0F5iQ7xW0gKdktl6JW+zVhFYLPo5ioZ4qlOiw05+mYA1eeqVlUyHnqqpw39oNddOdgfbH2xe3rpJZzh5utRJ8Ud24cut9NOqRWCH1txvnka38c4xnA91P6dFT7mxWnY7dyqmczVLNhWbYk3nfE6UnPS21Q4bFfSX5ND+lhsyKqAfvNzYxIQzJHYc+zFV+qDYI6c+7vmWm6/oJOc9zpDYyyWezPAgp16ubu1r3OCWzAJwgg1wYwY0eIoPcK611vuhQLjISi/XZWSl45WIS9ftJ7lfGK7z1A+JNvPdKFplLVJtNs/y+fkPLek8dRk1M0ABwNZLD0Oy0eqWY4XWP3P8AjhL5wKoqr369FIGePuPc1FnpDA6mNt5NY/Wv4SqnnSUkT2jOhJhiCMWSh0UnjWLolka6kXLk9BqB9XWj6vD2OMY1xjHnYLiuo/aq07K12I1QprSy5xz3AyraULmv9NWfv7pnGy/MD2i+Og/LWss6vq7J9DQtrMBUVFmJ6K3sBVK3rYPrXnGOSLM+Wa9LZe9RmoZYGRNU5e8uLkq2dKhjkJpSHpvLLELWhh8Oqp5L8mh/R3ZB1fUY7RYBZmGnR+sXnpUeECoOQYflHrmLXaK9Fey/g5rXpjXgGsJT2wzMw1qteoDiEBHjHg8W+pdCGfStmp5zTyOKOGPWOPTXTTpHNkPTkMCh1IXFBz3n6Tmlf2RppS9xLBX01qTlqHAkZYTD0wpkpO8olhaDQ/8AEjk+FsAmdm38axcXrtrpauqOWrosOgUFJzau6olEhW4vTOJUjqZoRjrBcRVMqSyiVkCvLNyNw7tyWv3dtoyOYuRpcer/AD/SDYfDF9iGT1oo28sc+7SxZlpVOXURTMtALPKjY8coTcp6YctxOUzpFda0/FXKH2wsc8W5q4gWQTptI9b7RkvQEsSlpIVHBrjGuuMY8IgjKGlgkzn8aZT1dGrsKJdvPKJPwPl+yo4DKjGNc+uNQ1x/l7Z/Meu1RjzjbDyz/SVWXi5jtdfw/W/68teebOWkULEE2Wetv+b1w0JeiRGxk2e/V2YrcD+I4jlDNTVgyEqCyWUjALBZtnTWFqdJOgRnZRLM6EMZdf/EAD0QAAIBBAECAgUJBgUFAAAAAAECAwAEERIhBRMxQRAUFSJRBiMyQmFxsrO0FjBDYnLSIDNjc4J0dZGTov/aAAgBAQANPwD91ZMgl7Nurod0DjBLjyNMoYZ+B/fkZxnnA9DsVEkzYBIGa2IgvnnZYCBxtgopNdT7SoruVhBQnSK2iA1RecsxJLH/AAX93JEe87KqCNcn6NR211ItlGzFCYpjEK+LtMKPmrTGhYTXV1FCCdBGxGEDYJJxUZyIgs9zME+LmKr2JzJb5LaNG5jI5APitXPUI7VI5XKouyM5Y4/oq0O4to2LLLbn+Iu3mp4auozTxuJ2YaCIAjGtddBaWztUV4ozbE241L88iPNIgXPx1GKuCd7K3lCmIa7DY4b3j5LUTFLqxZw0kDA8Z8CVbyPolnx0uWT30u0HnsOAT5UDjiSoerPawWdnJmSaAAYn+cI4NTXUUHajYK2ZFLA8/wBNf7R/tpRkkxH+2riSVBFIwZvmm1OSKjm1s/WuFu08mUjwJ8qm6nBamOVyAFlDHb3fur7/AEfs5dfqYvRKuY5WRXeCUfQlj3BAdDyK6Tbxky3F3NLkRHOO2CEwT9QALXQpka26TE6RXc2CH0ULg86+XhV3lRPcNiK3GM5/mfzCjNSsbhpLa/lHa0P14uNc+Qq56bazSyqCod5IwxYADgEmvaFz+WK3vf1D17dg/Kkr2zd/hSriykgnuiMmMyDC6L9Zs+Arq80Rs71zohljyoR8+GwPFScoksyxlvuDEZr2/F+RLT39xACAcJJDw0Mv2Soau5rssn1opAiB42+1TXau/wBVJRg+e29y4Z2bGI3YEKAKaTW66pczNc3bmdwANg4wtZJku+nXna723nIrOynNd5gk9oMI0ZUFS3AGwORwKurK7nDepxRFBo41BxsMlK6p8oDYp1e4MbSl5ZjkFCpPuCp/l5N02C1uYQJIomA1IyrYUEYApeuWn4HpmEsVg3T3lMMUgyq7AEGreyup7jpyWLwGWMRlfpsBjDMKM95j/wBprqPydvSLy0tEinhil2XEchUEHK5q9u8LDPKhXsxjMjDCDnJFCHvwLLPG8ZE0ZGG1QfH0fs5dfqYvQXCJty0jt4JGoyXc+QFSI4KXhXd4/i6DIRfPBOatL2O7mu4C2qJZjvXNymfoganWopRFZW0j+9Fa42IhTxcsQNiKknDtcSnM0sGxzPJngPL4Io4AFW0KRRIPBUjGqjn4AVYzTzXnafcQ7AIqMRxtUtvLcKv8lxK0qf8Ay1e3YPypK9s3f4UoXVysyf65UaE/8Q2KsLBSZpJUjaabGZYrvzzt4Hyro/UBZi9kddxG8o2Ek2SH1C4Svb8X5EtXl/eDcDLROCCkifapqwv3mWL+GzuoUTJ9kiAV2rv9VJQtjMIIJuw8hgIlCK+r4J1pp4Y3tp7tZ0iYy6MrYRa67dLDFCb8RCNRjMh1iY4BNAVY9DuNoYdd95e6qD7OWqDr83Vr2+aVY0t0inYHcPjgjLZqC6u+o2QkOgnlYhcgN8N8ivblp+B6uej2ttGHCdsOApLDcPyMYpvkxcWqxKEEfcBBz7gXk16zefmmum/J64tUh7vbSa6Uu/YR8EFqmt3gsuk+MdpE4K8jJGcHgVd3J7FyWxJYI2Wbb4fhJ9H7OXX6mL0WVrPF0+1yNLaV2GJFB42CgjNXWENla5lluWPkzgAkV8o7CW1uJIsN6nDKP8tD5nzeojn1SK3FsJSPJ22c61GoVURQowowPQ908/qjaxQnYlsPpyRSKFVVGAoXgAAeAFRXaXKm2dUcuqleSwYYw1G6kuM3Lq77SAAjKqoxxV2mssLj/wAEEchh4gjkUTxCyRykf8uKhkZnvFuQJZdvJgVKYFdNuRPbzvPGbnhWRUd9MFVDYFLcSzA3Dq77S+PKqtWkTRLNaOsbPGTkI+ytkKckVZCQRNOwaQ9xzIckADxakt1h7dpdCKPVSTkrq3PNFtjELtNSfjjt1GPm3a9Qsv3Ht1JctOXu5u64ZlC4BAGF4rrWPWJ2b30wAB2T9TkZoQRQrFGxRgIsakEeeRmumQiK2MMjxEIDnDFTlvjk1FdR3ANu4RtowQASQ3HvUBUsbIxHjhhg4qJpWBnYM57rbHJUKKu7t7gSq+JYmbyjbyRfJa/69f7K/wC4D+z0J0ie1b3vf7jzI44+GF9EzlovVlJW4xCZsIVOGyBgAclq6hZLco6WjPIyNH3AkjsSytj6prpd13ZTbWcz93tgI8SFcBiO5n71NWkAmkeW2uJ5F0hS2HaQkxtuTvqVPFPPHcGFba+bGJ5PcBaXA0LjZc4UHx5o2UGsnrFwmw0GDq7ZGfga/8QALxEAAgEDAgMGBAcAAAAAAAAAAQIDAAQRBRITIUEiMDFRYXEGFHOxFTRFUmKRkv/aAAgBAgEBPwA3EQkdM9pF3Hl0r8StP3H/ACaku4IwhYntjIAGTTSosXFJ7OM5r5mHg8bd2POrZ55C7OBsODH7HuAc59DWoJqHaeO6SCFFLE7QMADnuJzy68sVpGrsthNczSPcW/EUW8nDxJMX8l9/A1YazDeySxGNopYsb0JDFfQ7etRENqcxByBHj7V+qH6VTtK95mMLuhXOD4sDUl18zaXBC4CgU4eC15ZMcyKfZhVt+Xh+mv27hfFvem+NNKld4i7GUSPGLQISW54BYkYwfIUthdh7eYRAkM0nCyAisRgZH8elaFoiaSLqQ7DPdTGSTYMKvkqj06nqajhihzsULnxrhx8TibRuxjNS28M+DIgYihbW6ggRqARg+tGGIx8MqCvlSgKAAMADA7gADPqaW0sYL1rmOzt1naQAyiMb/wC6luHZ2JC5Vjjx6VbESZyo5Cv/xAA3EQACAQMDAQUEBgsAAAAAAAABAgMEBREABhIxExQhIlEyQWFzBxUWMGJxFyA2N3J0dYGCsrP/2gAIAQMBAT8ATb90kt9LXrEvYVVSIIW5jJckjGPd01+jjdeM92hx89NW/aV7uUlWkEKYpJDHM7SKqhwcYyeuobVXVF0FtjjBqTMYuHIY5KcHx6a+zl3F6FnaDjWE4CFgAfLyyD0xjW4qOx0MdJT0TymtiDJXq2SqyoACFOMEZz9xND2QiOc9pGG/LxI1tyTasQBudLV1U7PxWFPZPoQAV1uy0Un1lSJTRd1qJoOdTTuwMcAXwU8wAPZHiB01dNnz0NBR1sFZBVQ1OQCp4YI/i6jV1jkp/oztEcylHevZ1VhglTzOdN+65P6nqw0trpdmhLhLO0F5qSjPGuVpWiOFZviSNUO2DtndW3kkqBLLPLIzBR5QqnCkH8Q1RS0d/wB0MzlY6+zVky/Np2yo/upOtxftDdv5+o/6H7ir9il+QP8AY6o9iVU6UfZEKHjEtRWu4CQ/hjUHJIHUnVXe9gXGlraOvr6wd0iip6aaNecsyJgyEMQRlyMHOtybiN7lhigiMFFTLxp4SxcgdMsT1Jxq5Xm6Xdo2rqqSfs1wgboo+AGjcq/uAoe8P3YSc+yz5eXrq17hvVlV1oKySFXOWUYKk+uDkZ1Lua/zyRPLcJ3aKQyRszZKMfevpqK7XKCvavjqpUqmLFpQcMS3XU00tRNJNK5eSRy7sepZjkk6z+u8rShA2PIoUfl10ttE1tWJ6uraIUbSiIzHhyAb3f46ttipYaeBElmCTxr2i+Qgh8ZHivx1uUPb0Qxyu3NwTyx6fADX/9k=',
      },
      sign: {
        row: 12,
        column: 1,
        data: 'data:image/jpeg;base64,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',
      },
      table: {
        header: [
          [
            {
              content: '',
              colSpan: 4,
              styles: {
                cellPadding: 0,
                minCellHeight: 10,
              },
            },
          ],
          [
            {
              content: '北京金诚同达（上海）律师事务所',
              colSpan: 4,
              styles: {
                fontSize: 20,
              },
            },
          ],
          [
            {
              content: '合同审核意见',
              colSpan: 4,
              styles: {
                fontSize: 20,
              },
            },
          ],
        ],
        body: [
          [
            {
              content: '项目名称',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            {
              content:
                '国家药品监督管理局药品审评检查长三角分中心2022年SciFinder合同',
              colSpan: 3,
            },
          ],
          [
            {
              content: '文件名称',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            {
              content:
                '国家药品监督管理局药品审评检查长三角分中心2022年SciFinder合同（2） -0908乙方意见.doc',
              colSpan: 3,
            },
          ],
          [
            {
              content: '客户名称',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            {
              content: '国家药审分中心',
              styles: {
                cellWidth: 152,
              },
            },
            {
              content: '业务对方',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            '中国教育图书进出口有限公司',
          ],
          [
            {
              content: '业务类型',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            {
              content: '合同审核',
              colSpan: 3,
            },
          ],
          [
            {
              content: '经办人员',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            '唐慧鑫',
            {
              content: '业务时间',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            '2022-09-07',
          ],
          [
            {
              content: '经办律师',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            '杜长明',
            {
              content: '完工时间',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            '2022-09-08',
          ],
          [
            {
              content: '',
              colSpan: 4,
              styles: {
                cellPadding: 0,
                fontSize: 0.5,
              },
            },
          ],
          [
            {
              content: '合同审核意见',
              colSpan: 4,
              styles: {
                fontStyle: 'bold',
                lineWidth: 0,
                halign: 'center',
                fontSize: 17,
              },
            },
          ],
          [
            {
              content:
                '第一次（2020-09-07 09:12）\n1. 请审查交付方式是否为合同中所述。\n2. 以前同CAS签订的合同作废， 不能同时从多个人处购买同一样产品， 在逻辑上不成立。\n3. 请同对方确认发票的内容， 有使用期限的一般为信息服务类。 不能为图书， 图书在理论上是可以无期限保存的。\n\n第二次（ 2020 - 09 - 08 16: 04）\n对反馈意见没有异议。\n\n第一次（2020-09-07 09:12）\n1. 请审查交付方式是否为合同中所述。\n2. 以前同CAS签订的合同作废， 不能同时从多个人处购买同一样产品， 在逻辑上不成立。\n3. 请同对方确认发票的内容， 有使用期限的一般为信息服务类。 不能为图书， 图书在理论上是可以无期限保存的。\n\n第二次（ 2020 - 09 - 08 16: 04）\n对反馈意见没有异议。（ 以下无正文）',
              colSpan: 4,
              styles: {
                fontStyle: 'bold',
                minCellHeight: 40,
                lineWidth: 0,
              },
            },
          ],
          [
            {
              content: '',
              colSpan: 4,
              styles: {
                cellPadding: 0,
                fontSize: 0.5,
              },
            },
          ],
          [
            {
              content: '合同审核详情',
              colSpan: 4,
              styles: {
                fontStyle: 'bold',
                lineWidth: 0,
                halign: 'center',
                fontSize: 17,
              },
            },
          ],
          [
            {
              content: '\n\n\n\n见附件(iooks.com/node/563)。',
              colSpan: 4,
              styles: {
                lineWidth: 0,
                fontStyle: 'bold',
                minCellHeight: 40,
              },
            },
          ],
          [
            {
              content: '律师签字',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            '',
            {
              content: '出具日期',
              styles: {
                cellWidth: 46,
                halign: 'center',
                fontStyle: 'bold',
              },
            },
            '2022年7月28日',
          ],
        ],
      },
    },
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
                label2: '订单时间',
                content2: '2022-04-15',
              },
              {
                label1: '业务对方',
                content1: {
                  type: 'link',
                  label: '王五',
                  href: '/node/4',
                },
                label2: '完工时间',
                content2: '2022-04-15',
              },
              {
                label1: '主办律师',
                content1: {
                  type: 'link',
                  label: '张律师',
                  href: '/node/4',
                },
                label2: '订单状态',
                content2: '已完成',
              },
            ],
          },
        ],
      },
      {
        type: 'card',
        title: {
          label: '完工内容',
          style: 'style-v4',
        },
        elements: [
          {
            footer: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">{分标标题}</span>',
                },
                {
                  label: '完工时间',
                  value: '周一，04/11/2022 11:30',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
                {
                  label: '相关项目',
                  value: '<a href="/node/1">药审分中心制度修改</a>',
                },
                {
                  label: '项目文件',
                  value: [
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                  ],
                  params: {
                    dynamic: true,
                  },
                },
                {
                  label: '项目备注',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '<strong style="font-size:20px">⋮</strong>',
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
            footer: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">{分标标题}</span>',
                },
                {
                  label: '完工时间',
                  value: '周一，04/11/2022 11:30',
                },
                {
                  label: '工作工时',
                  value: 1,
                },
                {
                  label: '相关项目',
                  value: '<a href="/node/1">药审分中心制度修改</a>',
                },
                {
                  label: '项目文件',
                  value: [
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次起诉签字.docx',
                          href: 'xxx.docx',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          classes: 'border-warn',
                        },
                      ],
                    },
                  ],
                  params: {
                    dynamic: true,
                  },
                },
                {
                  label: '项目备注',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                  params: {
                    shorten: 100,
                    dialog: {
                      label: '<strong style="font-size:20px">⋮</strong>',
                    },
                  },
                },
              ],
            },
            progressBar: {
              mode: 'determinate',
              value: 100,
              'value-': '当前次数除以总次数',
            },
          },
        ],
      },
      {
        type: 'panel',
        title: {
          label: '项目详情',
          style: 'style-v4',
        },
        params: {
          enableActions: true,
          actions: {
            openAll: '全部展开',
            closeAll: '全部收起',
          },
        },
        bg: {
          classes: 'bg-fill-width bg-light',
        },
        elements: [
          {
            title: '<span class="badge">新订单</span>',
            params: {
              expanded: false,
            },
            elements: [
              {
                type: 'card',
                classes:
                  'card-no-shadow ng-star-inserted p-left-0 p-right-0 p-top-0',
                footer: {
                  meta: [
                    {
                      label: '订单时间',
                      value: '周一，04/11/2022 11:30',
                    },
                    {
                      label: '订单文件',
                      value: [
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'stroked',
                              label: 'PDF',
                              color: 'warn',
                              classes: 'border-primary',
                            },
                          ],
                        },
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'stroked',
                              label: 'PDF',
                              color: 'warn',
                              classes: 'border-warn',
                            },
                          ],
                        },
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'stroked',
                              label: 'PDF',
                              color: 'warn',
                              classes: 'border-accent',
                            },
                          ],
                        },
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'raised',
                              label: '预览',
                              color: 'primary',
                            },
                          ],
                        },
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'raised',
                              label: '预览',
                              color: 'primary',
                            },
                          ],
                        },
                      ],
                      params: {
                        dynamic: true,
                      },
                    },
                    {
                      label: '订单备注',
                      value:
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                      params: {
                        shorten: 100,
                        dialog: {
                          label: '<strong style="font-size:20px">⋮</strong>',
                        },
                      },
                    },
                  ],
                },
                progressBarBak: {
                  mode: 'determinate',
                  value: 33,
                  color: 'warn',
                },
              },
            ],
          },
          {
            title: '<span class="badge">重新审核</span>',
            elements: [
              {
                type: 'card',
                classes:
                  'card-no-shadow ng-star-inserted p-left-0 p-right-0 p-top-0',
                footer: {
                  meta: [
                    {
                      label: '订单时间',
                      value: '周一，04/11/2022 11:30',
                    },
                    {
                      label: '订单文件',
                      value: [
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'stroked',
                              label: 'PDF',
                              color: 'warn',
                              classes: 'border-primary',
                            },
                          ],
                        },
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'stroked',
                              label: 'PDF',
                              color: 'warn',
                              classes: 'border-warn',
                            },
                          ],
                        },
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'stroked',
                              label: 'PDF',
                              color: 'warn',
                              classes: 'border-accent',
                            },
                          ],
                        },
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'raised',
                              label: '预览',
                              color: 'primary',
                            },
                          ],
                        },
                        {
                          elements: [
                            {
                              type: 'link',
                              label: '第二次起诉签字.docx',
                              href: 'xxx.docx',
                              classes: 'file one-line',
                            },
                            {
                              type: 'btn',
                              href: '#',
                              mode: 'raised',
                              label: '预览',
                              color: 'primary',
                            },
                          ],
                        },
                      ],
                      params: {
                        dynamic: true,
                      },
                    },
                    {
                      label: '订单备注',
                      value:
                        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                      params: {
                        shorten: 100,
                        dialog: {
                          label: '<strong style="font-size:20px">⋮</strong>',
                        },
                      },
                    },
                  ],
                },
                progressBarBak: {
                  mode: 'determinate',
                  value: 33,
                  color: 'warn',
                },
              },
            ],
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
      action: {
        label: '提交',
      },
      succes: {
        label: '成功发布！',
      },
      empty: {
        label: '暂时还没有工作日志。',
      },
    },
  },
};
