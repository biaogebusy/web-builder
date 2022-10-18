import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NodeModule } from '@uiux/combs/node/node.module';
import { StorysModule } from '@core/storys.module';
import { JobComponent } from '@uiux/combs/node/job/job.component';
import { RouterTestingModule } from '@angular/router/testing';
import nodes from './jobNodes.json';
export default {
  title: '组件/文章/内推',
  id: 'job',
  component: JobComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [RouterTestingModule, StorysModule.forRoot(), NodeModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `通用的普遍文章，一般包含标题和内容相关属性信息，还包括文章相关联的数据等等。`,
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
Default.args = {
  nodes: {
    elements: nodes.elements,
  },
};
