import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { initConfig } from 'src/app/app.module';
import { LotteryComponent } from '@uiux/combs/calculator/lottery/lottery.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/core.config';
import { CalculatorModule } from '@uiux/combs/calculator/calculator.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { DateRangeComponent } from '@uiux/widgets/form/formly-type/date-range/date-range.component';
import { MatSelectComponent } from '@uiux/widgets/form/formly-type/mat-select/mat-select.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormGroup } from '@angular/forms';

export default {
  title: '特色组件/计算器/红包预算',
  component: LotteryComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        CalculatorModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSliderModule,
        FormlyMaterialModule,
        FormlyMatSliderModule,
        FormlyMatToggleModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'mat-select',
              component: MatSelectComponent,
            },
            {
              name: 'date-range',
              component: DateRangeComponent,
            },
          ],
          validationMessages: [
            { name: 'required', message: '该字段必填' },
            {
              name: 'max',
              message: '不能超过最大值',
            },
            {
              name: 'min',
              message: '不能小于最小值',
            },
          ],
        }),
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        SafeHtmlPipe,
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
      (story) => `
      ${story}
      <p>
      {{model|json}}
      </p>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `通过红包预算计算器可以方便直观的查看活动的预算金额，进而营销活动。`,
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
const form = new FormGroup({});
const model: any = {};
Default.args = {
  model,
  form,
  content: {
    text: {
      spacer: 'md',
      title: {
        label: '红包抽奖预算计算器',
        style: 'style-v1',
      },
      classes: 'text-center',
      body: '输入指标，自动计算出预算，指导市场营销计划。',
    },
    form: [
      {
        key: 'max',
        className: 'm-bottom',
        fieldGroupClassName: 'display-flex flex-wrap',
        fieldGroup: [
          {
            type: 'input',
            key: 'total',
            defaultValue: 300,
            className: 'm-right-sm',
            templateOptions: {
              label: '大额红包总金额',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 10,
              max: 10000,
              description: '最小10元，最大10000元',
            },
            validation: {
              messages: {
                min: '不能设置小于 10',
                max: '不能设置大于 10000',
              },
            },
          },
          {
            type: 'input',
            key: 'per',
            defaultValue: 10,
            templateOptions: {
              label: '大额红包平均每次可抽得',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 0.5,
              max: 100,
              description: '最小0.5元，最大100元',
            },
            validation: {
              messages: {
                min: '不能设置小于 0.5',
                max: '不能设置大于 100',
              },
            },
          },
        ],
      },
      {
        key: 'min',
        className: 'm-bottom',
        fieldGroupClassName: 'display-flex flex-wrap',
        fieldGroup: [
          {
            type: 'input',
            key: 'total',
            defaultValue: 500,
            className: 'm-right-sm',
            templateOptions: {
              label: '小额红包总金额',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 100,
              max: 10000,
              description: '最小100元，最大10000元',
            },
            validation: {
              messages: {
                min: '不能设置小于 100',
                max: '不能设置大于 10000',
              },
            },
          },
          {
            type: 'input',
            key: 'per',
            defaultValue: 0.8,
            templateOptions: {
              label: '小额红包平均每次可抽得',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 0.1,
              max: 2,
              description: '最小0.1元，最大2元',
            },
            validation: {
              messages: {
                min: '不能设置小于 0.1',
                max: '不能设置大于 2',
              },
            },
          },
        ],
      },
      {
        key: 'isPromote',
        type: 'toggle',
        className: 'width-100 m-bottom',
        templateOptions: {
          label: '开启推广提成',
          description: '超过推广次数则推广结束',
        },
      },
      {
        key: 'promote',
        fieldGroupClassName: 'display-flex flex-wrap',
        fieldGroup: [
          {
            type: 'select',
            key: 'type',
            defaultValue: 'fixed',
            className: 'width-100 m-bottom-sm m-right-sm',
            templateOptions: {
              label: '选择提成方式',
              description: '固定金额或者按比例',
              options: [
                {
                  label: '固定金额',
                  value: 'fixed',
                },
                {
                  label: '比例',
                  value: 'prop',
                },
              ],
            },
          },
          {
            type: 'input',
            key: 'fixedTimes',
            defaultValue: 100,
            className: 'm-right-sm m-bottom-sm',
            templateOptions: {
              label: '推广成功总次数',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 5,
              max: 500,
              description: '预测推广成功总次数',
            },
            validation: {
              messages: {
                min: '不能设置小于 5',
                max: '不能设置大于 500',
              },
            },
            hideExpression: 'model.type=="prop"',
          },
          {
            type: 'input',
            key: 'fixedMoney',
            defaultValue: 2,
            className: 'm-bottom-sm',
            templateOptions: {
              label: '每次推广可得金额/元',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 1,
              max: 100,
              description: '推广员推广一次固定的提成金额',
            },
            validation: {
              messages: {
                min: '不能设置小于 1',
                max: '不能设置大于 100',
              },
            },
            hideExpression: 'model.type=="prop"',
          },
          {
            type: 'input',
            key: 'maxTimes',
            defaultValue: 15,
            className: 'm-right-sm m-bottom-sm',
            templateOptions: {
              label: '大额推广成功总次数',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 5,
              max: 500,
              description: '预测大额红包推广成功总次数',
            },
            validation: {
              messages: {
                min: '不能设置小于 5',
                max: '不能设置大于 500',
              },
            },
            hideExpression: 'model.type=="fixed"',
          },
          {
            type: 'input',
            key: 'minTimes',
            defaultValue: 300,
            className: 'm-right-sm m-bottom-sm',
            templateOptions: {
              label: '小额推广成功总次数',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 5,
              max: 500,
              description: '预测小额红包推广成功总次数',
            },
            validation: {
              messages: {
                min: '不能设置小于 5',
                max: '不能设置大于 500',
              },
            },
            hideExpression: 'model.type=="fixed"',
          },
          {
            type: 'input',
            key: 'prop',
            defaultValue: 80,
            templateOptions: {
              label: '每次推广可得比例%',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 1,
              max: 500,
              description: '最小 1% 到 最大500%',
            },
            hideExpression: 'model.type=="fixed"',
          },
        ],
      },
    ],
    chart: {
      color: ['#0071a2', '#00A281', '#8200a2'],
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: '0',
      },
      series: [
        {
          name: '预算占比',
          type: 'pie',
          radius: '50%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    },
    description:
      '<ul class="list-done"><li>总金额 = 红包总金额（大额+小额）+ 推广金额</li><li>当红包总金额没有余额时不可再抽奖</li><li>推广总金额没有余额时停止推广</li><li>推广员按比例所得：用户抽得金额*推广比例</li><li>以上参数只是预估，实际业务中会有变差，仅做参考</li></ul>',
  },
};
