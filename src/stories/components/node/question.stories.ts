import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NodeModule } from '@uiux/combs/node/node.module';
import { QuestionComponent } from '@uiux/combs/node/question/question.component';
import { StorysModule } from '@core/storys.module';
import { comments } from './comments.json';

export default {
  title: '组件/文章/问答',
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
  comments,
};
