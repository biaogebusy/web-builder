import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { Hero2v3Component } from '@uiux/combs/hero/hero2v3/hero2v3.component';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
export default {
  title: '组件/英雄区/2v3',
  component: Hero2v3Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        SwiperModule,
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
        label: '开源项目使用 Github actions 自动化',
        style: 'none',
        classes: 'mat-display-1',
      },
      spacer: 'none',
      body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p>',
    },
    elements: [
      {
        img: {
          src: '/assets/images/svg/health.svg',
          href: '/',
        },
        link: {
          href: '/',
          label: '健康生活',
        },
      },
      {
        img: {
          src: '/assets/images/svg/term-life.svg',
          href: '/',
        },
        link: {
          href: '/',
          label: '定期人寿保险',
        },
      },
      {
        img: {
          src: '/assets/images/svg/family-health.svg',
          href: '/',
        },
        link: {
          href: '/',
          label: '家庭健康保险',
        },
      },
      {
        img: {
          src: '/assets/images/svg/investment.svg',
          href: '/',
        },
        link: {
          href: '/',
          label: '投资计划',
        },
      },
      {
        img: {
          src: '/assets/images/svg/car.svg',
          href: '/',
        },
        link: {
          href: '/',
          label: '汽车保险',
        },
      },
      {
        img: {
          src: '/assets/images/svg/bike.svg',
          href: '/',
        },
        link: {
          href: '/',
          label: '出行保险',
        },
      },
    ],
  },
};
