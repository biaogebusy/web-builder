import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { FormlyComponent } from '@uiux/widgets/form/formly/formly.component';
import { FormGroup } from '@angular/forms';
import { StorysModule } from '@core/storys.module';

export default {
  title: '基础组件/表单',
  id: 'form',
  component: FormlyComponent,
  subcomponents: { FormlyComponent },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `
      ${story}
      <mat-divider></mat-divider>
      <p class="p-y-sm p-x-sm bg-shadow">
      {{model|json}}
      </p>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `基于 ngx-Formly 封装的响应式表单，可通过JSON进行构建，可灵活的设置校验和显示条件。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
const form = new FormGroup({});
const model: any = {};

export const Default = Template.bind({});
Default.storyName = '预览';
Default.args = {
  form,
  model,
  fields: [
    {
      type: 'input',
      key: 'total',
      defaultValue: 300,
      className: 'display-block m-bottom-sm',
      templateOptions: {
        label: '大额红包总金额',
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
      key: 'Textarea',
      type: 'textarea',
      className: 'display-block m-bottom-sm',
      templateOptions: {
        label: '文本域',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
      },
    },
    {
      key: 'Checkbox',
      type: 'checkbox',
      className: 'display-block m-bottom-sm',
      templateOptions: {
        label: '接受协议',
        description: '为了更好的服务，网站将收集用户的Cookies信息。',
        pattern: 'true',
        required: true,
      },
      validation: {
        messages: {
          pattern: '请勾选协议',
        },
      },
    },
    {
      key: 'Radio',
      type: 'radio',
      className: 'display-block m-bottom-sm',
      templateOptions: {
        label: '单选框',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
        options: [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
          { value: 4, label: 'Option 4', disabled: true },
        ],
      },
    },
    {
      type: 'select',
      key: 'type',
      defaultValue: 'fixed',
      className: 'display-block m-bottom-sm',
      templateOptions: {
        label: '下拉单选',
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
      type: 'mat-select',
      key: 'customer',
      className: 'display-block m-bottom-sm',
      templateOptions: {
        multiple: true,
        search: true,
        hideSelected: true,
        label: '下拉多选',
        options: [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
          { value: 4, label: 'Option 4', disabled: true },
        ],
      },
    },
    {
      type: 'date-range',
      key: 'date',
      templateOptions: {
        label: '期间',
        value: '',
        placeholder: '请选择日期',
      },
      className: 'display-block m-bottom-sm',
      fieldGroup: [
        {
          type: 'input',
          key: 'start',
        },
        {
          type: 'input',
          key: 'end',
        },
      ],
    },
    {
      key: 'isPromote',
      type: 'toggle',
      className: 'display-block m-bottom',
      templateOptions: {
        label: '开关',
        description: '超过推广次数则推广结束',
      },
    },
  ],
};

export const Group = Template.bind({});
Group.storyName = '分组';
Group.args = {
  form,
  model,
  fields: [
    {
      key: 'max',
      className: 'm-bottom-sm',
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
          className: 'm-right-sm',
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
      className: 'm-bottom-sm',
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
  ],
};

export let HideExpression = Template.bind({});
HideExpression.storyName = '条件隐藏';
HideExpression.args = {
  form,
  model,
  fields: [
    {
      key: 'promote',
      fieldGroupClassName: 'display-flex flex-wrap',
      fieldGroup: [
        {
          type: 'select',
          key: 'type',
          defaultValue: 'fixed',
          className: 'm-bottom-sm m-right-sm',
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
};
