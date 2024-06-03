import * as treeListStory from '@stories/drupal/treeList.stories';
import * as questionStory from '@stories/sample/node/question.stories';
import * as taxonomyListStory from '@stories/components/list/taxonomyList.stories';
import * as taxonomyThinListStory from '@stories/components/list/taxonomyThinList.stories';
import * as contact1v1Story from '@stories/drupal/form/ContactUs1v1.stories';

export const drupal = [
  {
    label: '问答',
    content: questionStory.Default?.args?.content,
  },
  {
    label: '联系表单',
    content: contact1v1Story.Default?.args?.content,
  },
  {
    label: '分类列表',
    content: taxonomyListStory.Default?.args?.content,
  },
  {
    label: '分类列表 Thin',
    content: taxonomyThinListStory.Default?.args?.content,
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
  {
    label: '树形列表',
    content: treeListStory.Default?.args?.content,
  },
];
