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
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { Showcase3v4Component } from '@uiux/combs/showcase/showcase3v4/showcase3v4.component';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
export default {
  title: '组件/showcase/3v4',
  component: Showcase3v4Component,
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
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
} as Meta;

const Template: Story<Showcase3v4Component> = (args) => ({
  component: Showcase3v4Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    title: {
      label: 'OUR FEATRUES',
      style: 'style-v1',
    },
    bg: {
      classes: 'bg-light bg-fill-width',
    },
    img: {
      src: '/assets/images/1-1/business-02.png',
      alt: 'OUR FEATURES',
    },
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v7',
        title: {
          label: 'FREMIUM MODULES INCLUDED',
          href: '#',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v7',
        title: {
          label: 'FREMIUM MODULES INCLUDED',
          href: '#',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v7',
        title: {
          label: 'FREMIUM MODULES INCLUDED',
          href: '#',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v7',
        title: {
          label: 'FREMIUM MODULES INCLUDED',
          href: '#',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
      },
    ],
  },
};

export const Background = Template.bind({});

Background.args = {
  content: {
    title: {
      label: 'OUR FEATRUES',
      style: 'style-v1',
    },
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    img: {
      src: '/assets/images/1-1/business-02.png',
      alt: 'OUR FEATURES',
    },
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v7',
        title: {
          label: 'FREMIUM MODULES INCLUDED',
          href: '#',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v7',
        title: {
          label: 'FREMIUM MODULES INCLUDED',
          href: '#',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v7',
        title: {
          label: 'FREMIUM MODULES INCLUDED',
          href: '#',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v7',
        title: {
          label: 'FREMIUM MODULES INCLUDED',
          href: '#',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
      },
    ],
  },
};
