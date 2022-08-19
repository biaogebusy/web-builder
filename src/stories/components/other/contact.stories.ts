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

export default {
  title: 'Components/other/contact',
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
          label: 'Address',
        },
        icon: {
          name: 'location_on',
        },
        style: 'style-v7 small-box',
        content: 'NO.28 Street Name - City. Country',
      },
      {
        title: {
          label: 'Phone number',
        },
        style: 'style-v7 small-box',
        icon: {
          name: 'phone',
        },
        content: '+086 0771xxxx',
      },
      {
        title: {
          label: 'Email Adress',
        },
        style: 'style-v7 small-box',
        icon: {
          name: 'mail',
        },
        content: 'info@kingzonetech.com',
      },
      {
        title: {
          label: 'Wechat',
        },
        style: 'style-v7 small-box',
        icon: {
          name: 'chat_bubble',
        },
        content: 'kingzonetech',
      },
      {
        title: {
          label: 'Facebook',
        },
        style: 'style-v7 small-box',
        img: {
          src: '/assets/images/facebook.png',
        },
        content: 'kingzonetech',
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
