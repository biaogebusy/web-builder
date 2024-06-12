import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { ViewListComponent } from '@uiux/widgets/view-list/view-list.component';
import { StorysModule } from '@core/module/storys.module';

const meta: Meta<MyComponent> = {
  title: 'Drupal/视图列表',
  id: 'view-list',
  component: ViewListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `View List 组件顾名思义是针对 Drupal view 视图进行配置的组件，通过 View 配置出数据的REST api，配置出下拉菜单选项的 api，根据这些 view api 来动态读取和筛选数据的组件。`,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '预览';
// Default.parameters = {
//   controls: {
//     include: ['content', 'canShow', 'form', 'table'],
//   },
// };

const header = [
  {
    label: '标题',
    key: 'title',
  },
  {
    label: '分类',
    key: 'type',
  },
  {
    label: '日期',
    key: 'created',
    style: {
      textAlign: 'center',
      backgroundColor: 'rgba(0, 255, 51, 0.25)',
    },
  },
  {
    label: '详情',
    key: 'body',
    dialog: {
      shorten: 20,
      label: '更多',
    },
  },
  {
    label: '操作',
    key: 'actions',
  },
];

Default.args = {
  content: {
    type: 'view-list',
    spacer: 'none',
    params: {
      apiTypeBak: '/api/v1/event',
    },
    header,
    form: [
      {
        fieldGroupClassName: 'flex flex-wrap',
        fieldGroup: [
          {
            type: 'input',
            key: 'title',
            props: {
              label: '标题',
            },
          },
          {
            type: 'mat-select',
            key: 'user',
            props: {
              multiple: true,
              search: true,
              hideSelected: true,
              label: '用户',
              options: [
                { value: 1, label: 'Johnson' },
                { value: 2, label: '表歌' },
                { value: 3, label: '小南' },
              ],
            },
          },
          {
            type: 'date-range',
            key: 'date',
            props: {
              label: '期间',
              value: '',
              placeholder: '选择发布日期',
            },
            fieldGroup: [
              {
                type: 'input',
                key: 'start',
                placeholder: '开始',
              },
              {
                type: 'input',
                key: 'end',
                placeholder: '结束',
              },
            ],
          },
          {
            type: 'input',
            key: 'page',
            className: 'hidden',
            props: {
              label: '页码',
            },
          },
        ],
      },
    ],
    data: {
      canShow: true,
      pager: {
        current_page: 0,
        total_items: 22,
        total_pages: 2,
        items_per_page: 20,
      },
      table: {
        header,
        elements: [
          {
            url: '/node/452',
            title: '使用 DevTools 对 Angular 前端应用性能分析优化',
            created: '2022-01-08',
            body: '使用lighthouse评分以南宁IT派[www.nnitpai.com]为例记录分析优化过程，使用Devtoolslighthouse对首页进行综合的评分：性能评分勉强及格差强人意，切换到performance性能选项卡:记录的同时，可以依次滚动页面到底部，暂停看看分析结果：发现一推很深的函数调用，放大具体看看：（记得要用本地开发环境来查看，这样可以方便看未编译版本中具体的组件或者函数）发现大部分的深度调用都与这个MenuComponent组件有关，不断的在调用刷新，可以看到一个executeTemplate这个函数，这个是angular对模板里面的变量或者函数执行计算值，已检测是否有变化，相应进行渲染。看看MenuComponent组件模板关键部分：&amp;lt;ng-container*ngIf=&quot;content&quot;&amp;gt;&amp;lt;header*ngIf=&quot;screen.eq(&#039;gt-sm&#039;)&quot;class=&quot;header&quot;#header&amp;gt;//&amp;lt;/',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/452',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=452',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=452',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/451',
            title: '使用 takeUntil 操作符管理 Angular 组件的订阅',
            created: '2022-01-04',
            body: '在上一篇文章中，有个知友评论说是要takeUntil来管理订阅更加清晰明了，那我们就探探究竟。在Rxjs中，可以使用takeUntil来控制另外一个Observable对象数据的产生。使用takeUntil，上游的数据直接转手给下游，直到takeUntil的参数吐出一个数据或者完结。就像一个水龙头开关，一开始是打开的状态，上游的数据一开始直接流到下游，只要takeUntil一旦触发吐出数据，水龙头立刻关闭。利用这点，可以在订阅时时，在管道中添加takeUntil，在组件销毁时吐出数据，这样这些订阅就会立刻关闭，也就达到回收内存的作用。改造之前：export class ExampleComponent implements OnInit, OnDestroy {  subscription1: Subscription;  subscription2: Subscription;  ngOnInit(): void {    this.subscription1 = observable1.subscribe(...);    this.subscription2 = ',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/451',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=451',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=451',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/450',
            title: '你应该了解的 Angular 最佳实践',
            created: '2022-01-03',
            body: '遵循最佳实践可以让你的Angular应用保持性能优越，使团队的代码风格一致，以下代码摘自南宁IT派官网项目。把默认的变更检测设置为OnPushAngular默认变更检测是Defualt，只要在组件中有任意一个值发生改变或者Dom中有事件的更新都会触发整个应用自上而下的变更检测，使用OnPush的方式使大型的应用的性能得到很大的提升。导入ChangeDetectionStrategy之后，设置为OnPush@Component({selector:&#039;app-mega-menu&#039;,templateUrl:&#039;./mega-menu.component.html&#039;,styleUrls:[&#039;./mega-menu.component.scss&#039;],changeDetection:ChangeDetectionStrategy.OnPush,})如果你的组件中有值的更新则导入ChangeDetectorRefconstructor(privateeleRef:ElementRef,privatescreenState:',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/450',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=450',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=450',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/399',
            title:
              '没想到吧？2021年南宁IT互联网相关工作者最近一份工作求职渠道最受欢迎的竟然是它',
            created: '2021-08-02',
            body: '前言目前，市面上求职渠道五花八门，有覆盖全行业的，有细分垂直领域的，有本地运营的，带来更多选择的同时，也带来了很多的烦恼。例如：泄露身份信息的常年挂着职位不回复的借招聘之名行培训之实的诈骗传销的带着这些好奇心，爱好问卷的我们群里发起了【在南宁，作为从事互联网相关工作的你，最近一份工作是从哪个渠道求职找到的？】的调查，数据量不多，本文标题有标题党嫌疑，仅供参考：）填写量：620您当前的职位类别是？通过哪个招聘网站或者渠道？为了排除机器人及非有效性问卷，以下是筛选仅限来自广西地区的投票：填写量：53您当前的职位类别是？通过哪个招聘网站或者渠道？最后，得出的结论是小伙伴们最近一份工作求职渠道最受欢迎的是BOSS招聘和广西人才市场。声明：以上调查数据量有限，不权威，仅供参考。南宁IT派，您的职场朋友圈。',
            type: '新闻',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/399',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=399',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=399',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/397',
            title: '五年了，再谈南宁和深圳的差距',
            created: '2021-06-22',
            body: '本文经过作者的同意转载。两年前，写了一篇文章谈了下来南宁三年的感想，是我全部文章里点击量最好的，回复评论最多的。（当然其实整体的量都不大）一眨眼，来南宁5年了，生活工作的重心都放到了南宁。再去深圳，看看两个城市的对比，感慨还是很多。5年的时间，南宁的房价从我们来的时候普遍6、7千，升到现在一万以上。深圳的房价从我离开的2万左右升到普遍7万左右。房价大幅增长的背后，是深圳这座城市的活力。人口高度聚集在这里，工作、生活、娱乐。地铁里满满的人，大城市的感觉扑面而来。南宁的房价也在涨，但涨幅小的多。人口不增不减，还是那么多。周边城市如玉林、贵港、百色等地的人喜欢来南宁买房。但不一定居住，空置率较高，尤其是新城五象。漂亮的小区，晚上的亮灯率不太高，交房两年以上的亮灯率也就3层左右。整个城市发展，这五年2015-2020，南宁的重点发展是五象新区。整个片区从黄土纷飞到有模有样。宽敞的街道，美丽的绿化，总部基地站的高楼都在显示这座城市想要发展的决心和诚意。进入总部基地有种来到了广州、深圳大城市的味道。唯一遗憾的是，这里的人口还不多，高楼林立下商铺较少。除了写字楼在早晚高峰和中午吃饭有人员进出外。',
            type: '新闻',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/397',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=397',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=397',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/396',
            title: '南宁IT互联网行业薪资福利待遇如何？',
            created: '2021-06-22',
            body: '前段时间，我们发布了2020年度南宁互联网IT行业薪资生存调查投票，分别从性别、年龄、婚恋状况、购房情况、租房情况、公司属性、跳槽情况、工作年限、月薪收入、工作满意程度，这几个维度进行了投票调查，从2020年12月01日到2020年12月06日截止，一共投票了96票，其中女生占19%，男生占81%：年龄分布婚恋状况年龄分布，25岁到30岁是主力军购房情况，南宁的房间目前普遍都1万起步，自己能够买房的只有11%公司属性民营企业占了六成，其次是国有企业，不知道是不是今年疫情的原因，自由职业者也有10%的比例跳槽情况工作年限月薪收入最关心的当属月薪收入，普遍在4000元到6000元，有一定工作经验的在6000元到8000元之间，高级开发者可以拿到8000元到150000元的薪资，不乏2w起步的薪水大多数人觉得当前工作满意程度为一般，很不满意和不满意总共占27%以上投票数据报告并不能代表完整性，但是从侧面也反映出了当前的南宁IT互联网从业者现状，仅给各位以参考。不管是初入职场的小白，还是经验丰富的职场高手，最终还是逃过不工作年龄的界限，家庭和社会的压力，祝各位秉持着最初的愿景，褪掉浮躁与焦虑',
            type: '新闻',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/396',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=396',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=396',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/394',
            title: '南宁IT互联网公司，有哪些是双休？',
            created: '2021-06-22',
            body: '双休毫无疑问在每个行业都是热门讨论的话题，在IT行业更是如此，常年的过度加班导致各种事件也是频繁上热搜。周末双休也成为了寻找一份工作不可忽视的环节。在应聘中，如果在同等条件下双休的工作制度给应聘者带来更大的吸引力，双休意味着有更多的个人时间安排给家人和自己。充分利用好周末不仅可以充实生活平衡工作，还可以提升技术水平和职业素养，为未来的自己提升更多的竞争优势。以下名单仅仅是交流群中调查填写的名单，数据未经考究不权威，仅供参考，提供给想了解更多IT公司相关双休背景的小伙伴，此数据会不断更新在这里。编号是否双休公司名称备注1是万兴科技2是南宁富桂精密工业有限公司（富士康）没事双休有事不违反六休一3是广投智能科技有限公司4是南宁太初5是PSAChina6是南宁市艾若思文化传播有限公司7是东信8是亚信9是与或非10是戴文信息科技11是中教教育12是壹智能13否帮帮信心14是西安点通15是上海观安16是云宝宝大数据有限责任公司17是超图有限责任公司',
            type: '新闻',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/394',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=394',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=394',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/387',
            title: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
            created: '2021-05-14',
            body: '在特定情况下，有些接口无法提供一次性的请求达到目的，需要并行的多次请求，当所有请求都完成时，才进行下一步的逻辑。forkJoin在这里是比较适合这种操作的。值得注意的是，Angular5和rxjs5.5.2的版本导入的对象和最新的版本有区别。//...import{forkJoin}from&#039;rxjs/observable/forkJoin&#039;;//...exportclassSampleService{deleteMultVote(items){constarr:any=[];items.forEach(item=&amp;gt;{arr.push(this.http.delete(item,this.httpOption))});returnforkJoin(...arr);}}注入该服务之后，在具体的组件使用：updateVote(){this.sampleService.deleteMultVote(datas).subscribe(res=&amp;gt;{console.log(res)//yourcode},error=&amp;gt;{console',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/387',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=387',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=387',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/386',
            title: 'Drupal 8 Ajax 弹出框可监听利用的 Event 事件',
            created: '2021-05-14',
            body: 'Drupal提供了一些自定义的Ajaxmodal弹出框事件，通过监听这些事件，可以做一些你想做的事情。这些事件包括：dialog:beforecreatedialog:aftercreatedialog:beforeclosedialog:afterclose这些自定义的event事件都绑定在window对象上，下面是示例的代码，可以使用在自定义的主题或者模块中：(function($,Drupal){Drupal.behaviors.sampleAction={attach:function(context){$(window).once().on(&#039;dialog:aftercreate&#039;,function(dialog,$element,settings){console.log(&#039;modalisopened!&#039;);});}};})(jQuery,Drupal);',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/386',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=386',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=386',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/385',
            title: 'Drupal8 用户登录后自定义重定向',
            created: '2021-05-14',
            body: 'Drupal官网有很多的模块可以提供用户登录后进行自定义重定向路由，基于某种需求，需要在自己的模块中实现，值得注意的是Drupal8和Drupal7的实现方式有所差异，以下是Drupal8hook代码实现部分：useDrupal\\Core\\Form\\FormStateInterface;useDrupal\\Core\\Url;/***Implementshook_form_FORM_ID_alter().*/functionMYCUSTOMMODULE_form_user_login_form_alter(&amp;amp;$form,FormStateInterface$form_state,$form_id){$form[&#039;#submit&#039;][]=&#039;MYCUSTOMMODULE_user_login_form_submit&#039;;}/***Customsubmithandlerfortheloginform.*/functionMYCUSTOMMODULE_user_login_form_submit($form,',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/385',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=385',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=385',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/383',
            title: '如何更改 git commit 某个历史提交信息',
            created: '2021-05-11',
            body: '由于某种原因，需要更新历史提交的commit信息，如果想更新最新的提交，可以使用命令：gitcommit--amend比如想更新最后一个commit:updatezhihulink，输入命令之后输入i直接进入编辑模式：编辑好之后，退出编辑模式:wq保存想更新倒数的某条commit略微麻烦，需要几个步骤，使用的命令是，HEAD~x表示倒数第几条之后的commit需要编辑：gitrebase-iHEAD~2回车进入编辑模式，返回的信息显示倒数两条commit，这时我们只需要把想更新的commit前面的pick改为edit即可：回车会返回下一步的提示信息输入命令，重新编辑commitgitcommit--amend再输入gitrebase--continue',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/383',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=383',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=383',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/382',
            title:
              '开源项目使用 Github actions 自动化测试部署 Angular 应用到 ECS 服务器',
            created: '2021-05-10',
            body: '查了些文档文章，GithubActions有几个重要的信息如下：通过Docker隔离每个workflow独享1核虚拟CPU,3.75GB内存，包括网络权限和100GB磁盘在yml配置文件中可以使用上下文环境变量，比如分支或者不公开变量每个workflow排队和执行时间最多58分钟，最多可以包含100个action，每个仓库同一时刻只能运行两个workflow下例以一个Angular的示例应用来演示：部署可以有很多方式，此次使用云服务器的SSH账户密码来部署，这些敏感信息存在仓库的Secrets里面，在yml里面可以读取。目标：当master分支发生push事件时，build并部署代码到sit测试环境；当prod分支有PR请求合并时，build并部署代码到prod正式环境；定义sitworkflow在仓库根目录新建.github/workflows/sit.ymlname:Buildappanddeploytohuaweisiton:push:#监听push操作branches:[master]#指定分支jobs:build:#usingUbunturuns-on:ubuntu-',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/382',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=382',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=382',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/377',
            title: 'Drupal jsonapi 初级入门实践',
            created: '2021-05-03',
            body: '前期工作首先你得有一个Drupal站点进入JSON:API配置页面，选择【接受JSON:API的创建、读、更新和删除所有操作。】配置CORS复制sites/default/default.services.yml到sites/default/services.yml修改其中的配置cors.config:enabled:true#Specifyallowedheaders,like&#039;x-allowed-header&#039;.allowedHeaders:[&#039;x-csrf-token&#039;,&#039;authorization&#039;,&#039;content-type&#039;,&#039;accept&#039;,&#039;origin&#039;,&#039;x-requested-with&#039;]#Specifyallowedrequestmethods,specify[&#039;*&#039;]toallowallpossibleones.allowedMethods:[&#039;*&#039;]#',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/377',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=377',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=377',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/376',
            title: 'RxJS switchMap 在 Drupal api中的应用',
            created: '2021-05-03',
            body: '在Angular中，可以把想要的东西转换成流，流是一种更加友好的方式来管理你的数据。Angular的httpget请求返回的是Observable，当post登录之后：login(userName:string,passWord:string):Observable&amp;lt;any&amp;gt;{consthttpOptions={headers:newHttpHeaders({Accept:&#039;application/vnd.api+json&#039;,&#039;Content-type&#039;:&#039;application/json&#039;,}),withCredentials:true,};returnthis.http.post&amp;lt;any&amp;gt;(`${this.apiService.apiUrl}${this.apiService.loginPath}?_format=json`,{name:userName,pass:passWord,},httpOptions);}返回当前用户uid、name和token信息：{',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/376',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=376',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=376',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/375',
            title: 'Angular CLI 如何配置代理 Drupal api 和静态文件',
            created: '2021-05-03',
            body: 'Angular前端在本地开发的时候，时刻与Drupal后端请求数据，其中包括API和静态的图片文件资源，没有配置Proxy代理的情况下，你可能需要频繁的注释本地切换API地址调式：exportconstenvironment={//apiUrl:&#039;http://localhost:4200&#039;,apiUrl:&#039;https://api.zhaobg.com&#039;,production:false,};静态文件没有一个比较便捷的方式来显示，这在开发过程中带来一定的麻烦：通过angularwebpack内置代理，配置API代理和静态文件访问代理，免去来回切换注释代码调式的麻烦。目标ngserve启动应用后，自动开启proxy代理，api和静态文件能够读取线上服务器数据资源。第一步在应用根目录新建文件config/proxy.config.jsconstPROXY_CONFIG=[{context:[&quot;/user&quot;,&quot;/api&quot;,&quot;/sites&quot;,],target:&quot;https://api',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/375',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=375',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=375',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/374',
            title:
              '分享几款不错的 Web 地图应用 UI 设计，并用 Drupal Jsonapi 实现了个 Demo',
            created: '2021-05-03',
            body: '',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/374',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=374',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=374',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/373',
            title: 'Angular constructor 和 ngOnInit 有什么区别？',
            created: '2021-05-03',
            body: '这是Angular技术面试中经常问到的问题，简单回答就是constructor构造函数用来编写依赖项和初始化成员，而在ngOnInit中编写逻辑。为什么不能够将服务或者业务逻辑写在constructor构造函数中？这是因为我们的业务逻辑代码需要等待所有的依赖项和组件都被加载，不然会出现值找不到的情况。constructor(privatefb:FormBuilder,publicuserState:UserState,privaterouter:Router,privateapiService:ApiService,publicscreenState:ScreenState,privatetitleService:TitleService,privateappState:AppState,publicbranding:BrandingState){}ngOnInit():void{this.titleService.setTitle(&#039;欢迎登录！&#039;);this.userForm=this.fb.group({name:[&#039;&#039;,',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/373',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=373',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=373',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/372',
            title: 'Angular ng-content、ng-template、ng-container 之间的区别',
            created: '2021-05-03',
            body: '刚开始学Angular的时候，会觉得这三个指令很像，每一个都具有不一样的作用，拿实际的例子，看看他们之间具体的区别。ng-content&amp;lt;div[ngClass]=&quot;classes&quot;&amp;gt;&amp;lt;ng-content&amp;gt;&amp;lt;/ng-content&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;app-bg[classes]=&quot;[&#039;bg-fill-width&#039;,&#039;wave-wrapper&#039;]&quot;&amp;gt;&amp;lt;mat-iconclass=&quot;wave&quot;svgIcon=&quot;wave&quot;&amp;gt;&amp;lt;/mat-icon&amp;gt;&amp;lt;/app-bg&amp;gt;ng-content置于Angular组件中，相当于占位符，外部组件在调用的时候，会把真正的内容放置到ng-content所占位的地方。这样就可以灵活的使用动态的外部数据来填充到指定的结构里面',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/372',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=372',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=372',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/371',
            title: 'Angular 有哪几种不同类型的绑定',
            created: '2021-05-03',
            body: 'Angular数据从父组件自上而下通过属性绑定流向子组件，而Event事件绑定刚好相反。单向数据绑定1、大胡子插值绑定通过使用大胡子{{}}表达式嵌入标记文本中，花括号之间的文本通常是组件属性的名字：&amp;lt;divclass=&quot;footer-bottomtext-centerp-y-sm&quot;&amp;gt;&amp;lt;divclass=&quot;container&quot;&amp;gt;&amp;lt;divclass=&quot;brand&quot;fxLayoutAlign=&quot;space-betweencenter&quot;&amp;gt;&amp;lt;h2class=&quot;mat-h2m-bottom-0&quot;&amp;gt;{{branding.footer.logo.label}}&amp;lt;/h2&amp;gt;&amp;lt;p&amp;gt;©{{utilities.fullYear}}{{branding.footer.copyRight}}&amp;lt;/p&amp;gt;&amp;lt;/',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/371',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=371',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=371',
                  },
                ],
              },
            ],
          },
          {
            url: '/node/368',
            title:
              'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
            created: '2021-05-01',
            body: '有过DrupalJSONAPI使用经验的开发者来说，处理请求的json数据特别的繁琐，特别是有些实体字段多重依赖和嵌套，需要自定义的构建函数来提取组合数据。且看看JSONAPI返回的数据：https://api.zhaobg.com/api/v1/node/case?fields[node--case]=title,body,created,medias,field_tags,drupal_internal__nid,path&amp;amp;include=medias,medias.field_media_image,field_tags&amp;amp;fields[file--file]=uri&amp;amp;fields[taxonomy_term--industry]=name一个文章的内容类型，其中图片字段使用了媒体实体，其中有多层相关关联和嵌套，要想获取该内容的图片路径，需要经过复杂的映射匹配才能得到。或者你也遇到过，需要往JSONAPI请求接口提交数据时，必须符合JSONAPI的标准规范，而这个标准规范也比较繁琐，例如新增一个实体内容：{&quot;data',
            type: '博客',
            actions: [
              {
                type: 'share',
                params: {
                  url: '/node/368',
                },
              },
              {
                type: 'download',
                elements: [
                  {
                    type: 'link',
                    label: 'Doc',
                    icon: {
                      name: 'description',
                    },
                    href: '/print/view/word_docx/print/doc?id=368',
                  },
                  {
                    type: 'link',
                    label: 'Pdf',
                    icon: {
                      name: 'picture_as_pdf',
                    },
                    href: '/print/view/pdf/print/pdf?id=368',
                  },
                ],
              },
            ],
          },
        ],
        classes: '',
        params: {},
      },
    },
  },
};
