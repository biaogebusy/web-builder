export const home_v6 = {
  title: '首页 v6',
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
            label: '特色服务',
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
              title: '个性化医疗解决方案',
              subTitle: 'High Performance',
              avatar: {
                src: '/assets/images/avatar/01.jpeg',
                alt: '',
              },
              classes: 'card-no-shadow',
              body: '根据不同医疗机构及患者群体的具体需求，我们提供深度定制的综合医疗服务方案。',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/02.jpeg',
                alt: '',
              },
              title: '持续的技术支持与培训',
              subTitle: 'Simplicity for Editors',
              classes: 'card-no-shadow',
              body: '我们不仅提供优质产品，更注重用户使用体验和技术能力提升。通过定期的专业培训课程和全天候在线技术支持，确保合作伙伴能够充分利用我们的智能医疗解决方案，实现技术优势向临床价值的有效转化。',
            },
            {
              type: 'card',
              avatar: {
                src: '/assets/images/avatar/03.jpeg',
                alt: '',
              },
              title: '严格的品质保障体系',
              subTitle: 'Leader in Multilingual',
              classes: 'card-no-shadow',
              body: '产品和服务均遵循国际医疗质量标准，建立严格的质量管理体系，并通过权威机构认证。我们承诺，对每一个细节严谨把控，为每一位用户提供值得信赖的医疗安全保障。',
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
            label: '关于我们',
            style: 'style-v4',
            classes: 'mat-headline-2',
          },
          body: '作为医疗科技行业的翘楚，自成立以来，始终坚持以创新驱动发展，依托强大的科研实力和卓越的专业团队，不断推出涵盖预防、诊断、治疗和康复等全链条环节的医疗科技产品和服务。我们的目标是利用科技力量打破地域、时间限制，让更多人享受到高效便捷且富有温度的医疗服务。',
        },
        {
          type: 'panel',
          elements: [
            {
              title: '智能医疗设备',
              icon: 'person',
              params: {
                expanded: true,
              },
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '我们提供的先进医疗设备，如智能化检测仪器、远程诊疗系统等，以精准、快速、安全的特点，助力医疗机构提升诊疗效率和服务质量。',
                },
              ],
            },
            {
              title: '数字化健康管理',
              icon: 'faviores',
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '依托AI与大数据技术，我们为您提供个性化的健康管理方案，包括疾病风险评估、生活习惯改善建议及在线健康咨询服务，使健康管理更加科学化、精细化。',
                },
              ],
            },
            {
              title: '云端医疗平台',
              icon: 'faviores',
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  body: '构建覆盖线上线下一体化的医疗服务体系，实现医生与患者间的无缝沟通，无论何时何地，都能获得及时、专业的医疗支持。',
                },
              ],
            },
          ],
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
          label: '成功案例',
          style: 'style-v1',
          classes: 'mat-headline-0 bold',
        },
        classes: 'text-center',
        body: '<p class="text-center">已在全球范围内助力众多医疗机构成功实现了数字化转型，其中不乏多个标杆性项目。</p>',
      },
      elements: [
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label: '深度市场洞察与策划',
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
            label: '整合营销传播',
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
            label: '定制化培训体系',
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
            label: '灵活的合作模式',
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
      type: 'carousel-1v2',
      title: {
        label: '近期案例',
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
    {
      type: 'showcase-1v3',
      text: {
        title: {
          label: '社会责任与愿景',
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
            width: '800px',
          },
          body: '作为行业内的领军企业，始终秉承“科技以人为本，创新引领健康”的理念，积极履行社会责任，投身于公益医疗项目和公共卫生能力建设。我们坚信，只有不断探索前沿医疗科技，才能更好地应对未来全球健康挑战，让高品质医疗服务触手可及，普惠全民。',
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
      type: 'text',
      title: {
        label: '合作与承诺',
        style: 'style-v1',
        classes: 'mat-headline-2 bold',
      },
      bg: {
        classes: 'bg- bg-fill-width',
      },
      body: '携手共创医疗科技新纪元。我们诚挚邀请各医疗机构、研究机构以及关心健康的各界朋友展开深度合作，共同书写智慧医疗的新篇章。让我们一起，用科技的力量照亮健康之路！',
      classes: 'text-center',
      actionsAlign: 'center center',
      actions: [
        {
          type: 'btn-generater',
          label: '立即预约',
          color: 'primary',
          mode: 'raised',
        },
      ],
    },
  ],
};
