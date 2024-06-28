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
              classes: 'mat-headline-2',
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
              classes: 'mat-headline-2',
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
              classes: 'mat-headline-2',
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
                href: '#',
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
            href: '#',
            label: '成为老师',
          },
        },
      ],
    },
    {
      type: 'carousel-2v2',
      id: '',
      spacer: 'xl',
      bg: {
        classes: 'bg-fill-width bg-shadow',
      },
      classes: '',
      sliders: {
        params: {
          slidesPerView: 1.2,
          pagination: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: {
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          },
        },
        classes: '',
        elements: [
          {
            type: 'img',
            src: '/assets/images/logo/amazon.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/google.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/lenovo.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/paypal.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/shopify.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/spotify.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/logo10.png',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
        ],
      },
    },
    {
      id: '',
      type: 'showcase-3v9',
      spacer: 'xl',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-02.png',
        },
      },
      classes: '',
      order: {
        left: 1,
        right: 0,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/12.png',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: '全天候学习支持',
            style: 'style-v4',
            classes: 'mat-headline-2',
          },
          body: '这里是您开启编程世界大门的理想起点。我们倾力打造了一系列适合各阶段学员的在线编程课程，无论您是初学者还是资深开发者，都将在这里找到适合自己的学习路径。',
        },
        {
          type: 'panel',
          elements: [
            {
              title: '精选实战课程',
              icon: 'person',
              params: {
                expanded: true,
              },
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '我们的课程涵盖了Python、Java、C++、JavaScript等多种主流编程语言，同时紧跟AI、大数据、云计算等热门领域，确保课程内容与时俱进，贴近真实开发场景。',
                },
              ],
            },
            {
              title: '个性化学习计划',
              icon: 'faviores',
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '根据每位学员的基础和目标，智能推荐适合的学习路线图，并设有难度分级，逐步引导您从基础知识到高级应用，步步为营，扎实提升编程技能。',
                },
              ],
            },
            {
              title: '名师直播授课',
              icon: 'faviores',
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '    ○ 来自国内外顶级IT企业的技术大牛亲自授课，面对面互动答疑，确保理论与实践相结合，帮助学员快速理解和掌握编程要点。',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'showcase-1v3',
      text: {
        title: {
          label: 'Storybook 是什么？',
          style: 'style-v1',
          classes: 'mat-headline-1',
        },
      },
      classes: 'text-light',
      bg: {
        classes: 'bg-fill-width overlay overlay-80',
        img: {
          hostClasses: 'bg-center',
          src: '/assets/images/showcase/8.jpg',
          alt: 'page title',
        },
      },
      elements: [
        {
          type: 'text',
          spacer: 'none',
          style: {
            margin: '0 auto',
            'text-align': 'center',
            width: '600px',
          },
          body: 'Storybook是一个开源的前端工具，用于开发、测试和文档化UI组件。它提供了一个独立的环境，开发人员可以在其中构建和展示单个UI组件，而无需依赖于整个应用程序的上下文。',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn-video',
              color: 'primary',
              video: {
                type: 'player',
                options: {
                  controls: true,
                  aspectRatio: '16:9',
                  poster: '/assets/video/poster01.png',
                  sources: [
                    {
                      src: '/assets/video/storybook.mp4',
                      type: 'video/mp4',
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    {
      type: 'showcase-3v6',
      id: '',
      title: {
        type: 'text',
        spacer: 'sm',
        title: {
          label: '为所有开发者、所有应用场景而设计',
          style: 'style-v1',
        },
        classes: 'text-center',
        body: '<p class="text-center">让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>',
      },
      bg: {
        classes: 'bg-light bg-fill-width',
      },
      classes: '',
      row: 4,
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
          title: '响应式设计',
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
          title: '支持 SSR 服务端渲染',
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
          title: '支持多主题、暗黑模式',
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
          title: 'MDI 6000多个icons',
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
          title: 'Storybook 全覆盖测试',
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
          title: '动态组件动态表单',
        },
      ],
    },
    {
      type: 'showcase-2v1',
      row: 4,
      bg: {
        classes: '',
      },
      classes: '',
      text: {
        title: {
          label: '最新课程',
          style: 'style-v1',
          classes: 'mat-headline-0 bold',
        },
        classes: 'text-center',
        body: '<p class="text-center">欢迎分享 Drupal 优秀的数字创新体验，新上好课！</p>',
      },
      elements: [
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '自主搭建5个精品脚手架，助力前端研发全流程提效',
          },
          user: '表歌',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/16-9/business-01.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '立即学习',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '2022全新 Node.js+Express+Koa2 开发Web Server博客',
          },
          user: '表歌',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/16-9/business-02.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '立即学习',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '国家级认证-软考高级，一站式通关课程，全力备战2022',
          },
          user: '表歌',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/16-9/business-03.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '立即学习',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '基于 Vue3 ，打造前台+中台通用提效解决方案',
          },
          user: '表歌',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/hero/bg01.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '立即学习',
        },
      ],
    },
    {
      type: 'text',
      title: {
        label:
          '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
        style: 'style-v1',
        classes: 'mat-headline-2 bold',
      },
      bg: {
        classes: 'bg- bg-fill-width',
      },
      body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
      classes: 'text-center',
      actionsAlign: 'center center',
      actions: [
        {
          type: 'btn-generater',
          label: '生成页面',
          color: 'primary',
          mode: 'raised',
        },
        {
          type: 'btn',
          color: 'primary',
          mode: 'stroked',
          label: '演示视频',
          href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
          target: '_blank',
          icon: {
            inline: true,
            svg: 'play-circle-outline',
          },
        },
      ],
    },
  ],
};
