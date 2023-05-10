import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NodeModule } from '@uiux/combs/node/node.module';
import { DashboardComponent } from '@uiux/combs/dashboard/dashboard.component';
import * as calendarStory from '../../widgets/Calendar.stories';
import { random } from 'lodash-es';
const calendar: any = calendarStory.Default.args;

export default {
  title: '示例页面/中台管理/工作面板',
  id: 'dashboard',
  component: DashboardComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        MatSidenavModule,
        BlockModule,
        NodeModule,
        BrandingModule,
        StorysModule.forRoot(),
      ],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
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

export const Order = Template.bind({});
Order.storyName = 'Order';
Order.args = {
  content: {
    type: 'dashboard',
    elements: [
      {
        title: {
          label: '订单数据',
        },
        row: '12',
        params: {
          api: '/api/v3/xxx',
        },
        form: [
          {
            type: 'mat-select',
            key: 'position',
            defaultValue: 2023,
            className: 'display-block',
            templateOptions: {
              label: '年份',
              description: '请选择年份',
              options: [
                {
                  label: '2023年',
                  value: 2023,
                },
                {
                  label: '2022年',
                  value: 2022,
                },
                {
                  label: '2021年',
                  value: 2021,
                },
                {
                  label: '2020年',
                  value: 2020,
                },
              ],
            },
          },
        ],
        widget: {
          type: 'chart',
          tooltip: {
            trigger: 'axis',
          },
          dataset: [
            {
              source: [
                ['name', '用户'],
                ['1月', random(10, 100)],
                ['2月', random(10, 100)],
                ['3月', random(10, 100)],
                ['4月', random(10, 100)],
                ['5月', random(10, 100)],
                ['6月', random(10, 100)],
                ['7月', random(10, 100)],
                ['8月', random(10, 100)],
                ['9月', random(10, 100)],
                ['10月', random(10, 100)],
                ['11月', random(10, 100)],
                ['12月', random(10, 100)],
              ],
            },
          ],
          grid: {
            left: '40px',
            right: '40px',
            top: '30px',
            bottom: '30px',
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: 'bar',
              label: {
                position: 'top',
                show: true,
              },
              barMaxWidth: '30px',
              datasetIndex: 0,
            },
          ],
        },
      },
      {
        row: '3',
        widget: {
          type: 'chart-box',
          label: '合同',
          count: '25',
          params: {
            api: '/api/v3/xxx',
          },
          chart: {
            grid: {
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            },
            xAxis: {
              show: false,
              type: 'category',
            },
            yAxis: {
              show: false,
              type: 'value',
            },
            dataset: [
              {
                source: [
                  ['name', '用户'],
                  ['1月', random(10, 100)],
                  ['2月', random(10, 100)],
                  ['3月', random(10, 100)],
                  ['4月', random(10, 100)],
                  ['5月', random(10, 100)],
                  ['6月', random(10, 100)],
                  ['7月', random(10, 100)],
                  ['8月', random(10, 100)],
                  ['9月', random(10, 100)],
                  ['10月', random(10, 100)],
                  ['11月', random(10, 100)],
                  ['12月', random(10, 100)],
                ],
              },
            ],
            series: [
              {
                type: 'line',
                symbol: 'none',
                areaStyle: {
                  opacity: 0.1,
                  color: '#1976d2',
                },
                lineStyle: {
                  color: '#1976d2',
                },
                label: {
                  position: 'top',
                  show: true,
                },
                datasetIndex: 0,
              },
            ],
          },
        },
      },
      {
        row: '3',
        widget: {
          type: 'chart-box',
          label: '咨询',
          count: '36',
          params: {
            api: '/api/v3/node/vote/report',
          },
          chart: {
            grid: {
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            },
            xAxis: {
              show: false,
              type: 'category',
            },
            yAxis: {
              show: false,
              type: 'value',
            },
            dataset: [
              {
                source: [
                  ['name', '用户'],
                  ['1月', random(10, 100)],
                  ['2月', random(10, 100)],
                  ['3月', random(10, 100)],
                  ['4月', random(10, 100)],
                  ['5月', random(10, 100)],
                  ['6月', random(10, 100)],
                  ['7月', random(10, 100)],
                  ['8月', random(10, 100)],
                  ['9月', random(10, 100)],
                  ['10月', random(10, 100)],
                  ['11月', random(10, 100)],
                  ['12月', random(10, 100)],
                ],
              },
            ],
            series: [
              {
                type: 'line',
                symbol: 'none',
                areaStyle: {
                  opacity: 0.1,
                  color: '#512da8',
                },
                lineStyle: {
                  color: '#512da8',
                },
                label: {
                  position: 'top',
                  show: true,
                },
                datasetIndex: 0,
              },
            ],
          },
        },
      },
      {
        row: '3',
        widget: {
          type: 'chart-box',
          label: '案件',
          count: '12',
          params: {
            api: '/api/v3/node/vote/report',
          },
          chart: {
            grid: {
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            },
            xAxis: {
              show: false,
              type: 'category',
            },
            yAxis: {
              show: false,
              type: 'value',
            },
            dataset: [
              {
                source: [
                  ['name', '用户'],
                  ['1月', random(1, 10)],
                  ['2月', random(1, 10)],
                  ['3月', random(1, 10)],
                  ['4月', random(1, 10)],
                  ['5月', random(1, 10)],
                  ['6月', random(1, 10)],
                  ['7月', random(1, 10)],
                  ['8月', random(1, 10)],
                  ['9月', random(1, 10)],
                  ['10月', random(1, 10)],
                  ['11月', random(1, 10)],
                  ['12月', random(1, 10)],
                ],
              },
            ],
            series: [
              {
                type: 'line',
                symbol: 'none',
                areaStyle: {
                  opacity: 0.1,
                  color: '#f57f17',
                },
                lineStyle: {
                  color: '#f57f17',
                },
                label: {
                  position: 'top',
                  show: true,
                },
                datasetIndex: 0,
              },
            ],
          },
        },
      },
      {
        row: '3',
        widget: {
          type: 'chart-box',
          label: '工时',
          count: '456',
          params: {
            api: '/api/v3/node/vote/report',
          },
          chart: {
            grid: {
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            },
            xAxis: {
              show: false,
              type: 'category',
            },
            yAxis: {
              show: false,
              type: 'value',
            },
            dataset: [
              {
                source: [
                  ['name', '用户'],
                  ['1月', random(1, 10)],
                  ['2月', random(1, 10)],
                  ['3月', random(1, 10)],
                  ['4月', random(1, 10)],
                  ['5月', random(1, 10)],
                  ['6月', random(1, 10)],
                  ['7月', random(1, 10)],
                  ['8月', random(1, 10)],
                  ['9月', random(1, 10)],
                  ['10月', random(1, 10)],
                  ['11月', random(1, 10)],
                  ['12月', random(1, 10)],
                ],
              },
            ],
            series: [
              {
                type: 'line',
                symbol: 'none',
                areaStyle: {
                  opacity: 0.1,
                  color: '#c2185b',
                },
                lineStyle: {
                  color: '#c2185b',
                },
                label: {
                  position: 'top',
                  show: true,
                },
                datasetIndex: 0,
              },
            ],
          },
        },
      },
      {
        title: {
          label: '最新案件',
        },
        params: {
          api: '/api/v3/xxx',
        },
        row: '6',
        widget: {
          type: 'dynamic-table',
          header: [
            {
              label: '标题',
              key: 'title',
            },
            {
              label: '客户',
              key: 'custom',
            },
            {
              label: '经办人',
              key: 'hander',
            },
            {
              label: '阶段',
              key: 'type',
            },
            {
              label: '业务时间',
              key: 'date',
            },
          ],
          elements: [
            {
              title: '<a href="#">质保金案件</a>',
              custom: '新能源公司',
              hander: '张三',
              type: '一审立案完成',
              date: '2023/03/29',
            },
            {
              title: '<a href="#">赠与合同纠纷</a>',
              custom: '云城租赁',
              hander: '李四',
              type: '二审立案完成',
              date: '2022/09/26',
            },
            {
              title: '<a href="#">仲裁案</a>',
              custom: '建工集团',
              hander: '王五',
              type: '一审开庭确认',
              date: '2023/03/12',
            },
            {
              title: '<a href="#">执行异议</a>',
              custom: '劳务租赁',
              hander: '张三',
              type: '一审立案准备',
              date: '2023/02/21',
            },
            {
              title: '<a href="#">工程施工合同</a>',
              custom: '工程集团',
              hander: '张三',
              type: '一审判决完成',
              date: '2023/02/17',
            },
          ],
        },
      },
      {
        title: {
          label: '最新订单',
        },
        params: {
          apiBak: '/api/v3/xxx',
        },
        row: '6',
        widget: {
          type: 'dynamic-table',
          header: [
            {
              label: '标题',
              key: 'title',
            },
            {
              label: '客户',
              key: 'custom',
            },
            {
              label: '经办人',
              key: 'hander',
            },
            {
              label: '类型',
              key: 'type',
            },
            {
              label: '创建时间',
              key: 'date',
            },
          ],
          elements: [
            {
              title: '<a href="#">二日游合同</a>',
              custom: '药审中心',
              hander: '张三',
              type: '合同审查',
              date: '2023/04/08',
            },
            {
              title: '<a href="#">疗休养合同</a>',
              custom: '检验研究院',
              hander: '李四',
              type: '合同审查',
              date: '2023/04/7',
            },
            {
              title: '<a href="#">保密协议</a>',
              custom: '长三角分中心',
              hander: '王五',
              type: '法律咨询',
              date: '2023/04/7',
            },
            {
              title: '<a href="#">设备采购合同审批</a>',
              custom: '检验研究院',
              hander: '张三',
              type: '合同审查',
              date: '2023/04/03',
            },
            {
              title: '<a href="#">封面设计合同</a>',
              custom: '药检院',
              hander: '张三',
              type: '制度修改',
              date: '2023/04/03',
            },
          ],
        },
      },
      {
        title: {
          label: '工作日历',
        },
        row: '12',
        widget: {
          type: 'full-calendar',
          spacer: 'none',
          calendar: {
            drawer: true,
            apiBak: '/api/v1/demo',
            options: {
              ...calendar.options,
            },
            theme: {
              meeting: 'bg-warn',
              case: 'bg-primary',
              project: 'bg-accent',
              event: 'bg-red',
            },
          },
        },
      },
    ],
  },
};

export const Advert = Template.bind({});
// Raname Story
Advert.storyName = 'Advert';
Advert.args = {
  content: {
    type: 'dashboard',
    elements: [
      {
        title: {
          label: '消费者注册数据',
        },
        params: {
          api: '/api/v3/xxx',
        },
        row: '12',
        form: [
          {
            type: 'mat-select',
            key: 'position',
            defaultValue: 2023,
            className: 'display-block',
            templateOptions: {
              label: '年份',
              description: '请选择年份',
              options: [
                {
                  label: '2023年',
                  value: 2023,
                },
                {
                  label: '2022年',
                  value: 2022,
                },
                {
                  label: '2021年',
                  value: 2021,
                },
                {
                  label: '2020年',
                  value: 2020,
                },
              ],
            },
          },
        ],
        widget: {
          type: 'chart',
          tooltip: {
            trigger: 'axis',
          },
          dataset: [
            {
              source: [
                ['name', '用户'],
                ['1月', random(10, 100)],
                ['2月', random(10, 100)],
                ['3月', random(10, 100)],
                ['4月', random(10, 100)],
                ['5月', random(10, 100)],
                ['6月', random(10, 100)],
                ['7月', random(10, 100)],
                ['8月', random(10, 100)],
                ['9月', random(10, 100)],
                ['10月', random(10, 100)],
                ['11月', random(10, 100)],
                ['12月', random(10, 100)],
              ],
            },
          ],
          grid: {
            left: '40px',
            right: '40px',
            top: '30px',
            bottom: '30px',
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: 'bar',
              label: {
                position: 'top',
                show: true,
              },
              barMaxWidth: '30px',
              datasetIndex: 0,
            },
          ],
        },
      },
      {
        row: '3',
        widget: {
          type: 'chart-box',
          label: '广告发布量',
          count: '5',
          params: {
            api: '/api/v3/node/vote/report',
          },
          chart: {
            grid: {
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            },
            xAxis: {
              show: false,
              type: 'category',
            },
            yAxis: {
              show: false,
              type: 'value',
            },
            dataset: [
              {
                source: [
                  ['name', '广告'],
                  ['1月', random(10, 100)],
                  ['2月', random(10, 100)],
                  ['3月', random(10, 100)],
                  ['4月', random(10, 100)],
                  ['5月', random(10, 100)],
                  ['6月', random(10, 100)],
                  ['7月', random(10, 100)],
                  ['8月', random(10, 100)],
                  ['9月', random(10, 100)],
                  ['10月', random(10, 100)],
                  ['11月', random(10, 100)],
                  ['12月', random(10, 100)],
                ],
              },
            ],
            series: [
              {
                type: 'line',
                symbol: 'none',
                areaStyle: {
                  opacity: 0.1,
                  color: '#1976d2',
                },
                lineStyle: {
                  color: '#1976d2',
                },
                label: {
                  position: 'top',
                  show: true,
                },
                datasetIndex: 0,
              },
            ],
          },
        },
      },
      {
        row: '3',
        widget: {
          type: 'chart-box',
          label: '消费者增长',
          count: '1,156',
          params: {
            api: '/api/v3/node/vote/report',
          },
          chart: {
            grid: {
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            },
            xAxis: {
              show: false,
              type: 'category',
            },
            yAxis: {
              show: false,
              type: 'value',
            },
            dataset: [
              {
                source: [
                  ['name', '用户'],
                  ['1月', random(10, 100)],
                  ['2月', random(10, 100)],
                  ['3月', random(10, 100)],
                  ['4月', random(10, 100)],
                  ['5月', random(10, 100)],
                  ['6月', random(10, 100)],
                  ['7月', random(10, 100)],
                  ['8月', random(10, 100)],
                  ['9月', random(10, 100)],
                  ['10月', random(10, 100)],
                  ['11月', random(10, 100)],
                  ['12月', random(10, 100)],
                ],
              },
            ],
            series: [
              {
                type: 'line',
                symbol: 'none',
                areaStyle: {
                  opacity: 0.1,
                  color: '#512da8',
                },
                lineStyle: {
                  color: '#512da8',
                },
                label: {
                  position: 'top',
                  show: true,
                },
                datasetIndex: 0,
              },
            ],
          },
        },
      },
      {
        row: '3',
        widget: {
          type: 'chart-box',
          label: '门店增长',
          count: '50%',
          params: {
            api: '/api/v3/node/vote/report',
          },
          chart: {
            grid: {
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            },
            xAxis: {
              show: false,
              type: 'category',
            },
            yAxis: {
              show: false,
              type: 'value',
            },
            dataset: [
              {
                source: [
                  ['name', '门店'],
                  ['1月', random(1, 10)],
                  ['2月', random(1, 10)],
                  ['3月', random(1, 10)],
                  ['4月', random(1, 10)],
                  ['5月', random(1, 10)],
                  ['6月', random(1, 10)],
                  ['7月', random(1, 10)],
                  ['8月', random(1, 10)],
                  ['9月', random(1, 10)],
                  ['10月', random(1, 10)],
                  ['11月', random(1, 10)],
                  ['12月', random(1, 10)],
                ],
              },
            ],
            series: [
              {
                type: 'line',
                symbol: 'none',
                areaStyle: {
                  opacity: 0.1,
                  color: '#f57f17',
                },
                lineStyle: {
                  color: '#f57f17',
                },
                label: {
                  position: 'top',
                  show: true,
                },
                datasetIndex: 0,
              },
            ],
          },
        },
      },
      {
        row: '3',
        widget: {
          type: 'chart-box',
          label: '评论量',
          count: '28',
          params: {
            api: '/api/v3/node/vote/report',
          },
          chart: {
            grid: {
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            },
            xAxis: {
              show: false,
              type: 'category',
            },
            yAxis: {
              show: false,
              type: 'value',
            },
            dataset: [
              {
                source: [
                  ['name', '评论'],
                  ['1月', random(10, 100)],
                  ['2月', random(10, 100)],
                  ['3月', random(10, 100)],
                  ['4月', random(10, 100)],
                  ['5月', random(10, 100)],
                  ['6月', random(10, 100)],
                  ['7月', random(10, 100)],
                  ['8月', random(10, 100)],
                  ['9月', random(10, 100)],
                  ['10月', random(10, 100)],
                  ['11月', random(10, 100)],
                  ['12月', random(10, 100)],
                ],
              },
            ],
            series: [
              {
                type: 'line',
                symbol: 'none',
                areaStyle: {
                  opacity: 0.1,
                  color: '#c2185b',
                },
                lineStyle: {
                  color: '#c2185b',
                },
                label: {
                  position: 'top',
                  show: true,
                },
                datasetIndex: 0,
              },
            ],
          },
        },
      },
      {
        title: {
          label: '抽奖数据',
        },
        row: '12',
        widget: {
          type: 'chart',
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            bottom: '10px',
          },
          dataset: [
            {
              source: [
                ['type', '红包', '推广'],
                ['1月', random(10, 100), random(10, 100)],
                ['2月', random(10, 100), random(10, 100)],
                ['3月', random(10, 100), random(10, 100)],
                ['4月', random(10, 100), random(10, 100)],
                ['5月', random(10, 100), random(10, 100)],
                ['6月', random(10, 100), random(10, 100)],
                ['7月', random(10, 100), random(10, 100)],
                ['8月', random(10, 100), random(10, 100)],
                ['9月', random(10, 100), random(10, 100)],
                ['10月', random(10, 100), random(10, 100)],
                ['11月', random(10, 100), random(10, 100)],
                ['12月', random(10, 100), random(10, 100)],
              ],
            },
          ],
          grid: {
            left: '40px',
            right: '40px',
            top: '30px',
            bottom: '60px',
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '红包',
              type: 'bar',
              label: {
                position: 'top',
                show: true,
              },
              barMaxWidth: '30px',
            },
            {
              name: '推广',
              type: 'bar',
              label: {
                position: 'top',
                show: true,
              },
              barMaxWidth: '30px',
            },
          ],
        },
      },
      {
        title: {
          label: '最新广告',
        },
        row: '6',
        params: {
          api: '/api/v3/xxx',
        },
        widget: {
          type: 'dynamic-table',
          header: [
            {
              label: '标题',
              key: 'title',
            },
            {
              label: '中奖',
              key: 'lottery',
            },
            {
              label: '访问',
              key: 'visitor',
            },
            {
              label: '评论',
              key: 'comment',
            },
            {
              label: '结束',
              key: 'end',
            },
          ],
          elements: [
            {
              title: '<a href="#">清明特惠，赢面单啦</a>',
              lottery: '110',
              visitor: '620',
              comment: '0',
              end: '2023/04/11 23:59:59',
            },
            {
              title: '<a href="#">城盛百汇周末特惠 会员1元换购大米/面粉</a>',
              lottery: '66',
              visitor: '415',
              comment: '1',
              end: '2023/03/29 23:59:59',
            },
            {
              title:
                '<a href="#">九要“拾”惠 精品汇选 养生开始 每日10款限时秒杀</a>',
              lottery: '7',
              visitor: '181',
              comment: '0',
              end: '2022/12/30 23:59:59',
            },
            {
              title:
                '<a href="#">金秋丰收季，爆款惠不停（文末福利持续加码中）</a>',
              lottery: '4',
              visitor: '365',
              comment: '0',
              end: '2022/11/30 23:59:59',
            },
          ],
        },
      },
      {
        title: {
          label: '最新评论',
        },
        row: '6',
        params: {
          api: '/api/v3/xxx',
        },
        widget: {
          type: 'dynamic-table',
          header: [
            {
              label: '内容',
              key: 'body',
            },
            {
              label: '评论人',
              key: 'user',
            },
            {
              label: '标题',
              key: 'title',
            },
            {
              label: '时间',
              key: 'date',
            },
          ],
          elements: [
            {
              title:
                '<a href="#">九要“拾”惠 精品汇选 养生开始 每日10款限时秒杀</a>',
              user: '用户ERSyAUCP',
              body: '看起来不错！',
              date: '2023/04/01',
            },
            {
              title: '<a href="#">城盛百汇周末特惠 会员1元换购大米/面粉</a>',
              user: '用户FGDDDES',
              body: '为什么超出范围？',
              date: '2023/03/28',
            },
            {
              title:
                '<a href="#">金秋丰收季，爆款惠不停（文末福利持续加码中）</a>',
              user: '用户PIJFN',
              body: '可以多一些这样的好物！',
              date: '2023/02/18',
            },
            {
              title: '<a href="#">清明特惠，赢面单啦</a>',
              user: '用户WQUDJD',
              body: '这个超市挺实惠，活动挺多！',
              date: '2023/02/01',
            },
          ],
        },
      },
      {
        title: {
          label: '活动日历',
        },
        row: '12',
        widget: {
          type: 'full-calendar',
          spacer: 'none',
          calendar: {
            drawer: true,
            apiBak: '/api/v1/demo',
            options: {
              ...calendar.options,
            },
            theme: {
              meeting: 'bg-warn',
              case: 'bg-primary',
              project: 'bg-accent',
              event: 'bg-red',
            },
          },
        },
      },
    ],
  },
};
