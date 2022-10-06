import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StepperComponent } from '@uiux/widgets/stepper/stepper.component';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';

export default {
  title: '基础/进步器',
  id: 'stepper',
  component: StepperComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
        {
          provide: USER,
          useFactory: userFactory,
          deps: [LocalStorageService, CryptoJSService, UserService],
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Horizontal = Template.bind({});
Horizontal.storyName = '水平方向';
Horizontal.args = {
  content: {
    params: {
      mode: 'horizontal',
      labelPosition: 'bottom',
      linear: true,
    },
    steps: [
      {
        label: '指派中',
      },
      {
        label: '接受',
        completed: true,
      },
      {
        label: '停止',
      },
      {
        label: '转移',
      },
      {
        label: '已完成',
      },
    ],
  },
};
export const Vertical = Template.bind({});
Vertical.storyName = '垂直方向';
Vertical.args = {
  content: {
    ...Horizontal.args.content,
    params: {
      mode: 'vertical',
      linear: true,
    },
  },
};
