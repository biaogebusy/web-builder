export const home_v3 = {
  title: '首页 v3',
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
      spacer: 'none',
      type: 'hero-1v1',
      classes: 'text-light text-center',
      bg: {
        classes: '',
      },
      swiper: {
        params: {
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: false,
          observer: true,
          observeParents: true,
          breakpoints: {
            '600': {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            '960': {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          },
        },
        classes: '',
        elements: [
          {
            type: 'text',
            spacer: 'xl',
            title: {
              label: '组件驱动开发',
              style: 'style-v1',
              classes: 'mat-headline-2 bold',
            },
            classes: 'xy-center',
            bg: {
              classes: ' overlay overlay-80',
              img: {
                src: '/assets/images/16-9/business-14.jpeg',
                mobile: '/assets/images/mobile/mobile-03.jpg',
              },
            },
            body: '<p style="font-size:18px">Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"</p>',
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
          {
            type: 'text',
            title: {
              label: '组件展示和测试',
              style: 'style-v1',
              classes: 'mat-headline-2 bold',
            },
            spacer: 'xl',
            classes: 'xy-center text-light',
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/16-9/business-15.jpeg',
                mobile: '/assets/images/mobile/mobile-04.jpg',
              },
            },
            body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。',
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
          {
            type: 'text',
            title: {
              label: '文档化',
              style: 'style-v1',
              classes: 'mat-headline-2 bold',
            },
            spacer: 'xl',
            classes: 'xy-center text-light',
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/hero/182.jpg',
                mobile: '/assets/images/mobile/mobile-04.jpg',
              },
            },
            body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。',
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
        ],
      },
    },
    {
      type: 'carousel-2v2',
      id: '',
      spacer: 'xl',
      bg: {
        classes: 'bg-fill-width bg-shadow',
      },
      classes: '',
      swiper: {
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
      type: 'showcase-1v1',
      bg: {
        classes: 'bg-none bg-fill-width',
      },
      row: '4',
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
          src: '/assets/images/bg/bg-01.png',
        },
      },
      order: {
        left: 0,
        right: 1,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/25.png',
          alt: '',
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
      type: 'text',
      title: {
        label: '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
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
