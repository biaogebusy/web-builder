import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { RenderModule } from '@modules/render/render.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NodeModule } from '@uiux/combs/node/node.module';
import { DashboardComponent } from '@uiux/combs/dashboard/dashboard.component';
import * as calendarStory from '@stories/widgets/Calendar.stories';
import { random } from 'lodash-es';
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { manageHeader } from '@modules/builder/data/Branding.json';
import { IDashboard } from '@core/interface/combs/IDashboard';
const calendar: any = calendarStory.Default.args;

const meta: Meta<DashboardComponent> = {
  title: '示例页面/中台管理/工作面板',
  id: 'dashboard',
  component: DashboardComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        MatSidenavModule,
        RenderModule,
        NodeModule,
        BrandingModule,
        StorysModule.forRoot(),
      ],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ header: manageHeader }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      <mat-drawer-container>
      <mat-drawer #manageDrawer id="sidebar" class="sidebar" mode="side" [opened]="true">
        <app-manage-sidebar [drawer]="manageDrawer"></app-manage-sidebar>
      </mat-drawer>
      <mat-drawer-content id="main-container">
        <app-header *ngIf="!(isBuilderPage$|async)"></app-header>
        <div class="main" [ngClass]="{'has-manage-sidebar': true}">
          ${story}
        </div>
      </mat-drawer-content>
    </mat-drawer-container>
    `,
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<DashboardComponent>;
export const Order: Story = {};
Order.storyName = 'Order';
const oreder: IDashboard = {
  type: 'dashboard',
  elements: [
    {
      title: {
        label: '内容发布量',
      },
      row: 12,
      params: {
        apiBak: '/api/v3/xxx',
      },
      form: [
        {
          type: 'mat-select',
          key: 'position',
          defaultValue: 2023,
          className: 'block',
          props: {
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
              ['name', '内容'],
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
      row: 3,
      widget: {
        type: 'chart-box',
        label: '文章数',
        count: '25',
        params: {
          apiBak: '/api/v3/xxx',
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
                ['name', '文章数'],
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
      row: 3,
      widget: {
        type: 'chart-box',
        label: '审核数',
        count: '36',
        params: {
          apiBak: '/api/v3/node/vote/report',
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
                ['name', '审核数'],
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
      row: 3,
      widget: {
        type: 'chart-box',
        label: '用户数',
        count: '12',
        params: {
          apiBak: '/api/v3/node/vote/report',
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
      row: 3,
      widget: {
        type: 'chart-box',
        label: '评论数',
        count: '456',
        params: {
          apiBak: '/api/v3/node/vote/report',
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
        label: '最新文章',
      },
      params: {
        apiBak: '/api/v3/xxx',
      },
      row: 6,
      widget: {
        type: 'dynamic-table',
        header: [
          {
            label: '标题',
            key: 'title',
          },
          {
            label: '分类',
            key: 'custom',
          },
          {
            label: '作者',
            key: 'hander',
          },
          {
            label: '状态',
            key: 'type',
          },
          {
            label: '创建时间',
            key: 'date',
          },
        ],
        elements: [
          {
            title: '<a href="#">探索机器学习的前沿技术</a>',
            custom: '人工智能',
            hander: '张华',
            type: '已审核',
            date: '2023/04/08',
          },
          {
            title: '<a href="#">未来的可持续能源解决方案</a>',
            custom: '环境科学',
            hander: '李明',
            type: '待审核',
            date: '2023/04/7',
          },
          {
            title: '<a href="#">瑜伽与身心健康的关系探究</a>',
            custom: '健康与健身',
            hander: '王琳',
            type: '已审核',
            date: '2023/04/7',
          },
          {
            title: '<a href="#">最新的前端开发趋势与技术</a>',
            custom: '技术与编程',
            hander: '刘强',
            type: '已审核',
            date: '2023/04/03',
          },
          {
            title: '<a href="#">未来智能家居的发展趋势与挑战</a>',
            custom: '科技与创新',
            hander: '陈晓阳',
            type: '待审核',
            date: '2023/04/03',
          },
        ],
      },
    },
    {
      title: {
        label: '最新审批',
      },
      params: {
        apiBak: '/api/v3/xxx',
      },
      row: 6,
      widget: {
        type: 'dynamic-table',
        header: [
          {
            label: '标题',
            key: 'title',
          },
          {
            label: '部门',
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
            title: '<a href="#">年度预算审批</a>',
            custom: '财务部',
            hander: '张华',
            type: '财务审批',
            date: '2023/04/08',
          },
          {
            title: '<a href="#">新员工入职申请</a>',
            custom: '人力资源部',
            hander: '李明',
            type: '人事审批',
            date: '2023/04/7',
          },
          {
            title: '<a href="#">项目变更申请</a>',
            custom: '项目管理办公室',
            hander: '王琳',
            type: '项目审批',
            date: '2023/04/7',
          },
          {
            title: '<a href="#">采购订单审批</a>',
            custom: '采购部',
            hander: '刘强',
            type: '采购审批',
            date: '2023/04/03',
          },
          {
            title: '<a href="#">请假申请</a>',
            custom: '行政部',
            hander: '陈晓阳',
            type: '行政审批',
            date: '2023/04/03',
          },
        ],
      },
    },
    {
      title: {
        label: '工作日历',
      },
      row: 12,
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
};
Order.args = {
  content: oreder,
};

export const Advert: Story = {};
// Raname Story
Advert.storyName = 'Advert';
const advert: IDashboard = {
  type: 'dashboard',
  elements: [
    {
      title: {
        label: '消费者注册数据',
      },
      params: {
        apiBak: '/api/v3/xxx',
      },
      row: 12,
      form: [
        {
          type: 'mat-select',
          key: 'position',
          defaultValue: 2023,
          className: 'block',
          props: {
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
      row: 3,
      widget: {
        type: 'chart-box',
        label: '广告发布量',
        count: '5',
        params: {
          apiBak: '/api/v3/node/vote/report',
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
      row: 3,
      widget: {
        type: 'chart-box',
        label: '消费者增长',
        count: '1,156',
        params: {
          apiBak: '/api/v3/node/vote/report',
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
      row: 3,
      widget: {
        type: 'chart-box',
        label: '门店增长',
        count: '50%',
        params: {
          apiBak: '/api/v3/node/vote/report',
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
      row: 3,
      widget: {
        type: 'chart-box',
        label: '评论量',
        count: '28',
        params: {
          apiBak: '/api/v3/node/vote/report',
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
      row: 12,
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
      row: 6,
      params: {
        apiBak: '/api/v3/xxx',
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
      row: 6,
      params: {
        apiBak: '/api/v3/xxx',
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
      row: 12,
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
};
Advert.args = {
  content: advert,
};
