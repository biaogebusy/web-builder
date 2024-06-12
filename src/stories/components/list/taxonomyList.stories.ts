import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { TaxonomyListComponent } from '@uiux/combs/list/taxonomy-list/taxonomy-list.component';
import { ListModule } from '@uiux/combs/list/list.module';
import { StorysModule } from '@core/module/storys.module';
import { ITaxonomyList } from '@core/interface/combs/IList';
import * as MediaListStories from '@stories/widgets/media/MediaList.stories';

const meta: Meta<TaxonomyListComponent> = {
  title: '复合组件/列表/分类列表',
  id: 'taxonomy-list',
  component: TaxonomyListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [ListModule, StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `分类列表一般用在分类术语上，该列表聚合了该分类下的所属文章列表。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TaxonomyListComponent>;
export const Default: Story = {};
const content: ITaxonomyList = {
  type: 'taxonomy-list',
  pager: {
    itemsPerPage: 20,
  },
  elements: [
    {
      type: 'showcase-3v3',
      title: {
        label: '使用 DevTools 对 Angular 前端应用性能分析优化',
        href: '/node/417',
      },
      bg: {
        classes: '',
      },
      classes: '',
      spacer: 'none',
      showImage: true,
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/417',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto1.jpg',
          alt: '使用 DevTools 对 Angular 前端应用性能分析优化',
        },
      },
      date: '2022-01-08T10:14:07+00:00',
      category: '前端茶馆',
      body: '<h4 id="%E4%BD%BF%E7%94%A8-lighthouse-%E8%AF%84%E5%88%86">使用 lighthouse 评分</h4><p>以南宁IT派[www.nnitpai.com]为例记录分析优化过程，使用 Devtools lighthouse 对首页进行综合的评分：<br /><img alt="image 0" data-entity-type="file" data-entity-uuid="c397a1f3-b764-4fd2-ab09-98d61f2a4dbd" height="603" src="/sites/default/files/inline-images/image_0.png" width="940" /><br />性能评分勉强及格差强人意，切换到 performance 性能选项卡:<br /><img alt="image 1" data-entity-type="file" data-entity-uuid="17526354-c3f6-45ab-8d28-8100cd1d10e8" height="506" src="/sites/default/files/inline-images/image_1.png" width="951" /><br />记录的同时，可以依次滚动页面到底部，暂停看看分析结果：<br /><img alt="image 2" data-entity-type="file" data-entity-uuid="2349f2bb-d08a-4e5e-a6fa-8ca891b91022" height="422" src="/sites/default/files/inline-images/image_2.png" width="949" /><br />发现一推很深的函数调用，放大具体看看：（记得要用本地开发环境来查看，这样可以方便看未编译版本中具体的组件或者函数）<br /></p>',
      details: {
        label: '查看更多',
        href: '/node/417',
        mode: 'raised',
        color: 'primary',
      },
    },
    {
      type: 'showcase-3v3',
      title: {
        label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
        href: '/node/415',
      },
      bg: {
        classes: '',
      },
      classes: '',
      spacer: 'none',
      showImage: true,
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/415',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto2.jpg',
          alt: '使用 takeUntil 操作符管理 Angular 组件的订阅',
        },
      },
      date: '2022-01-03T16:00:27+00:00',
      category: 'Drupal 自习室',
      body: '<section data-tool="mdnice编辑器" data-website="https://www.mdnice.com" id="nice"><p data-tool="mdnice编辑器">在上一篇文章中，有个知友评论说是要 takeUntil 来管理订阅更加清晰明了，那我们就探探究竟。</p><p data-tool="mdnice编辑器">在 Rxjs 中，可以使用 takeUntil 来控制另外一个 Observable 对象数据的产生。使用 takeUntil，上游的数据直接转手给下游，直到takeUntil的参数吐出一个数据或者完结。</p><p data-tool="mdnice编辑器">就像一个水龙头开关，一开始是打开的状态，上游的数据一开始直接流到下游，只要 takeUntil 一旦触发吐出数据，水龙头立刻关闭。</p><p data-tool="mdnice编辑器">利用这点，可以在订阅时时，在管道中添加 takeUntil，在组件销毁时吐出数据，这样这些订阅就会立刻关闭，也就达到回收内存的作用。</p><h4 data-tool="mdnice编辑器">改造之前：</h4><pre data-tool="mdnice编辑器"><code class="language-javascript">export class ExampleComponent implements OnInit, OnDestroy {  subscription1: Subscription;  subscription2: Subscription;  ngOnInit(): void {    this.subscription1 = observable1.subscribe(...);    this.subscription2 = observable2.subscribe(...);  }  ngOnDestroy() {    this.subscription1.unsubscribe();    this.subscription2.unsubscribe();  }}</code></pre><h4 data-tool="mdnice编辑器">改造之后：</h4><pre data-tool="mdnice编辑器"><code class="language-javascript">export class ExampleComponent implements OnInit, OnDestroy {  destroy$: Subject&lt;boolean&gt; = new Subject&lt;boolean&gt;();  ngOnInit(): void {    observable1      .pipe(takeUntil(this.destroy$))      .subscribe(...);    observable2      .pipe(takeUntil(this.destroy$))      .subscribe(...);  }  ngOnDestroy() {    this.destroy$.next(true);    this.destroy$.unsubscribe();  }}</code></pre><h4 data-tool="mdnice编辑器">总结</h4><p data-tool="mdnice编辑器">对比下来，你会发现takeUntil操作符会清晰简洁很多，你只需要把<code>takeUntil(this.destroy$)</code>加入到想要组件销毁时停止订阅的管道，即可统一管理，感谢这位知友提供的思路。</p></section>',
      details: {
        label: '查看更多',
        href: '/node/415',
        mode: 'raised',
        color: 'primary',
      },
    },
    {
      type: 'showcase-3v3',
      title: { label: '你应该了解的 Angular 最佳实践', href: '/node/414' },
      spacer: 'none',
      showImage: true,
      bg: {
        classes: '',
      },
      classes: '',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/414',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto3.jpg',
          alt: '你应该了解的 Angular 最佳实践',
        },
      },
      date: '2022-01-03T11:19:52+00:00',
      category: '前端茶馆',
      body: '<p>遵循最佳实践可以让你的 Angular 应用保持性能优越，使团队的代码风格一致，以下代码摘自南宁IT派官网项目。</p><h3 id="%E6%8A%8A%E9%BB%98%E8%AE%A4%E7%9A%84%E5%8F%98%E6%9B%B4%E6%A3%80%E6%B5%8B%E8%AE%BE%E7%BD%AE%E4%B8%BA-onpush">把默认的变更检测设置为 OnPush</h3><p>Angular 默认变更检测是 Defualt，只要在组件中有任意一个值发生改变或者 Dom中有事件的更新都会触发整个应用自上而下的变更检测，使用&nbsp;<code data-backticks="1">OnPush</code>&nbsp;的方式使大型的应用的性能得到很大的提升。<br />导入 ChangeDetectionStrategy 之后，设置为OnPush</p></p>',
      details: {
        label: '查看更多',
        href: '/node/414',
        mode: 'raised',
        color: 'primary',
      },
    },
    {
      type: 'showcase-3v3',
      title: {
        label: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
        href: '/node/387',
      },
      spacer: 'none',
      showImage: true,
      bg: {
        classes: '',
      },
      classes: '',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/387',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto4.jpg',
          alt: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
        },
      },
      date: '2021-05-20T03:10:01+00:00',
      category: '前端茶馆',
      body: '<p>在特定情况下，有些接口无法提供一次性的请求达到目的，需要并行的多次请求，当所有请求都完成时，才进行下一步的逻辑。<code>forkJoin</code>&nbsp;在这里是比较适合这种操作的。</p><p>值得注意的是，Angular 5 和 rxjs 5.5.2的版本导入的对象和最新的版本有区别。</p>',
      details: {
        label: '查看更多',
        href: '/node/387',
        mode: 'raised',
        color: 'primary',
      },
    },
    {
      type: 'showcase-3v3',
      title: {
        label: 'Drupal 8 Ajax 弹出框可监听利用的 Event 事件',
        href: '/node/386',
      },
      spacer: 'none',
      showImage: true,
      bg: {
        classes: '',
      },
      classes: '',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/386',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto5.jpg',
          alt: 'Drupal 8 Ajax 弹出框可监听利用的 Event 事件',
        },
      },
      date: '2021-05-14T15:30:12+00:00',
      category: 'Drupal 自习室',
      body: 'Drupal 提供了一些自定义的Ajax modal 弹出框事件，通过监听这些事件，可以做一些你想做的事情。',
      details: {
        label: '查看更多',
        href: '/node/386',
        mode: 'raised',
        color: 'primary',
      },
    },
    {
      type: 'showcase-3v3',
      title: { label: 'Drupal8 用户登录后自定义重定向', href: '/node/385' },
      spacer: 'none',
      showImage: true,
      bg: {
        classes: '',
      },
      classes: '',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/385',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto6.jpg',
          alt: 'Drupal8 用户登录后自定义重定向',
        },
      },
      date: '2021-05-14T15:28:25+00:00',
      category: 'Drupal 自习室',
      body: 'Drupal 官网有很多的模块可以提供用户登录后进行自定义重定向路由，基于某种需求，需要在自己的模块中实现，值得注意的是Drupal8和Drupal7的实现方式有所差异。',
      details: {
        label: '查看更多',
        href: '/node/385',
        mode: 'raised',
        color: 'primary',
      },
    },
    {
      type: 'showcase-3v3',
      title: {
        label: '如何更改 git commit 某个历史提交信息',
        href: '/node/383',
      },
      spacer: 'none',
      showImage: true,
      bg: {
        classes: '',
      },
      classes: '',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/383',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto7.jpg',
          alt: '如何更改 git commit 某个历史提交信息',
        },
      },
      date: '2021-05-11T13:42:07+00:00',
      category: '前端茶馆',
      body: '由于某种原因，需要更新历史提交的commit信息，如果想更新最新的提交，可以使用命令：git commit --amend',
      details: {
        label: '查看更多',
        href: '/node/383',
        mode: 'raised',
        color: 'primary',
      },
    },
    {
      type: 'showcase-3v3',
      title: {
        label:
          '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
        href: '/node/382',
      },
      spacer: 'none',
      showImage: true,
      bg: {
        classes: '',
      },
      classes: '',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/382',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto8.jpg',
          alt: '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
        },
      },
      date: '2021-05-10T15:48:22+00:00',
      category: '前端茶馆',
      body: 'Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。',
      details: {
        label: '查看更多',
        href: '/node/382',
        mode: 'raised',
        color: 'primary',
      },
    },
    {
      type: 'showcase-3v3',
      title: { label: 'Drupal jsonapi 初级入门实践', href: '/node/377' },
      spacer: 'none',
      showImage: true,
      bg: {
        classes: '',
      },
      classes: '',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/377',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto9.jpg',
          alt: 'Drupal jsonapi 初级入门实践',
        },
      },
      date: '2021-05-03T15:43:45+00:00',
      category: 'Drupal 自习室',
      body: '本文介绍了Drupal jsonapi 相关的接口，使用不同的参数返回需要的实体字段，特别是相关字段的获取。',
      details: {
        label: '查看更多',
        href: '/node/377',
        mode: 'raised',
        color: 'primary',
      },
    },
    {
      type: 'showcase-3v3',
      title: {
        label: 'RxJS switchMap 在 Drupal api中的应用',
        href: '/node/376',
      },
      spacer: 'none',
      showImage: true,
      bg: {
        classes: '',
      },
      classes: '',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '/node/376',
        ratios: 'media-16-9',
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto10.jpg',
          alt: 'RxJS switchMap 在 Drupal api中的应用',
        },
      },
      date: '2021-05-03T15:28:11+00:00',
      category: 'Drupal 自习室',
      body: '在 Angular 中，可以把想要的东西转换成流，流是一种更加友好的方式来管理你的数据。Angular 的 http get请求返回的是 Observable.',
      details: {
        label: '查看更多',
        href: '/node/376',
        mode: 'raised',
        color: 'primary',
      },
    },
  ],
  sidebar: [
    MediaListStories.Default?.args?.content,
    {
      type: 'menu-list',
      title: '\u5206\u7c7b',
      elements: [
        {
          link: {
            href: '/frontend',
            label: '\u524d\u7aef\u8336\u9986',
          },
          label: '8',
        },
        {
          link: {
            href: '/drupal',
            label: 'Drupal \u81ea\u4e60\u5ba4',
          },
          label: '5',
        },
      ],
    },
  ],
};
Default.args = {
  content,
};
