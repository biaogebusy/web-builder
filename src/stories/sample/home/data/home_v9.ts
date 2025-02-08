export const home_v9 = {
  title: '首页 v9',
  configBak: {
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
      type: 'hero-2v1',
      theme: 'text-light',
      params: {
        height: '750px',
      },
      text: {
        title: {
          label: '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
          style: 'style-v1',
          classes: 'mat-headline-2',
        },
        spacer: 'xl',
        classes: 'xy-center text-center',
        bg: {
          classes: 'bg-shadow overlay overlay-80',
          img: {
            src: '/assets/images/hero/1-6.jpg',
            mobile: '/assets/images/mobile/mobile-03.jpg',
          },
        },
        body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-">Storybook</strong> 页面时添加组件到预览页面。',
        actionsAlign: 'center center',
        actions: [
          {
            type: 'btn',
            mode: 'raised',
            color: 'primary',
            href: '#',
            label: '立刻体验',
          },
        ],
      },
    },
    {
      type: 'showcase-2v2',
      text: {
        title: {
          label: '本年度<strong class="text-primary">艺术作品</strong>代表作',
          style: 'style-v1',
          classes: 'mat-headline-2 bold',
        },
        classes: 'text-center',
        body: '<p class="text-center">突破传统的艺术边界，展示前卫和创新的艺术作品</p>',
      },
      row: 4,
      bg: {
        classes: '',
      },
      classes: '',
      elements: [
        {
          carousel: {
            type: 'swiper',
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
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '#',
                ratios: 'media-140',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/cases/porto1.jpg',
                  alt: 'lazyload',
                },
              },
              {
                type: 'feature-box',
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '#',
                ratios: 'media-140',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/cases/porto2.jpg',
                  alt: 'lazyload',
                },
              },
            ],
          },
          link: {
            href: '/node/1',
            label: '《绝望之境》',
          },
          body: '展现了作者内心深处的黑暗情绪，让观者深陷其中，感受到无尽的绝望与孤独。',
        },
        {
          carousel: {
            type: 'swiper',
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
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '#',
                ratios: 'media-140',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/cases/porto3.jpg',
                  alt: 'lazyload',
                },
              },
            ],
          },
          link: {
            href: '/node/1',
            label: '《色彩之舞》',
          },
          body: '如同一幅绚丽的画卷，色彩的交织与流动呈现出动感和活力，令人心旷神怡。',
        },
        {
          carousel: {
            type: 'swiper',
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
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '#',
                ratios: 'media-140',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/cases/porto4.jpg',
                  alt: 'lazyload',
                },
              },
            ],
          },
          link: {
            href: '/node/1',
            label: '《时间的拥抱》',
          },
          body: '将时间的概念与人类情感相融合，通过流动的线条和温暖的色调传递出对美好回忆的珍视与怀念。',
        },
        {
          carousel: {
            type: 'swiper',
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
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '#',
                ratios: 'media-140',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/cases/porto5.jpg',
                  alt: 'lazyload',
                },
              },
            ],
          },
          link: {
            href: '/node/1',
            label: '《自由的翅膀》',
          },
          body: '象征着无拘束和追求自由的欲望，作品中的动感线条和飞扬的形态让人感受到自由的力量与憧憬。',
        },
      ],
    },
    {
      type: 'showcase-4v1',
      spacer: 'lg',
      text: {
        title: {
          label: 'Storybook 是如何流行于前端开发测试的',
          style: 'style-v1',
          classes: 'mat-headline-1',
        },
        classes: 'text-center',
        body: '<p class="text-center">通过Storybook，您可以以交互的方式在浏览器中浏览和测试组件，以确保它们在各种条件下的正确工作。</p>',
      },
      paramsBak: {
        api: 'api/v1/tab/order_process_statistics',
      },
      elements: [
        {
          img: {
            src: '/assets/images/svg/Asset187.svg',
          },
          digit: {
            value: 52,
            label: 'M',
          },
          title: 'Github Start',
        },
        {
          img: {
            src: '/assets/images/svg/Asset189.svg',
          },
          digit: {
            value: 32653,
            label: '+',
          },
          title: 'NPM 周下载量',
        },
        {
          img: {
            src: '/assets/images/svg/Asset190.svg',
          },
          digit: {
            value: 3923,
            label: 'K',
          },
          title: '社区活跃',
        },
        {
          img: {
            src: '/assets/images/svg/Asset192.svg',
          },
          digit: {
            value: 912,
            label: '个',
          },
          title: '成功故事',
        },
      ],
      bg: {
        classes: 'bg-fill-width bg-shadow',
      },
    },
    {
      type: 'carousel-1v2',
      title: {
        label: '近期作品',
        style: 'style-v5',
      },
      classes: '',
      bg: {
        classes: 'bg-white bg-fill-width',
      },
      swiper: {
        params: {
          slidesPerView: 1.2,
          spaceBetween: 10,
          navigation: false,
          pagination: false,
          breakpoints: {
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          },
        },
        classes: 'p-bottom',
        elements: [
          {
            type: 'card',
            link: {
              href: '#',
              label: '知乎社区问答平台',
            },
            classes: 'card-no-shadow',
            body: '面向广大用户提供知识分享和交流的问答社区，具有简洁清晰的界面设计和消息通知系统，支持多种方式的分享和交流。',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/showcase/5.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            link: {
              href: '#',
              label: 'Shopify电商平台',
            },
            classes: 'card-no-shadow',
            body: '提供全面电商解决方案的科技公司的官方网站，拥有富有创意的设计和易于使用的交互功能，让用户轻松创建自己的电商网站并实现商业目标。',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/showcase/6.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            classes: 'card-no-shadow',
            link: {
              href: '#',
              label: '酷狗音乐web版',
            },
            body: '支持在线听歌的音乐网站，提供海量音乐资源，拥有个性化的推荐和电台功能。',
            moreLabel: 'Learn More',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/showcase/1.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            link: {
              href: '#',
              label: '全职高手小说官网',
            },
            classes: 'card-no-shadow',
            body: '基于网络文学改编的小说官网，为读者提供轻松愉悦的用户界面和舒适的阅读体验。',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/showcase/2.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            link: {
              href: '#',
              label: '匠人联盟电商平台',
            },
            classes: 'card-no-shadow',
            body: '面向手工艺爱好者的电商平台，提供独立设计师的手工作品和教程，让用户可以轻松地DIY定制自己的物品。',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/showcase/3.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            link: {
              href: '#',
              label: '美之味食品官网',
            },
            classes: 'card-no-shadow',
            body: '为用户提供极致美食品味体验的食品官网，展现诱人的图片和独特的设计，吸引用户的注意力并增加销售。',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/showcase/4.jpg',
                alt: 'alt',
              },
            },
          },
        ],
      },
    },
  ],
};
