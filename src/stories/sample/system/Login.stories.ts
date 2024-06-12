import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { LocalStorageService } from 'ngx-webstorage';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
import { LoginComponent } from '@modules/user/login/login.component';
import { UserModule } from '@modules/user/user.module';
import { sleep, StorysModule } from '@core/module/storys.module';
import { NOTIFY_CONTENT, USER } from '@core/token/token-providers';
import { userFactory } from '@core/factory/factory';
import { BrandingModule } from '@core/branding/branding.module';
import { of } from 'rxjs';
import { notify } from '@core/module/data/notify';

const meta: Meta<LoginComponent> = {
  title: '示例页面/系统页面/注册登录',
  id: 'login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [UserModule, StorysModule.forRoot(), BrandingModule],
      providers: [
        {
          provide: USER,
          useFactory: userFactory,
          deps: [LocalStorageService, CryptoJSService, UserService],
        },
        {
          provide: NOTIFY_CONTENT,
          useValue: of(notify),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
     <app-header></app-header>
      ${story}
      <app-footer></app-footer>
    `,
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `用户登录页面，可根据json配置开启手机或者密码方式登录。`,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<LoginComponent>;

export const Page: Story = {};
Page.storyName = '预览';
