import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { LocalStorageService } from 'ngx-webstorage';
import { BlockModule } from '@modules/render/render.module';
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

export default {
  title: '示例页面/登录页',
  id: 'login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        UserModule,
        StorysModule.forRoot(),
        BlockModule,
        BrandingModule,
      ],
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
    `
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
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';

Page.play = async () => {
  // 输入手机号
  const Phone = screen.getByLabelText('请输入手机号码');
  await userEvent.type(Phone, '188787101300', {
    delay: 200,
  });

  const Form = document.getElementsByClassName('login-form')[0];
  await userEvent.click(Form);

  // 修改手机号
  await sleep(2000);
  await userEvent.clear(Phone);
  await userEvent.type(Phone, '18878710130');

  // 输入验证码
  await sleep(2000);
  const Code = screen.getByLabelText('验证码');
  await userEvent.type(Code, '34799', {
    delay: 200,
  });

  // 切换到用户密码
  await sleep(2000);
  const PassW = screen.getByText('密码登录');
  await userEvent.click(PassW);

  // 输入用户名
  await sleep(2000);
  const UserName = screen.getByLabelText('用户名');
  await userEvent.type(UserName, 'biaogebusy', {
    delay: 200,
  });

  // 输入密码
  await sleep(2000);
  const UserPW = screen.getByLabelText('密码');
  await userEvent.type(UserPW, 'helloWord', {
    delay: 200,
  });
};
