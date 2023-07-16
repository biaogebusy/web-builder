import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { ContactUs1v1Component } from '@uiux/combs/form/contact-us1v1/contact-us1v1.component';
import { IContactUs1v1 } from '@core/interface/combs/IForm';

export default {
  title: 'Drupal/表单/联系我们 1v1',
  id: 'contact-us-1v1',
  component: ContactUs1v1Component,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '默认';
const content: IContactUs1v1 = {
  type: 'contact-us-1v1',
  text: {
    title: {
      label: '联系我们',
      style: 'style-v1',
      classes: 'mat-display-1',
    },
    classes: 'text-light',
    body: '如果您有任何需要帮助，请联系我们！',
  },
  classes: 'text-center',
  bg: {
    classes: '',
  },
  params: {
    webform_id: 'contact',
  },
  form: [
    {
      key: 'form',
      className: 'm-bottom-sm',
      fieldGroupClassName: 'display-flex flex-wrap',
      fieldGroup: [
        {
          type: 'input',
          key: 'name',
          className: 'width-40 m-right-sm',
          templateOptions: {
            label: '姓名',
            required: true,
          },
        },
        {
          type: 'input',
          key: 'email',
          className: 'width-40 m-right-sm',
          templateOptions: {
            label: '邮箱',
            required: true,
          },
        },
        {
          type: 'input',
          key: 'subject',
          className: 'width-40 m-right-sm',
          templateOptions: {
            label: '主题',
            required: true,
          },
        },
        {
          type: 'textarea',
          key: 'message',
          className: 'width-100',
          templateOptions: {
            label: '内容',
            rows: 8,
            required: true,
          },
        },
      ],
    },
  ],
  action: {
    type: 'btn',
    color: 'primary',
    mode: 'raised',
    label: '提交',
  },
  content: [
    {
      type: 'text',
      spacer: 'none',
      classes: 'text-left',
      body: '邮箱：349255833@qq.com<br>电话：0771-6890xxx<br>地址：创客城2栋<br>',
    },
  ],
  contentStyle: {
    background:
      'url("/assets/images/showcase/pattern-02.png") no-repeat center center',
  },
};
Default.args = {
  content,
};
