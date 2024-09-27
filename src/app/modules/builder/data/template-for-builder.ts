export const templates: any[] = [
  {
    title: '空白页面',
    description: '从一个空白页面开始搭建',
    img: '/assets/images/builder/template/blank.png',
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
              layoutAlign: 'start start',
              elements: [],
            },
          ],
        },
      ],
    },
  },
  {
    title: '关于我们',
    description: '介绍您的业务',
    img: '/assets/images/builder/template/about.png',
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
            },
          },
          title: '关于我们',
          breadcrumb: [],
        },
        {
          spacer: 'md',
          bgClasses: 'bg- bg-fill-width',
          overlay: '',
          classes: 'text-center md:max-w-3/4 mx-auto',
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
          type: 'text',
          title: {
            label:
              '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
            style: 'style-v1',
            classes: 'mat-headline-3 bold',
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
    title: '空白JSON',
    description: '新建一个默认JSON组件，小程序应用',
    img: '/assets/images/builder/template/blank.png',
    page: {
      title: '空白页面',
      current: true,
      time: new Date(),
      body: [
        {
          type: 'json',
          name: 'sample',
        },
      ],
    },
  },
];
