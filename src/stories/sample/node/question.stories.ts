import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { NodeModule } from '@uiux/combs/node/node.module';
import { QuestionComponent } from '@uiux/combs/node/question/question.component';
import { sleep, StorysModule } from '@core/storys.module';
import { comments } from './comments.json';

export default {
  title: '示例页面/内容类型/问答',
  id: 'question',
  component: QuestionComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [NodeModule, StorysModule.forRoot()],
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
    title: '在南宁你去面试过哪些坑人的公司?',
    body: '连续去面试两个公司都是打着其他职位招销售，心好累，好想类似坑人的公司都被爆出来。',
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
  isAsked: false,
  showEditor: true,
  comments,
};

Default.play = async () => {
  await sleep(2000);
  const Form = document.querySelectorAll('.ql-editor')[0];
  await userEvent.type(
    Form,
    '面试官有时候往往就代表着这家公司或者这个技术团队的“氛围”，是不是坑人就多察言观色，面试的双方平等的。',
    {
      delay: 100,
    }
  );

  await sleep(2000);
  const Submit = screen.getByText('发布回答');
  await userEvent.click(Submit);
};
