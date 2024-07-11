import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { QuestionComponent } from '@uiux/combs/node/question/question.component';
import { StorysModule } from '@core/module/storys.module';
import { comments } from './comments.json';
import { IQuestion } from '@core/interface/node/INode';
import { importProvidersFrom } from '@angular/core';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';

const meta: Meta<QuestionComponent> = {
  title: '示例页面/内容类型/问答',
  id: 'question',
  component: QuestionComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [
        ...StorysModule.forEntryComponents(),
        ReqRolesDirective,
        SafeHtmlPipe,
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<QuestionComponent>;
export const Default: Story = {};
const content: IQuestion = {
  type: 'question',
  title: '作为一个前端开发人员，如何让自己保持学习的热忱并坚持下去？',
  body: '前端技术不断更迭，日新月异，如何保持学习的心态。',
  topic: { elements: [{ label: '前端' }, { label: 'Angular' }] },
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
  comment: {
    title: true,
    actions: ['update', 'reply', 'quote', 'delete'],
  },
};

Default.args = {
  content,
  isAsked: false,
  showEditor: true,
  comments,
};
