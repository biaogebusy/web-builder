import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { FormlyComponent } from '@uiux/widgets/form/formly/formly.component';
import { FormGroup } from '@angular/forms';
import { StorysModule } from '@core/module/storys.module';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<FormlyComponent> = {
  title: '基础组件/表单',
  id: 'form',
  component: FormlyComponent,
  subcomponents: { FormlyComponent },
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(
      story => `
      ${story}
      <mat-divider></mat-divider>
      <p class="widget m-5 bg-shadow">
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
};

export default meta;
const form = new FormGroup({});
const options: any = {};
const model: any = {};

type Story = StoryObj<FormlyComponent>;
export const Default: Story = {};
Default.storyName = '预览';
const base: FormlyFieldConfig[] = [
  {
    type: 'input',
    key: 'total',
    defaultValue: 300,
    className: 'block m-bottom-sm',
    props: {
      label: '大额红包总金额',
      type: 'number',
      required: true,
      min: 10,
      max: 10000,
      description: '最小10元，最大10000元',
    },
    validation: {
      show: true,
      messages: {
        min: '不能设置小于 10',
        max: '不能设置大于 10000',
      },
    },
  },
  {
    className: 'w-full m-bottom-md',
    template: '<div><strong>地址:</strong></div>',
  },
  {
    key: 'Textarea',
    type: 'textarea',
    className: 'block m-bottom-sm',
    props: {
      label: '文本域',
      placeholder: 'Placeholder',
      description: 'Description',
      required: true,
    },
  },
  {
    key: 'Checkbox',
    type: 'checkbox',
    className: 'block m-bottom-sm',
    props: {
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
    className: 'block m-bottom-sm',
    props: {
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
    className: 'block m-bottom-sm',
    props: {
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
    className: 'block m-bottom-sm',
    props: {
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
    props: {
      label: '期间',
      value: '',
      placeholder: '请选择日期',
    },
    className: 'block m-bottom-sm',
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
    className: 'block m-bottom',
    props: {
      label: '开关',
      description: '超过推广次数则推广结束',
    },
  },
];
Default.args = {
  form,
  model,
  options,
  fields: base,
};

export const Group: Story = {};
Group.storyName = '分组';
const group: FormlyFieldConfig[] = [
  {
    key: 'max',
    className: 'm-bottom-sm',
    fieldGroupClassName: 'flex flex-wrap',
    fieldGroup: [
      {
        type: 'input',
        key: 'total',
        defaultValue: 300,
        className: 'm-right-sm',
        props: {
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
        props: {
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
    fieldGroupClassName: 'flex flex-wrap',
    fieldGroup: [
      {
        type: 'input',
        key: 'total',
        defaultValue: 500,
        className: 'm-right-sm',
        props: {
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
        props: {
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
];
Group.args = {
  form,
  model,
  options,
  fields: group,
};

export const HideExpression: Story = {};
HideExpression.storyName = '条件隐藏';
const hide: FormlyFieldConfig[] = [
  {
    key: 'promote',
    fieldGroupClassName: 'flex flex-wrap',
    fieldGroup: [
      {
        type: 'select',
        key: 'type',
        defaultValue: 'fixed',
        className: 'm-bottom-sm m-right-sm',
        props: {
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
        props: {
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
        props: {
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
        props: {
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
        props: {
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
        props: {
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
];
HideExpression.args = {
  form,
  model,
  options,
  fields: hide,
};

export const ExpressionProperties: Story = {};
ExpressionProperties.storyName = '动态更新属性';
const expression: FormlyFieldConfig[] = [
  {
    key: 'text',
    type: 'input',
    props: {
      label: 'Text',
      placeholder: '请输入您的姓名',
    },
  },
  {
    key: 'text2',
    type: 'input',
    props: {
      label: 'Hey!',
      placeholder: '请输入您的学号',
    },
    expressionProperties: {
      'props.disabled': '!model.text',
    },
  },
];
ExpressionProperties.args = {
  form,
  model,
  options,
  fields: expression,
};

export const Style: Story = {};
Style.storyName = '外观';
const style: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    className: 'm-right-sm m-bottom-sm',
    props: {
      label: '姓名',
      appearance: 'legacy',
      placeholder: '请输入您的姓名',
    },
  },
  {
    key: 'age',
    type: 'input',
    className: 'm-right-sm m-bottom-sm',
    props: {
      label: '年龄',
      appearance: 'standard',
      placeholder: '年龄',
    },
  },
  {
    key: 'where',
    type: 'input',
    className: 'm-right-sm m-bottom-sm',
    props: {
      label: '籍贯',
      appearance: 'fill',
      placeholder: '籍贯',
    },
  },
  {
    key: 'height',
    type: 'input',
    className: 'm-right-sm m-bottom-sm',
    props: {
      label: '身高',
      appearance: 'outline',
      placeholder: '身高',
    },
  },
];
Style.args = {
  form,
  model,
  options,
  fields: style,
};

export const Responsive: Story = {};
Responsive.storyName = '响应式';
const responsive: FormlyFieldConfig[] = [
  {
    type: 'slider',
    key: 'xs',
    className: 'w-full',
    props: {
      label: '移动端',
      min: 1,
      max: 12,
      thumbLabel: true,
    },
  },
  {
    type: 'slider',
    key: 'sm',
    className: 'w-full',
    props: {
      label: '平板电脑',
      min: 1,
      max: 12,
      thumbLabel: true,
    },
  },
  {
    type: 'slider',
    key: 'md',
    className: 'w-full',
    props: {
      label: '桌面电脑',
      min: 1,
      max: 12,
      thumbLabel: true,
    },
  },
  {
    type: 'slider',
    key: 'lg',
    className: 'w-full',
    props: {
      label: '超大桌面',
      min: 1,
      max: 12,
      thumbLabel: true,
    },
  },
];

Responsive.args = {
  form,
  model,
  options,
  fields: responsive,
};

export const Pattern: Story = {};
Pattern.storyName = '模式匹配';
const use: FormlyFieldConfig[] = [
  {
    key: 'firstName',
    type: 'input',
    props: {
      label: '姓',
    },
  },
  {
    key: 'lastName',
    type: 'input',
    props: {
      label: '名',
    },
  },
  {
    key: 'mac',
    type: 'input',
    props: {
      label: '电脑 Mac 地址',
      pattern: '([0-9A-F]{2}[:-]){5}([0-9A-F]{2})',
    },
  },
  {
    key: 'color',
    type: 'input',
    props: {
      label: '颜色偏爱',
    },
  },
  {
    key: 'reason',
    type: 'textarea',
    props: {
      label: '理由?',
    },
    expressionProperties: {
      'props.label': '\'为什么选择 \' + model.color + \'?\'',
    },
    hideExpression: '!model.color',
  },
];

Pattern.args = {
  form,
  model,
  options,
  fields: use,
};

export const CascadedSelect: Story = {};
CascadedSelect.storyName = '级联选择';
const cascadedSelectOption: FormlyFormOptions = {
  formState: {
    selectOptionsData: {
      teams: [
        { id: '1', name: 'Bayern Munich', sportId: '1' },
        { id: '2', name: 'Real Madrid', sportId: '1' },
        { id: '3', name: 'Cleveland', sportId: '2' },
        { id: '4', name: 'Miami', sportId: '2' },
      ],
      players: [
        { id: '1', name: 'Bayern Munich (Player 1)', teamId: '1' },
        { id: '2', name: 'Bayern Munich (Player 2)', teamId: '1' },
        { id: '3', name: 'Real Madrid (Player 1)', teamId: '2' },
        { id: '4', name: 'Real Madrid (Player 2)', teamId: '2' },
        { id: '5', name: 'Cleveland (Player 1)', teamId: '3' },
        { id: '6', name: 'Cleveland (Player 2)', teamId: '3' },
        { id: '7', name: 'Miami (Player 1)', teamId: '4' },
        { id: '8', name: 'Miami (Player 2)', teamId: '4' },
      ],
    },
  },
};

const cascadedSelectFields: FormlyFieldConfig[] = [
  {
    key: 'sport',
    type: 'select',
    props: {
      label: 'Sport',
      options: [
        { id: '1', name: 'Soccer' },
        { id: '2', name: 'Basketball' },
      ],
      valueProp: 'id',
      labelProp: 'name',
    },
  },
  {
    key: 'team',
    type: 'select',
    props: {
      label: 'Team',
      options: [],
      valueProp: 'id',
      labelProp: 'name',
    },
    expressionProperties: {
      'props.options':
        'formState.selectOptionsData.teams.filter(team => team.sportId === model.sport)',
      // reset model when updating select options
      'model.team': `field.props.options.find(o => o.id === model.team) ? model.team:null`,
    },
  },
  {
    key: 'player',
    type: 'select',
    props: {
      label: 'Player',
      options: [],
      valueProp: 'id',
      labelProp: 'name',
    },
    expressionProperties: {
      'props.options':
        'formState.selectOptionsData.players.filter(player => player.teamId === model.team)',
      // reset model when updating select options
      'model.player': `field.props.options.find(o => o.id === model.player) ? model.player:null`,
    },
  },
];

CascadedSelect.args = {
  form,
  model,
  fields: cascadedSelectFields,
  options: cascadedSelectOption,
};

export const ModelOption: Story = {};
ModelOption.storyName = 'Model 选项';
const modelOptionFields: FormlyFieldConfig[] = [
  {
    key: 'text',
    type: 'input',
    modelOptions: {
      debounce: {
        default: 2000,
      },
    },
    props: {
      label: 'Debounce',
    },
  },
  {
    key: 'updateOnBlur',
    type: 'input',
    modelOptions: {
      updateOn: 'blur',
    },
    props: {
      label: '`updateOn` on Blur',
      required: true,
    },
  },
  {
    key: 'updateOnSubmit',
    type: 'input',
    modelOptions: {
      updateOn: 'submit',
    },
    props: {
      label: '`updateOn` on Submit',
      required: true,
    },
  },
];

ModelOption.args = {
  form,
  model,
  options,
  fields: modelOptionFields,
};

export const ImgPicker: Story = {};
ImgPicker.storyName = '图片选择器';
ImgPicker.args = {
  form,
  model,
  options,
  fields: [
    {
      className: 'flex',
      fieldGroup: [
        {
          key: 'src',
          type: 'img-picker',
          className: 'w-2/5',
          defaultValue: '/assets/images/avatar/01.jpeg',
          props: {
            updateLabel: '更新背景图',
            addLabel: '设置背景图',
            deleteLabel: '删除',
          },
        },
      ],
    },
  ],
};

export const RichText: Story = {};
RichText.storyName = '富文本';
RichText.args = {
  form,
  model,
  options,
  fields: [
    {
      fieldGroupClassName: 'flex',
      fieldGroup: [
        {
          key: 'text',
          type: 'rich-text',
          props: {
            label: '富文本',
            rows: 10,
          },
        },
      ],
    },
  ],
};
