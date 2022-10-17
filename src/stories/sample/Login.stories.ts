import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { BlockModule } from '@uiux/combs/block/block.module';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
import { LoginComponent } from '../../app/modules/user/login/login.component';
import { UserModule } from '../../app/modules/user/user.module';
import { StorysModule } from '@core/storys.module';
import { USER } from '@core/token/token-providers';
import { userFactory } from '@core/factory/factory';

export default {
  title: '示例页面/登录页',
  id: 'login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [UserModule, StorysModule.forRoot(), BlockModule],
      providers: [
        {
          provide: USER,
          useFactory: userFactory,
          deps: [LocalStorageService, CryptoJSService, UserService],
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `用户登录页面，可根据json配置开启手机或者密码方式登录。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
