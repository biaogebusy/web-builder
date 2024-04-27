export const templates: any[] = [
  {
    title: '空白页面',
    subTitle: '从一个空白页面开始搭建',
    img: '/assets/images/template/blank.svg',
    page: {
      title: '空白页面',
      current: true,
      time: new Date(),
      body: [
        {
          type: 'layout-builder',
          spacer: 'md',
          fullWidth: false,
          bg: {
            classes: 'bg-fill-width',
          },
          layoutAlign: 'center center',
          gap: {
            xs: 8,
            sm: 16,
            md: 32,
            lg: 48,
          },
          elements: [
            {
              classes: '',
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              direction: 'column',
              layoutAlign: 'start start',
              elements: [],
            },
            {
              classes: '',
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              direction: 'column',
              layoutAlign: 'start start',
              elements: [],
            },
          ],
        },
      ],
    },
  },
  {
    title: '搜索页面',
    subTitle: '全站搜索',
    img: '/assets/images/template/website-post.svg',
    page: {
      title: '搜索页面',
      current: true,
      time: new Date(),
      body: [
        {
          type: 'search',
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
                classes: 'mat-display-1  text-light',
              },
              spacer: 'xl',
              'style-': {
                width: '50%',
                left: '0%',
                top: '5%',
              },
              classes: 'text-center',
              body: '<p class="text-center text-light">这里有你想要的答案。</p>',
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
              templateOptions: {
                label: '关键词',
                appearance: 'legacy',
                type: 'search',
              },
            },
            {
              type: 'select',
              key: 'skill',
              className: 'block',
              templateOptions: {
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
              templateOptions: {
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
              templateOptions: {
                label: '文章',
              },
            },
            {
              type: 'checkbox',
              key: 'blog',
              className: 'block',
              templateOptions: {
                label: '博客',
              },
            },
          ],
        },
      ],
    },
  },
  {
    title: '关于我们',
    subTitle: '介绍您的业务',
    img: '/assets/images/template/about.svg',
    page: {
      title: '关于我们',
      current: true,
      time: new Date(),
      body: [
        {
          type: 'banner-simple',
          style: 'normal',
          bannerBg: {
            classes: 'bg-fill-width',
            img: {
              hostClasses: 'bg-center',
              src: '/assets/images/16-9/nature-05.jpg',
              alt: 'beach-01.jpg',
              style: {
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                opacity: 1,
                borderRadius: 0,
                objectFit: 'initial',
              },
            },
          },
          title: '关于我们',
          breadcrumb: [],
        },
        {
          spacer: 'xl',
          bgClasses: 'bg-fill-width overlay overlay-',
          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/home-shape.png',
              classes: 'object-fit',
              alt: 'home-shape',
              hostClasses: '',
            },
            classes: 'bg-fill-width overlay overlay-',
            overlay: '',
          },
          type: 'showcase-3v2',
          title: {
            label: '关于我们',
            style: 'style-v1',
            classes: 'mat-display-0 bold',
          },
          subTitle:
            '<p class="text-align-center">远方信使（XINSHI）是一个使用 Drupal 提供 API 的 Angular 前端开发学习框架，拥有丰富的前端组件，通过 Drupal Pannel 可快速构建 Landing 营销着陆页，常规的 Web 官网通过拖曳的方式即可创建。</p>\r\n',
          elements: [
            {
              img: {
                src: '/assets/images/1-1/business-03.png',
                alt: '',
                style: {
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  opacity: '1',
                  borderRadius: 0,
                  objectFit: 'initial',
                },
              },
              content: {
                title: {
                  label: '我们的故事',
                  style: 'style-v4',
                  classes: 'mat-display-1',
                },
                body: '<p>我们是专业开发 Drupal 多年的前后端开发人员，热衷于分享 Drupal 相关的技术和资讯，创建维护微信公众号：drupalstudy 从 Drupal 7开始，目前已发布了了四百多期，是国内为数不多的 Drupal 相关的微信公众号。</p>\r\n',
              },
            },
            {
              img: {
                src: '/assets/images/1-1/business-02.png',
                alt: '',
              },
              content: {
                title: {
                  label: '技术分享',
                  style: 'style-v4',
                  classes: 'mat-display-1',
                },
                actions: [
                  {
                    type: 'btn-animate',
                    label: 'Drupal 自习室知乎专栏',
                    href: 'https://www.zhihu.com/column/c_1331898788731375616',
                    style: 'style-v1',
                    icon: 'open_in_new',
                  },
                ],
                body: '<p>我们也及时在知乎更新 Drupal 相关的技术文章，分享给更多感兴趣的人，愿你们能够享受 Drupal 带来的字数创新体验。</p>\r\n',
              },
            },
          ],
        },
        {
          type: 'text',
          title: {
            label:
              '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
            style: 'style-v1',
            classes: 'mat-display-2 bold',
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
    },
  },
  {
    title: '联系我们',
    subTitle: '关于我们的信息，允许访客联系',
    img: '/assets/images/template/team.svg',
    page: {
      title: '联系我们',
      current: true,
      time: new Date(),
      body: [
        {
          type: 'banner-simple',
          style: 'normal',
          bannerBg: {
            classes: 'bg-fill-width',
            img: {
              hostClasses: 'bg-center',
              src: '/assets/images/16-9/nature-05.jpg',
              alt: 'beach-01.jpg',
              style: {
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                opacity: 1,
                borderRadius: 0,
                objectFit: 'initial',
              },
            },
          },
          title: '联系我们',
          breadcrumb: [],
        },
        {
          fullWidth: false,
          spacer: 'xs',
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
          direction: 'row',
          horizontal: 'center',
          vertical: 'center',
          layoutAlign: 'center center',
          gap: {
            xs: 8,
            sm: 16,
            md: 32,
            lg: 48,
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
              direction: 'row',
              horizontal: 'center',
              vertical: 'center',
              layoutAlign: 'center center',
              bg: {
                img: {
                  src: '',
                  classes: 'object-fit',
                  alt: '',
                },
                classes: 'bg-fill-width',
              },
              style: {
                backgroundColor: 'initial',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              classes: '',
              elements: [
                {
                  style: 'style-v1',
                  classes: 'mat-display-2 bold',
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
                  type: 'title',
                  label: '联系我们',
                },
              ],
            },
          ],
        },
        {
          spacer: 'xs',
          bgClasses: 'bg- bg-fill-width',
          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            classes: 'bg- bg-fill-width',
            overlay: '',
          },
          type: 'location',
          style: {
            height: '500px',
          },
          city: '南宁市',
          params: {
            zoomEnable: false,
            draggable: false,
          },
          elements: [{}],
        },
        {
          spacer: 'xl',
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
            icon: 'wave',
          },
          type: 'contact-us',
          params: {
            webform_id: 'contact',
          },
          action: {
            label: '提交',
          },
          formOrder: '1',
          contact: [
            {
              title: {
                label: '地址',
              },
              icon: {
                name: 'location_on',
              },
              style: 'style-v7 small-box',
              content: '创客城2栋',
            },
            {
              title: {
                label: '电话号码',
              },
              style: 'style-v7 small-box',
              icon: {
                name: 'phone',
              },
              content: '+086 0771xxxx',
            },
            {
              title: {
                label: '邮件',
              },
              style: 'style-v7 small-box',
              icon: {
                name: 'mail',
              },
              content: 'service@example.com',
            },
            {
              title: {
                label: '微信',
              },
              style: 'style-v7 small-box',
              icon: {
                name: 'chat_bubble',
              },
              content: 'biaogebusy',
            },
          ],
          forms: [
            {
              type: 'input',
              label: '姓名',
              key: 'name',
              params: {
                required: true,
              },
            },
            {
              type: 'input',
              label: '邮箱',
              key: 'email',
              params: {
                required: true,
              },
            },
            {
              type: 'input',
              label: '主题',
              key: 'subject',
              params: {
                required: true,
              },
            },
            {
              type: 'textarea',
              label: '内容',
              params: {
                required: true,
                matAutosizeMinRows: 5,
              },
              key: 'message',
              placeholder: 'Message',
            },
          ],
        },
      ],
    },
  },
  {
    title: 'FAQ',
    subTitle: '快速问答页面',
    img: '/assets/images/template/faq.svg',
    page: {
      title: 'FAQ',
      current: true,
      time: new Date(),
      body: [
        {
          type: 'banner-simple',
          style: 'normal',
          bannerBg: {
            classes: 'bg-fill-width',
            img: {
              hostClasses: 'bg-center',
              src: '/assets/images/16-9/nature-05.jpg',
              alt: 'beach-01.jpg',
              style: {
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                opacity: 1,
                borderRadius: 0,
                objectFit: 'initial',
              },
            },
          },
          title: '快速问答',
          breadcrumb: [],
        },
        {
          fullWidth: false,
          spacer: 'md',
          bgClasses: 'bg-shadow bg-fill-width',
          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            classes: 'bg-shadow bg-fill-width',
            overlay: '',
          },
          direction: 'row wrap',
          horizontal: 'center',
          vertical: 'stretch',
          layoutAlign: 'center stretch',
          gap: {
            xs: 0,
            sm: 16,
            md: 32,
            lg: 48,
          },
          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 6,
                md: 6,
                lg: 7,
              },
              direction: 'column',
              horizontal: 'center',
              vertical: 'center',
              layoutAlign: 'center center',
              bg: {
                img: {
                  src: '',
                  classes: 'object-fit',
                  alt: '',
                },
                classes: 'bg-fill-width',
              },
              style: {
                backgroundColor: 'initial',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              classes: '',
              elements: [
                {
                  type: 'panel',
                  elements: [
                    {
                      title: '组件驱动开发',
                      icon: 'person',
                      params: {
                        expanded: true,
                      },
                      elements: [
                        {
                          type: 'text',
                          spacer: 'none',
                          body: 'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
                        },
                      ],
                    },
                    {
                      title: '组件展示和测试',
                      icon: 'faviores',
                      elements: [
                        {
                          type: 'text',
                          spacer: 'none',
                          body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
                        },
                      ],
                    },
                    {
                      title: '文档化',
                      icon: 'faviores',
                      elements: [
                        {
                          type: 'text',
                          spacer: 'none',
                          body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
                        },
                      ],
                    },
                    {
                      title: '插件和工具生态系统',
                      icon: 'faviores',
                      elements: [
                        {
                          type: 'text',
                          spacer: 'none',
                          body: 'Storybook拥有丰富的插件和工具生态系统，可以扩展其功能。这些插件可以用于模拟数据、测试组件的不同状态和交互，并生成自动化测试报告。这样，开发人员可以根据自己的需求定制和扩展Storybook。',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 5,
              },
              direction: 'column',
              horizontal: 'center',
              vertical: 'center',
              layoutAlign: 'center center',
              bg: {
                img: {
                  src: '',
                  classes: 'object-fit',
                  alt: '',
                },
                classes: 'bg-fill-width',
              },
              style: {
                paddingTop: '30px',
                paddingRight: '30px',
                paddingBottom: '30px',
                paddingLeft: '30px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              classes: '',
              elements: [
                {
                  type: 'img',
                  hostClasses: 'text-center',
                  classes: '',
                  src: '/assets/images/illustration/01.png',
                  alt: 'alt',
                  style: {
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '300px',
                    opacity: '1',
                    borderRadius: 0,
                    objectFit: 'initial',
                  },
                },
              ],
            },
          ],
        },
        {
          spacer: 'xl',
          bgClasses: 'bg- bg-fill-width',
          overlay: '',
          classes: 'text-center',
          id: '',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            classes: 'bg- bg-fill-width',
            overlay: '',
          },
          type: 'text',
          title: {
            label:
              '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
            style: 'style-v1',
            classes: 'mat-display-2 bold',
          },
          body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
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
    },
  },
  {
    title: '服务介绍',
    subTitle: '介绍您的服务',
    img: '/assets/images/template/services.svg',
    page: {
      title: '服务介绍',
      current: true,
      time: new Date(),
      body: [
        {
          type: 'hero-2v3',
          id: 'xxx',
          spacer: 'lg',
          shape: true,
          bg: {
            classes: 'bg-center',
            img: {
              hostClasses: 'bg-center',
              src: '/assets/images/bg/bg-04.png',
            },
          },
          classes: '',
          text: {
            title: {
              label: '开源项目使用 Github actions 自动化',
              style: 'none',
              classes: 'mat-display-1',
            },
            spacer: 'none',
            body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p>',
          },
          row: 6,
          elements: [
            {
              img: {
                src: '/assets/images/svg/health.svg',
                href: '/',
              },
              link: {
                href: '/',
                label: '高性能',
              },
            },
            {
              img: {
                src: '/assets/images/svg/term-life.svg',
                href: '/',
              },
              link: {
                href: '/',
                label: '易用的编辑器',
              },
            },
            {
              img: {
                src: '/assets/images/svg/family-health.svg',
                href: '/',
              },
              link: {
                href: '/',
                label: '多语言',
              },
            },
            {
              img: {
                src: '/assets/images/svg/investment.svg',
                href: '/',
              },
              link: {
                href: '/',
                label: '更有弹性',
              },
            },
            {
              img: {
                src: '/assets/images/svg/car.svg',
                href: '/',
              },
              link: {
                href: '/',
                label: '安全性',
              },
            },
            {
              img: {
                src: '/assets/images/svg/bike.svg',
                href: '/',
              },
              link: {
                href: '/',
                label: '无障碍访问',
              },
            },
          ],
        },
        {
          type: 'showcase-1v1',
          title: {
            label:
              '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
            style: 'style-v3',
          },
          row: 4,
          bg: {
            classes: 'bg- bg-fill-width',
          },
          classes: '',
          style: 'style-v3',
          elements: [
            {
              icon: {
                name: 'verified_user',
              },
              style: 'style-v3',
              title: {
                href: '/?path=/story/guide--page',
                label: '丰富的组件库',
              },
              content: '常用的组件库，和三十多个基组件',
              more: {
                href: '/?path=/story/builder--default',
                label: '更多',
              },
            },
            {
              icon: {
                name: 'fingerprint',
              },
              style: 'style-v3',
              title: {
                href: '/?path=/story/themeconfig--page',
                label: '支持多主题',
              },
              content: '内置多个主题，Material 色彩生成，支持暗黑主题',
              more: {
                href: '/?path=/story/themeconfig--page',
                label: '更多',
              },
            },
            {
              icon: {
                name: 'favorite',
              },
              style: 'style-v3',
              title: {
                href: '/?path=/story/flexlayout--page',
                label: '示例页',
              },
              content: '十多个经典示例页，展示组件的灵活性',
              more: {
                href: '/?path=/story/builder--default',
                label: '更多',
              },
            },
            {
              icon: {
                name: 'android',
              },
              style: 'style-v3',
              title: {
                href: '/?path=/story/home-v1--page',
                label: 'Web Builder',
              },
              content: '从组件库中通过拖拽快速构建页面',
              more: {
                href: '/?path=/story/builder--default',
                label: '更多',
              },
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
              classes: 'mat-display-0 bold',
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
          id: 'xxx',
          type: 'action-1v1',
          spacer: 'xl',
          bg: {
            classes: 'bg-shadow bg-fill-width',
          },
          classes: '',
          text: {
            title: {
              label: '如何才能帮助到您？',
              style: 'none',
              classes: 'mat-display-1',
            },
            classes: '',
            spacer: 'none',
            body: '<p>这里有你想要的答案，请根据以下筛选条件选择进行搜索。</p>',
            actions: [
              {
                type: 'search-action',
                button: {
                  label: '搜索',
                  color: 'primary',
                },
                form: [
                  {
                    type: 'select',
                    key: 'skill',
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
                  {
                    type: 'select',
                    key: 'cms',
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
                  {
                    type: 'input',
                    key: 'keys',
                    placeholder: '请输入关键词搜索',
                    controlType: 'search',
                    label: '关键词',
                    appearance: 'legacy',
                  },
                ],
              },
            ],
          },
          shape: true,
        },
        {
          type: 'showcase-3v4',
          title: {
            label: '为什么你将会喜欢这个前端框架？',
            style: 'style-v1',
          },
          bg: {
            classes: 'bg-fill-width bg-',
          },
          classes: '',
          img: {
            src: '/assets/images/1-1/business-02.png',
            alt: 'OUR FEATURES',
          },
          elements: [
            {
              type: 'box',
              style: 'style-v7',
              icon: {
                name: 'verified_user',
              },
              title: {
                href: '/',
                label: '组件编辑',
              },
              content: '通过简单的管理界面对复杂的可视化编辑',
              more: {
                href: '#',
                label: '更多',
              },
            },
            {
              type: 'box',
              style: 'style-v7',
              icon: {
                name: 'fingerprint',
              },
              title: {
                href: '/',
                label: '多语言',
              },
              content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
              more: {
                href: '#',
                label: '更多',
              },
            },
            {
              type: 'box',
              style: 'style-v7',
              icon: {
                name: 'favorite',
              },
              title: {
                href: '/',
                label: '高性能',
              },
              content:
                '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
              more: {
                href: '#',
                label: '更多',
              },
            },
            {
              type: 'box',
              style: 'style-v7',
              icon: {
                name: 'android',
              },
              title: {
                href: '/',
                label: '易用的编辑器',
              },
              content:
                '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
              more: {
                href: '#',
                label: '更多',
              },
            },
          ],
        },
        {
          type: 'showcase-4v1',
          spacer: 'lg',
          text: {
            title: {
              label: '平台实时数据',
              style: 'style-v1',
            },
          },
          bg: {
            classes: 'bg-fill-width bg-shadow',
          },
          classes: '',
          params: {
            apiBak: 'api/v1/xxx',
          },
          elements: [
            {
              icon: {
                name: 'fingerprint',
              },
              digit: {
                value: 169,
                label: '+',
              },
              title: '日访问人数',
            },
            {
              icon: {
                name: 'verified_user',
              },
              digit: {
                value: 436,
                label: '+',
              },
              title: '日打开次数',
            },
            {
              icon: {
                name: 'android',
              },
              digit: {
                value: 199,
                label: '人',
              },
              title: '日新增人数',
            },
            {
              icon: {
                name: 'mail',
              },
              digit: {
                value: 4657,
                label: '万',
              },
              title: '累计用户数',
            },
          ],
        },
        {
          spacer: 'lg',
          type: 'carousel-1v1',
          title: {
            label: '你将喜欢上 Drupal 的原因',
            icon: 'email',
            style: 'style-v2',
            classes: 'mat-display-1',
          },
          classes: '',
          bg: {
            classes: 'bg-white bg-fill-width',
          },
          sliders: {
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
        },
      ],
    },
  },
];
