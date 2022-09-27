import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG } from '@core/token/core.config';
import { ContentBoxComponent } from '@uiux/widgets/content-box/content-box.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { TextHeroComponent } from '@uiux/widgets/text-hero/text-hero.component';
export default {
  title: '基础/内容/英雄区内容',
  component: TextHeroComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        WidgetsModule,
        RouterTestingModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
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

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});

Base.args = {
  content: {
    theme: 'text-light',
    params: {
      height: '750px',
    },
    text: {
      title: {
        label: '为什么你将会喜欢 Drupal？',
        style: 'style-v4',
        classes: 'mat-display-2 bold',
      },
      classes: 'y-center',
      style: [],
      bg: {
        classes: 'bg-shadow overlay overlay-20',
        img: {
          src: '/assets/images/hero/1-3.jpg',
          hostClasses: '',
        },
      },
      body: '<p>为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一</p>',
      actionsAlign: 'start center',
      actions: [
        {
          href: '',
          label: '了解更多',
        },
      ],
    },
  },
};
