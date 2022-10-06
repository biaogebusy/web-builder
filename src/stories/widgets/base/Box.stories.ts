import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { BoxComponent } from '@uiux/widgets/box/box.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
export default {
  title: '基础/内容/内容盒子',
  id: 'box',
  component: BoxComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
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
        `<div class="p-y" fxFlex="33" fxLayoutAlign="center center">${story}</div>`
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Box 容器包含了 Icon、标题、内容和链接的组合显示',
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const StyleV1 = Template.bind({});

StyleV1.args = {
  content: {
    style: 'style-v1',
    icon: {
      name: 'fingerprint',
    },
    title: {
      href: '/',
      label: '组件编辑',
    },
    content: '通过简单的管理界面对复杂的可视化编辑',
    more: {
      href: '#',
      label: '更多',
    },
  },
};

export const StyleV2 = Template.bind({});

StyleV2.args = {
  content: {
    ...StyleV1.args.content,
    style: 'style-v2',
    icon: {
      name: 'verified_user',
    },
  },
};

export const StyleV3 = Template.bind({});

StyleV3.args = {
  content: {
    ...StyleV2.args.content,
    style: 'style-v3',
  },
};

export const StyleV4 = Template.bind({});

StyleV4.args = {
  content: {
    ...StyleV2.args.content,
    style: 'style-v4',
  },
};

export const StyleV5 = Template.bind({});

StyleV5.args = {
  content: {
    ...StyleV2.args.content,
    style: 'style-v5',
  },
};

export const StyleV6 = Template.bind({});

StyleV6.args = {
  content: {
    ...StyleV2.args.content,
    style: 'style-v6',
  },
};

export const StyleV7 = Template.bind({});

StyleV7.args = {
  content: {
    ...StyleV2.args.content,
    style: 'style-v7',
  },
};

export const StyleV9 = Template.bind({});

StyleV9.args = {
  content: {
    ...StyleV1.args.content,
    style: 'style-v9',
  },
};

export const StyleV10 = Template.bind({});

StyleV10.args = {
  content: {
    ...StyleV1.args.content,
    style: 'style-v10',
  },
};
