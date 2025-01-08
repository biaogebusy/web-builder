export const home_v8 = {
  title: '首页 v8',
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
      spacer: 'xl',
      type: 'hero-1v4',
      classes: '',
      text: {
        title: {
          label: '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
          classes: 'mat-headline-2 bold',
          style: 'style-v1',
        },
        classes: 'p-x text-center',
        body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。',
        actionsAlign: 'center center',
        actions: [
          {
            type: 'btn',
            mode: 'raised',
            color: 'primary',
            href: '#',
            label: '立刻体验',
            target: '_blank',
          },
          {
            type: 'btn',
            color: 'primary',
            label: '联系我们',
            icon: {
              inline: true,
              name: 'phone',
            },
            mode: 'stroked',
          },
        ],
      },
      bg: {
        classes: 'bg-fill-width overlay- overlay-',
        img: {
          src: '/assets/images/bg/bg-02.png',
          hostClasses: '',
        },
      },
      order: -1,
      style: {
        maxWidth: '800px',
        margin: '0 auto',
      },
      widget: [
        {
          type: 'img',
          style: {
            maxHeight: '400px',
          },
          src: '/assets/images/illustration/30.png',
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
        classes: 'bg-fill-width bg-',
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
      type: 'carousel-1v3',
      spacer: 'lg',
      text: {
        spacer: 'none',
        title: {
          label: '客户评价',
          icon: '',
          style: 'style-v1',
          classes: 'mat-headline-1',
        },
        classes: 'text-center',
        body: '<p class="text-center">Storybook是一个开发工具和UI组件库，用于构建、测试和文档化可复用的UI组件。它提供了一个独立于主应用程序的环境，让开发者能够以隔离的方式开发和调试组件。</p>',
      },
      classes: '',
      bg: {
        classes: 'bg-shadow',
      },
      sliders: {
        params: {
          slidesPerView: 1.1,
          spaceBetween: 20,
          navigation: false,
          breakpoints: {
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          },
        },
        classes: 'p-bottom',
        elements: [
          {
            type: 'card-1v4',
            img: {
              classes: 'object-fit',
              src: '/assets/images/avatar/01.jpeg',
            },
            star: 4,
            title: '- 张明',
            subTitle: '前端开发',
            body: 'Storybook是我们团队的救星！它使我们能够独立地开发、测试和文档化组件，大大提高了我们的工作效率。非常好用！',
          },
          {
            type: 'card-1v4',
            img: {
              classes: 'object-fit',
              src: '/assets/images/avatar/02.jpeg',
            },
            star: 5,
            title: '- 王丽',
            subTitle: '前端开发',
            body: '使用Storybook后，我们的组件开发变得更加高效和可靠。它帮助我们定义多个使用场景，清晰地展示组件在各种情景下的表现。我们团队对它赞不绝口！',
          },
          {
            type: 'card-1v4',
            img: {
              classes: 'object-fit',
              src: '/assets/images/avatar/03.jpeg',
            },
            star: 5,
            title: '- 李军',
            subTitle: '前端开发',
            body: 'Storybook为我们的团队带来了极大的协作效益。它提供了一个集中查看和交流的平台，团队成员可以轻松共享和讨论组件。无疑是一个必备工具！',
          },
          {
            type: 'card-1v4',
            img: {
              classes: 'object-fit',
              src: '/assets/images/avatar/04.jpeg',
            },
            star: 4,
            title: '- 张燕',
            subTitle: '前端开发',
            body: '我们喜欢Storybook的文档化功能。它帮助我们详细记录和展示每个组件的使用方法和属性，使其他团队成员更容易理解和使用。真的很赞！',
          },
          {
            type: 'card-1v4',
            img: {
              classes: 'object-fit',
              src: '/assets/images/avatar/05.jpeg',
            },
            star: 5,
            title: '- 王刚',
            subTitle: '前端开发',
            body: 'Storybook让我们的前端开发更加流畅。它与我们的主应用程序分离，使我们能够更好地进行单独测试和调试。我们强烈推荐它给其他团队！',
          },
          {
            type: 'card-1v4',
            img: {
              classes: 'object-fit',
              src: '/assets/images/avatar/06.jpeg',
            },
            star: 5,
            title: '- 李丽',
            subTitle: '前端开发',
            body: 'Storybook是一个强大而灵活的工具，适用于各种项目和团队规模。我们发现它易于上手，并且它的插件生态系统给我们带来了很多扩展功能的选择。非常棒的工具！',
          },
        ],
      },
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
