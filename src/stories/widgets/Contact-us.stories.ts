import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { ContactUsComponent } from '../../app/uiux/widgets/contact-us/contact-us.component';
import { FormService } from '../../app/core/service/form.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CORE_CONFIG } from '../../app/core/token/core.config';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
export default {
  title: 'Widgets/Contact Us',
  component: ContactUsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        FormService,
        {
          provide: CORE_CONFIG,
          userValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div fxFlex="0 1 100" class="position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<ContactUsComponent> = (args) => ({
  component: ContactUsComponent,
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
      classes: 'bg-fill-width wave-wrapper',
      icon: 'wave',
    },
    action: {
      label: 'Submit',
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
        content: '广西南宁市创客城2栋',
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
        content: 'service@zhaobg.com',
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
    forms: [
      {
        type: 'input',
        label: 'Name',
        key: 'name',
        params: {
          required: true,
        },
      },
      {
        type: 'input',
        label: 'Email',
        key: 'email',
        params: {
          required: true,
        },
      },
      {
        type: 'input',
        label: 'Subject',
        key: 'subject',
        params: {
          required: true,
        },
      },
      {
        type: 'textarea',
        label: 'Message',
        params: {
          required: true,
          matAutosizeMinRows: 5,
        },
        key: 'message',
        placeholder: 'Message',
      },
    ],
  },
};
