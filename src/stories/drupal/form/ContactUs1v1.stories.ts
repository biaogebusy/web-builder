import { moduleMetadata, Meta, applicationConfig, StoryObj } from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { ContactUs1v1Component } from '@uiux/combs/form/contact-us1v1/contact-us1v1.component';
import { IContactUs1v1 } from '@core/interface/combs/IForm';
import { importProvidersFrom } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';

const meta: Meta<ContactUs1v1Component> = {
  title: 'Drupal/表单/联系我们 1v1',
  id: 'contact-us-1v1',
  component: ContactUs1v1Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      imports: [FormlyModule.forRoot()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<ContactUs1v1Component>;
export const Default: Story = {};
Default.storyName = '默认';
const content: IContactUs1v1 = {
  type: 'contact-us-1v1',
  text: {
    title: {
      label: '联系我们',
      style: 'style-v1',
      classes: 'mat-headline-3',
    },
    classes: 'text-light text-center',
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
      fieldGroupClassName: 'flex flex-wrap',
      fieldGroup: [
        {
          type: 'input',
          key: 'name',
          className: 'w-2/5 m-right-sm',
          props: {
            label: '姓名',
            required: true,
          },
        },
        {
          type: 'input',
          key: 'email',
          className: 'w-2/5 m-right-sm',
          props: {
            label: '邮箱',
            required: true,
          },
        },
        {
          type: 'input',
          key: 'subject',
          className: 'w-2/5 m-right-sm',
          props: {
            label: '主题',
            required: true,
          },
        },
        {
          type: 'textarea',
          key: 'message',
          className: 'w-full',
          props: {
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
    background: 'url("/assets/images/showcase/pattern-02.png") no-repeat center center',
  },
};
Default.args = {
  content,
};
