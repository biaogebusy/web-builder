export const home_v1 = {
  title: '信使 UI 低代码开源前端框架  | XINSHI信使',
  meta: [
    {
      name: 'description',
      content:
        '信使 UI 是基于 Material 的 Angular 低代码前端框架,丰富的组件库可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的Web 页面。',
    },
    {
      name: 'keywords',
      content: '信使UI,低代码,Drupal',
    },
  ],
  body: [
    {
      type: 'showcase-3v9',
      bg: {
        classes: 'bg-fill-width',
        img: {
          classes: 'object-fit',
          src: '/assets/images/bg/bg-01.png',
        },
      },
      spacer: 'lg',
      order: {
        left: 1,
        right: 0,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/13.png',
          classes: 'mover',
          hostClasses: 'position-relative img-bg-shape',
          actions: [
            {
              type: 'btn-video',
              color: 'default',
              dialog: {
                width: '900',
                height: '800',
              },
              video: {
                type: 'player',
                options: {
                  controls: true,
                  aspectRatio: '16:9',
                  poster: '/assets/storybook/assets/builder.png',
                  sources: [
                    {
                      src: '/assets/video/layout-builder-hero-demo.mp4',
                      'type:': 'video/mp4',
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
            label:
              '欢迎使用 <strong class="text-primary"></strong> <br>快速构建页面',
            style: 'style-v4',
            classes: 'mat-display-3 bold',
            typed: {
              enable: true,
              strings: [{ label: '信使 UI' }, { label: 'Web builder' }],
              config: {
                typeSpeed: 120,
                loop: true,
              },
            },
          },
          body: '从左侧选择组件拖动到想要的位置：<ul class="list-done"><li>可视化编辑组件图文数据，所见即所得；</li><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li></ul><p>欢迎入群一起探索更多的可能性和数字创新体验，QQ 交流群：<span class="text-primary">1176468251</span></p><p style="display:flex"><video  muted  autoplay loop width="120px" src="/assets/video/drag-drop.mp4"></video></p>',
          actions: [
            {
              type: 'btn',
              color: 'primary',
              mode: 'raised',
              href: '/builder',
              label: '立即体验',
            },
            {
              type: 'btn',
              color: 'primary',
              mode: 'stroked',
              label: ' 关注作者',
              href: 'https://www.zhihu.com/people/biaogebusy',
              target: '_blank',
              icon: {
                inline: true,
                svg: 'zhihu',
              },
            },
            {
              type: 'github-star',
            },
          ],
        },
      ],
    },
    {
      type: 'showcase-3v2',
      classes: '',
      bg: {
        classes: 'bg-fill-width',
        img: {
          hostClasses: '',
          src: '/assets/images/bg/home-shape.png',
          mobile: '/assets/images/bg/home-shape.png',
        },
      },
      elements: [
        {
          img: {
            src: '/assets/images/svg/vscode.svg',
            alt: '',
          },
          content: {
            type: 'text',
            spacer: 'sm',
            title: {
              label: '开源框架',
              style: 'style-v4',
              classes: 'mat-display-2',
            },
            body: '信使UI是一款开源的前端框架，基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。',
            actions: [
              {
                type: 'btn',
                color: 'primary',
                mode: 'raised',
                label: ' Github',
                href: 'https://github.com/biaogebusy/xinshi-ui',
                target: '_blank',
                icon: {
                  inline: true,
                  svg: 'github',
                },
              },
            ],
          },
        },
        {
          img: {
            src: '/assets/images/svg/storybook-mock-ui.svg',
            alt: '',
          },
          content: {
            type: 'text',
            spacer: 'sm',
            title: {
              label: '组件展示和测试',
              style: 'style-v4',
              classes: 'mat-display-2',
            },
            body: '<strong class="text-primary">Storybook</strong> 提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
            actions: [
              {
                type: 'btn',
                color: 'primary',
                mode: 'raised',
                href: '/builder',
                label: '马上体验',
              },
            ],
          },
        },
        {
          img: {
            src: '/assets/images/svg/monday-com.webp',
            alt: '',
          },
          content: {
            type: 'text',
            spacer: 'sm',
            title: {
              label: '文档化',
              style: 'style-v4',
              classes: 'mat-display-2',
            },
            body: '<strong class="text-primary">Storybook</strong> 不仅可以展示和测试组件，还可以自动生成组件的文档。<ul class="list-done">\r\n\t<li>使用Markdown或其他文档格式编写组件文档，并将其与组件关联</li>\r\n\t<li>团队成员可以更好地理解和使用组件，减少了沟通成本</li></ul>\r\n',
            actions: [
              {
                type: 'btn',
                color: 'primary',
                mode: 'raised',
                href: '/builder',
                label: '马上体验',
              },
            ],
          },
        },
      ],
    },
    {
      type: 'showcase-1v1',
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      title: {
        label: '使用人员',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      row: '4',
      elements: [
        {
          img: {
            src: '/assets/images/svg/Asset187.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '前端开发',
          },
          content: '在Storybook中开发测试维护组件',
        },
        {
          img: {
            src: '/assets/images/svg/Asset189.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '产品经理',
          },
          content: '快速构建和预览页面',
        },
        {
          img: {
            src: '/assets/images/svg/Asset190.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '运维人员',
          },
          content: '构建页面和测试UI',
        },
        {
          img: {
            src: '/assets/images/svg/Asset192.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '市场营销人员',
          },
          content: '给客户演示数字创新能力',
        },
      ],
    },
    {
      type: 'text',
      spacer: 'md',
      body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
      title: {
        label:
          '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
        style: 'style-v1',
        classes: 'mat-display-2 bold',
      },
      bg: {
        classes: 'bg- bg-fill-width',
      },
      classes: 'text-center',
      actionsAlign: 'center center',
      actions: [
        {
          type: 'btn',
          mode: 'raised',
          color: 'primary',
          href: '/builder',
          label: '开始体验',
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
