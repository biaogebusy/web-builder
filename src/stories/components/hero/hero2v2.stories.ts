import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { Hero2v2Component } from '@uiux/combs/hero/hero2v2/hero2v2.component';
export default {
  title: '组件/英雄区/2v2',
  component: Hero2v2Component,
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
      ],
    }),
  ],
} as Meta;

const Template: Story<Hero2v2Component> = (args) => ({
  component: Hero2v2Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    spacer: 'lg',
    id: 'xxx',
    bg: {
      classes: 'bg-center overlay',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/16-9/business-16.jpeg',
      },
    },
    body: {
      type: 'text',
      title: {
        label: '开源项目使用 Github actions 自动化',
        style: 'style-v4',
        classes: 'mat-display-1',
      },
      body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p>',
      actions: [
        {
          href: '#',
          label: '了解更多',
          icon: {
            name: 'chat',
            inline: true,
          },
        },
      ],
    },
  },
};
