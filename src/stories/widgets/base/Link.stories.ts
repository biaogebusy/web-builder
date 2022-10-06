import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LoopWidgetsComponent } from '@uiux/widgets/loop-widgets/loop-widgets.component';
import { ShareModule } from '@share/share.module';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import * as TextStories from './Text.stories';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';

export default {
  title: '基础/内容/链接',
  id: 'link',
  component: LinkComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [DialogComponent, LoopWidgetsComponent],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
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
        {
          provide: USER,
          useFactory: userFactory,
          deps: [LocalStorageService, CryptoJSService, UserService],
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
    label: '内推',
    classes: 'bold',
    href: '/lists/jobs',
  },
};

export const queryParams = Template.bind({});
queryParams.storyName = '链接带 QueryParams 参数';
queryParams.args = {
  content: {
    ...Default.args.content,
    queryParams: {
      demo: '466',
    },
    fragment: 'title',
  },
};

export const fragment = Template.bind({});
fragment.storyName = '链接到 Fragment 片段';
fragment.args = {
  content: {
    ...Default.args.content,
    fragment: 'title',
  },
};

export const dialog = Template.bind({});
dialog.storyName = '链接 Dialog';
const textContent: any = TextStories.List.args;
dialog.args = {
  content: {
    ...Default.args.content,
    dialog: {
      params: {
        width: '800px',
      },
      data: [
        {
          type: 'text',
          ...textContent.content,
        },
      ],
    },
  },
};
