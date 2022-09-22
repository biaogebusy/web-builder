import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { AmapService } from '../../../app/core/service/amap.service';
import { ContactUsComponent } from '../../../app/uiux/widgets/contact-us/contact-us.component';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';

export default {
  title: '组件/其他/联系我们',
  component: ContactUsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        AmapService,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
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
