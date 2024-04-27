import { home_v1 } from './samples/home_v1';
import { home_v10 } from './samples/home_v10';
import { home_v11 } from './samples/home_v11';
import { home_v12 } from './samples/home_v12';
import { home_v13 } from './samples/home_v13';
import { home_v14 } from './samples/home_v14';
import { home_v2 } from './samples/home_v2';
import { home_v3 } from './samples/home_v3';
import { home_v4 } from './samples/home_v4';
import { home_v5 } from './samples/home_v5';
import { home_v6 } from './samples/home_v6';
import { home_v7 } from './samples/home_v7';
import { home_v8 } from './samples/home_v8';
import { home_v9 } from './samples/home_v9';

export const samples = [
  {
    label: '首页示例',
    elements: [
      {
        label: '经典布局',
        id: 'home',
        icon: {
          svg: 'numeric-1',
        },
        page: home_v1,
      },
      {
        label: '服务介绍',
        id: 'home-v2',
        icon: {
          svg: 'numeric-2',
        },
        page: home_v2,
      },
      {
        label: '应用推广',
        id: 'home-v3',
        icon: {
          svg: 'numeric-3',
        },
        page: home_v3,
      },
      {
        label: '应用介绍',
        id: 'home-v4',
        icon: {
          svg: 'numeric-4',
        },
        page: home_v4,
      },
      {
        label: '在线课程',
        id: 'home-v5',
        icon: {
          svg: 'numeric-5',
        },
        page: home_v5,
      },
      {
        label: '医疗科技',
        id: 'home-v6',
        icon: {
          svg: 'numeric-6',
        },
        page: home_v6,
      },
      {
        label: 'Sass 服务',
        id: 'home-v7',
        icon: {
          svg: 'numeric-7',
        },
        page: home_v7,
      },
      {
        label: '应用市场',
        id: 'home-v8',
        icon: {
          svg: 'numeric-8',
        },
        page: home_v8,
      },
      {
        label: '艺术科学',
        id: 'home-v9',
        icon: {
          svg: 'numeric-9',
        },
        page: home_v9,
      },
      {
        label: 'App 应用',
        id: 'home-v10',
        icon: {
          svg: 'numeric-10',
        },
        page: home_v10,
      },
      {
        label: '客户故事',
        id: 'home-v11',
        icon: {
          svg: 'roman-numeral-1',
        },
        page: home_v11,
      },
      {
        label: '工作室',
        id: 'home-v12',
        icon: {
          svg: 'roman-numeral-2',
        },
        page: home_v12,
      },
      {
        label: '现代商业',
        id: 'home-v13',
        icon: {
          svg: 'roman-numeral-3',
        },
        page: home_v13,
      },
      {
        label: '生活家居',
        id: 'home-v14',
        icon: {
          svg: 'roman-numeral-4',
        },
        page: home_v14,
      },
    ],
  },
  {
    label: '文章相关',
    elements: [
      {
        label: '文章详情',
        id: 'article',
        icon: {
          svg: 'translate',
        },
        page: {
          title: '使用 DevTools 对 Angular 前端应用性能分析优化',
          body: [
            {
              type: 'article',
              title: '使用 DevTools 对 Angular 前端应用性能分析优化',
              banner: {
                img: {
                  src: '../assets/images/16-9/nature-08.jpg',
                },
              },
              meta: [
                {
                  icon: 'calendar-range',
                  label: '2024/04/16',
                },
                {
                  icon: 'tag-outline',
                  label: '前端茶馆',
                },
              ],
              body: '<p>在上一篇文章中，有个知友评论说是要 takeUntil 来管理订阅更加清晰明了，那我们就探探究竟。</p><p>在 Rxjs 中，可以使用 takeUntil 来控制另外一个 Observable 对象数据的产生。使用 takeUntil，上游的数据直接转手给下游，直到takeUntil的参数吐出一个数据或者完结。</p><p>就像一个水龙头开关，一开始是打开的状态，上游的数据一开始直接流到下游，只要 takeUntil 一旦触发吐出数据，水龙头立刻关闭。</p><p>利用这点，可以在订阅时时，在管道中添加 takeUntil，在组件销毁时吐出数据，这样这些订阅就会立刻关闭，也就达到回收内存的作用。</p><p>多理解熟悉 Angular 的内部运行机制，为项目开发带来更好的效益。</p><img src="/assets/images/1-1/business-02.png" /><ul class="list-done"><li>要善于使用 lighthouse 进行检测评分，针对不同问题具体分析；</li><li>多使用 Devtools 分析，查找问题的入口；</li><li>不要在模板中使用函数或者getter，当有大量变更时，会存在很多的性能隐患；</li><p>接下来，会继续针对这个案例继续分析，使项目的 lighthouse 评分更加友好，提供给各位前端开发一些借鉴和交流。</p></ul>',
              sidebar: [
                {
                  type: 'media-list',
                  title: '热门文章',
                  elements: [
                    {
                      link: {
                        label: '使用 DevTools 对 Angular 前端应用性能分析优化',
                        href: '/node/417',
                      },
                      img: {
                        src: '../assets/images/showcase/blog1-large.jpeg',
                        alt: '',
                      },
                      changed: '2024-04-16',
                    },
                    {
                      link: {
                        label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                        href: '/node/415',
                      },
                      img: {
                        src: '../assets/images/showcase/blog2-large.jpeg',
                        alt: '',
                      },
                      changed: '2024-04-16',
                    },
                    {
                      link: {
                        label: '你应该了解的 Angular 最佳实践',
                        href: '2024-04-16',
                      },
                      img: {
                        src: '../assets/images/showcase/blog3-large.jpeg',
                        alt: '',
                      },
                      changed: '2024-04-16',
                    },
                    {
                      link: {
                        label:
                          'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
                        href: '2024-04-16',
                      },
                      img: {
                        src: '../assets/images/showcase/blog4-large.jpeg',
                        alt: '',
                      },
                      changed: '2024-04-16',
                    },
                  ],
                },
                {
                  type: 'menu-list',
                  title: '标签',
                  elements: [
                    {
                      link: {
                        href: '#',
                        label: 'Angular',
                      },
                      label: '3',
                    },
                    {
                      link: {
                        href: '#',
                        label: 'Drupal',
                      },
                      label: '3',
                    },
                    {
                      link: {
                        href: '#',
                        label: 'Jsonapi',
                      },
                      label: '2',
                    },
                  ],
                },
              ],
              params: {
                comment: {
                  type: 'comment--comment',
                  attributes: {
                    entity_type: 'node',
                    field_name: 'comment',
                    comment_body: {
                      format: 'full_html',
                    },
                  },
                  relationships: {
                    comment_type: {
                      data: {
                        type: 'comment_type--comment_type',
                        id: '19c33b19-bfdc-4a26-9c64-af6171b123cb',
                      },
                    },
                    entity_id: {
                      data: {
                        type: 'node--article',
                        id: '{{entity_uuid}}',
                      },
                    },
                  },
                },
              },
              editor: {
                action: {
                  label: '提交',
                },
                succes: {
                  label: '成功发布！',
                },
              },
              actions: [
                {
                  type: 'flag',
                  label: '收藏',
                  icon: {
                    name: 'star',
                    inline: true,
                  },
                  params: {
                    type: 'flagging--favorite',
                    entity_type: 'node',
                    entity_id: '1312',
                    relationships: {
                      flagged_entity: {
                        type: 'node--article',
                        id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
                      },
                    },
                  },
                },
                {
                  type: 'share',
                  button: {
                    icon: 'share',
                    label: '分享',
                  },
                  params: {
                    url: '/',
                  },
                },
                {
                  type: 'download',
                  label: '下载',
                  icon: {
                    name: 'file_download',
                    inline: true,
                  },
                  elements: [
                    {
                      type: 'link',
                      label: 'Doc',
                      icon: {
                        name: 'description',
                      },
                      href: '#',
                    },
                    {
                      type: 'link',
                      label: 'Pdf',
                      icon: {
                        name: 'picture_as_pdf',
                      },
                      href: '#',
                    },
                  ],
                },
              ],
              comment: {
                actions: ['update', 'delete', 'reply', 'quote'],
                title: true,
              },
            },
          ],
        },
      },
      {
        label: '问答',
        id: 'question',
        icon: {
          svg: 'lightbulb-question-outline',
        },
        page: {
          title: '作为一个前端开发人员，如何让自己保持学习的热忱并坚持下去？',
          body: [
            {
              type: 'question',
              title: '代码开发平台有何优缺点？',
              body: '',
              topic: {
                elements: [
                  {
                    label: '低代码',
                  },
                  {
                    label: '零代码',
                  },
                ],
              },
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
                        id: '5f073296-d474-4cd7-b357-ebb4e3e3db4b',
                      },
                    },
                  },
                },
              },
              editor: {
                type: 'answer',
                action: {
                  label: '发布回答',
                },
                succes: {
                  label: '您的答案已提交！',
                },
              },
            },
          ],
        },
      },
      {
        label: '图文列表',
        id: 'question',
        icon: {
          svg: 'format-list-bulleted-type',
        },
        page: {
          title: '博客列表',
          body: [
            {
              type: 'dynamic-media-list',
              params: {
                include: 'category,field_tags,media,media.field_media_image',
                sort: '-changed',
                type: 'blog',
              },
              showImage: true,
              ratios: 'media-16-9',
              readMoreLabel: '显示更多',
              pager: {
                itemsPerPage: 20,
              },
              sidebar: [
                {
                  type: 'media-list',
                  title: '最新博客',
                  elements: [
                    {
                      link: {
                        label: '信使 UI 应用初始化及页面渲染流程',
                        href: '/node/463',
                      },
                      img: {
                        src: '/sites/default/files/styles/media_3_2_medium/public/2024-03/0.jpg?itok=BwK8Gl1A',
                        alt: '',
                      },
                      changed: '2024/03/08',
                    },
                    {
                      link: {
                        label: '信使Web builder 新增自定义组件流程',
                        href: '/node/462',
                      },
                      img: {
                        src: '/sites/default/files/styles/media_3_2_medium/public/2024-03/173.jpg?itok=Pl96POWi',
                        alt: '',
                      },
                      changed: '2024/03/06',
                    },
                    {
                      link: {
                        label: '信使web builder 新增历史版本',
                        href: '/node/464',
                      },
                      img: {
                        src: '/sites/default/files/styles/media_3_2_medium/public/2024-03/1-5.jpg?itok=Irr343AH',
                        alt: '',
                      },
                      changed: '2024/01/25',
                    },
                    {
                      link: {
                        label: 'github 22 端口连接超时报错的解决办法',
                        href: '/node/461',
                      },
                      img: {
                        src: '/sites/default/files/styles/media_3_2_medium/public/2024-03/374.jpg?itok=moXR5q8F',
                        alt: '',
                      },
                      changed: '2024/01/22',
                    },
                  ],
                },
                {
                  type: 'menu-list',
                  title: '分类统计',
                  elements: [
                    {
                      link: {
                        href: '/frontend',
                        label: '前端茶馆',
                      },
                      label: '17',
                    },
                    {
                      link: {
                        href: '/drupal',
                        label: 'Drupal 自习室',
                      },
                      label: '8',
                    },
                    {
                      link: {
                        href: '/taxonomy/term/85',
                        label: '信使',
                      },
                      label: '3',
                    },
                    {
                      link: {
                        href: '/taxonomy/term/83',
                        label: '技术',
                      },
                      label: '1',
                    },
                    {
                      link: {
                        href: '/ui',
                        label: 'UI 设计',
                      },
                      label: '1',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        label: '视图列表',
        id: 'viewList',
        icon: {
          svg: 'format-list-numbered',
        },
        page: {
          title: '欢迎页',
          body: [
            {
              type: 'view-list',
              spacer: 'none',
              params: {
                apiType: '/api/v1/content',
              },
              header: [
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
              ],
              form: [
                {
                  fieldGroupClassName: 'flex flex-wrap',
                  fieldGroup: [
                    {
                      type: 'input',
                      key: 'title',
                      templateOptions: {
                        label: '标题',
                      },
                    },
                    {
                      type: 'input',
                      key: 'page',
                      className: 'hidden',
                      templateOptions: {
                        label: '页码',
                      },
                    },
                  ],
                },
              ],
              data: {
                canShow: true,
                table: {
                  header: [
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
                  ],
                  classes: '',
                  params: {},
                },
              },
            },
          ],
        },
      },
    ],
  },
];
