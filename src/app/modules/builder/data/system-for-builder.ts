export const system: any[] = [
  {
    label: '通用',
    elements: [
      {
        label: '横幅',
        icon: {
          svg: 'page-layout-header',
        },
        content: {
          style: 'normal',
          type: 'banner-simple',
          bannerBg: {
            classes: 'bg-fill-width overlay overlay-60',
            img: {
              hostClasses: '',
              src: '/assets/images/16-9/nature-08.jpg',
              alt: 'page title',
            },
          },
          title: '横幅',
          breadcrumb: [
            {
              label: '首页',
              href: '#',
            },
            {
              label: '组件',
              href: '#',
            },
            {
              label: '横幅',
              href: '#',
            },
          ],
        },
      },
      {
        label: '文章',
        icon: {
          svg: 'translate',
        },
        content: {
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
              label: '2024/05/31',
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
                  changed: '2024-05-31',
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
                  changed: '2024-05-31',
                },
                {
                  link: {
                    label: '你应该了解的 Angular 最佳实践',
                    href: '2024-05-31',
                  },
                  img: {
                    src: '../assets/images/showcase/blog3-large.jpeg',
                    alt: '',
                  },
                  changed: '2024-05-31',
                },
                {
                  link: {
                    label: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
                    href: '2024-05-31',
                  },
                  img: {
                    src: '../assets/images/showcase/blog4-large.jpeg',
                    alt: '',
                  },
                  changed: '2024-05-31',
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
            require_rule: [],
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
      },
      {
        label: '面板 v1',
        icon: {
          svg: 'view-dashboard-outline',
        },
        content: {
          type: 'dashboard',
          elements: [
            {
              title: {
                label: '内容发布量',
              },
              row: 12,
              params: {
                apiBak: '/api/v3/xxx',
              },
              form: [
                {
                  type: 'mat-select',
                  key: 'position',
                  defaultValue: 2023,
                  className: 'block',
                  props: {
                    label: '年份',
                    description: '请选择年份',
                    options: [
                      {
                        label: '2023年',
                        value: 2023,
                      },
                      {
                        label: '2022年',
                        value: 2022,
                      },
                      {
                        label: '2021年',
                        value: 2021,
                      },
                      {
                        label: '2020年',
                        value: 2020,
                      },
                    ],
                  },
                },
              ],
              widget: {
                type: 'chart',
                tooltip: {
                  trigger: 'axis',
                },
                dataset: [
                  {
                    source: [
                      ['name', '内容'],
                      ['1月', 15],
                      ['2月', 43],
                      ['3月', 62],
                      ['4月', 82],
                      ['5月', 100],
                      ['6月', 51],
                      ['7月', 99],
                      ['8月', 72],
                      ['9月', 32],
                      ['10月', 42],
                      ['11月', 24],
                      ['12月', 30],
                    ],
                  },
                ],
                grid: {
                  left: '40px',
                  right: '40px',
                  top: '30px',
                  bottom: '30px',
                },
                xAxis: {
                  type: 'category',
                },
                yAxis: {
                  type: 'value',
                },
                series: [
                  {
                    type: 'bar',
                    label: {
                      position: 'top',
                      show: true,
                    },
                    barMaxWidth: '30px',
                    datasetIndex: 0,
                  },
                ],
              },
            },
            {
              row: 3,
              widget: {
                type: 'chart-box',
                label: '文章数',
                count: '25',
                params: {
                  apiBak: '/api/v3/xxx',
                },
                chart: {
                  grid: {
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                  },
                  xAxis: {
                    show: false,
                    type: 'category',
                  },
                  yAxis: {
                    show: false,
                    type: 'value',
                  },
                  dataset: [
                    {
                      source: [
                        ['name', '文章数'],
                        ['1月', 44],
                        ['2月', 18],
                        ['3月', 41],
                        ['4月', 53],
                        ['5月', 61],
                        ['6月', 19],
                        ['7月', 86],
                        ['8月', 50],
                        ['9月', 41],
                        ['10月', 44],
                        ['11月', 19],
                        ['12月', 97],
                      ],
                    },
                  ],
                  series: [
                    {
                      type: 'line',
                      symbol: 'none',
                      areaStyle: {
                        opacity: 0.1,
                        color: '#1976d2',
                      },
                      lineStyle: {
                        color: '#1976d2',
                      },
                      label: {
                        position: 'top',
                        show: true,
                      },
                      datasetIndex: 0,
                    },
                  ],
                },
              },
            },
            {
              row: 3,
              widget: {
                type: 'chart-box',
                label: '审核数',
                count: '36',
                params: {
                  apiBak: '/api/v3/node/vote/report',
                },
                chart: {
                  grid: {
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                  },
                  xAxis: {
                    show: false,
                    type: 'category',
                  },
                  yAxis: {
                    show: false,
                    type: 'value',
                  },
                  dataset: [
                    {
                      source: [
                        ['name', '审核数'],
                        ['1月', 90],
                        ['2月', 83],
                        ['3月', 58],
                        ['4月', 79],
                        ['5月', 57],
                        ['6月', 21],
                        ['7月', 70],
                        ['8月', 95],
                        ['9月', 79],
                        ['10月', 22],
                        ['11月', 67],
                        ['12月', 35],
                      ],
                    },
                  ],
                  series: [
                    {
                      type: 'line',
                      symbol: 'none',
                      areaStyle: {
                        opacity: 0.1,
                        color: '#512da8',
                      },
                      lineStyle: {
                        color: '#512da8',
                      },
                      label: {
                        position: 'top',
                        show: true,
                      },
                      datasetIndex: 0,
                    },
                  ],
                },
              },
            },
            {
              row: 3,
              widget: {
                type: 'chart-box',
                label: '用户数',
                count: '12',
                params: {
                  apiBak: '/api/v3/node/vote/report',
                },
                chart: {
                  grid: {
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                  },
                  xAxis: {
                    show: false,
                    type: 'category',
                  },
                  yAxis: {
                    show: false,
                    type: 'value',
                  },
                  dataset: [
                    {
                      source: [
                        ['name', '用户'],
                        ['1月', 10],
                        ['2月', 10],
                        ['3月', 3],
                        ['4月', 10],
                        ['5月', 5],
                        ['6月', 3],
                        ['7月', 5],
                        ['8月', 2],
                        ['9月', 7],
                        ['10月', 5],
                        ['11月', 10],
                        ['12月', 6],
                      ],
                    },
                  ],
                  series: [
                    {
                      type: 'line',
                      symbol: 'none',
                      areaStyle: {
                        opacity: 0.1,
                        color: '#f57f17',
                      },
                      lineStyle: {
                        color: '#f57f17',
                      },
                      label: {
                        position: 'top',
                        show: true,
                      },
                      datasetIndex: 0,
                    },
                  ],
                },
              },
            },
            {
              row: 3,
              widget: {
                type: 'chart-box',
                label: '评论数',
                count: '456',
                params: {
                  apiBak: '/api/v3/node/vote/report',
                },
                chart: {
                  grid: {
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                  },
                  xAxis: {
                    show: false,
                    type: 'category',
                  },
                  yAxis: {
                    show: false,
                    type: 'value',
                  },
                  dataset: [
                    {
                      source: [
                        ['name', '用户'],
                        ['1月', 4],
                        ['2月', 2],
                        ['3月', 1],
                        ['4月', 6],
                        ['5月', 10],
                        ['6月', 9],
                        ['7月', 6],
                        ['8月', 5],
                        ['9月', 7],
                        ['10月', 5],
                        ['11月', 1],
                        ['12月', 5],
                      ],
                    },
                  ],
                  series: [
                    {
                      type: 'line',
                      symbol: 'none',
                      areaStyle: {
                        opacity: 0.1,
                        color: '#c2185b',
                      },
                      lineStyle: {
                        color: '#c2185b',
                      },
                      label: {
                        position: 'top',
                        show: true,
                      },
                      datasetIndex: 0,
                    },
                  ],
                },
              },
            },
            {
              title: {
                label: '最新文章',
              },
              params: {
                apiBak: '/api/v3/xxx',
              },
              row: 6,
              widget: {
                type: 'dynamic-table',
                header: [
                  {
                    label: '标题',
                    key: 'title',
                  },
                  {
                    label: '分类',
                    key: 'custom',
                  },
                  {
                    label: '作者',
                    key: 'hander',
                  },
                  {
                    label: '状态',
                    key: 'type',
                  },
                  {
                    label: '创建时间',
                    key: 'date',
                  },
                ],
                elements: [
                  {
                    title: '<a href="#">探索机器学习的前沿技术</a>',
                    custom: '人工智能',
                    hander: '张华',
                    type: '已审核',
                    date: '2023/04/08',
                  },
                  {
                    title: '<a href="#">未来的可持续能源解决方案</a>',
                    custom: '环境科学',
                    hander: '李明',
                    type: '待审核',
                    date: '2023/04/7',
                  },
                  {
                    title: '<a href="#">瑜伽与身心健康的关系探究</a>',
                    custom: '健康与健身',
                    hander: '王琳',
                    type: '已审核',
                    date: '2023/04/7',
                  },
                  {
                    title: '<a href="#">最新的前端开发趋势与技术</a>',
                    custom: '技术与编程',
                    hander: '刘强',
                    type: '已审核',
                    date: '2023/04/03',
                  },
                  {
                    title: '<a href="#">未来智能家居的发展趋势与挑战</a>',
                    custom: '科技与创新',
                    hander: '陈晓阳',
                    type: '待审核',
                    date: '2023/04/03',
                  },
                ],
              },
            },
            {
              title: {
                label: '最新审批',
              },
              params: {
                apiBak: '/api/v3/xxx',
              },
              row: 6,
              widget: {
                type: 'dynamic-table',
                header: [
                  {
                    label: '标题',
                    key: 'title',
                  },
                  {
                    label: '部门',
                    key: 'custom',
                  },
                  {
                    label: '经办人',
                    key: 'hander',
                  },
                  {
                    label: '类型',
                    key: 'type',
                  },
                  {
                    label: '创建时间',
                    key: 'date',
                  },
                ],
                elements: [
                  {
                    title: '<a href="#">年度预算审批</a>',
                    custom: '财务部',
                    hander: '张华',
                    type: '财务审批',
                    date: '2023/04/08',
                  },
                  {
                    title: '<a href="#">新员工入职申请</a>',
                    custom: '人力资源部',
                    hander: '李明',
                    type: '人事审批',
                    date: '2023/04/7',
                  },
                  {
                    title: '<a href="#">项目变更申请</a>',
                    custom: '项目管理办公室',
                    hander: '王琳',
                    type: '项目审批',
                    date: '2023/04/7',
                  },
                  {
                    title: '<a href="#">采购订单审批</a>',
                    custom: '采购部',
                    hander: '刘强',
                    type: '采购审批',
                    date: '2023/04/03',
                  },
                  {
                    title: '<a href="#">请假申请</a>',
                    custom: '行政部',
                    hander: '陈晓阳',
                    type: '行政审批',
                    date: '2023/04/03',
                  },
                ],
              },
            },
            {
              title: {
                label: '工作日历',
              },
              row: 12,
              widget: {
                type: 'full-calendar',
                spacer: 'none',
                calendar: {
                  drawer: true,
                  apiBak: '/api/v1/demo',
                  options: {
                    events: [
                      {
                        title: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
                        event: 'meeting',
                        start: '2024-05-31T15:19:11.195Z',
                        user: 'Johnson',
                        className: 'bg-primary',
                      },
                      {
                        title: '使用 TAKEUNTIL 操作符管理 ANGULAR 组件的订阅',
                        event: 'drupal',
                        start: 1717341551195,
                        user: 'Johnson',
                        className: 'bg-accent',
                      },
                      {
                        title: '你应该了解的 ANGULAR 最佳实践',
                        event: 'drupal',
                        start: 1718032751195,
                        user: 'Johnson',
                        className: 'bg-warn',
                      },
                      {
                        title:
                          'ANGULAR 5 RXJS 5.5.2 多个 HTTP 并行 FORKJOIN 请求',
                        event: 'drupal',
                        start: 1717600751195,
                        user: 'Johnson',
                        className: 'bg-warn',
                      },
                      {
                        title: 'DRUPAL 8 AJAX 弹出框可监听利用的 EVENT 事件',
                        event: 'drupal',
                        start: 1717773551195,
                        user: 'Johnson',
                        className: 'bg-pink',
                      },
                      {
                        title: 'DRUPAL8 用户登录后自定义重定向',
                        event: 'drupal',
                        start: 1717946351195,
                        user: 'Johnson',
                        className: 'bg-orange',
                      },
                      {
                        title: '如何更改 GIT COMMIT 某个历史提交信息',
                        event: 'drupal',
                        start: 1717600751195,
                        user: 'Johnson',
                        className: 'bg-yellow',
                      },
                      {
                        title:
                          '开源项目使用 GITHUB ACTIONS 自动化测试部署 ANGULAR 应用到 ECS 服务器',
                        event: 'drupal',
                        start: 1717514351195,
                        user: 'Johnson',
                        className: 'bg-red',
                      },
                      {
                        title: 'DRUPAL JSONAPI 初级入门实践',
                        event: 'drupal',
                        start: 1717427951195,
                        user: 'Johnson',
                        className: 'bg-purple',
                      },
                      {
                        title: 'RXJS SWITCHMAP 在 DRUPAL API中的应用',
                        event: 'drupal',
                        start: 1717859951195,
                        user: 'Johnson',
                        className: 'bg-indigo',
                      },
                      {
                        title: '五年了，再谈南宁和深圳的差距',
                        event: 'drupal',
                        start: 1717773551195,
                        user: 'Johnson',
                        className: 'bg-blue',
                      },
                      {
                        title:
                          '没想到吧？2021年南宁IT互联网相关工作者最近一份工作求职渠道最受欢迎的竟然是它',
                        event: 'drupal',
                        start: 1716823151195,
                        user: 'Johnson',
                        className: 'bg-cyan',
                      },
                      {
                        title: '南宁IT互联网行业薪资福利待遇如何？',
                        event: 'drupal',
                        start: 1716909551195,
                        user: 'Johnson',
                        className: 'bg-teal',
                      },
                      {
                        title: '南宁IT互联网公司，有哪些是双休？',
                        event: 'drupal',
                        start: 1716995951195,
                        user: 'Johnson',
                        className: 'bg-green',
                      },
                      {
                        title:
                          'JSONA 一款转换 JSONAPI 数据的工具库，也算是解放 DRUPAL JSONAPI 反序列化的利器',
                        event: 'drupal',
                        start: 1716304751195,
                        user: 'Johnson',
                        className: 'bg-light-green',
                      },
                      {
                        title: 'ANGULAR 有哪几种不同类型的绑定',
                        event: 'drupal',
                        start: 1716909551195,
                        user: 'Johnson',
                        className: 'bg-brown',
                      },
                      {
                        title:
                          'ANGULAR NG-CONTENT、NG-TEMPLATE、NG-CONTAINER 之间的区别',
                        event: 'drupal',
                        start: 1716736751195,
                        user: 'Johnson',
                        className: 'bg-grey',
                      },
                    ],
                  },
                  theme: {
                    meeting: 'bg-warn',
                    case: 'bg-primary',
                    project: 'bg-accent',
                    event: 'bg-red',
                  },
                },
              },
            },
          ],
        },
      },
      {
        label: '面板 v2',
        icon: {
          svg: 'view-dashboard-variant-outline',
        },
        content: {
          type: 'dashboard',
          elements: [
            {
              title: {
                label: '消费者注册数据',
              },
              params: {
                apiBak: '/api/v3/xxx',
              },
              row: 12,
              form: [
                {
                  type: 'mat-select',
                  key: 'position',
                  defaultValue: 2023,
                  className: 'block',
                  props: {
                    label: '年份',
                    description: '请选择年份',
                    options: [
                      {
                        label: '2023年',
                        value: 2023,
                      },
                      {
                        label: '2022年',
                        value: 2022,
                      },
                      {
                        label: '2021年',
                        value: 2021,
                      },
                      {
                        label: '2020年',
                        value: 2020,
                      },
                    ],
                  },
                },
              ],
              widget: {
                type: 'chart',
                tooltip: {
                  trigger: 'axis',
                },
                dataset: [
                  {
                    source: [
                      ['name', '用户'],
                      ['1月', 65],
                      ['2月', 59],
                      ['3月', 86],
                      ['4月', 27],
                      ['5月', 61],
                      ['6月', 20],
                      ['7月', 11],
                      ['8月', 42],
                      ['9月', 18],
                      ['10月', 85],
                      ['11月', 24],
                      ['12月', 37],
                    ],
                  },
                ],
                grid: {
                  left: '40px',
                  right: '40px',
                  top: '30px',
                  bottom: '30px',
                },
                xAxis: {
                  type: 'category',
                },
                yAxis: {
                  type: 'value',
                },
                series: [
                  {
                    type: 'bar',
                    label: {
                      position: 'top',
                      show: true,
                    },
                    barMaxWidth: '30px',
                    datasetIndex: 0,
                  },
                ],
              },
            },
            {
              row: 3,
              widget: {
                type: 'chart-box',
                label: '广告发布量',
                count: '5',
                params: {
                  apiBak: '/api/v3/node/vote/report',
                },
                chart: {
                  grid: {
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                  },
                  xAxis: {
                    show: false,
                    type: 'category',
                  },
                  yAxis: {
                    show: false,
                    type: 'value',
                  },
                  dataset: [
                    {
                      source: [
                        ['name', '广告'],
                        ['1月', 91],
                        ['2月', 39],
                        ['3月', 11],
                        ['4月', 82],
                        ['5月', 45],
                        ['6月', 60],
                        ['7月', 65],
                        ['8月', 36],
                        ['9月', 76],
                        ['10月', 34],
                        ['11月', 82],
                        ['12月', 30],
                      ],
                    },
                  ],
                  series: [
                    {
                      type: 'line',
                      symbol: 'none',
                      areaStyle: {
                        opacity: 0.1,
                        color: '#1976d2',
                      },
                      lineStyle: {
                        color: '#1976d2',
                      },
                      label: {
                        position: 'top',
                        show: true,
                      },
                      datasetIndex: 0,
                    },
                  ],
                },
              },
            },
            {
              row: 3,
              widget: {
                type: 'chart-box',
                label: '消费者增长',
                count: '1,156',
                params: {
                  apiBak: '/api/v3/node/vote/report',
                },
                chart: {
                  grid: {
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                  },
                  xAxis: {
                    show: false,
                    type: 'category',
                  },
                  yAxis: {
                    show: false,
                    type: 'value',
                  },
                  dataset: [
                    {
                      source: [
                        ['name', '用户'],
                        ['1月', 38],
                        ['2月', 47],
                        ['3月', 25],
                        ['4月', 87],
                        ['5月', 32],
                        ['6月', 19],
                        ['7月', 28],
                        ['8月', 57],
                        ['9月', 48],
                        ['10月', 77],
                        ['11月', 20],
                        ['12月', 91],
                      ],
                    },
                  ],
                  series: [
                    {
                      type: 'line',
                      symbol: 'none',
                      areaStyle: {
                        opacity: 0.1,
                        color: '#512da8',
                      },
                      lineStyle: {
                        color: '#512da8',
                      },
                      label: {
                        position: 'top',
                        show: true,
                      },
                      datasetIndex: 0,
                    },
                  ],
                },
              },
            },
            {
              row: 3,
              widget: {
                type: 'chart-box',
                label: '门店增长',
                count: '50%',
                params: {
                  apiBak: '/api/v3/node/vote/report',
                },
                chart: {
                  grid: {
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                  },
                  xAxis: {
                    show: false,
                    type: 'category',
                  },
                  yAxis: {
                    show: false,
                    type: 'value',
                  },
                  dataset: [
                    {
                      source: [
                        ['name', '门店'],
                        ['1月', 4],
                        ['2月', 6],
                        ['3月', 9],
                        ['4月', 9],
                        ['5月', 8],
                        ['6月', 9],
                        ['7月', 1],
                        ['8月', 5],
                        ['9月', 5],
                        ['10月', 8],
                        ['11月', 8],
                        ['12月', 9],
                      ],
                    },
                  ],
                  series: [
                    {
                      type: 'line',
                      symbol: 'none',
                      areaStyle: {
                        opacity: 0.1,
                        color: '#f57f17',
                      },
                      lineStyle: {
                        color: '#f57f17',
                      },
                      label: {
                        position: 'top',
                        show: true,
                      },
                      datasetIndex: 0,
                    },
                  ],
                },
              },
            },
            {
              row: 3,
              widget: {
                type: 'chart-box',
                label: '评论量',
                count: '28',
                params: {
                  apiBak: '/api/v3/node/vote/report',
                },
                chart: {
                  grid: {
                    left: '0',
                    right: '0',
                    top: '0',
                    bottom: '0',
                  },
                  xAxis: {
                    show: false,
                    type: 'category',
                  },
                  yAxis: {
                    show: false,
                    type: 'value',
                  },
                  dataset: [
                    {
                      source: [
                        ['name', '评论'],
                        ['1月', 57],
                        ['2月', 52],
                        ['3月', 53],
                        ['4月', 91],
                        ['5月', 43],
                        ['6月', 39],
                        ['7月', 37],
                        ['8月', 19],
                        ['9月', 87],
                        ['10月', 60],
                        ['11月', 69],
                        ['12月', 46],
                      ],
                    },
                  ],
                  series: [
                    {
                      type: 'line',
                      symbol: 'none',
                      areaStyle: {
                        opacity: 0.1,
                        color: '#c2185b',
                      },
                      lineStyle: {
                        color: '#c2185b',
                      },
                      label: {
                        position: 'top',
                        show: true,
                      },
                      datasetIndex: 0,
                    },
                  ],
                },
              },
            },
            {
              title: {
                label: '抽奖数据',
              },
              row: 12,
              widget: {
                type: 'chart',
                tooltip: {
                  trigger: 'axis',
                },
                legend: {
                  bottom: '10px',
                },
                dataset: [
                  {
                    source: [
                      ['type', '红包', '推广'],
                      ['1月', 42, 96],
                      ['2月', 91, 41],
                      ['3月', 17, 86],
                      ['4月', 58, 68],
                      ['5月', 31, 11],
                      ['6月', 68, 97],
                      ['7月', 41, 74],
                      ['8月', 28, 15],
                      ['9月', 99, 25],
                      ['10月', 37, 66],
                      ['11月', 54, 85],
                      ['12月', 12, 31],
                    ],
                  },
                ],
                grid: {
                  left: '40px',
                  right: '40px',
                  top: '30px',
                  bottom: '60px',
                },
                xAxis: {
                  type: 'category',
                },
                yAxis: {
                  type: 'value',
                },
                series: [
                  {
                    name: '红包',
                    type: 'bar',
                    label: {
                      position: 'top',
                      show: true,
                    },
                    barMaxWidth: '30px',
                  },
                  {
                    name: '推广',
                    type: 'bar',
                    label: {
                      position: 'top',
                      show: true,
                    },
                    barMaxWidth: '30px',
                  },
                ],
              },
            },
            {
              title: {
                label: '最新广告',
              },
              row: 6,
              params: {
                apiBak: '/api/v3/xxx',
              },
              widget: {
                type: 'dynamic-table',
                header: [
                  {
                    label: '标题',
                    key: 'title',
                  },
                  {
                    label: '中奖',
                    key: 'lottery',
                  },
                  {
                    label: '访问',
                    key: 'visitor',
                  },
                  {
                    label: '评论',
                    key: 'comment',
                  },
                  {
                    label: '结束',
                    key: 'end',
                  },
                ],
                elements: [
                  {
                    title: '<a href="#">清明特惠，赢面单啦</a>',
                    lottery: '110',
                    visitor: '620',
                    comment: '0',
                    end: '2023/04/11 23:59:59',
                  },
                  {
                    title:
                      '<a href="#">城盛百汇周末特惠 会员1元换购大米/面粉</a>',
                    lottery: '66',
                    visitor: '415',
                    comment: '1',
                    end: '2023/03/29 23:59:59',
                  },
                  {
                    title:
                      '<a href="#">九要“拾”惠 精品汇选 养生开始 每日10款限时秒杀</a>',
                    lottery: '7',
                    visitor: '181',
                    comment: '0',
                    end: '2022/12/30 23:59:59',
                  },
                  {
                    title:
                      '<a href="#">金秋丰收季，爆款惠不停（文末福利持续加码中）</a>',
                    lottery: '4',
                    visitor: '365',
                    comment: '0',
                    end: '2022/11/30 23:59:59',
                  },
                ],
              },
            },
            {
              title: {
                label: '最新评论',
              },
              row: 6,
              params: {
                apiBak: '/api/v3/xxx',
              },
              widget: {
                type: 'dynamic-table',
                header: [
                  {
                    label: '内容',
                    key: 'body',
                  },
                  {
                    label: '评论人',
                    key: 'user',
                  },
                  {
                    label: '标题',
                    key: 'title',
                  },
                  {
                    label: '时间',
                    key: 'date',
                  },
                ],
                elements: [
                  {
                    title:
                      '<a href="#">九要“拾”惠 精品汇选 养生开始 每日10款限时秒杀</a>',
                    user: '用户ERSyAUCP',
                    body: '看起来不错！',
                    date: '2023/04/01',
                  },
                  {
                    title:
                      '<a href="#">城盛百汇周末特惠 会员1元换购大米/面粉</a>',
                    user: '用户FGDDDES',
                    body: '为什么超出范围？',
                    date: '2023/03/28',
                  },
                  {
                    title:
                      '<a href="#">金秋丰收季，爆款惠不停（文末福利持续加码中）</a>',
                    user: '用户PIJFN',
                    body: '可以多一些这样的好物！',
                    date: '2023/02/18',
                  },
                  {
                    title: '<a href="#">清明特惠，赢面单啦</a>',
                    user: '用户WQUDJD',
                    body: '这个超市挺实惠，活动挺多！',
                    date: '2023/02/01',
                  },
                ],
              },
            },
            {
              title: {
                label: '活动日历',
              },
              row: 12,
              widget: {
                type: 'full-calendar',
                spacer: 'none',
                calendar: {
                  drawer: true,
                  apiBak: '/api/v1/demo',
                  options: {
                    events: [
                      {
                        title: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
                        event: 'meeting',
                        start: '2024-05-31T15:19:11.195Z',
                        user: 'Johnson',
                        className: 'bg-primary',
                      },
                      {
                        title: '使用 TAKEUNTIL 操作符管理 ANGULAR 组件的订阅',
                        event: 'drupal',
                        start: 1717341551195,
                        user: 'Johnson',
                        className: 'bg-accent',
                      },
                      {
                        title: '你应该了解的 ANGULAR 最佳实践',
                        event: 'drupal',
                        start: 1718032751195,
                        user: 'Johnson',
                        className: 'bg-warn',
                      },
                      {
                        title:
                          'ANGULAR 5 RXJS 5.5.2 多个 HTTP 并行 FORKJOIN 请求',
                        event: 'drupal',
                        start: 1717600751195,
                        user: 'Johnson',
                        className: 'bg-warn',
                      },
                      {
                        title: 'DRUPAL 8 AJAX 弹出框可监听利用的 EVENT 事件',
                        event: 'drupal',
                        start: 1717773551195,
                        user: 'Johnson',
                        className: 'bg-pink',
                      },
                      {
                        title: 'DRUPAL8 用户登录后自定义重定向',
                        event: 'drupal',
                        start: 1717946351195,
                        user: 'Johnson',
                        className: 'bg-orange',
                      },
                      {
                        title: '如何更改 GIT COMMIT 某个历史提交信息',
                        event: 'drupal',
                        start: 1717600751195,
                        user: 'Johnson',
                        className: 'bg-yellow',
                      },
                      {
                        title:
                          '开源项目使用 GITHUB ACTIONS 自动化测试部署 ANGULAR 应用到 ECS 服务器',
                        event: 'drupal',
                        start: 1717514351195,
                        user: 'Johnson',
                        className: 'bg-red',
                      },
                      {
                        title: 'DRUPAL JSONAPI 初级入门实践',
                        event: 'drupal',
                        start: 1717427951195,
                        user: 'Johnson',
                        className: 'bg-purple',
                      },
                      {
                        title: 'RXJS SWITCHMAP 在 DRUPAL API中的应用',
                        event: 'drupal',
                        start: 1717859951195,
                        user: 'Johnson',
                        className: 'bg-indigo',
                      },
                      {
                        title: '五年了，再谈南宁和深圳的差距',
                        event: 'drupal',
                        start: 1717773551195,
                        user: 'Johnson',
                        className: 'bg-blue',
                      },
                      {
                        title:
                          '没想到吧？2021年南宁IT互联网相关工作者最近一份工作求职渠道最受欢迎的竟然是它',
                        event: 'drupal',
                        start: 1716823151195,
                        user: 'Johnson',
                        className: 'bg-cyan',
                      },
                      {
                        title: '南宁IT互联网行业薪资福利待遇如何？',
                        event: 'drupal',
                        start: 1716909551195,
                        user: 'Johnson',
                        className: 'bg-teal',
                      },
                      {
                        title: '南宁IT互联网公司，有哪些是双休？',
                        event: 'drupal',
                        start: 1716995951195,
                        user: 'Johnson',
                        className: 'bg-green',
                      },
                      {
                        title:
                          'JSONA 一款转换 JSONAPI 数据的工具库，也算是解放 DRUPAL JSONAPI 反序列化的利器',
                        event: 'drupal',
                        start: 1716304751195,
                        user: 'Johnson',
                        className: 'bg-light-green',
                      },
                      {
                        title: 'ANGULAR 有哪几种不同类型的绑定',
                        event: 'drupal',
                        start: 1716909551195,
                        user: 'Johnson',
                        className: 'bg-brown',
                      },
                      {
                        title:
                          'ANGULAR NG-CONTENT、NG-TEMPLATE、NG-CONTAINER 之间的区别',
                        event: 'drupal',
                        start: 1716736751195,
                        user: 'Johnson',
                        className: 'bg-grey',
                      },
                    ],
                  },
                  theme: {
                    meeting: 'bg-warn',
                    case: 'bg-primary',
                    project: 'bg-accent',
                    event: 'bg-red',
                  },
                },
              },
            },
          ],
        },
      },
      {
        label: '用户中心',
        icon: {
          svg: 'account-box-outline',
        },
        content: {
          type: 'user-center',
          params: {
            showProfile: false,
            showDetails: false,
          },
          main: {
            spacer: 'sm',
            bg: {
              classes: 'bg-fill-width bg-shadow',
            },
          },
          left: [
            {
              type: 'user-card',
              menu: [
                {
                  type: 'link',
                  label: '资料更新',
                  dialog: {
                    params: {
                      width: '1200px',
                      disableClose: true,
                    },
                    afterClosed: {
                      success: {
                        label: '更新资料成功！',
                      },
                      emit: true,
                    },
                    data: [
                      {
                        type: 'iframe',
                        url: '/?path=/story/full-calendar--default',
                        height: '900',
                      },
                    ],
                  },
                },
              ],
            },
          ],
          right: [
            {
              type: 'showcase-3v6',
              title: {
                type: 'text',
                spacer: 'xs',
                title: {
                  label: '快捷入口',
                  style: 'style-v4',
                },
              },
              params: {},
              spacer: 'xs',
              row: '4',
              elements: [
                {
                  img: {
                    src: '/assets/images/logo/codepen.svg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'logo',
                  },
                  css3: true,
                  link: {
                    label: '发布文章',
                    classes: 'bold',
                    dialog: {
                      params: {
                        width: '1200px',
                        disableClose: true,
                      },
                      afterClosed: {
                        success: {
                          label: '请检查是否发布成功！',
                        },
                        emit: true,
                      },
                      data: [
                        {
                          type: 'iframe',
                          url: '/',
                          height: '1000',
                        },
                      ],
                    },
                  },
                  subTitle: '发布内容到文章',
                },
                {
                  img: {
                    src: '/assets/images/logo/codepen.svg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'logo',
                  },
                  css3: true,
                  link: {
                    label: '发布博客',
                    classes: 'bold',
                    dialog: {
                      params: {
                        width: '1200px',
                        disableClose: true,
                      },
                      afterClosed: {
                        success: {
                          label: '请检查是否发布成功！',
                        },
                        emit: true,
                      },
                      data: [
                        {
                          type: 'iframe',
                          url: '/',
                          height: '1200',
                        },
                      ],
                    },
                  },
                  subTitle: '发布内容到博客',
                },
                {
                  img: {
                    src: '/assets/images/logo/codepen.svg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'logo',
                  },
                  css3: true,
                  link: {
                    label: '我的收藏',
                    classes: 'bold',
                    href: '#',
                  },
                  subTitle: '查看收藏的内容',
                },
              ],
            },
            {
              type: 'showcase-3v6',
              row: '3',
              spacer: 'xs',
              title: {
                type: 'text',
                spacer: 'xs',
                title: {
                  label: '快捷入口',
                  style: 'style-v4',
                },
              },
              params: {
                reqRoles: [],
              },
              action: {
                label: '管理更多',
                href: '/',
                style: 'style-v1',
                icon: 'open_in_new',
              },
              elements: [
                {
                  img: {
                    src: '/assets/images/logo/codepen.svg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'logo',
                  },
                  css3: true,
                  link: {
                    label: '填写订单',
                    classes: 'bold',
                    dialog: {
                      params: {
                        width: '1200px',
                        disableClose: true,
                      },
                      afterClosed: {
                        success: {
                          label: '请检查是否发布成功！',
                        },
                        emit: true,
                      },
                      data: [
                        {
                          type: 'iframe',
                          url: '/',
                          height: '1000',
                        },
                      ],
                    },
                  },
                  subTitle: '发布工作需求',
                },
                {
                  img: {
                    src: '/assets/images/logo/codepen.svg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'project.png',
                  },
                  css3: true,
                  subTitle: '发布项目内容',
                  link: {
                    href: '/',
                    label: '项目',
                    classes: 'bold',
                  },
                },
                {
                  img: {
                    src: '/assets/images/logo/codepen.svg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'meeting.png',
                  },
                  css3: true,
                  subTitle: '发布会议',
                  link: {
                    href: '/',
                    label: '会议',
                    classes: 'bold',
                  },
                },
                {
                  img: {
                    src: '/assets/images/logo/codepen.svg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'doc.png',
                  },
                  css3: true,
                  subTitle: '发布资料',
                  link: {
                    href: '/',
                    label: '文库资料',
                    classes: 'bold',
                  },
                },
                {
                  img: {
                    src: '/assets/images/logo/codepen.svg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'customer.png',
                  },
                  css3: true,
                  subTitle: '创建新客户',
                  link: {
                    href: '/',
                    label: '客户',
                    classes: 'bold',
                  },
                },
              ],
            },
          ],
        },
      },
      {
        label: '用户资料',
        icon: {
          svg: 'account-outline',
        },
        content: {
          type: 'profile-1v1',
          bannerBg: {
            classes: 'bg-fill-width overlay overlay-80',
            img: {
              hostClasses: 'bg-center',
              src: '/assets/images/16-9/business-14.jpeg',
              alt: 'page title',
            },
          },
          avatar: {
            src: '/assets/images/avatar/01.jpeg',
            alt: 'Johnson',
          },
          name: 'Johnson',
          subTitle: 'Drupal 前端开发',
          details: {
            label: '个人资料',
            elements: [
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '职位',
                content: '前端开发',
              },
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '微信',
                content: 'biaogebusy',
              },
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '邮箱',
                content: 'biaogebusy@example.com',
              },
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '地址',
                content: '广西南宁',
              },
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '公众号',
                content: 'Drupal 自习室',
              },
            ],
          },
          actions: [
            {
              type: 'btn',
              label: '编辑',
              icon: {
                name: 'editor',
                inline: true,
              },
              href: '#',
              target: '_blank',
            },
          ],
          content: [
            {
              label: '简介',
              type: 'text',
              spacer: 'none',
              body: '<p>我是一名充满热情和激情的程序员，对技术有着浓厚的兴趣。我通过不断学习和实践，已经具备了丰富的开发经验。我善于使用各种编程语言，能够快速高效地完成各类项目开发任务。我相信，通过我的技术实力，可以为公司和客户带来更大的价值，并不断推进技术的进步。',
            },
            {
              label: '技能',
              type: 'progress-group',
              elements: [
                {
                  label: 'HTML/CSS',
                  value: '95',
                },
                {
                  label: 'Angular/JavaScript',
                  value: '79',
                },
                {
                  label: 'Drupal',
                  value: '60',
                },
              ],
            },
            {
              label: '工作经历',
              type: 'media-object-group',
              elements: [
                {
                  type: 'media-object',
                  img: {
                    src: '/assets/images/avatar/01.jpeg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'logo',
                  },
                  meta: '2024-05',
                  title: '前端开发工程师',
                  subTitle: 'Davyin',
                  content:
                    '专注于 Drupal 前端主题开发，目前主要从事于 Angular 前端开发，终身学习体验者，热衷于健身，希望明天比今天好一点。',
                },
                {
                  img: {
                    src: '/assets/images/avatar/03.jpeg',
                    style: {
                      width: '45px',
                      height: '45px',
                    },
                    alt: 'logo',
                  },
                  meta: '2024-05',
                  title: '前端架构师',
                  subTitle: '阿里蚂蚁',
                  content:
                    '深入产品和行业场景，深入行业技术，分析影响稳定性和质量的潜在异常节点，把握蚂蚁金服强大的监控能力，设计和制定监控方案。',
                },
              ],
            },
            {
              label: '案例',
              type: 'swiper',
              params: {
                navigation: false,
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                },
              },
              classes: '',
              elements: [
                {
                  type: 'card',
                  title: '高性能',
                  subTitle: 'High Performance',
                  classes: 'card-no-shadow',
                  body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/cases/porto1.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/cases/porto7.jpg',
                      alt: 'alt',
                    },
                  },
                  title: '易用的编辑器',
                  subTitle: 'Simplicity for Editors',
                  classes: 'card-no-shadow',
                  body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                },
                {
                  type: 'card',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/cases/porto2.jpg',
                      alt: 'alt',
                    },
                  },
                  title: '多语言',
                  subTitle: 'Leader in Multilingual',
                  classes: 'card-no-shadow',
                  body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                },
                {
                  type: 'card',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/cases/porto3.jpg',
                      alt: 'alt',
                    },
                  },
                  title: '更有弹性',
                  subTitle: 'Flexibility',
                  classes: 'card-no-shadow',
                  body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                },
                {
                  type: 'card',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/cases/porto4.jpg',
                      alt: 'alt',
                    },
                  },
                  title: '安全性',
                  subTitle: 'Rigorous Security',
                  classes: 'card-no-shadow',
                  body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                },
              ],
            },
          ],
        },
      },
      {
        label: '企业资料',
        icon: {
          svg: 'home-variant-outline',
        },
        content: {
          type: 'profile-1v1',
          bannerBg: {
            classes: 'bg-fill-width overlay overlay-80',
            img: {
              hostClasses: 'bg-center',
              src: '/assets/images/16-9/business-14.jpeg',
              alt: 'page title',
            },
          },
          avatar: {
            src: '/assets/images/logo/lenovo.svg',
            alt: '才华有限公司',
          },
          name: '才华有限公司',
          actions: [
            {
              type: 'btn',
              label: '编辑',
              icon: {
                name: 'editor',
                inline: true,
              },
              href: '#',
              target: '_blank',
            },
          ],
          details: {
            label: '公司资料',
            elements: [
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '类型',
                content: '科技',
              },
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '联系人',
                content: '张三',
              },
              {
                icon: {
                  color: 'warn',
                  svg: 'arrow_right',
                  inline: true,
                },
                label: '联系方式',
                content: '18878718888',
              },
            ],
          },
          content: [
            {
              label: '简介',
              type: 'text',
              spacer: 'none',
              body: '<p>才华有限公司，宛如一座汇聚智慧星光的灯塔，我们秉持“人尽其才，文以载道”的信念，悠游于浩瀚的人才海洋。公司专注于挖掘并点亮个体的内在光芒，精心编织了一张横跨各行业的文艺经纬，为每一颗璀璨的才华之星提供翱翔的舞台。我们凭借深厚的艺术底蕴和敏锐的时代洞察力，倾心打造定制化的培养方案，旨在让每一份独特的才华在此诗意绽放，共同谱绘一幅生机盎然的职场画卷。</p>',
            },
            {
              type: 'showcase-2v1',
              row: 5,
              label: '相关材料',
              spacer: 'xs',
              elements: [
                {
                  type: 'card',
                  title: '营业执照',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/cases/porto1.jpg',
                      alt: '营业执照',
                    },
                  },
                  progressBar: {
                    mode: 'determinate',
                    value: 20,
                  },
                },
                {
                  type: 'card',
                  title: '开户许可证',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/cases/porto2.jpg',
                      alt: '开户许可证',
                    },
                  },
                  progressBar: {
                    mode: 'determinate',
                    value: 40,
                  },
                },
                {
                  type: 'card',
                  title: '资信证明',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/cases/porto3.jpg',
                      alt: '资信证明',
                    },
                  },
                  progressBar: {
                    mode: 'determinate',
                    value: 60,
                  },
                },
                {
                  type: 'card',
                  title: '纳税人信用等级',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/cases/porto4.jpg',
                      alt: '纳税人信用等级',
                    },
                  },
                  progressBar: {
                    mode: 'determinate',
                    value: 80,
                  },
                },
                {
                  type: 'card',
                  title: '法人身份证',
                  carousel: {
                    params: {
                      slidesPerView: 1,
                      navigation: false,
                      autoplay: {
                        delay: 5000,
                      },
                      breakpoints: null,
                    },
                    elements: [
                      {
                        type: 'feature-box',
                        hoverIcon: true,
                        fullIcon: 'fullscreen',
                        openIcon: 'open_in_new',
                        link: '#',
                        ratios: 'media-4-3',
                        img: {
                          classes: 'object-fit',
                          src: '/assets/images/cases/porto1.jpg',
                          alt: 'lazyload',
                        },
                      },
                      {
                        type: 'feature-box',
                        hoverIcon: false,
                        fullIcon: 'fullscreen',
                        openIcon: 'open_in_new',
                        link: '#',
                        ratios: 'media-4-3',
                        img: {
                          classes: 'object-fit',
                          src: '/assets/images/cases/porto2.jpg',
                          alt: 'lazyload',
                        },
                      },
                    ],
                  },
                  progressBar: {
                    mode: 'determinate',
                    value: 100,
                  },
                },
              ],
            },
            {
              label: '相关业务',
              type: 'tab',
              spacer: 'none',
              classes: 'bg-light',
              elements: [
                {
                  label: '财务数据',
                  elements: [
                    {
                      type: 'text',
                      spacer: 'none',
                      body: '<p>动态组件</p>',
                    },
                  ],
                },
                {
                  label: '业绩合同',
                  elements: [
                    {
                      type: 'text',
                      spacer: 'none',
                      body: '<p>动态组件</p>',
                    },
                  ],
                },
                {
                  label: '项目',
                  elements: [
                    {
                      type: 'text',
                      spacer: 'none',
                      body: '<p>动态组件</p>',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        label: '搜索',
        icon: {
          svg: 'magnify',
        },
        content: {
          type: 'search',
          api: '/api/v1/content',
          header: {
            bg: {
              classes: 'bg-shadow overlay overlay-80',
              img: {
                hostClasses: 'bg-center',
                src: '/assets/images/hero/1-6.jpg',
                mobile: '/assets/images/mobile/mobile-03.jpg',
              },
            },
            text: {
              title: {
                label: '综合搜索',
                style: 'style-v1',
                classes: 'mat-headline-1  text-light',
              },
              spacer: 'xl',
            },
            input: {
              placeholder: '请输入你的关键词',
            },
          },
          label: {
            clear: '清空',
            filter: '过滤条件',
          },
          sidebar: [
            {
              key: 'keys',
              type: 'input',
              className: 'block',
              props: {
                label: '关键词',
                type: 'search',
              },
            },
            {
              type: 'select',
              key: 'skill',
              className: 'block',
              props: {
                label: '技能',
                options: [
                  {
                    label: '无',
                    value: '',
                  },
                  {
                    label: 'Angular',
                    value: 'angular',
                  },
                  {
                    label: 'React',
                    value: 'react',
                  },
                  {
                    label: 'Vue',
                    value: 'vue',
                  },
                ],
              },
            },
            {
              type: 'select',
              key: 'cms',
              className: 'block',
              props: {
                label: 'CMS',
                options: [
                  {
                    label: '无',
                    value: '',
                  },
                  {
                    label: 'Drupal',
                    value: 'drupal',
                  },
                  {
                    label: 'WP',
                    value: 'wp',
                  },
                  {
                    label: 'Joomla',
                    value: 'joomla',
                  },
                ],
              },
            },
            {
              type: 'checkbox',
              key: 'article',
              className: 'block',
              props: {
                label: '文章',
              },
            },
            {
              type: 'checkbox',
              key: 'blog',
              className: 'block',
              props: {
                label: '博客',
              },
            },
          ],
        },
        form: {},
        vauleChange$: {},
      },
      {
        label: '日历',
        icon: {
          svg: 'calendar-month-outline',
        },
        content: {
          type: 'full-calendar',
          spacer: 'xxl',
          text: {
            title: {
              label: '筛选',
              style: 'style-v4',
              classes: 'm-bottom-xs',
            },
            spacer: 'sm',
          },
          form: [
            {
              key: 'keys',
              type: 'input',
              props: {
                label: '关键词',
              },
            },
            {
              type: 'select',
              key: 'type',
              props: {
                mutiple: false,
                label: '内容来源',
                options: [
                  {
                    label: '文章',
                    value: 'article',
                  },
                  {
                    label: '博客',
                    value: 'blog',
                  },
                  {
                    label: '会议',
                    value: 'metting',
                  },
                ],
              },
            },
            {
              type: 'select',
              key: 'changed',
              props: {
                mutiple: false,
                label: '最新更新',
                options: [
                  {
                    label: '文章',
                    value: 'article',
                  },
                  {
                    label: '博客',
                    value: 'blog',
                  },
                  {
                    label: '会议',
                    value: 'metting',
                  },
                ],
              },
            },
            {
              type: 'datepicker',
              key: 'date',
              props: {
                label: '日期',
                hint: 'MM/DD/YYYY – MM/DD/YYYY',
                placeholder: '请选择日期',
                value: '',
              },
            },
          ],
          calendar: {
            drawer: true,
            api: '/api/v1/content',
            options: {
              events: [
                {
                  title: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
                  event: 'meeting',
                  start: '2024-05-31T15:19:11.195Z',
                  user: 'Johnson',
                  className: 'bg-primary',
                },
                {
                  title: '使用 TAKEUNTIL 操作符管理 ANGULAR 组件的订阅',
                  event: 'drupal',
                  start: 1717341551195,
                  user: 'Johnson',
                  className: 'bg-accent',
                },
                {
                  title: '你应该了解的 ANGULAR 最佳实践',
                  event: 'drupal',
                  start: 1718032751195,
                  user: 'Johnson',
                  className: 'bg-warn',
                },
                {
                  title: 'ANGULAR 5 RXJS 5.5.2 多个 HTTP 并行 FORKJOIN 请求',
                  event: 'drupal',
                  start: 1717600751195,
                  user: 'Johnson',
                  className: 'bg-warn',
                },
                {
                  title: 'DRUPAL 8 AJAX 弹出框可监听利用的 EVENT 事件',
                  event: 'drupal',
                  start: 1717773551195,
                  user: 'Johnson',
                  className: 'bg-pink',
                },
                {
                  title: 'DRUPAL8 用户登录后自定义重定向',
                  event: 'drupal',
                  start: 1717946351195,
                  user: 'Johnson',
                  className: 'bg-orange',
                },
                {
                  title: '如何更改 GIT COMMIT 某个历史提交信息',
                  event: 'drupal',
                  start: 1717600751195,
                  user: 'Johnson',
                  className: 'bg-yellow',
                },
                {
                  title:
                    '开源项目使用 GITHUB ACTIONS 自动化测试部署 ANGULAR 应用到 ECS 服务器',
                  event: 'drupal',
                  start: 1717514351195,
                  user: 'Johnson',
                  className: 'bg-red',
                },
                {
                  title: 'DRUPAL JSONAPI 初级入门实践',
                  event: 'drupal',
                  start: 1717427951195,
                  user: 'Johnson',
                  className: 'bg-purple',
                },
                {
                  title: 'RXJS SWITCHMAP 在 DRUPAL API中的应用',
                  event: 'drupal',
                  start: 1717859951195,
                  user: 'Johnson',
                  className: 'bg-indigo',
                },
                {
                  title: '五年了，再谈南宁和深圳的差距',
                  event: 'drupal',
                  start: 1717773551195,
                  user: 'Johnson',
                  className: 'bg-blue',
                },
                {
                  title:
                    '没想到吧？2021年南宁IT互联网相关工作者最近一份工作求职渠道最受欢迎的竟然是它',
                  event: 'drupal',
                  start: 1716823151195,
                  user: 'Johnson',
                  className: 'bg-cyan',
                },
                {
                  title: '南宁IT互联网行业薪资福利待遇如何？',
                  event: 'drupal',
                  start: 1716909551195,
                  user: 'Johnson',
                  className: 'bg-teal',
                },
                {
                  title: '南宁IT互联网公司，有哪些是双休？',
                  event: 'drupal',
                  start: 1716995951195,
                  user: 'Johnson',
                  className: 'bg-green',
                },
                {
                  title:
                    'JSONA 一款转换 JSONAPI 数据的工具库，也算是解放 DRUPAL JSONAPI 反序列化的利器',
                  event: 'drupal',
                  start: 1716304751195,
                  user: 'Johnson',
                  className: 'bg-light-green',
                },
                {
                  title: 'ANGULAR 有哪几种不同类型的绑定',
                  event: 'drupal',
                  start: 1716909551195,
                  user: 'Johnson',
                  className: 'bg-brown',
                },
                {
                  title:
                    'ANGULAR NG-CONTENT、NG-TEMPLATE、NG-CONTAINER 之间的区别',
                  event: 'drupal',
                  start: 1716736751195,
                  user: 'Johnson',
                  className: 'bg-grey',
                },
              ],
            },
            theme: {
              meeting: 'bg-warn',
              case: 'bg-primary',
              project: 'bg-accent',
              event: 'bg-red',
            },
          },
        },
      },
      {
        label: '位置',
        icon: {
          svg: 'map-marker-outline',
        },
        content: {
          type: 'location',
          title: {
            label: '我的位置',
            style: 'style-v1',
            classes: 'm-bottom-0',
          },
          style: {
            height: '500px',
          },
          bg: {
            classes: '',
          },
          classes: '',
          city: '南宁市',
          elements: [
            {
              company: {
                setCenter: true,
                address: '高新区8号创客城',
              },
            },
          ],
        },
      },
      {
        label: '404',
        icon: {
          svg: 'text-search-variant',
        },
        content: {
          fullWidth: false,
          spacer: 'md',
          bgClasses: 'bg-fill-width',
          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            classes: 'bg-fill-width',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',
          gap: {},
          wrapperClass: '',
          animate: {
            from: {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scaleX: 1,
              scaleY: 1,
              skewX: 0,
              skewY: 0,
              opacity: 1,
              delay: 0,
              duration: 1,
              ease: 'none',
              rotation: 0,
              scale: 1,
            },
            trigger: {
              onEnter: 'play',
              onLeave: 'none',
              onEnterBack: 'none',
              onLeaveBack: 'none',
              start: 'top 90%',
              end: 'top 40%',
              scrub: false,
            },
          },
          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
              },
              horizontal: 'start',
              vertical: 'stretch',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: 'bg-fill-width',
              },
              classes: '',
              blockClasses: '',
              animate: {
                from: {
                  x: 0,
                  y: 0,
                  rotationX: 0,
                  rotationY: 0,
                  scaleX: 1,
                  scaleY: 1,
                  skewX: 0,
                  skewY: 0,
                  opacity: 1,
                  delay: 0,
                  duration: 1,
                  ease: 'none',
                  rotation: 0,
                  scale: 1,
                },
                trigger: {
                  onEnter: 'play',
                  onLeave: 'none',
                  onEnterBack: 'none',
                  onLeaveBack: 'none',
                  start: 'top 90%',
                  end: 'top 40%',
                  scrub: false,
                },
              },
              style: {
                borderRadius: 'none',
              },
              layoutAlign: 'start start',
              elements: [
                {
                  type: 'img',
                  hostClasses: 'text-center',
                  classes: '',
                  style: {
                    width: '800px',
                    maxWidth: '100%',
                  },
                  src: '/assets/images/404.svg',
                  alt: 'alt',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              horizontal: 'start',
              vertical: 'stretch',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: 'bg-fill-width',
              },
              classes: '',
              style: {
                borderRadius: 'none',
              },
              animate: {
                from: {
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  opacity: 1,
                  delay: 0,
                  duration: 1,
                  ease: 'none',
                },
                trigger: {
                  onEnter: 'play',
                  onLeave: 'none',
                  onEnterBack: 'none',
                  onLeaveBack: 'none',
                  start: 'top 90%',
                  end: 'top 40%',
                },
              },
              layoutAlign: 'start start',
              elements: [
                {
                  style: 'style-v1',
                  classes: 'mat-headline-1 bold',
                  typed: {
                    enable: false,
                    config: {
                      typeSpeed: 120,
                    },
                    strings: [
                      {
                        label: 'web builder',
                      },
                    ],
                  },
                  animate: {
                    from: {
                      x: 0,
                      y: 0,
                      rotationX: 0,
                      rotationY: 0,
                      scaleX: 1,
                      scaleY: 1,
                      skewX: 0,
                      skewY: 0,
                      opacity: 1,
                      delay: 0,
                      duration: 1,
                      ease: 'none',
                    },
                    trigger: {
                      onEnter: 'play',
                      onLeave: 'none',
                      onEnterBack: 'none',
                      onLeaveBack: 'none',
                      start: 'top 90%',
                      end: 'top 40%',
                      scrub: false,
                    },
                  },
                  type: 'title',
                  label:
                    '<p style="display: inline-block; margin-bottom: 0px;">OH!NO&nbsp;</p><div><p style="display: inline-block; margin-bottom: 0px;">页面没有找到</p></div>',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              horizontal: 'center',
              vertical: 'center',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: 'bg-fill-width',
              },
              classes: '',
              blockClasses: '',
              animate: {
                from: {
                  x: 0,
                  y: 0,
                  rotationX: 0,
                  rotationY: 0,
                  scaleX: 1,
                  scaleY: 1,
                  skewX: 0,
                  skewY: 0,
                  opacity: 1,
                  delay: 0,
                  duration: 1,
                  ease: 'none',
                  rotation: 0,
                  scale: 1,
                },
                trigger: {
                  onEnter: 'play',
                  onLeave: 'none',
                  onEnterBack: 'none',
                  onLeaveBack: 'none',
                  start: 'top 90%',
                  end: 'top 40%',
                  scrub: false,
                },
              },
              style: {
                borderRadius: 'none',
              },
              layoutAlign: 'start start',
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '很抱歉，您请求的页面可能已经被移除、更改名称或暂时无法使用。在查找更多信息之前，您可以尝试以下操作：<ul class="list-done"><li>检查您输入的URL是否正确</li><li>在浏览器中清除缓存和Cookie</li><li>尝试在不同的浏览器或设备上打开页面</li></ul><p>我们非常感谢您对我们的关注和理解，我们会尽快解决问题并让我们的页面再次正常工作。</p>',
                },
                {
                  color: 'primary',
                  label: '了解更多',
                  mode: 'raised',
                  href: '/home',
                  target: '_blank',
                  icon: {
                    svg: '',
                  },
                  classes: '',
                  pill: false,
                  animate: {
                    from: {
                      x: 0,
                      y: 0,
                      rotationX: 0,
                      rotationY: 0,
                      scaleX: 1,
                      scaleY: 1,
                      skewX: 0,
                      skewY: 0,
                      opacity: 1,
                      delay: 0,
                      duration: 1,
                      ease: 'none',
                    },
                    trigger: {
                      onEnter: 'play',
                      onLeave: 'none',
                      onEnterBack: 'none',
                      onLeaveBack: 'none',
                      start: 'top 90%',
                      end: 'top 40%',
                      scrub: false,
                    },
                  },
                  type: 'btn',
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    label: 'Drupal',
    id: 'drupal',
    elements: [
      {
        label: '问答',
        content: {
          type: 'question',
          title: '作为一个前端开发人员，如何让自己保持学习的热忱并坚持下去？',
          body: '前端技术不断更迭，日新月异，如何保持学习的心态。',
          topic: {
            elements: [
              {
                label: '前端',
              },
              {
                label: 'Angular',
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
            title: '评论',
            actions: ['update', 'reply', 'quote', 'delete'],
          },
        },
      },
      {
        label: '联系表单',
        content: {
          type: 'contact-us-1v1',
          text: {
            title: {
              label: '联系我们',
              style: 'style-v1',
              classes: 'mat-headline-1',
            },
            classes: 'text-light text-center',
            body: '如果您有任何需要帮助，请联系我们！',
          },
          classes: 'text-center',
          bg: {
            classes: '',
          },
          params: {
            webform_id: 'contact',
          },
          form: [
            {
              key: 'form',
              className: 'm-bottom-sm',
              fieldGroupClassName: 'flex flex-wrap',
              fieldGroup: [
                {
                  type: 'input',
                  key: 'name',
                  className: 'w-2/5 m-right-sm',
                  props: {
                    label: '姓名',
                    required: true,
                  },
                },
                {
                  type: 'input',
                  key: 'email',
                  className: 'w-2/5 m-right-sm',
                  props: {
                    label: '邮箱',
                    required: true,
                  },
                },
                {
                  type: 'input',
                  key: 'subject',
                  className: 'w-2/5 m-right-sm',
                  props: {
                    label: '主题',
                    required: true,
                  },
                },
                {
                  type: 'textarea',
                  key: 'message',
                  className: 'w-full',
                  props: {
                    label: '内容',
                    rows: 8,
                    required: true,
                  },
                },
              ],
            },
          ],
          action: {
            type: 'btn',
            color: 'primary',
            mode: 'raised',
            label: '提交',
          },
          content: [
            {
              type: 'text',
              spacer: 'none',
              classes: 'text-left',
              body: '邮箱：349255833@qq.com<br>电话：0771-6890xxx<br>地址：创客城2栋<br>',
            },
          ],
          contentStyle: {
            background:
              'url("/assets/images/showcase/pattern-02.png") no-repeat center center',
          },
        },
      },
      {
        label: '分类列表',
        content: {
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
              title: {
                label: '你应该了解的 Angular 最佳实践',
                href: '/node/414',
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
              title: {
                label: 'Drupal8 用户登录后自定义重定向',
                href: '/node/385',
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
              title: {
                label: 'Drupal jsonapi 初级入门实践',
                href: '/node/377',
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
                  changed: '2024-05-31',
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
                  changed: '2024-05-31',
                },
                {
                  link: {
                    label: '你应该了解的 Angular 最佳实践',
                    href: '2024-05-31',
                  },
                  img: {
                    src: '../assets/images/showcase/blog3-large.jpeg',
                    alt: '',
                  },
                  changed: '2024-05-31',
                },
                {
                  link: {
                    label: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
                    href: '2024-05-31',
                  },
                  img: {
                    src: '../assets/images/showcase/blog4-large.jpeg',
                    alt: '',
                  },
                  changed: '2024-05-31',
                },
              ],
            },
            {
              type: 'menu-list',
              title: '分类',
              elements: [
                {
                  link: {
                    href: '/frontend',
                    label: '前端茶馆',
                  },
                  label: '8',
                },
                {
                  link: {
                    href: '/drupal',
                    label: 'Drupal 自习室',
                  },
                  label: '5',
                },
              ],
            },
          ],
        },
      },
      {
        label: '分类列表 Thin',
        content: {
          type: 'taxonomy-thin-list',
          sidebar: [
            {
              type: 'menu-list',
              title: '内容分类',
              elements: [
                {
                  link: {
                    href: '',
                    label: 'Angular',
                  },
                  label: '8',
                },
                {
                  link: {
                    href: '',
                    label: 'Drupal',
                  },
                  label: '5',
                },
              ],
            },
            {
              type: 'menu-list',
              title: '文章分类',
              elements: [
                {
                  link: {
                    href: '',
                    label: '新闻',
                  },
                  label: '8',
                },
                {
                  link: {
                    href: '',
                    label: '技术',
                  },
                  label: '5',
                },
              ],
            },
          ],
          pager: {
            itemsPerPage: '20',
          },
          elements: [
            {
              type: 'list-thin',
              link: {
                label: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
                href: '/',
              },
              meta: [
                {
                  label: 'Johnson',
                },
                {
                  label: '2021-08-28',
                },
              ],
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
            },
            {
              type: 'list-thin',
              link: {
                label: '使用 TAKEUNTIL 操作符管理 ANGULAR 组件的订阅',
                href: '/',
              },
              meta: [
                {
                  label: 'Johnson',
                },
                {
                  label: '2021-08-28',
                },
              ],
              actions: [
                {
                  type: 'flag',
                  label: '收藏',
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
                  params: {
                    url: '/',
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
            },
            {
              type: 'list-thin',
              link: {
                label: '你应该了解的 ANGULAR 最佳实践',
                href: '/',
              },
              meta: [
                {
                  label: 'Johnson',
                },
                {
                  label: '2021-08-28',
                },
              ],
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
            },
          ],
        },
      },
      {
        label: '图文列表',
        content: {
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
      },
      {
        label: '视图列表',
        content: {
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
                  props: {
                    label: '标题',
                  },
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
      },
    ],
  },
  {
    label: '地图应用',
    id: 'map',
    elements: [
      {
        label: '地图应用',
        content: {
          type: 'view-map',
          params: {
            apiBak: '/api/v2/view-map',
            city: '南宁市',
            drawer: true,
          },
          form: [
            {
              type: 'input',
              key: 'title',
              className: 'm-right-xs width-30',
              props: {
                label: '搜索职位',
              },
            },
            {
              type: 'mat-select',
              key: 'skill',
              className: 'm-right-xs width-30',
              apiBak: '/api/v2/filter/taxonomy/skill',
              props: {
                multiple: true,
                search: true,
                hideSelected: true,
                label: '技能',
                options: [
                  {
                    value: 1,
                    label: 'Angular',
                  },
                  {
                    value: 2,
                    label: 'React',
                  },
                  {
                    value: 3,
                    label: 'Vue',
                  },
                ],
              },
            },
          ],
          elements: [
            {
              subTitle: '产品经理',
              title: '亚马逊 Amazon',
              meta_2: '2021-04-25',
              badge_2: '<div class="item-list"><ul><li>新零售</li></ul></div>',
              meta_1: '<span class="text-primary bold">6-8 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>五险一金</li><li>绩效奖金</li><li>包中餐</li><li>产假</li></ul></div>',
              img: '/assets/images/logo/amazon.svg',
              address:
                '中国广西壮族自治区南宁市青秀区民族大道159号万丰新新大厦',
              nid: '247',
              url: '/node/247',
              position: [108.407058, 22.815584],
            },
            {
              subTitle: '产品经理',
              title: '亚马逊 Amazon',
              meta_2: '2021-04-25',
              badge_2: '<div class="item-list"><ul><li>新零售</li></ul></div>',
              meta_1: '<span class="text-primary bold">6-8 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>五险一金</li><li>绩效奖金</li><li>包中餐</li><li>产假</li></ul></div>',
              img: '/assets/images/logo/amazon.svg',
              address:
                '中国广西壮族自治区南宁市青秀区民族大道159号万丰新新大厦',
              nid: '247',
              url: '/node/247',
              latitude: '22.83393',
              longitude: '108.31343',
            },
            {
              subTitle: '新媒体运营',
              title: 'Codepen',
              meta_2: '2021-04-25',
              badge_2: '<div class="item-list"><ul><li>运营</li></ul></div>',
              meta_1: '<span class="text-primary bold">3-6 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>职位晋升</li></ul></div>',
              img: '/assets/images/logo/codepen.svg',
              address:
                '中国广西壮族自治区南宁市良庆区平乐大道21号大唐·总部1号1号楼',
              nid: '245',
              url: '/node/245',
              position: [108.384383, 22.750785],
            },
            {
              subTitle: '产品经理',
              title: '中国谷歌 Google',
              meta_2: '2021-04-25',
              badge_2:
                '<div class="item-list"><ul><li>产品分析</li></ul></div>',
              meta_1: '<span class="text-primary bold">4-6 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>职位晋升</li></ul></div>',
              img: '/assets/images/logo/google.svg',
              address:
                '中国广西壮族自治区南宁市良庆区平乐大道21号大唐·总部1号1号楼',
              nid: '244',
              url: '/node/244',
              position: [108.384383, 22.750785],
            },
            {
              subTitle: 'cto首席技术官 ',
              title: '联想集团',
              meta_2: '2021-04-25',
              badge_2:
                '<div class="item-list"><ul><li>技术机构</li></ul></div>',
              meta_1: '<span class="text-primary bold">15-20 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>绩效奖金</li><li>午餐补助</li><li>美女多</li></ul></div>',
              img: '/assets/images/logo/lenovo.svg',
              address:
                '中国广西壮族自治区南宁市青秀区金洲路琅西56栋-12号(汇发集团)3楼',
              nid: '242',
              url: '/node/242',
              position: [108.364581, 22.808037],
            },
            {
              subTitle: '前端开发工程师 ',
              title: 'Paypal 海外',
              meta_2: '2021-04-30',
              badge_2: '<div class="item-list"><ul><li>VUE</li></ul></div>',
              meta_1: '<span class="text-primary bold">7-10 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>绩效奖金</li><li>午餐补助</li><li>美女多</li></ul></div>',
              img: '/assets/images/logo/paypal.svg',
              address:
                '中国广西壮族自治区南宁市青秀区金洲路琅西56栋-12号(汇发集团)3楼',
              nid: '241',
              url: '/node/241',
              position: [108.364581, 22.808037],
            },
            {
              subTitle: '招软件测试工程师，入职即购买五险一金',
              title: 'Shopify 购物',
              meta_2: '2021-04-24',
              badge_2: '<div class="item-list"><ul><li>Linux</li></ul></div>',
              meta_1: '<span class="text-primary bold">7-9 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>五险一金</li></ul></div>',
              img: '/assets/images/logo/shopify.svg',
              address: '中国广西壮族自治区南宁市良庆区平乐大道18号东盟信息港',
              nid: '239',
              url: '/node/239',
              position: [108.381459, 22.746694],
            },
            {
              subTitle: 'Java架构师',
              title: 'Spotify',
              meta_2: '2021-04-23',
              badge_2:
                '<div class="item-list"><ul><li>Spring</li><li>Oracle</li></ul></div>',
              meta_1: '<span class="text-primary bold">12-18 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>周末双休</li></ul></div>',
              img: '/assets/images/logo/spotify.svg',
              address: '中国广西壮族自治区南宁市西乡塘区东盟慧谷13栋15楼1501',
              nid: '237',
              url: '/node/237',
              position: [108.27462, 22.865409],
            },
          ],
        },
      },
      {
        label: '地图圈',
        content: {
          type: 'view-map',
          params: {
            apiBak: '/api/v2/view-map',
            city: '南宁市',
            drawer: true,
          },
          form: [
            {
              type: 'input',
              key: 'title',
              className: 'm-right-xs width-30',
              props: {
                label: '搜索职位',
              },
            },
            {
              type: 'mat-select',
              key: 'skill',
              className: 'm-right-xs width-30',
              apiBak: '/api/v2/filter/taxonomy/skill',
              props: {
                multiple: true,
                search: true,
                hideSelected: true,
                label: '技能',
                options: [
                  {
                    value: 1,
                    label: 'Angular',
                  },
                  {
                    value: 2,
                    label: 'React',
                  },
                  {
                    value: 3,
                    label: 'Vue',
                  },
                ],
              },
            },
            {
              key: 'enableCircle',
              type: 'toggle',
              className: 'w-full',
              props: {
                label: '开启范围圈',
                description: '开启后点击地图获取经纬度',
              },
            },
            {
              key: 'circle',
              className: 'w-full',
              fieldGroupClassName: 'flex flex-wrap w-full',
              fieldGroup: [
                {
                  type: 'input',
                  key: 'lnglat',
                  className: 'm-bottom-sm width-20 m-right-xs',
                  props: {
                    label: '经纬度',
                    appearance: 'outline',
                    type: 'text',
                    required: true,
                  },
                },
                {
                  type: 'input',
                  key: 'radius',
                  defaultValue: 3,
                  className: 'm-bottom-sm width-20 m-right-xs',
                  props: {
                    label: '圆半径/公里',
                    appearance: 'outline',
                    type: 'number',
                    required: true,
                    min: 1,
                    max: 100,
                  },
                  validation: {
                    messages: {
                      min: '不能设置小于 1',
                      max: '不能设置大于 100',
                    },
                  },
                },
                {
                  type: 'input',
                  key: 'bg',
                  className: 'm-bottom-sm width-20 m-right-xs',
                  defaultValue: '#00a281',
                  props: {
                    label: '圆背景色',
                    appearance: 'outline',
                    type: 'color',
                    required: true,
                  },
                },
                {
                  type: 'input',
                  key: 'opacity',
                  defaultValue: 0.1,
                  className: 'm-bottom-sm width-20',
                  props: {
                    label: '不透明度',
                    appearance: 'outline',
                    type: 'number',
                    required: true,
                    min: 0.1,
                    max: 1,
                  },
                  validation: {
                    messages: {
                      min: '不能设置小于 0.1',
                      max: '不能设置大于 100',
                    },
                  },
                },
              ],
            },
          ],
          elements: [
            {
              subTitle: '产品经理',
              title: '亚马逊 Amazon',
              meta_2: '2021-04-25',
              badge_2: '<div class="item-list"><ul><li>新零售</li></ul></div>',
              meta_1: '<span class="text-primary bold">6-8 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>五险一金</li><li>绩效奖金</li><li>包中餐</li><li>产假</li></ul></div>',
              img: '/assets/images/logo/amazon.svg',
              address:
                '中国广西壮族自治区南宁市青秀区民族大道159号万丰新新大厦',
              nid: '247',
              url: '/node/247',
              position: [108.407058, 22.815584],
            },
            {
              subTitle: '产品经理',
              title: '亚马逊 Amazon',
              meta_2: '2021-04-25',
              badge_2: '<div class="item-list"><ul><li>新零售</li></ul></div>',
              meta_1: '<span class="text-primary bold">6-8 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>五险一金</li><li>绩效奖金</li><li>包中餐</li><li>产假</li></ul></div>',
              img: '/assets/images/logo/amazon.svg',
              address:
                '中国广西壮族自治区南宁市青秀区民族大道159号万丰新新大厦',
              nid: '247',
              url: '/node/247',
              latitude: '22.83393',
              longitude: '108.31343',
            },
            {
              subTitle: '新媒体运营',
              title: 'Codepen',
              meta_2: '2021-04-25',
              badge_2: '<div class="item-list"><ul><li>运营</li></ul></div>',
              meta_1: '<span class="text-primary bold">3-6 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>职位晋升</li></ul></div>',
              img: '/assets/images/logo/codepen.svg',
              address:
                '中国广西壮族自治区南宁市良庆区平乐大道21号大唐·总部1号1号楼',
              nid: '245',
              url: '/node/245',
              position: [108.384383, 22.750785],
            },
            {
              subTitle: '产品经理',
              title: '中国谷歌 Google',
              meta_2: '2021-04-25',
              badge_2:
                '<div class="item-list"><ul><li>产品分析</li></ul></div>',
              meta_1: '<span class="text-primary bold">4-6 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>职位晋升</li></ul></div>',
              img: '/assets/images/logo/google.svg',
              address:
                '中国广西壮族自治区南宁市良庆区平乐大道21号大唐·总部1号1号楼',
              nid: '244',
              url: '/node/244',
              position: [108.384383, 22.750785],
            },
            {
              subTitle: 'cto首席技术官 ',
              title: '联想集团',
              meta_2: '2021-04-25',
              badge_2:
                '<div class="item-list"><ul><li>技术机构</li></ul></div>',
              meta_1: '<span class="text-primary bold">15-20 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>绩效奖金</li><li>午餐补助</li><li>美女多</li></ul></div>',
              img: '/assets/images/logo/lenovo.svg',
              address:
                '中国广西壮族自治区南宁市青秀区金洲路琅西56栋-12号(汇发集团)3楼',
              nid: '242',
              url: '/node/242',
              position: [108.364581, 22.808037],
            },
            {
              subTitle: '前端开发工程师 ',
              title: 'Paypal 海外',
              meta_2: '2021-04-30',
              badge_2: '<div class="item-list"><ul><li>VUE</li></ul></div>',
              meta_1: '<span class="text-primary bold">7-10 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>绩效奖金</li><li>午餐补助</li><li>美女多</li></ul></div>',
              img: '/assets/images/logo/paypal.svg',
              address:
                '中国广西壮族自治区南宁市青秀区金洲路琅西56栋-12号(汇发集团)3楼',
              nid: '241',
              url: '/node/241',
              position: [108.364581, 22.808037],
            },
            {
              subTitle: '招软件测试工程师，入职即购买五险一金',
              title: 'Shopify 购物',
              meta_2: '2021-04-24',
              badge_2: '<div class="item-list"><ul><li>Linux</li></ul></div>',
              meta_1: '<span class="text-primary bold">7-9 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>五险一金</li></ul></div>',
              img: '/assets/images/logo/shopify.svg',
              address: '中国广西壮族自治区南宁市良庆区平乐大道18号东盟信息港',
              nid: '239',
              url: '/node/239',
              position: [108.381459, 22.746694],
            },
            {
              subTitle: 'Java架构师',
              title: 'Spotify',
              meta_2: '2021-04-23',
              badge_2:
                '<div class="item-list"><ul><li>Spring</li><li>Oracle</li></ul></div>',
              meta_1: '<span class="text-primary bold">12-18 k</span>',
              badge_1:
                '<div class="item-list"><ul><li>周末双休</li></ul></div>',
              img: '/assets/images/logo/spotify.svg',
              address: '中国广西壮族自治区南宁市西乡塘区东盟慧谷13栋15楼1501',
              nid: '237',
              url: '/node/237',
              position: [108.27462, 22.865409],
            },
          ],
        },
      },
      {
        label: '位置列表',
        content: {
          type: 'map-list-v1',
          title: {
            label: '南宁市创业孵化服务中心',
            style: 'style-v4',
          },
          meta: [
            {
              label: '地址',
              value: '良庆区玉洞街道玉洞大道x号',
            },
            {
              label: '电话',
              value: '0771-xxxxxx',
            },
          ],
          map: {
            city: '南宁市',
            elements: [
              {
                title: '创客城',
                address: '南宁市高科路八号创客城',
                params: {
                  address: '南宁市高科路八号创客城',
                  title: '创客城',
                },
                meta: [
                  {
                    icon: {
                      color: 'warn',
                      svg: 'arrow_right',
                      inline: true,
                    },
                    label: '联系人',
                    value: '张三',
                  },
                  {
                    icon: {
                      color: 'warn',
                      svg: 'arrow_right',
                      inline: true,
                    },
                    label: '联系电话',
                    value: '18878793xx',
                  },
                ],
              },
              {
                title: '中关村',
                address: '南宁市高新区创新路中关村',
                params: {
                  address: '南宁市高新区创新路中关村',
                  title: '中关村',
                },
                meta: [
                  {
                    icon: {
                      color: 'warn',
                      svg: 'arrow_right',
                      inline: true,
                    },
                    label: '联系人',
                    value: '李四',
                  },
                  {
                    icon: {
                      color: 'warn',
                      svg: 'arrow_right',
                      inline: true,
                    },
                    label: '联系电话',
                    value: '0771-78734454',
                  },
                ],
              },
              {
                title: '华尔街工谷',
                address: '南宁市高新区发展大道189号华尔街工谷',
                params: {
                  address: '南宁市高新区发展大道189号华尔街工谷',
                  title: '华尔街工谷',
                },
                meta: [
                  {
                    icon: {
                      color: 'warn',
                      svg: 'arrow_right',
                      inline: true,
                    },
                    label: '联系人',
                    value: '王五',
                  },
                  {
                    icon: {
                      color: 'warn',
                      svg: 'arrow_right',
                      inline: true,
                    },
                    label: '联系电话',
                    value: '0771-6543976',
                  },
                ],
              },
              {
                title: 'Dialog',
                address: '南宁市高科路八号创客城',
                params: {
                  address: '南宁市高科路八号创客城',
                  title: '创客城',
                },
                meta: [
                  {
                    icon: {
                      color: 'warn',
                      svg: 'arrow_right',
                      inline: true,
                    },
                    label: '联系人',
                    value: '张三',
                  },
                  {
                    icon: {
                      color: 'warn',
                      svg: 'arrow_right',
                      inline: true,
                    },
                    label: '联系电话',
                    value: '18878793xx',
                  },
                ],
                dialog: [
                  {
                    type: 'text',
                    spacer: 'md',
                    body: '从左侧选择组件拖动到编辑区：<ul class="list-done"><li>可视化编辑组件图文数据，所见即所得；</li><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li></ul><p>欢迎入群一起探索更多的可能性和数字创新体验，QQ 交流群：<span class="text-primary">1176468251</span></p><p style="display:flex"><img width="120px" src="/assets/icons/large-left-arrow.svg"><video muted="" autoplay="" loop="" width="120px" src="/assets/video/drag-drop.mp4"></video></p>',
                    title: {
                      label:
                        '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
                      style: 'style-v4',
                      classes: 'mat-headline-1 bold',
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  },
];
