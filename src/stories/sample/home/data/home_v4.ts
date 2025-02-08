export const home_v4 = {
  title: '首页 v4',
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
      type: 'showcase-1v1',
      bg: {
        classes: 'bg-none bg-fill-width',
      },
      row: 4,
      classes: '',
      elements: [
        {
          type: 'box',
          img: {
            src: '/assets/images/svg/user.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '高性能',
          },
          content: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/svg/calendar.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '易用的编辑器',
          },
          content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/svg/sand-clock.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '多语言',
          },
          content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/svg/health.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '更有弹性',
          },
          content: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
          more: {
            href: '#',
            label: '+',
          },
        },
      ],
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
      order: {
        left: 1,
        right: 0,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/13.png',
          hostClasses: 'relative',
          actions: [
            {
              color: 'primary',
              type: 'btn-video',
              video: {
                type: 'video',
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
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: '使用信使构建你们的项目',
            style: 'style-v4',
            classes: 'mat-headline-2',
          },
          body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
        },
        {
          type: 'swiper',
          params: {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: false,
          },
          classes: 'p-bottom',
          elements: [
            {
              type: 'card',
              title: '高性能',
              subTitle: 'High Performance',
              avatar: {
                src: '/assets/images/avatar/01.jpeg',
                alt: '',
              },
              classes: 'card-no-shadow',
              body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/02.jpeg',
                alt: '',
              },
              title: '易用的编辑器',
              subTitle: 'Simplicity for Editors',
              classes: 'card-no-shadow',
              body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/03.jpeg',
                alt: '',
              },
              title: '多语言',
              subTitle: 'Leader in Multilingual',
              classes: 'card-no-shadow',
              body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/04.jpeg',
                alt: '',
              },
              title: '更有弹性',
              subTitle: 'Flexibility',
              classes: 'card-no-shadow',
              body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/05.jpeg',
                alt: '',
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
            label: 'Storybook 是什么？',
            style: 'style-v4',
            classes: 'mat-headline-2',
          },
          body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。',
        },
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
          hostClasses: '',
          src: '/assets/images/showcase/8.jpg',
          alt: 'page title',
        },
      },
      elements: [
        {
          type: 'text',
          spacer: 'none',
          style: {
            'margin': '0 auto',
            'text-align': 'center',
            'width': '600px',
          },
          body: 'Storybook是一个开源的前端工具，用于开发、测试和文档化UI组件。它提供了一个独立的环境，开发人员可以在其中构建和展示单个UI组件，而无需依赖于整个应用程序的上下文。',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn-video',
              color: 'primary',
              video: {
                type: 'video',
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
        classes: 'bg-shadow bg-fill-width',
      },
      classes: '',
      row: '3',
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
      action: {
        label: '查看更多',
        href: '#',
        style: 'style-v1',
        icon: 'open_in_new',
      },
    },
    {
      spacer: 'lg',
      type: 'carousel-1v1',
      title: {
        label: '你将喜欢上 Drupal 的原因',
        icon: 'email',
        style: 'style-v2',
        classes: 'mat-headline-1',
      },
      classes: '',
      bg: {
        classes: 'bg-white bg-fill-width',
      },
      swiper: {
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
        label: '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
        style: 'style-v1',
        classes: 'mat-headline-1 bold',
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
