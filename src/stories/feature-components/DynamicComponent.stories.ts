import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { DynamicComponentComponent } from '@uiux/widgets/dynamic-component/dynamic-component.component';
import * as action1v1 from '../components/action/Action1v1.stories';

export default {
  title: '特色组件/动态组件',
  id: 'dynamic-component',
  component: DynamicComponentComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `动态组件接受两种输入：<br>1. Langding Page 着陆页只接受content；<br>2. 其他组件例如dialog, dynamicWidgets组件除了content可能还有其他data, form等输入；<br>动态组件会在逻辑上进行判断处理匹配这两种输入；`,
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
const active: any = action1v1.Default.args;
Default.storyName = '单个输入';
Default.args = {
  inputs: {
    ...active.content,
  },
};

export const MultiInputs = Template.bind({});
MultiInputs.storyName = '多个输入';
MultiInputs.args = {
  inputs: {
    content: {
      type: 'dynamic-form',
      form: [
        {
          type: 'input',
          key: 'title',
          label: '标题',
          placeholder: '请输入问题',
          params: {
            required: true,
          },
          errorMes: '问题必填',
        },
        {
          type: 'textarea',
          key: 'body',
          label: '问题描述',
          placeholder: '请输入问题描述（可选）',
        },
      ],
    },
    actions: [
      {
        label: '发布问题',
        color: 'primary',
        params: {
          type: 'question',
          snackMes: '您的问题已经发布',
        },
      },
    ],
  },
};
