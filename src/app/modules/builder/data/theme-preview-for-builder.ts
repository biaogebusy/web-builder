import { IPage } from '@core/interface/IAppConfig';

export const colorTest: IPage = {
  title: '色彩检查',
  body: [
    {
      type: 'theme-preview',
      top: [
        {
          style: 'normal',
          type: 'banner-simple',
          bannerBg: {
            classes: 'bg-fill-width overlay overlay-',
            img: {
              hostClasses: '',
              src: '/assets/images/16-9/nature-08.jpg',
              alt: 'page title',
            },
          },
          title: '色彩检查',
          breadcrumb: null,
        },
      ],
      bgColors: {
        row: 10,
        lists: [
          {
            label: 'primary',
            classes: 'bg-primary',
          },
          {
            label: 'accent',
            classes: 'bg-accent',
          },
          {
            label: 'warn',
            classes: 'bg-warn',
          },
          {
            label: 'pink',
            classes: 'bg-pink',
          },
          {
            label: 'orange',
            classes: 'bg-orange',
          },
          {
            label: 'yellow',
            classes: 'bg-yellow',
          },
          {
            label: 'red',
            classes: 'bg-red',
          },
          {
            label: 'purple',
            classes: 'bg-purple',
          },
          {
            label: 'indigo',
            classes: 'bg-indigo',
          },
          {
            label: 'blue',
            classes: 'bg-blue',
          },
          {
            label: 'cyan',
            classes: 'bg-cyan',
          },
          {
            label: 'teal',
            classes: 'bg-teal',
          },
          {
            label: 'green',
            classes: 'bg-green',
          },
          {
            label: 'light-green',
            classes: 'bg-light-green',
          },
          {
            label: 'brown',
            classes: 'bg-brown',
          },
          {
            label: 'grey',
            classes: 'bg-grey',
          },
        ],
      },
      row: [
        {
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
                  ['1月', 95],
                  ['2月', 80],
                  ['3月', 24],
                  ['4月', 100],
                  ['5月', 46],
                  ['6月', 12],
                  ['7月', 76],
                  ['8月', 96],
                  ['9月', 64],
                  ['10月', 100],
                  ['11月', 22],
                  ['12月', 70],
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
        {
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
                  ['1月', 81],
                  ['2月', 30],
                  ['3月', 52],
                  ['4月', 48],
                  ['5月', 63],
                  ['6月', 78],
                  ['7月', 28],
                  ['8月', 61],
                  ['9月', 62],
                  ['10月', 44],
                  ['11月', 38],
                  ['12月', 27],
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
        {
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
                  ['1月', 3],
                  ['2月', 4],
                  ['3月', 1],
                  ['4月', 7],
                  ['5月', 2],
                  ['6月', 8],
                  ['7月', 4],
                  ['8月', 9],
                  ['9月', 4],
                  ['10月', 4],
                  ['11月', 8],
                  ['12月', 1],
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
      ],
      columns: [
        [
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
                src: '/assets/images/cases/porto3.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card-1v5',
            title: '讨论 Builder 架构',
            body: '讨论未来的发展方向和基础架构，是否可以融入 AI 生成相应的内容，为用户提供优秀的数字创新体验。',
            more: {
              href: '/node/1',
              target: '_blank',
              label: '查看更多',
            },
            footer: {
              label: 'Step 01.',
              icon: {
                svg: 'chevron-double-right',
              },
            },
          },
          {
            title: {
              classes: 'text-primary',
              label: '免费',
            },
            type: 'card-1v6',
            prefix: '¥',
            number: '79',
            suffix: '/月',
            body: '<ul class="list-done"><li>完全开放</li><li>安全检测机制</li><li>高质量交付源码文件</li><li>免费一个域名绑定</li><li>二十四小时免费技术支持</li></ul>',
            classes: '',
            actionsAlign: 'start center',
            actions: [
              {
                href: '#',
                label: '开始',
                type: 'btn',
                color: 'primary',
                mode: 'raised',
              },
              {
                type: 'btn',
                label: '立即购买',
                href: '#',
                mode: 'raised',
                color: 'primary',
              },
            ],
          },
          {
            type: 'chart',
            title: {
              text: '年度活动金额预算',
              subtext: '南宁',
            },
            legend: {
              bottom: '10px',
            },
            tooltip: {
              trigger: 'axis',
            },
            dataset: {
              source: [
                ['红包预算', '2020', '2021', '2022'],
                ['第一季度', 4875, 4670, 7742],
                ['第二季度', 7746, 5029, 9867],
                ['第三季度', 5997, 5979, 3590],
              ],
            },
            xAxis: {
              type: 'category',
            },
            yAxis: {},
            series: [
              {
                type: 'line',
              },
              {
                type: 'line',
              },
              {
                type: 'line',
              },
            ],
          },
        ],
        [
          {
            type: 'card',
            subTitle: '2024/01/27',
            avatar: {
              src: '/assets/images/avatar/01.jpeg',
              alt: '',
            },
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
            link: {
              href: '/use/1',
              label: 'Johnson',
            },
          },
          {
            type: 'card-1v2',
            link: {
              href: '#',
              label: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
            },
            subTitle: '多语言',
            img: {
              href: '#',
              src: '/assets/images/cases/porto3.jpg',
              alt: 'alt',
            },
            bg: {
              classes: 'object-fit',
              img: {
                hostClasses: '',
                src: '/assets/images/showcase/pattern-01.png',
              },
            },
          },
          {
            type: 'stepper',
            params: {
              mode: 'vertical',
              linear: true,
            },
            steps: [
              {
                label: '指派中',
                color: 'primary',
              },
              {
                label: '接受',
                color: 'accent',
                completed: true,
              },
              {
                label: '停止',
                completed: true,
                color: 'warn',
              },
              {
                label: '已完成',
              },
            ],
          },
        ],
        [
          {
            type: 'card',
            header: {
              meta: [
                {
                  label: '',
                  value: '<span class="badge">第一次会议</span>',
                },
                {
                  label: '会议期间',
                  value: '周一，04/11/2022 11:30<br>周一，04/11/2022 16:30',
                },
                {
                  label: '会议地址',
                  value: '中国上海市浦东新区 线上会议',
                },
                {
                  label: '参会人员',
                  value:
                    '<a href="/node/1">张三</a>,<a href="/node/2">Johnson</a>',
                },
                {
                  label: '工作工时',
                  value: '1',
                },
              ],
            },
            feature: {
              type: 'feature-box',
              hoverIcon: true,
              fullIcon: 'fullscreen',
              ratios: 'media-16-9',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto1.jpg',
                alt: 'lazyload',
              },
            },
            footer: {
              meta: [
                {
                  label: '相关项目',
                  value: '<a href="/node/1">创客城制度修改</a>',
                },
                {
                  label: '会议文件',
                  value: [
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第二次签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                    {
                      elements: [
                        {
                          type: 'link',
                          label: '第一次签字.docx',
                          href: 'xxx.docx',
                          target: '_blank',
                          classes: 'file one-line',
                        },
                        {
                          type: 'btn',
                          href: '#',
                          mode: 'stroked',
                          label: 'PDF',
                          color: 'warn',
                          target: '_blank',
                          classes: 'border-warn',
                        },
                      ],
                    },
                  ],
                  params: {
                    dynamic: true,
                  },
                },
                {
                  label: '会议内容',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
                  params: {
                    line: 'two',
                    shorten: 100,
                  },
                },
                {
                  label: '信息备注',
                  value:
                    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
                  params: {
                    line: 'two',
                    shorten: 100,
                    dialog: {
                      label: '更多',
                    },
                  },
                },
                {
                  label: '其他意见',
                  value:
                    'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
                  params: {
                    line: 'two',
                  },
                },
              ],
            },
            progressBar: {
              mode: 'determinate',
              value: 33,
            },
          },
          {
            type: 'card-1v4',
            img: {
              classes: 'object-fit',
              src: '/assets/images/avatar/01.jpeg',
            },
            star: 5,
            title: '- Johnson',
            subTitle: '前端开发',
            body: '信使是一个灵活可扩展性高的前端Anuglar框架，动态组件可以使得组件之间变得更加灵活，但是依赖循环也变得复杂。',
          },
          {
            type: 'testimonial',
            style: 'style-v2',
            title: 'Johnson',
            subTitle: 'FrontEnd',
            img: {
              src: '/assets/images/avatar/01.jpeg',
              alt: '',
            },
            body: '作为一名非专业的Web开发者，我曾经因为缺乏编码和设计技能而感到十分困惑。然而自从我开始使用Builder构建页面后，我的许多顾虑就消失了。',
          },
        ],
      ],
    },
  ],
};
