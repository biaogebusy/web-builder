import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ListModule } from '@uiux/combs/list/list.module';
import { TreeListComponent } from '@uiux/combs/list/tree-list/tree-list.component';
import * as TreeStories from 'src/stories/widgets/Tree.stories';
import { StorysModule } from '@core/storys.module';

export default {
  title: '组件/列表/树形列表',
  id: 'tree-list',
  component: TreeListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ListModule, StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `树形边栏可以方便的展示多级的分类，通过查看分类过滤出所选分类下的数据内容。`,
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
const tree: any = TreeStories.Default.args;
Default.args = {
  content: {
    tree: [
      {
        ...tree.content,
      },
    ],
  },
};
