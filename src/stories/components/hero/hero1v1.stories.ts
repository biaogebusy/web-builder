import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { Hero1v1Component } from '../../../app/uiux/combs/hero/hero1v1/hero1v1.component';
export default {
  title: '组件/英雄区/1v1',
  component: Hero1v1Component,
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
      ],
    }),
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
    spacer: 'none',
    classes: 'text-light text-center',
    sliders: {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: false,
      },
      elements: [
        {
          type: 'text',
          spacer: 'xl',
          title: {
            label: 'Light text, and xy center',
            style: 'style-v1',
            classes: 'mat-display-3 bold',
          },
          classes: 'xy-center',
          bg: {
            classes: 'bg-center overlay overlay-80',
            img: {
              src: '/assets/images/16-9/business-14.jpeg',
              mobile: '/assets/images/mobile/mobile-03.jpg',
            },
          },
          body: '<p style="font-size:18px">At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>',
          actionsAlign: 'center center',
          actions: [
            {
              href: '#',
              label: 'Get Started',
            },
          ],
        },
        {
          type: 'text',
          title: {
            label: 'Enable overlay',
            style: 'style-v1',
            classes: 'mat-display-3 bold',
          },
          spacer: 'xl',
          classes: 'xy-center text-light',
          bg: {
            classes: 'bg-shadow  overlay overlay-80',
            img: {
              src: '/assets/images/16-9/business-15.jpeg',
              mobile: '/assets/images/mobile/mobile-04.jpg',
            },
          },
          body: 'Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。',
          actionsAlign: 'center center',
          actions: [
            {
              href: '#',
              label: 'Get Started',
            },
            {
              type: 'closeDialog',
              label: 'Ok',
            },
          ],
        },
      ],
    },
  },
};
