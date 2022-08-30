import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/core.config';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { Hero2v3Component } from '@uiux/combs/hero/hero2v3/hero2v3.component';

export default {
  title: '信使 UI',
  component: Hero2v3Component,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
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
        SafeHtmlPipe,
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
  ],
} as Meta;

const Template: Story<Hero2v3Component> = (args: Hero2v3Component) => ({
  props: args,
});

// More on interaction testing: https://storybook.js.org/docs/angular/writing-tests/interaction-testing
export const Page = Template.bind({});
Page.args = {
  content: {
    id: 'xxx',
    spacer: 'lg',
    shape: true,
    bg: {
      classes: 'bg-center',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/bg-04.png',
      },
    },
    text: {
      title: {
        label: '信使 UI 前端框架',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      spacer: 'none',
      body: '<p>信使基于 Material UI 作为基础组件开发。</p>',
    },
    elements: [
      {
        img: {
          src: '/assets/images/svg/health.svg',
          href: 'https://www.drupal.org',
        },
        link: {
          href: 'https://www.drupal.org',
          label: 'Drupal 官网',
        },
      },
      {
        img: {
          src: '/assets/images/svg/term-life.svg',
          href: 'https://material.angular.io',
        },
        link: {
          href: 'https://material.angular.io',
          label: 'Material UI',
        },
      },
      {
        img: {
          src: '/assets/images/svg/family-health.svg',
          href: 'https://jsonapi.org/format/',
        },
        link: {
          href: 'https://jsonapi.org/format/',
          label: 'JSONAPI',
        },
      },
    ],
  },
};
