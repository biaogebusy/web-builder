import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ContactUsComponent } from '@uiux/widgets/contact-us/contact-us.component';
import { FormService } from '@core/service/form.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CORE_CONFIG } from '@core/token/core.config';
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
      ],
      providers: [
        FormService,
        {
          provide: CORE_CONFIG,
          userValue: {},
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
