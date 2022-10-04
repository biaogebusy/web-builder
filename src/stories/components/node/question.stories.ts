import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NodeModule } from '@uiux/combs/node/node.module';
import { QuestionComponent } from '@uiux/combs/node/question/question.component';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { coreConfigFactory, apiUrlFactory } from '@core/factory/factory';
import { ContentService } from '@core/service/content.service';
export default {
  title: '组件/文章/问答',
  component: QuestionComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        NodeModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: APP_INITIALIZER,
          useFactory: coreConfigFactory,
          deps: [ContentService, [new Inject(CORE_CONFIG)]],
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
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    title: 'drupal8比drupal7多了什么？',
    body: 'Drupal8比Drupal7多了些什么内容和特性？drupal7的解压文件是13.1M，而drupal8的解压文件多达68M。',
    topic: [],
    params: {
      comment: {
        type: 'comment--answer',
        attributes: {
          entity_type: 'node',
          field_name: 'answer',
        },
        relationships: {
          comment_type: {
            data: {
              type: 'comment_type--comment_type',
              id: 'a395ac8e-3c9a-43d5-8ec8-cea74116d5f3',
            },
          },
          entity_id: {
            data: {
              type: 'node--question',
              id: 'b59a2767-89b8-418d-91fe-6f0e6a5638ec',
            },
          },
        },
      },
    },
    editor: {
      action: {
        label: '发布回答',
      },
      succes: {
        label: '成功发布！',
      },
    },
  },
};
