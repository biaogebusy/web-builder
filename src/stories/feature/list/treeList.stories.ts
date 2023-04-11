import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { fireEvent, screen, userEvent } from '@storybook/testing-library';
import { ListModule } from '@uiux/combs/list/list.module';
import { TreeListComponent } from '@uiux/combs/list/tree-list/tree-list.component';
import * as TreeStories from 'src/stories/widgets/Tree.stories';
import { StorysModule, sleep } from '@core/module/storys.module';

export default {
  title: '特色组件/树形列表',
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
  nodes: [
    {
      link: {
        label: '使用 DevTools 对 Angular 前端应用性能分析优化',
        href: '/node/417',
        target: '_blank',
      },
      created: new Date(),
      body: '<h4 id="%E4%BD%BF%E7%94%A8-lighthouse-%E8%AF%84%E5%88%86">使用 lighthouse 评分</h4><p>以南宁IT派[www.nnitpai.com]为例记录分析优化过程，使用 Devtools lighthouse 对首页进行综合的评分：<br /><img alt="image 0" data-entity-type="file" data-entity-uuid="c397a1f3-b764-4fd2-ab09-98d61f2a4dbd" height="603" src="/sites/default/files/inline-images/image_0.png" width="940" /><br />性能评分勉强及格差强人意，切换到 performance 性能选项卡:<br /><img alt="image 1" data-entity-type="file" data-entity-uuid="17526354-c3f6-45ab-8d28-8100cd1d10e8" height="506" src="/sites/default/files/inline-images/image_1.png" width="951" /><br />记录的同时，可以依次滚动页面到底部，暂停看看分析结果：<br /><img alt="image 2" data-entity-type="file" data-entity-uuid="2349f2bb-d08a-4e5e-a6fa-8ca891b91022" height="422" src="/sites/default/files/inline-images/image_2.png" width="949" /><br />发现一推很深的函数调用，放大具体看看：（记得要用本地开发环境来查看，这样可以方便看未编译版本中具体的组件或者函数）<br /></p>',
      user: 'Johnson',
      type: '博客',
      category: '前端',
      tags: 'Angular',
      img: {
        classes: 'object-fit',
        src: '/assets/images/cases/porto2.jpg',
        alt: '使用 takeUntil 操作符管理 Angular 组件的订阅',
        href: '#',
      },
    },
    {
      link: {
        label: '你应该了解的 Angular 最佳实践',
        href: '/node/414',
        target: '_blank',
      },
      created: new Date(),
      body: '<p>遵循最佳实践可以让你的 Angular 应用保持性能优越，使团队的代码风格一致，以下代码摘自南宁IT派官网项目。</p><h3 id="%E6%8A%8A%E9%BB%98%E8%AE%A4%E7%9A%84%E5%8F%98%E6%9B%B4%E6%A3%80%E6%B5%8B%E8%AE%BE%E7%BD%AE%E4%B8%BA-onpush">把默认的变更检测设置为 OnPush</h3><p>Angular 默认变更检测是 Defualt，只要在组件中有任意一个值发生改变或者 Dom中有事件的更新都会触发整个应用自上而下的变更检测，使用&nbsp;<code data-backticks="1">OnPush</code>&nbsp;的方式使大型的应用的性能得到很大的提升。<br />导入 ChangeDetectionStrategy 之后，设置为OnPush</p></p>',
      user: '表歌',
      type: '博客',
      category: '前端',
      tags: 'Angular',
      img: {
        classes: 'object-fit',
        src: '/assets/images/cases/porto3.jpg',
        alt: '使用 takeUntil 操作符管理 Angular 组件的订阅',
        href: '#',
      },
    },
  ],
  pager: {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 100,
  },
};
Default.play = async () => {
  const CollapseAll = screen.getByText('折叠');
  await fireEvent.click(CollapseAll);
  await sleep(2000);
  const ExpandAll = screen.getByText('展开');
  await fireEvent.click(ExpandAll);
  await sleep(2000);
  const Drupal = screen.getByText('Drupal');
  await userEvent.click(Drupal);
};
