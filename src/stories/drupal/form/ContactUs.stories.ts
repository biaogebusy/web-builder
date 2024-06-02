import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { ContactUsComponent } from '@uiux/combs/form/contact-us/contact-us.component';
import { StorysModule } from '@core/module/storys.module';
export default {
  title: 'Drupal/表单/联系我们',
  id: 'contact-us',
  component: ContactUsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="0 1 100" class="relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

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
        templateOptions: {
          label: '姓名',
          appearance: 'outline',
          required: true,
        },
      },
      {
        type: 'input',
        key: 'email',
        templateOptions: {
          label: '邮箱',
          appearance: 'outline',
          required: true,
        },
      },
      {
        type: 'input',
        key: 'subject',
        templateOptions: {
          label: '主题',
          appearance: 'outline',
        },
      },
      {
        type: 'textarea',
        key: 'message',
        templateOptions: {
          label: '内容',
          placeholder: 'Message',
          appearance: 'fill',
          rows: 5,
        },
      },
    ],
  },
};

Default.play = async () => {
  const Name = screen.getByLabelText('姓名');
  await userEvent.type(Name, 'Johnson', {
    delay: 100,
  });

  const Email = screen.getByLabelText('邮箱');
  await userEvent.type(Email, 'hi@example.com', {
    delay: 100,
  });

  const Subject = screen.getByLabelText('主题');
  await userEvent.type(Subject, '关于贡献', {
    delay: 100,
  });

  const Content = screen.getByLabelText('内容');
  await userEvent.type(
    Content,
    'Storybook是一个开源的前端工具，用于开发、测试和文档化UI组件。',
    {
      delay: 100,
    }
  );
};
