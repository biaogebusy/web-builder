export const home_v12 = {
  title: '首页 v12',
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
      type: 'hero-2v2',
      spacer: 'lg',
      id: 'xxx',
      bg: {
        classes: 'bg-fill-width overlay',
        img: {
          classes: 'object-fit',
          src: '/assets/images/16-9/business-16.jpeg',
        },
      },
      classes: '',
      body: {
        type: 'text',
        title: {
          label:
            '<p><span data-type="text">艺术点亮生活，为您打造独一无二的艺术之旅</span></p>',
          style: 'style-v4',
          classes: 'mat-headline-1',
        },
        body: '<p><span data-type="text">在喧嚣的城市中寻找心灵的绿洲，[您的工作室名称]艺术工作室欢迎您！我们专注于为每一位热爱生活的您，提供个性化、高品质的艺术创作空间和课程服务。从零基础绘画课程到高端私人定制艺术品，让您在挥洒色彩间感受生活的美好。</span></p>',
        actions: [
          {
            type: 'btn',
            mode: 'raised',
            color: 'primary',
            href: '#',
            label: '了解更多',
            icon: {
              name: 'chat',
              inline: true,
            },
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
      spacer: 'lg',
      bgClasses: 'bg- bg-fill-width',
      overlay: '',
      classes: '',
      id: '',
      bg: {
        img: {
          src: '/assets/images/bg/bg-05.svg',
          classes: 'object-fit',
          alt: 'bg-05',
        },
        classes: 'bg- bg-fill-width',
        overlay: '',
      },
      animate: {
        from: {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          delay: 0,
          duration: 1,
          ease: 'none',
        },
        trigger: {
          onEnter: 'play',
          onLeave: 'none',
          onEnterBack: 'none',
          onLeaveBack: 'none',
          start: 'top 90%',
          end: 'top 40%',
        },
      },
      type: 'showcase-1v4',
      row: 4,
      text: {
        title: {
          label: '特色服务',
          style: 'style-v1',
          classes: 'mat-headline-2 bold',
        },
        classes: 'text-center',
        body: '<p class="text-center">沉浸式体验，专业定制，共享艺术的魅力与温度</p>',
      },
      elements: [
        {
          type: 'card-1v5',
          title: '专业艺术课程',
          body: '揭开艺术的神秘面纱，我们的专家团队一对一指导，让您轻松掌握绘画技巧，享受艺术创作的乐趣。',
          more: {
            href: '/node/1',
            target: '_blank',
            label: '查看详情',
          },
          footer: {
            label: 'Step 01.',
            icon: {
              svg: 'chevron-double-right',
            },
          },
        },
        {
          type: 'card-1v5',
          title: '定制艺术作品',
          body: '无论您是企盼家居装饰的艺术画作，还是希望赠予亲友的独特礼品，[您的工作室名称]都能根据您的需求，为您量身定制专属的艺术品。',
          more: {
            href: '/node/1',
            target: '_blank',
            label: '查看详情',
          },
          footer: {
            label: 'Step 02.',
            icon: {
              svg: 'chevron-double-right',
            },
          },
        },
        {
          type: 'card-1v5',
          title: '艺术活动策划',
          body: '提供丰富多样的艺术沙龙、工作坊等活动策划，搭建艺术交流平台，让灵感碰撞，让艺术在生活中绽放。',
          more: {
            href: '/node/1',
            target: '_blank',
            label: '查看详情',
          },
          footer: {
            label: 'Step 03.',
            icon: {
              svg: 'check-all',
            },
          },
        },
      ],
      actions: [
        {
          type: 'btn',
          label: '了解更多',
          mode: 'raised',
          color: 'primary',
          href: '#',
        },
      ],
    },
    {
      spacer: 'lg',
      bgClasses: 'bg- bg-fill-width',
      overlay: '',
      classes: '',
      id: '',
      bg: {
        img: {
          src: '',
          classes: 'bg-cover',
          alt: 'bg-05',
        },
        classes: 'bg- bg-fill-width',
        overlay: '',
      },
      animate: {
        from: {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          delay: 0,
          duration: 1,
          ease: 'none',
        },
        trigger: {
          onEnter: 'play',
          onLeave: 'none',
          onEnterBack: 'none',
          onLeaveBack: 'none',
          start: 'top 90%',
          end: 'top 40%',
        },
      },
      type: 'showcase-1v4',
      row: 6,
      text: {
        title: {
          label: '艺术设计之旅：探索创意与美学的奇妙世界',
          style: 'style-v1',
          classes: 'mat-headline-2 bold',
        },
        classes: 'text-center',
        body: '<p class="text-center">这次艺术设计之旅不仅仅是一次观赏和欣赏的体验，更是一个与艺术创造亲密接触的机会。参与者们通过参观展览、讲座和工作坊，自己动手创作和表达，发掘了自己内在的艺术潜能和表达能力。</p>',
      },
      elements: [
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '"创意之夜：探索艺术设计的无限可能"',
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
              src: '/assets/images/showcase/1.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '查看更多',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '艺术与科技的交汇点：体验前沿艺术设计活动',
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
              src: '/assets/images/showcase/2.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '查看更多',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '美学探险：发现艺术设计的独特魅力',
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
              src: '/assets/images/showcase/3.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '查看更多',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '创造与表达：参与互动艺术设计工作坊',
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
              src: '/assets/images/showcase/4.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '查看更多',
        },
      ],
      actions: [
        {
          type: 'btn',
          label: '了解更多',
          mode: 'raised',
          color: 'primary',
          href: '#',
        },
      ],
    },
    {
      type: 'text',
      title: {
        label: '为您打造独一无二的艺术之旅',
        style: 'style-v1',
        classes: 'mat-headline-2 bold',
      },
      bg: {
        classes: 'bg- bg-fill-width',
      },
      body: '艺术无界，创意无限。现在就加入吧，让我们共同探索艺术的无限可能，用艺术诠释生活之美！点击预约按钮，开启您的艺术探索之旅吧！',
      classes: 'text-center',
      actionsAlign: 'center center',
      actions: [
        {
          type: 'btn-generater',
          label: '立即联系',
          color: 'primary',
          mode: 'raised',
        },
      ],
    },
  ],
};
