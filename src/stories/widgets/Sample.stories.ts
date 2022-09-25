import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '../../app/core/token/core.config';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { initConfig } from 'src/app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { TitleComponent } from '@uiux/widgets/title/title.component';

export default {
  title: '基础/示例 Sample',
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
  content: {
    spacer: 'sm',
    title: {
      label:
        '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
      style: 'style-v1',
    },
    body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p><p>查了些文档文章，Github Actions有几个重要的信息如下：</p><ul class="list-done"><li>通过 Docker 隔离</li><li>每个 workflow 独享1核虚拟CPU, 3.75GB内存，包括网络权限和100GB 磁盘</li><li>在 yml 配置文件中可以使用上下文环境变量，比如分支或者不公开变量</li><li>每个workflow 排队和执行时间最多 58 分钟，最多可以包含100个action，每个仓库同一时刻只能运行两个 workflow</li></ul>',
  },
};
