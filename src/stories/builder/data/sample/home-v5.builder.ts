import { carousel2v2 } from '../combs/carousel.builder';
import {
  showcase1v3_video,
  showcase2v1_card1v1,
  showcase3v6_default,
  showcase3v9_reverse,
} from '../combs/showcase.builder';
import { text } from '../widgets/base.builder';

export const home_v5 = {
  title: '首页 v5',
  config: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '',
    },
  ],
  body: [
    {
      type: 'hero-1v1',
      spacer: 'none',
      classes: 'text-light text-center',
      sliders: {
        params: {
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: false,
        },
        elements: [
          {
            type: 'text',
            spacer: 'xl',
            title: {
              label: '前端面试全家桶',
              style: 'style-v1',
              classes: 'mat-display-3',
            },
            classes: 'xy-center',
            style: {
              width: '50%',
            },
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/hero/bg01.jpg',
                mobile: '/assets/images/hero/bg01.jpg',
              },
            },
            body: '<p>专业老师带你刷爆大厂前面面试和流程，从求职准备到面试演练</p>\r\n',
            actionsAlign: 'center center',
            actions: [
              {
                href: '#',
                label: '了解更多',
              },
            ],
          },
          {
            type: 'text',
            spacer: 'xl',
            title: {
              label: 'Java 亿级项目架构设计的落地和应用',
              style: 'style-v1',
              classes: 'mat-display-3',
            },
            classes: 'xy-center',
            style: {
              width: '50%',
            },
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/hero/bg02.jpg',
                mobile: '/assets/images/hero/bg02.jpg',
              },
            },
            body: '<p>稀缺好课，实践可落地的架构设计</p>\r\n',
            actionsAlign: 'center center',
            actions: [
              {
                href: '#',
                label: '了解更多',
              },
            ],
          },
          {
            type: 'text',
            spacer: 'xl',
            title: {
              label: '产品经理电商系统实践',
              style: 'style-v1',
              classes: 'mat-display-3',
            },
            classes: 'xy-center',
            style: {
              width: '50%',
            },
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/hero/bg05.jpg',
                mobile: '/assets/images/hero/bg05.jpg',
              },
            },
            body: '<p>全流程搭建企业级应用，全面掌握前后端设计精髓</p>\r\n',
            actionsAlign: 'center center',
            actions: [
              {
                href: 'https://jsonapi.org/format/',
                label: '了解更多',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'showcase-1v1',
      spacer: 'lg',
      classes: 'features-absolute',
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      row: 4,
      elements: [
        {
          icon: {
            name: 'verified_user',
          },
          style: 'style-v9',
          title: {
            href: '#',
            label: '会员无限制访问',
          },
          content:
            '<p>只要支付799元/年，就可以成为会员，无限制观看所有的视频课程</p>\r\n',
          more: {
            href: '#',
            label: '成为会员',
          },
        },
        {
          icon: {
            name: 'favorite',
          },
          style: 'style-v9',
          title: {
            href: '#',
            label: '我们的课程',
          },
          content:
            '<p>课程包括了初入职场的初级课程，也包括进阶高级的精品好课</p>\r\n',
          more: {
            href: '#',
            label: '浏览更多',
          },
        },
        {
          icon: {
            name: 'fingerprint',
          },
          style: 'style-v9',
          title: {
            href: '#',
            label: '优秀的老师',
          },
          content:
            '<p>所有的老师都是层层筛选和把关，为学员提供真实有效的技能和经验</p>\r\n',
          more: {
            href: 'https://jsonapi.org/format/',
            label: '成为老师',
          },
        },
      ],
    },
    carousel2v2,
    showcase3v9_reverse,
    showcase1v3_video,
    showcase3v6_default,
    showcase2v1_card1v1,
    text,
  ],
};
