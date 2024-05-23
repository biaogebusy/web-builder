export const home_v11 = {
  title: '首页 v11',
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
      type: 'hero-1v2',
      spacer: 'none',
      classes: 'text-light text-center',
      sliders: {
        params: {
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: true,
        },
        classes: '',
        elements: [
          {
            title: '使Storybook 是什么？',
            subTitle:
              'Storybook是一个开源的前端工具，用于开发、测试和文档化UI组件。它提供了一个独立的环境，开发人员可以在其中构建和展示单个UI组件，而无需依赖于整个应用程序的上下文。',
            bg: {
              type: 'bg-img',
              classes: 'bg-fill-width overlay overlay-40',
              img: {
                src: '/assets/images/16-9/business-13.jpg',
                classes: 'object-fit',
              },
            },
            btn: {
              href: '#',
              mode: 'raised',
              label: '查看更多',
              pill: true,
            },
          },
          {
            title: '组件驱动开发',
            subTitle:
              'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
            bg: {
              type: 'bg-img',
              classes: 'bg-fill-width overlay overlay-40',
              img: {
                src: '/assets/images/16-9/business-14.jpeg',
                classes: 'object-fit',
              },
            },
            btn: {
              href: '#',
              mode: 'raised',
              label: '查看更多',
              pill: true,
            },
          },
          {
            title: '组件展示和测试',
            subTitle:
              'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
            bg: {
              type: 'bg-img',
              classes: 'bg-fill-width overlay overlay-40',
              img: {
                src: '/assets/images/16-9/business-15.jpeg',
                classes: 'object-fit',
              },
            },
            btn: {
              href: '#',
              mode: 'raised',
              label: '查看更多',
              pill: true,
            },
          },
          {
            title: '文档化',
            subTitle:
              'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
            bg: {
              type: 'bg-img',
              classes: 'bg-fill-width overlay overlay-40',
              img: {
                src: '/assets/images/16-9/business-16.jpeg',
                classes: 'object-fit',
              },
            },
            btn: {
              href: '#',
              mode: 'raised',
              label: '查看更多',
              pill: true,
            },
          },
        ],
      },
      bg: {
        classes: 'bg-center overlay overlay-80',
        img: {
          src: '/assets/images/hero/bg-pattern-hero.png',
          mobile: '/assets/images/hero/bg-pattern-hero.png',
        },
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
      sliders: {
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
