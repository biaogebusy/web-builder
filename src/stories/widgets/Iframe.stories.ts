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
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { API_URL, CORE_CONFIG, THEME, USER } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
import { IframeComponent } from '@uiux/widgets/iframe/iframe.component';

export default {
  title: '基础/Iframe',
  id: 'iframe',
  component: IframeComponent,
  subcomponents: { TitleComponent },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule,
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
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `为了安全起见，url 不能跨域`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
// Raname Story
Default.storyName = '预览';
Default.args = {
  content: {
    url: '/?path=/story/full-calendar--default',
    height: '900',
  },
};
