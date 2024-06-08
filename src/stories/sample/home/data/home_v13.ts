export const home_v13 = {
  title: '首页 v13',
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
      type: 'carousel-2v2',
      id: '',
      spacer: 'xl',
      bg: {
        classes: 'bg-fill-width bg-',
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
      type: 'showcase-1v1',
      title: {
        label:
          '<p style="display: inline-block; margin-bottom: 0px;">我们的服务</p>',
        style: 'style-v2',
      },
      subTitle: {
        spacer: 'none',
        classes: 'text-center',
        body: '无论您是刚刚起步还是已经拥有一定市场份额，我们都能为您提供最佳的宣传解决方案。立即与我们联系，让我们一起开启成功之旅！',
      },
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      row: 3,
      classes: '',
      elements: [
        {
          type: 'box',
          img: {
            src: '/assets/images/svg/Asset187.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '定制化宣传方案',
          },
          content:
            '我们根据您的产品特点和目标受众，为您量身打造个性化的宣传方案，确保每一份计划都能为您的产品增添光彩。',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/svg/Asset189.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image primary',
          title: {
            href: '#',
            label: '多渠道推广',
          },
          content:
            '无论是社交媒体、线上广告还是线下宣传，我们都拥有丰富的经验和资源，可以帮助您在各个渠道上进行有针对性的推广，吸引更多潜在客户。',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/svg/Asset190.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '内容创意设计',
          },
          content:
            '我们的创意团队将为您量身打造引人入胜的宣传内容，从文字到视觉设计，每一个细节都精心雕琢，让您的品牌故事更加生动有趣。 ',
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
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: '为何选择我们？',
            style: 'style-v4',
            classes: 'mat-display-2',
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
              title: '专业团队',
              subTitle: 'High Performance',
              avatar: {
                src: '/assets/images/avatar/01.jpeg',
                alt: '',
              },
              classes: 'card-no-shadow',
              body: '我们拥有经验丰富的专业团队，可以为您提供一流的服务和支持。',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/02.jpeg',
                alt: '',
              },
              title: '创意无限',
              subTitle: 'Simplicity for Editors',
              classes: 'card-no-shadow',
              body: '我们热爱创意，不断追求创新，为您带来充满惊喜的宣传方案。',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/03.jpeg',
                alt: '',
              },
              title: '成本效益',
              subTitle: 'Leader in Multilingual',
              classes: 'card-no-shadow',
              body: '我们的服务不仅高效，而且价格合理，让您享受到最大的成本效益。',
            },
          ],
        },
      ],
    },
    {
      type: 'showcase-4v1',
      spacer: 'lg',
      text: {
        title: {
          label: '让您的产品引领潮流，我们助您一臂之力',
          style: 'style-v1',
          classes: 'mat-display-1',
        },
        classes: 'text-center',
        body: '<p class="text-center">赋予品牌力量，精准定位市场 —— 专业定制化市场宣传解决方案</p>',
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
            value: 20,
            label: '%',
          },
          title: '营收增长',
        },
        {
          img: {
            src: '/assets/images/svg/Asset189.svg',
          },
          digit: {
            value: 5000,
            label: '+',
          },
          title: '全球企业',
        },
        {
          img: {
            src: '/assets/images/svg/Asset190.svg',
          },
          digit: {
            value: 150,
            label: '项',
          },
          title: '专利技术',
        },
        {
          img: {
            src: '/assets/images/svg/Asset192.svg',
          },
          digit: {
            value: 1000,
            label: '万',
          },
          title: '环保公益事业',
        },
      ],
    },
    {
      spacer: 'md',
      bgClasses: 'bg-fill-width overlay overlay-80',
      overlay: ' ',
      classes: 'text-light',
      id: '',
      bg: {
        img: {
          src: '/assets/images/showcase/6.jpg',
          classes: 'object-contain',
          alt: '6',
          hostClasses: 'bg-center',
        },
        classes: 'bg-fill-width overlay overlay-80',
        overlay: ' ',
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
      type: 'showcase-1v3',
      text: {
        title: {
          label:
            '<p style="display: inline-block; margin-bottom: 0px;">市场领导力</p>',
          style: 'style-v1',
          classes: 'mat-display-1',
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
          body: '作为行业领导者，我们公司凭借卓越的产品质量、创新的技术研发以及优质的客户服务，在市场中稳居主导地位，持续引领行业发展。',
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
      type: 'showcase-1v4',
      spacer: 'lg',
      bg: {
        classes: 'bg- bg-fill-width',
      },
      row: 3,
      classes: '',
      text: {
        title: {
          label: '会员等级与专属服务',
          style: 'style-v1',
          classes: 'mat-display-2 bold',
        },
        classes: 'text-center',
        body: '<p class="text-center">我们为您提供了一系列多样化的会员等级和相应的专属服务，旨在打造个性化的艺术设计体验。无论您是刚起步的爱好者还是专业设计师，我们的会员计划将满足您不同层次和需求。</p>',
      },
      elements: [
        {
          title: {
            label: '免费',
            classes: '',
          },
          type: 'card-1v6',
          prefix: '¥',
          number: '0',
          suffix: '/月',
          body: '<ul class="list-done"><li>获得免费访问平台的权限</li><li>浏览平台上公开的内容和资源</li><li>参与在线社区讨论和互动</li></ul>',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: '立即注册',
              mode: 'raised',
              color: 'primary',
            },
          ],
        },
        {
          title: {
            label: '初级会员',
            classes: 'text-primary',
          },
          type: 'card-1v6',
          prefix: '¥',
          number: '99',
          suffix: '/月',
          classes: 'bg-light',
          body: '<ul class="list-done"><li>所有免费会员功能</li><li>享受高质量、独家的内容和教程</li><li>获得快速响应的客户支持服务</li><li>参与平台举办的活动和专属优惠</li></ul>',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: '立即购买',
              mode: 'raised',
              color: 'primary',
            },
          ],
        },
        {
          title: {
            label: '高级会员',
            classes: '',
          },
          type: 'card-1v6',
          prefix: '¥',
          number: '899',
          suffix: '/月',
          body: '<ul class="list-done"><li>所有初级会员功能</li><li>获取深入的教程和指导</li><li>允许下载平台上的资源和素材</li><li>获得个性化的设计建议和反馈</li></ul>',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: '立即购买',
              mode: 'raised',
              color: 'primary',
            },
          ],
        },
        {
          title: {
            label: '白金会员',
            classes: '',
          },
          type: 'card-1v6',
          prefix: '¥',
          number: '2889',
          suffix: '/月',
          body: '<ul class="list-done"><li>所有高级会员功能</li><li>使用平台提供的高级设计工具和插件</li><li>参与专业会员专属的培训和活动</li><li>与专业设计师一对一的指导</li></ul>',
          actionsAlign: 'start center',
          actions: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: '立即购买',
              mode: 'raised',
              color: 'primary',
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
          classes: 'mat-display-1',
        },
        classes: 'text-center',
        body: '在我们的客户眼中，我们不仅是一家提供服务的公司，更是他们成功路上的坚实支撑和伙伴。让我们为您的品牌增添成功的见证！',
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
            subTitle: 'CEO',
            body: '合作是一次愉快的经历！他们的团队专业且富有创意，为我们的产品制定了一系列精准有效的宣传方案，帮助我们快速扩大了市场份额。',
          },
          {
            type: 'card-1v4',
            img: {
              classes: 'object-fit',
              src: '/assets/images/avatar/02.jpeg',
            },
            star: 5,
            title: '- 王丽',
            subTitle: '市场经理',
            body: '他们不仅提供了优质的服务，还通过数据分析为我们提供了宝贵的反馈，让我们的宣传活动更加精准和有效。',
          },
          {
            type: 'card-1v4',
            img: {
              classes: 'object-fit',
              src: '/assets/images/avatar/03.jpeg',
            },
            star: 5,
            title: '- 李军',
            subTitle: '初创企业创始人',
            body: '团队总是能够超越我们的期望，他们的创意和执行力让我们的产品在市场上脱颖而出，为我们赢得了众多忠实客户。',
          },
        ],
      },
    },
    {
      type: 'text',
      title: {
        label: '立即与我们联系，让您的产品故事闪耀全球！',
        style: 'style-v1',
        classes: 'mat-display-2 bold',
      },
      bg: {
        classes: 'bg- bg-fill-width',
      },
      body: '无论您是刚刚起步还是已经拥有一定市场份额，我们都能为您提供最佳的宣传解决方案。立即与我们联系，让我们一起开启成功之旅！',
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
