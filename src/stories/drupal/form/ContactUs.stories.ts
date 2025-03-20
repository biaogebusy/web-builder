import { moduleMetadata, Meta, StoryObj, applicationConfig } from '@storybook/angular';

import { ContactUsComponent } from '@uiux/combs/form/contact-us/contact-us.component';
import { StorysModule } from '@core/module/storys.module';
import { importProvidersFrom } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
const meta: Meta<ContactUsComponent> = {
  title: 'Drupal/表单/联系我们',
  id: 'contact-us',
  component: ContactUsComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      imports: [FormlyModule.forRoot()],
    }),
  ],
};

export default meta;
type Story = StoryObj<ContactUsComponent>;
export const Default: Story = {};

Default.args = {
  content: {
    type: 'contact-us',
    params: {
      webform_id: 'contact',
    },
    bg: {
      classes: 'bg-fill-width',
      icon: 'wave',
    },
    action: {
      label: '提交表单',
    },
    formOrder: '1',
    contact: [
      {
        title: {
          label: '地址',
        },
        icon: {
          name: 'location_on',
        },
        style: 'style-v7 small-box',
        content: '创客城2栋',
      },
      {
        title: {
          label: '电话号码',
        },
        style: 'style-v7 small-box',
        icon: {
          name: 'phone',
        },
        content: '+086 0771xxxx',
      },
      {
        title: {
          label: '邮件',
        },
        style: 'style-v7 small-box',
        icon: {
          name: 'mail',
        },
        content: 'service@example.com',
      },
      {
        title: {
          label: '微信',
        },
        style: 'style-v7 small-box',
        icon: {
          name: 'chat_bubble',
        },
        content: 'biaogebusy',
      },
    ],
    form: [
      {
        type: 'input',
        key: 'name',
        className: 'w-full',
        props: {
          label: '姓名',
          appearance: 'outline',
          required: true,
        },
      },
      {
        type: 'input',
        key: 'email',
        className: 'w-full',
        props: {
          label: '邮箱',
          appearance: 'outline',
          required: true,
        },
      },
      {
        type: 'input',
        key: 'subject',
        className: 'w-full',
        props: {
          label: '主题',
          appearance: 'outline',
        },
      },
      {
        type: 'textarea',
        key: 'message',
        className: 'w-full',
        props: {
          label: '内容',
          placeholder: 'Message',
          appearance: 'fill',
          rows: 5,
        },
      },
    ],
  },
};
