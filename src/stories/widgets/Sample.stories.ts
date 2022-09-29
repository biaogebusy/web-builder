import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { initConfig } from 'src/app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import * as TextStories from './base/Text.stories';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: '特色组件/示例 Sample',
  component: TextComponent,
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
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initConfig,
          deps: [AppState, [new Inject(CORE_CONFIG)]],
          multi: true,
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `对组件的介绍描述`,
      },
    },
  },
  argTypes: {
    content: {
      description: '字段描述',
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
  // ...title.args,
  ...TextStories.Title.args,
};
