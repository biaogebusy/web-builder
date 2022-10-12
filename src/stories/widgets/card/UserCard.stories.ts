import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RouterTestingModule } from '@angular/router/testing';
import { apiUrlFactory } from '@core/factory/factory';
import { UserCardComponent } from '@uiux/widgets/card/user-card/user-card.component';
import { LoopWidgetsComponent } from '@uiux/widgets/loop-widgets/loop-widgets.component';
export default {
  title: '基础/卡片/用户卡片',
  id: 'user-card',
  component: UserCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [DialogComponent, TextComponent, LoopWidgetsComponent],
      imports: [
        ShareModule,
        WidgetsModule,
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot(),
        RouterTestingModule,
        MatDialogModule,
        HttpClientModule,
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
          useValue: {
            csrf_token: 'pUsbILTBk2fdd6dfadafiLmufthxnVJ6hcXBenZuVcYVRQ600cM',
            current_user: {
              uid: '1',
              name: 'Johnson',
              roles: ['authenticated'],
            },
            id: '029f3488-92ed-4fb5-8fa2-62df6fdaf90bd9d5',
            display_name: '表歌',
            mail: 'hi@zhaobg.com',
            authenticated: true,
            picture: '/assets/images/avatar/01.jpeg',
            login: new Date(),
          },
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="300px" class="position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '预览';
Default.args = {
  content: {
    type: 'user-card',
    menu: [
      {
        type: 'link',
        label: '资料更新',
        dialog: {
          params: {
            width: '1200px',
            disableClose: true,
          },
          afterClosed: {
            success: {
              label: '更新资料成功！',
            },
            emit: true,
          },
          data: [
            {
              type: 'text',
              spacer: 'sm',
              title: {
                label: 'link 组件的 Dialog 参数可以添加各种widget组件',
                style: 'style-v1',
              },
              body: '<p>这样可以根据需要弹出组件或者iframe页面。</p>',
              actionsAlign: 'center center',
              actions: [
                {
                  href: '#',
                  label: '开始',
                },
                {
                  type: 'closeDialog',
                  label: 'Ok',
                },
                {
                  type: 'btn-animate',
                  label: '了解更多',
                  href: '#',
                  style: 'style-v1',
                  icon: 'open_in_new',
                },
              ],
            },
          ],
        },
      },
    ],
  },
};
