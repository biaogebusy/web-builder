import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Showcase1v3Component } from '@uiux/combs/showcase/showcase1v3/showcase1v3.component';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { initConfig } from 'src/app/app.module';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import * as ContactUs from 'src/stories/widgets/ContactUs.stories';
export default {
  title: '组件/展示/1v3',
  component: Showcase1v3Component,
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
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initConfig,
          deps: [AppState, [new Inject(CORE_CONFIG)]],
          multi: true,
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
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
    title: {
      label: 'Showcase 1v3',
      style: 'style-v1',
      classes: 'mat-display-1',
    },
    classes: 'text-light',
    bg: {
      classes: 'bg-fill-width overlay overlay-20',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/banner-01.jpeg',
        alt: 'page title',
      },
    },
    elements: [
      {
        type: 'text',
        spacer: 'none',
        style: {
          margin: '0 auto',
          'text-align': 'center',
          width: '600px',
        },
        body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren.',
        actionsAlign: 'center center',
        actions: [
          {
            label: 'Read more',
            type: 'btn-animate',
            href: '#',
            style: 'style-v1',
            icon: 'verified_user',
          },
          {
            label: 'Learn more',
            type: 'btn-animate',
            href: '#',
            style: 'style-v1',
            icon: 'fingerprint',
          },
        ],
      },
    ],
  },
};

export const Contact = Template.bind({});
Contact.storyName = '联系我们';
const contact: any = ContactUs.Base.args;
Contact.args = {
  content: {
    id: 'form',
    type: 'showcase-1v3',
    title: {
      label: '联系我们',
      style: 'style-v1',
    },
    elements: [
      {
        type: 'text',
        spacer: 'none',
        classes: 'text-center',
        body: '信使是以 Material UI为基础的 Angular 前端框架，为Drupal的数字创新提供友好的用户体验。',
      },
      contact.content,
    ],
  },
};
