export const base = [
  {
    label: 'AI 生成',
    id: 'ai',
    elements: [
      {
        label: '图文 v1',
        content: {
          fullWidth: false,
          spacer: 'md',
          bgClasses: 'bg- ',
          overlay: '',
          containerClasses: '',
          id: '',
          bg: { img: { src: '', alt: '' }, classes: 'bg- ', overlay: '' },
          animate: {
            aos: {
              enable: false,
              animation: 'fade-up',
              behaviour: { offset: 120, duration: 400, delay: 0, easing: 'ease' },
            },
            gsap: { enable: false },
          },
          type: 'custom-template',
          html: '<section class="py-8 bg-white">\n  <div class="flex flex-col md:flex-row gap-8">\n    <!-- 左边卡片 -->\n    <div class="md:w-1/2 relative rounded-lg shadow-md overflow-hidden group">\n      <img src="/assets/images/showcase/8.jpg" \n           class="w-full h-full object-cover"\n           alt="Campus life">\n      <div class="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>\n      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">\n        <h2 class="text-2xl font-bold mb-2">探索校园生活</h2>\n        <p class="text-slate-200 line-clamp-3 mb-4">在这里发现丰富多彩的校园活动、学生社团和难忘的大学时光，记录属于你的青春故事。</p>\n        <a href="#" class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300">\n          阅读更多\n          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>\n          </svg>\n        </a>\n      </div>\n    </div>\n\n    <!-- 右侧双卡片 -->\n    <div class="md:w-1/2 flex flex-row gap-6">\n      <div class="w-1/2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">\n        <div class="relative aspect-[4/3]">\n          <img src="/assets/images/showcase/7.jpg"\n               class="absolute top-0 left-0 w-full h-full object-cover"\n               alt="Event">\n        </div>\n        <div class="p-6">\n          <h3 class="text-lg font-bold text-gray-800 mb-2">校园活动日历</h3>\n          <p class="text-gray-600 line-clamp-3 mb-4">实时更新各类学术讲座、文艺演出、体育赛事等校园活动信息，助你合理安排时间参与精彩活动。</p>\n          <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors duration-300">查看详情 →</a>\n        </div>\n      </div>\n\n      <div class="w-1/2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">\n        <div class="relative aspect-[4/3]">\n          <img src="/assets/images/showcase/6.jpg"\n               class="absolute top-0 left-0 w-full h-full object-cover"\n               alt="Club">\n        </div>\n        <div class="p-6">\n          <h3 class="text-lg font-bold text-gray-800 mb-2">社团招新季</h3>\n          <p class="text-gray-600 line-clamp-3 mb-4">超过50个学生社团火热招新中，涵盖学术科技、文化艺术、体育竞技等各个领域，总有一个适合你！</p>\n          <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors duration-300">立即加入 →</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>',
          json: [],
          isAPI: false,
        },
      },
      {
        label: '图文 v2',
        content: {
          fullWidth: false,
          spacer: 'md',
          bgClasses: 'bg-gray-200 ',
          overlay: '',
          containerClasses: '',
          id: '',
          bg: { img: { src: '', alt: '' }, classes: 'bg-gray-200 ', overlay: '' },
          animate: {
            aos: {
              enable: false,
              animation: 'fade-up',
              behaviour: { offset: 120, duration: 400, delay: 0, easing: 'ease' },
            },
            gsap: { enable: false },
          },
          type: 'custom-template',
          html: '<section class="py-8">\n  <div class="flex flex-col md:flex-row gap-8">\n    <!-- 左边卡片 -->\n\n    <div class="md:w-1/2 flex flex-row gap-6">\n      <div class="w-1/2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white">\n        <div class="relative aspect-[4/3]">\n          <img src="/assets/images/showcase/5.jpg"\n               class="absolute top-0 left-0 w-full h-full object-cover"\n               alt="Event">\n        </div>\n        <div class="p-6">\n          <h3 class="text-lg font-bold text-gray-800 mb-2">校园活动日历</h3>\n          <p class="text-gray-600 line-clamp-3 mb-4">实时更新各类学术讲座、文艺演出、体育赛事等校园活动信息，助你合理安排时间参与精彩活动。</p>\n          <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors duration-300">查看详情 →</a>\n        </div>\n      </div>\n\n      <div class="w-1/2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white">\n        <div class="relative aspect-[4/3]">\n          <img src="/assets/images/showcase/4.jpg"\n               class="absolute top-0 left-0 w-full h-full object-cover"\n               alt="Club">\n        </div>\n        <div class="p-6">\n          <h3 class="text-lg font-bold text-gray-800 mb-2">社团招新季</h3>\n          <p class="text-gray-600 line-clamp-3 mb-4">超过50个学生社团火热招新中，涵盖学术科技、文化艺术、体育竞技等各个领域，总有一个适合你！</p>\n          <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors duration-300">立即加入 →</a>\n        </div>\n      </div>\n    </div>\n\n    <!-- 右侧双卡片 -->\n    <div class="md:w-1/2 relative rounded-lg shadow-md overflow-hidden group">\n      <img src="/assets/images/showcase/3.jpg"\n           class="w-full h-full object-cover"\n           alt="Campus life">\n      <div\n        class="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent">\n      </div>\n      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">\n        <h2 class="text-2xl font-bold mb-2">探索校园生活</h2>\n        <p class="text-slate-200 line-clamp-3 mb-4">在这里发现丰富多彩的校园活动、学生社团和难忘的大学时光，记录属于你的青春故事。</p>\n        <a href="#" class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300">\n          阅读更多\n          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />\n          </svg>\n        </a>\n      </div>\n    </div>\n  </div>\n</section>',
          json: [],
          isAPI: false,
        },
      },
      {
        label: '卡片 v1',
        content: {
          fullWidth: false,
          spacer: 'xl',
          bgClasses: 'bg-gray-100 ',
          overlay: ' ',
          containerClasses: '',
          id: '',
          bg: {
            img: {
              src: '',
              alt: 'bg-02',
              classes: 'bg-contain',
            },
            classes: 'bg-gray-100 ',
            overlay: ' ',
          },
          animate: { aos: { enable: false } },
          type: 'custom-template',
          html: '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">\n  <div class="max-w-xs rounded overflow-hidden shadow-lg bg-blue-50">\n    <div class="aspect-[4/3] overflow-hidden">\n      <img class="w-full object-cover h-full" src="/assets/images/hero/bg05.jpg" alt="风景封面图">\n    </div>\n    <div class="px-6 py-4">\n      <div class="font-bold text-xl mb-2 truncate">Web Builder</div>\n      <p class="text-gray-700 text-base line-clamp-3">\n        Web Builder是一个强大的工具，用于快速构建和部署现代化的Web应用程序。它提供了丰富的组件和模板，使得开发过程更加高效和便捷。\n      </p>\n    </div>\n    <div class="px-6 pt-4 pb-2">\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">用途：Web开发</span>\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">角色：前端开发</span>\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">类型：工具</span>\n    </div>\n  </div>\n  <div class="max-w-xs rounded overflow-hidden shadow-lg bg-blue-50">\n    <div class="aspect-[4/3] overflow-hidden">\n      <img class="w-full object-cover h-full" src="/assets/images/hero/bg03.jpg" alt="Angular封面图">\n    </div>\n    <div class="px-6 py-4">\n      <div class="font-bold text-xl mb-2 truncate">Angular</div>\n      <p class="text-gray-700 text-base line-clamp-3">\n        Angular是一个由Google维护的开源前端框架，用于构建高效、复杂的单页面应用程序。Angular是一个由Google维护的开源前端框架，用于构建高效、复杂的单页面应用程序。\n      </p>\n    </div>\n    <div class="px-6 pt-4 pb-2">\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">用途：前端开发</span>\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">角色：开发者</span>\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">类型：框架</span>\n    </div>\n  </div>\n  <div class="max-w-xs rounded overflow-hidden shadow-lg bg-blue-50">\n    <div class="aspect-[4/3] overflow-hidden">\n      <img class="w-full object-cover h-full" src="/assets/images/hero/bg02.jpg" alt="React封面图">\n    </div>\n    <div class="px-6 py-4">\n      <div class="font-bold text-xl mb-2 truncate">React</div>\n      <p class="text-gray-700 text-base line-clamp-3">\n        React是一个由Facebook开发的用于构建用户界面的JavaScript库，特别适合构建大型应用程序。React是一个由Facebook开发的用于构建用户界面的JavaScript库，特别适合构建大型应用程序。\n      </p>\n    </div>\n    <div class="px-6 pt-4 pb-2">\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">用途：前端开发</span>\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">角色：开发者</span>\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">类型：库</span>\n    </div>\n  </div>\n  <div class="max-w-xs rounded overflow-hidden shadow-lg bg-blue-50">\n    <div class="aspect-[4/3] overflow-hidden">\n      <img class="w-full object-cover h-full" src="/assets/images/hero/bg01.jpg" alt="Vue封面图">\n    </div>\n    <div class="px-6 py-4">\n      <div class="font-bold text-xl mb-2 truncate">Vue</div>\n      <p class="text-gray-700 text-base line-clamp-3">\n        Vue是一个渐进式JavaScript框架，用于构建用户界面，易于上手且灵活。Vue是一个渐进式JavaScript框架，用于构建用户界面，易于上手且灵活。\n      </p>\n    </div>\n    <div class="px-6 pt-4 pb-2">\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">用途：前端开发</span>\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">角色：开发者</span>\n      <span class="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">类型：框架</span>\n    </div>\n  </div>\n</div>',
          json: [],
          isAPI: false,
        },
      },
    ],
  },
  {
    label: '动态构建',
    id: 'layout',
    elements: [
      {
        label: '默认',
        icon: {
          svg: 'view-week-outline',
        },
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/home-shape.png',
              alt: 'home-shape.png',
              classes: 'object-fit',
            },
            classes: '',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',
          wrapperClass: '',
          alignItems: 'center',
          type: 'layout-builder',
          elements: [
            {
              row: { xs: 12, sm: 6, md: 6, lg: 7 },
              vertical: 'start',
              gap: { xs: '2', sm: '2', md: '2', lg: '2' },
              bg: {
                img: { src: '', alt: '', classes: 'object-fit' },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              horizontal: 'start',
              style: { borderRadius: 'none', padding: '', margin: '' },
              elements: [
                {
                  type: 'title',
                  label:
                    '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
                  style: 'style-v4',
                  classes: 'mat-headline-3 bold',
                },
                {
                  type: 'text',
                  spacer: 'none',
                  body: '信使UI，一款基于Material设计的Angular前端框架，提供了超过五十种丰富组件，旨在为用户带来卓越的数字创新体验。通过我们的Web Builder，您可以轻松拖拽，快速构建出响应式且支持多主题的Web页面。此外，信使UI现已集成DeepSeek AI功能，旨在通过AI技术进一步提升开发效率和用户体验。',
                  bg: { classes: 'bg- ' },
                  classes: '',
                },
                {
                  type: 'card-1v4',
                  img: { classes: 'object-fit', src: '/assets/images/avatar/01.jpeg' },
                  star: 5,
                  title: '- Johnson',
                  subTitle: '前端开发',
                  body: '信使是一个高度灵活且可扩展的前端Angular框架，其动态组件特性显著提升了组件间的灵活性，尽管这可能会引入更复杂的依赖循环问题。',
                },
                {
                  type: 'btn',
                  href: '/node/1',
                  target: '_blank',
                  label: '了解更多',
                  mode: 'raised',
                  color: 'primary',
                },
              ],
            },
            {
              row: { xs: 12, sm: 6, md: 6, lg: 5 },
              gap: { xs: 0, sm: 0, md: 0, lg: 0 },
              bg: {
                img: { src: '', alt: '', classes: 'object-fit' },
                overlay: '',
                classes: '',
              },
              classes: '',
              style: { borderRadius: 'none' },
              horizontal: 'center',
              vertical: 'center',
              elements: [
                {
                  classes: '',
                  alt: 'alt',
                  hostClasses: 'text-center',
                  type: 'img',
                  src: 'https://builder.design/assets/images/illustration/11.png',
                  style: {
                    opacity: '',
                    borderRadius: '',
                    boxShadow: '',
                    aspectRatio: '',
                    objectFit: 'contain',
                  },
                  width: 500,
                  height: 600,
                },
              ],
            },
          ],
        },
      },
      {
        label: '两栏',
        icon: {
          svg: 'image-text',
        },
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: 'text-center',
          id: '',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            classes: '',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'stretch',
          gap: {
            xs: '5',
          },
          wrapperClass: 'sm:flex-nowrap',
          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 6,
                md: 6,
                lg: 6,
              },
              horizontal: 'center',
              vertical: 'center',
              gap: {
                xs: '10',
                sm: '10',
                md: '10',
                lg: '10',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: 'bg- ',
              },
              classes: '',
              blockClasses: 'bg-shadow ',
              style: {
                borderRadius: 'none',
                margin: '',
              },
              elements: [
                {
                  style: 'none',
                  classes: 'mat-headline-3 bold',
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
                  label: '自由搭配，玩出新意',
                },
                {
                  type: 'link',
                  label: '链接搭配你的风格',
                  classes: '',
                  href: '/',
                },
                {
                  src: 'https://builder.design/assets/images/products/huawei-watch-gt4-select-strap.webp',
                  classes: '',
                  alt: 'alt',
                  style: {
                    opacity: '1',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    aspectRatio: '1 / 1',
                    objectFit: 'contain',
                  },
                  hostClasses: 'text-center',
                  type: 'img',
                  width: 350,
                  height: 300,
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 6,
                md: 6,
                lg: 6,
              },
              horizontal: 'center',
              vertical: 'center',
              gap: {
                xs: '10',
                sm: '10',
                md: '10',
                lg: '10',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: 'bg- ',
              },
              classes: '',
              blockClasses: 'bg-shadow',
              style: {
                borderRadius: 'none',
                margin: '',
              },
              elements: [
                {
                  style: 'none',
                  classes: 'mat-headline-3 bold',
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
                  label: '款款亮眼，爱不释手',
                },
                {
                  type: 'link',
                  label: '探索更多',
                  classes: '',
                  href: '/',
                },
                {
                  src: 'https://builder.design/assets/images/products/huawei-watch-gt4-Huawei-wearables.webp',
                  classes: '',
                  alt: 'alt',
                  style: {
                    opacity: '1',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    aspectRatio: '1 / 1',
                    objectFit: 'contain',
                  },
                  hostClasses: 'text-center',
                  type: 'img',
                  width: 350,
                  height: 300,
                },
              ],
            },
          ],
        },
      },
      {
        label: '三栏',
        icon: {
          svg: 'view-week-outline',
        },
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/home-shape.png',
              classes: 'object-fit',
              alt: 'home-shape.png',
            },
            classes: 'bg-shadow ',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',
          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 4,
                md: 4,
                lg: 4,
              },
              horizontal: 'center',
              vertical: 'stretch',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
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
                    label: '高性能',
                  },
                  content: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 4,
                md: 4,
                lg: 4,
              },
              horizontal: 'center',
              vertical: 'stretch',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              elements: [
                {
                  type: 'box',
                  img: {
                    src: '/assets/images/svg/Asset189.svg',
                    alt: 'browser',
                  },
                  style: 'style-v3 use-image primary',
                  title: {
                    href: '#',
                    label: '易用的编辑器',
                  },
                  content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 4,
                md: 4,
                lg: 4,
              },
              horizontal: 'center',
              vertical: 'center',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              elements: [
                {
                  type: 'box',
                  img: {
                    src: '/assets/images/svg/Asset190.svg',
                    alt: 'browser',
                  },
                  style: 'style-v3 use-image',
                  title: {
                    href: '#',
                    label: '多语言',
                  },
                  content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
                },
              ],
            },
          ],
        },
      },
      {
        label: '四栏',
        icon: {
          svg: 'land-rows-vertical',
        },
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/home-shape.png',
              alt: 'home-shape.png',
              classes: 'object-fit',
            },
            classes: 'bg-shadow ',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',
          wrapperClass: '',
          gap: {
            xs: 5,
          },
          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 6,
                md: 3,
                lg: 3,
              },
              horizontal: 'end',
              vertical: 'end',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              alignItems: 'end',
              style: {
                borderRadius: 'none',
                padding: '',
                margin: '',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },

              elements: [
                {
                  spacer: 'none',
                  body: '<p style="display: inline-block; margin-bottom: 0px;">把想法转化给设计稿，根据设计稿通过拖拽出响应式页面，大大降低开发成本，将注意力放在您的业务。</p>',

                  type: 'text',
                },
                {
                  src: 'https://www2.bettyblocks.com/hubfs/RH-images/striped-arrow.svg',
                  classes: '',
                  hostClasses: 'text-center',
                  alt: 'alt',
                  style: {
                    aspectRatio: 'auto',
                    objectFit: 'initial',
                    opacity: '',
                    borderRadius: '',
                    boxShadow: '',
                  },

                  type: 'img',
                  width: 200,
                  height: 100,
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 6,
                md: 3,
                lg: 3,
              },
              horizontal: 'center',
              vertical: 'stretch',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
                padding: '20px',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },

              elements: [
                {
                  type: 'card-1v1',
                  link: {
                    href: '/node/463',
                    label: '信使 UI 应用初始化及页面渲染流程',
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
                      style: {
                        width: 'auto',
                        height: 'auto',
                        opacity: '1',
                        borderRadius: 0,
                        boxShadow: 'none',
                        aspectRatio: 'auto',
                        objectFit: 'initial',
                      },
                    },
                  },
                  moreLabel: '查看更多',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 6,
                md: 3,
                lg: 3,
              },
              horizontal: 'center',
              vertical: 'stretch',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },

              elements: [
                {
                  type: 'card-1v1',
                  link: {
                    href: '/node/462',
                    label: '信使Web builder 新增自定义组件流程',
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
                      src: '/assets/images/hero/bg02.jpg',
                      alt: 'alt',
                      style: {
                        width: 'auto',
                        height: 'auto',
                        opacity: '1',
                        borderRadius: 0,
                        boxShadow: 'none',
                        aspectRatio: 'auto',
                        objectFit: 'initial',
                      },
                    },
                  },
                  moreLabel: '查看更多',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 6,
                md: 3,
                lg: 3,
              },
              horizontal: 'center',
              vertical: 'stretch',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },

              elements: [
                {
                  type: 'card-1v1',
                  link: {
                    href: '/node/450',
                    label: '作为前端开发，你应该知道的这十几个在线免费工具',
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
                      src: '/assets/images/hero/bg05.jpg',
                      alt: 'alt',
                      style: {
                        width: 'auto',
                        height: 'auto',
                        opacity: '1',
                        borderRadius: 0,
                        boxShadow: 'none',
                        aspectRatio: 'auto',
                        objectFit: 'initial',
                      },
                    },
                  },
                  moreLabel: '查看更多',
                },
              ],
            },
          ],
        },
      },
      {
        label: '空白',
        icon: {
          svg: 'border-none-variant',
        },
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            classes: '',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',

          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              horizontal: 'start',
              vertical: 'stretch',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              style: {
                borderRadius: 'none',
              },

              layoutAlign: 'start start',
              elements: [],
            },
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              horizontal: 'start',
              vertical: 'stretch',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              style: {
                borderRadius: 'none',
              },

              layoutAlign: 'start start',
              elements: [],
            },
          ],
        },
      },
    ],
  },
  {
    label: 'Tailwind 组件',
    id: 'tailwind',
    elements: [
      {
        label: '静态数据',
        icon: {
          svg: 'code-json',
        },
        content: {
          type: 'custom-template',
          json: {
            title: 'web builder',
            subTitle: '是一款通过拖拽组件构建页面的低代码',
            img: '/assets/images/avatar/05.jpeg',
            content:
              '信使UI是一款开源的前端框架，基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。',
          },
          html: '<div class="text-center md:text-left md:flex bg-shadow rounded-xl p-8 md:p-0 m-5 mx-auto overflow-hidden">\n          <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full" src="/assets/images/avatar/05.jpeg" alt="" width="384" height="512">\n          <div class="pt-6 md:p-8 text-center md:text-left space-y-4">\n             <p class="text-lg font-medium">\n                “信使UI是一款开源的前端框架，基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。”\n              </p>\n            <div class="font-medium">\n              <div class="text-xl mb-2">web builder</div>\n              <div class="opacity-75 text-sm">是一款通过拖拽组件构建页面的低代码</div>\n            </div>\n          </div>\n        </div>',
        },
      },
      {
        label: 'API 来源',
        icon: {
          svg: 'api',
        },
        content: {
          type: 'custom-template',
          isAPI: true,
          api: '/api/v1/content',
          html: '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">\n    {{#rows}}\n    <article\n        class="bg-white hover:bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative">\n        <div class="w-full h-48 sm:h-56 relative overflow-hidden">\n            <a href="{{url}}" class="block hover:brightness-95 transition-all duration-200">\n                {{#img}}\n                <img\n          src="{{img}}"\n          alt="{{title}}"\n          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"\n        />\n        {{/img}}\n        {{^img}}\n                <img\n          src="/assets/images/hero/182.jpg"\n          alt="{{title}}"\n          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"\n        />\n        {{/img}}\n            </a>\n        </div>\n\n        <div class="p-6 flex flex-col justify-between">\n            <div class="flex items-center gap-4 mb-3">\n                <img\n                                src="{{picture}}"\n                                alt="{{user}}"\n                                class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm">\n                <div>\n                    <span class="text-base font-medium text-gray-800 block">{{user}}</span>\n                    <time class="text-sm text-gray-500 block">{{created}}</time>\n                </div>\n            </div>\n            <h3 class="mb-3 relative z-10">\n                <a href="{{url}}"\n                    class="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2">\n                    {{title}}\n                </a>\n            </h3>\n\n            <!-- 内容区域背景过渡 -->\n            <div class="relative z-10">\n                <p class="text-gray-600 line-clamp-3 mb-4">\n                    {{body}}\n                </p>\n                <a href="{{url}}"\n                    class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors duration-200">\n                    阅读全文\n                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />\n                    </svg>\n                </a>\n            </div>\n        </div>\n    </article>\n    {{/rows}}\n\n</div>',
          json: null,
        },
      },
    ],
  },
  {
    label: '常用 Section',
    id: 'section',
    elements: [
      {
        label: '1A',
        content: {
          fullWidth: false,
          spacer: 'xl',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/bg-02.png',
              classes: 'object-fit',
              alt: 'bg-02',
            },
            classes: 'bg-shadow ',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',

          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              horizontal: 'start',
              vertical: 'start',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
              },

              elements: [
                {
                  style: 'style-v4',
                  classes: 'mat-headline-3 bold',
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
                  label:
                    '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
                },
                {
                  type: 'text',
                  spacer: 'none',
                  body: '信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。',
                },
                {
                  type: 'btn',
                  href: '/node/1',
                  target: '_blank',
                  label: '了解更多',
                  mode: 'raised',
                  color: 'primary',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              horizontal: 'center',
              vertical: 'center',
              style: {
                borderRadius: 'none',
              },

              elements: [
                {
                  type: 'spacer',
                  size: 'sm',
                },
                {
                  type: 'img',
                  hostClasses: 'text-center',
                  classes: '',
                  src: 'https://builder.design/assets/images/illustration/08.png',
                  alt: 'alt',
                  style: {
                    opacity: '1',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    aspectRatio: '2 / 1',
                    objectFit: 'contain',
                  },
                  width: 600,
                  height: 300,
                },
                {
                  type: 'spacer',
                  size: 'sm',
                },
              ],
            },
          ],
        },
      },
      {
        label: '1B',
        content: {
          fullWidth: false,
          spacer: 'xl',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/home-shape.png',
              classes: 'object-fit',
              alt: 'home-shape',
            },
            classes: 'bg-shadow ',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',
          wrapperClass: 'md:flex-nowrap',
          gap: {
            xs: '5',
          },

          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              horizontal: 'center',
              vertical: 'center',
              style: {
                borderRadius: 'none',
              },

              elements: [
                {
                  type: 'spacer',
                  size: 'sm',
                },
                {
                  type: 'img',
                  hostClasses: 'text-center',
                  classes: '',
                  src: 'https://builder.design/assets/images/illustration/08.png',
                  alt: 'alt',
                  style: {
                    opacity: '1',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    aspectRatio: '2 / 1',
                    objectFit: 'contain',
                  },
                  width: 600,
                  height: 300,
                },
                {
                  type: 'spacer',
                  size: 'sm',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              horizontal: 'start',
              vertical: 'start',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
              },

              elements: [
                {
                  style: 'style-v4',
                  classes: 'mat-headline-3 bold',
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
                  label:
                    '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
                },
                {
                  type: 'text',
                  spacer: 'none',
                  body: '信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。',
                },
                {
                  type: 'btn',
                  href: '/node/1',
                  target: '_blank',
                  label: '了解更多',
                  mode: 'raised',
                  color: 'primary',
                },
              ],
            },
          ],
        },
      },
      {
        label: '2A',
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/bg-01.png',
              classes: 'object-fit',
              alt: 'bg-01.png',
            },
            classes: '',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',
          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
              },
              horizontal: 'center',
              vertical: 'center',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },

              elements: [
                {
                  type: 'img',
                  hostClasses: 'text-center',
                  classes: '',
                  src: 'https://builder.design/assets/images/illustration/08.png',
                  alt: 'alt',
                  style: {
                    opacity: '1',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    aspectRatio: '4 / 3',
                    objectFit: 'contain',
                  },
                  width: 600,
                  height: 400,
                },
                {
                  style: 'style-v1',
                  classes: 'mat-headline-3 bold',
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
                  label:
                    '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
              },
              horizontal: 'center',
              vertical: 'center',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
              },

              elements: [
                {
                  spacer: 'none',
                  classes: 'md:max-w-3/4 mx-auto',
                  body: '<p class="ql-align-center">信使UI是基于 Material 的 Angular 前端框架， 丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。</p>',

                  type: 'text',
                },
                {
                  type: 'btn',
                  href: '/node/1',
                  target: '_blank',
                  label: '了解更多',
                  mode: 'raised',
                  color: 'primary',
                },
              ],
            },
          ],
        },
      },
      {
        label: '2B',
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/bg-01.png',
              classes: 'object-fit',
              alt: 'bg-01.png',
            },
            classes: '',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',

          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
              },
              bg: {
                img: {
                  src: '',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              horizontal: 'center',
              vertical: 'center',
              elements: [
                {
                  type: 'title',
                  label:
                    '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
                  style: 'style-v1',
                  classes: 'mat-headline-3 bold',
                },
                {
                  type: 'text',
                  spacer: 'none',
                  classes: 'md:max-w-3/4 mx-auto',
                  body: '<p class="ql-align-center">信使UI是基于 Material 的 Angular 前端框架， 丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。</p>',
                },
                {
                  type: 'btn',
                  href: '/node/1',
                  target: '_blank',
                  label: '了解更多',
                  mode: 'raised',
                  color: 'primary',
                },
                {
                  src: 'https://builder.design/assets/images/builder/builder-01.png',
                  classes: '',
                  hostClasses: 'text-center',
                  alt: 'alt',
                  style: {
                    aspectRatio: 'auto',
                    objectFit: 'contain',
                    opacity: '0.9',
                    borderRadius: '14px',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px',
                  },

                  type: 'img',
                  width: 800,
                  height: 600,
                },
              ],
            },
          ],
        },
      },
      {
        label: '3A',
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            classes: 'bg-shadow ',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',
          gap: {
            xs: 0,
            sm: 4,
          },

          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              horizontal: 'start',
              vertical: 'stretch',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: 'mb-5',
              blockClasses: '',
              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },

              elements: [
                {
                  type: 'title',
                  label:
                    '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
                  style: 'style-v4',
                  classes: 'mat-headline-3 bold',
                },
                {
                  type: 'text',
                  spacer: 'none',
                  body: '信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。',
                },
                {
                  type: 'btn',
                  href: '/node/1',
                  target: '_blank',
                  label: '了解更多',
                  mode: 'raised',
                  color: 'primary',
                },
              ],
            },
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 6,
              },
              horizontal: 'start',
              vertical: 'start',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: 'overflow-hidden',
              blockClasses: '',

              style: {
                borderRadius: 'none',
              },
              elements: [
                {
                  params: {
                    direction: 'horizontal',
                    breakpoints: {
                      '600': {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                      '960': {
                        slidesPerView: 3,
                        spaceBetween: '20',
                      },
                    },
                    effect: 'slide',
                    speed: 300,
                    pagination: {
                      paginationEnable: false,
                    },
                    navigation: false,
                    centeredSlides: false,
                    loop: false,
                    autoplay: false,
                    mousewheel: false,
                  },

                  type: 'swiper',
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
              ],
            },
          ],
        },
      },
      {
        label: '3B',
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/home-shape.png',
              classes: 'object-fit',
              alt: 'home-shape.png',
            },
            classes: 'bg-shadow ',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',
          gap: {
            xs: 0,
          },

          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 6,
                md: 3,
                lg: 3,
              },
              horizontal: 'center',
              vertical: 'stretch',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: 'mb-5',
              blockClasses: '',

              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
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
              ],
            },
            {
              row: {
                xs: 12,
                sm: 6,
                md: 3,
                lg: 3,
              },
              horizontal: 'center',
              vertical: 'stretch',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: 'mb-5',
              blockClasses: '',

              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              elements: [
                {
                  title: {
                    label: '初级会员',
                    classes: 'text-primary',
                  },
                  type: 'card-1v6',
                  prefix: '¥',
                  number: '99',
                  suffix: '/月',
                  classes: '!bg-white',
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
              ],
            },
            {
              row: {
                xs: 12,
                sm: 6,
                md: 3,
                lg: 3,
              },
              horizontal: 'center',
              vertical: 'stretch',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: 'mb-5',
              blockClasses: '',

              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              elements: [
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
              ],
            },
            {
              row: {
                xs: 12,
                sm: 6,
                md: 3,
                lg: 3,
              },
              horizontal: 'center',
              vertical: 'stretch',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: 'mb-5',
              blockClasses: '',

              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              elements: [
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
          ],
        },
      },
      {
        label: '4A',
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/bg-02.png',
              alt: 'bg-02',
              classes: 'object-fit',
            },
            classes: 'bg- ',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',
          gap: {
            xs: '5',
          },
          wrapperClass: '',
          alignItems: 'center',

          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 12,
                md: 7,
                lg: 7,
              },
              horizontal: 'start',
              vertical: 'start',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',

              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              elements: [
                {
                  horizontal: 'center',
                  vertical: 'center',
                  gap: {
                    xs: '4',
                    sm: '4',
                    md: '5',
                    lg: '5',
                  },
                  wrapperClass: '',
                  spacer: 'md',
                  row: {
                    xs: 12,
                    sm: 12,
                    md: 12,
                    lg: 12,
                  },
                  bg: {
                    img: {
                      src: '',
                      alt: '',
                      classes: 'object-fit',
                    },
                    overlay: '',
                    classes: '',
                  },
                  classes: '',
                  blockClasses: '',

                  style: {
                    borderRadius: 'none',
                    paddingTop: '0px',
                    paddingRight: '0px',
                    paddingBottom: '0px',
                    paddingLeft: '0px',
                    marginTop: '0px',
                    marginRight: '0px',
                    marginBottom: '0px',
                    marginLeft: '0px',
                  },
                  type: 'layout-builder',
                  fullWidth: false,
                  elements: [
                    {
                      row: {
                        xs: 12,
                        sm: 6,
                        md: 6,
                        lg: 6,
                      },
                      horizontal: 'start',
                      vertical: 'stretch',
                      gap: {
                        xs: 4,
                        sm: 0,
                        md: 0,
                        lg: 0,
                      },
                      bg: {
                        img: {
                          src: '',
                          alt: '',
                          classes: 'object-fit',
                        },
                        overlay: '',
                        classes: '',
                      },
                      classes: '',
                      blockClasses: '',

                      style: {
                        borderRadius: 'none',
                        paddingTop: '0px',
                        paddingRight: '0px',
                        paddingBottom: '0px',
                        paddingLeft: '0px',
                        marginTop: '0px',
                        marginRight: '0px',
                        marginBottom: '0px',
                        marginLeft: '0px',
                      },
                      elements: [
                        {
                          type: 'card-1v1',
                          link: {
                            href: '#',
                            label: '信使WEB BUILDER 新增自定义组件流程',
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
                              style: {
                                width: 'auto',
                                height: 'auto',
                                opacity: 1,
                                borderRadius: 0,
                                boxShadow: 'none',
                                objectFit: 'initial',
                              },
                            },
                            style: {
                              width: 'auto',
                              height: 'auto',
                              opacity: 1,
                              borderRadius: 0,
                              boxShadow: 'none',
                              objectFit: 'initial',
                            },
                            src: '/assets/images/hero/bg01.jpg',
                          },
                          moreLabel: '查看更多',
                          style: {
                            width: 'auto',
                            height: 'auto',
                            opacity: 1,
                            borderRadius: 0,
                            boxShadow: 'none',
                            objectFit: 'initial',
                          },
                          src: '/assets/images/hero/bg01.jpg',
                          label: '<p>信使WEB BUILDER 新增自定义组件流程</p>',
                        },
                        {
                          type: 'card-1v1',
                          link: {
                            href: '#',
                            label: 'GITHUB 22 端口连接超时报错的解决办法',
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
                              src: '/assets/images/showcase/5.jpg',
                              alt: 'alt',
                              style: {
                                width: 'auto',
                                height: 'auto',
                                opacity: '1',
                                borderRadius: 0,
                                boxShadow: 'none',
                                objectFit: 'initial',
                              },
                            },
                          },
                          moreLabel: '查看更多',
                          style: {
                            width: 'auto',
                            height: 'auto',
                            opacity: 1,
                            borderRadius: 0,
                            boxShadow: 'none',
                            objectFit: 'initial',
                          },
                          src: '/assets/images/hero/bg05.jpg',
                        },
                      ],
                    },
                    {
                      row: {
                        xs: 12,
                        sm: 6,
                        md: 6,
                        lg: 6,
                      },
                      horizontal: 'start',
                      vertical: 'stretch',
                      gap: {
                        xs: 4,
                        sm: 0,
                        md: 0,
                        lg: 0,
                      },
                      bg: {
                        img: {
                          src: '',
                          alt: '',
                          classes: 'object-fit',
                        },
                        overlay: '',
                        classes: '',
                      },
                      classes: '',
                      blockClasses: '',

                      style: {
                        borderRadius: 'none',
                        paddingTop: '0px',
                        paddingRight: '0px',
                        paddingBottom: '0px',
                        paddingLeft: '0px',
                        marginTop: '0px',
                        marginRight: '0px',
                        marginBottom: '0px',
                        marginLeft: '0px',
                      },
                      elements: [
                        {
                          type: 'card-1v1',
                          link: {
                            href: '#',
                            label: '信使WEB BUILDER 新增历史版本',
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
                              src: '/assets/images/hero/bg02.jpg',
                              alt: 'alt',
                              style: {
                                width: 'auto',
                                height: 'auto',
                                opacity: 1,
                                borderRadius: 0,
                                boxShadow: 'none',
                                objectFit: 'initial',
                              },
                            },
                          },
                          moreLabel: '查看更多',
                          style: {
                            width: 'auto',
                            height: 'auto',
                            opacity: 1,
                            borderRadius: 0,
                            boxShadow: 'none',
                            objectFit: 'initial',
                          },
                          src: '/assets/images/hero/bg02.jpg',
                        },
                        {
                          type: 'card-1v1',
                          link: {
                            href: '#',
                            label: '信使 UI 应用初始化及页面渲染流程',
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
                              src: '/assets/images/showcase/6.jpg',
                              alt: 'alt',
                              style: {
                                width: 'auto',
                                height: 'auto',
                                opacity: 1,
                                borderRadius: 0,
                                boxShadow: 'none',
                                objectFit: 'initial',
                              },
                            },
                          },
                          moreLabel: '查看更多',
                          style: {
                            width: 'auto',
                            height: 'auto',
                            opacity: 1,
                            borderRadius: 0,
                            boxShadow: 'none',
                            objectFit: 'initial',
                          },
                          src: '/assets/images/showcase/7.jpg',
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
                md: 5,
                lg: 5,
              },
              horizontal: 'center',
              vertical: 'start',
              alignItems: 'center',
              gap: {
                xs: '4',
                sm: '4',
                md: '4',
                lg: '4',
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },

              elements: [
                {
                  type: 'title',
                  label:
                    '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
                  style: 'style-v4',
                  classes: 'mat-headline-3 bold',
                },
                {
                  type: 'text',
                  spacer: 'none',
                  body: '信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。',
                },
                {
                  type: 'btn',
                  href: '/node/1',
                  target: '_blank',
                  label: '了解更多',
                  mode: 'raised',
                  color: 'primary',
                },
              ],
            },
          ],
        },
      },
      {
        label: '5A',
        content: {
          fullWidth: false,
          spacer: 'md',

          overlay: '',
          classes: '',
          id: '',
          bg: {
            img: {
              src: '/assets/images/bg/bg-01.png',
              classes: 'object-fit',
              alt: 'bg-01',
            },
            classes: 'bg-shadow ',
            overlay: '',
          },
          horizontal: 'center',
          vertical: 'center',

          type: 'layout-builder',
          elements: [
            {
              row: {
                xs: 12,
                sm: 12,
                md: 6,
                lg: 8,
              },
              horizontal: 'center',
              vertical: 'center',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: 'text-center',
              blockClasses: '',

              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },
              elements: [
                {
                  type: 'title',
                  label:
                    '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
                  style: 'style-v4',
                  classes: 'mat-headline-3 bold',
                },
                {
                  type: 'text',
                  spacer: 'none',
                  body: '信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。',
                },
                {
                  horizontal: 'center',
                  vertical: 'center',
                  gap: {
                    xs: '4',
                    sm: '4',
                    md: '4',
                    lg: '4',
                  },
                  wrapperClass: 'sm:flex-nowrap',

                  row: {
                    xs: 12,
                    sm: 12,
                    md: 12,
                    lg: 12,
                  },
                  bg: {
                    img: {
                      src: '',
                      alt: '',
                      classes: 'object-fit',
                    },
                    overlay: '',
                    classes: '',
                  },
                  classes: '',
                  blockClasses: '',
                  style: {
                    borderRadius: 'none',
                    paddingTop: '0px',
                    paddingRight: '0px',
                    paddingBottom: '0px',
                    paddingLeft: '0px',
                    marginTop: '0px',
                    marginRight: '0px',
                    marginBottom: '0px',
                    marginLeft: '0px',
                  },
                  type: 'layout-builder',
                  spacer: 'md',
                  fullWidth: false,
                  elements: [
                    {
                      row: {
                        xs: 12,
                        sm: 4,
                        md: 4,
                        lg: 4,
                      },
                      horizontal: 'flex-start',
                      vertical: 'flex-start',
                      bg: {
                        img: {
                          src: '',
                          classes: 'object-fit',
                          alt: '',
                        },
                        overlay: '',
                        classes: '',
                      },
                      classes: '',
                      style: {
                        paddingTop: '0px',
                        paddingRight: '0px',
                        paddingBottom: '0px',
                        paddingLeft: '0px',
                        marginTop: '0px',
                        marginRight: '0px',
                        marginBottom: '0px',
                        marginLeft: '0px',
                      },

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
                            label: '高性能',
                          },
                          content:
                            '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                        },
                      ],
                    },
                    {
                      row: {
                        xs: 12,
                        sm: 4,
                        md: 4,
                        lg: 4,
                      },
                      horizontal: 'center',
                      vertical: 'center',
                      bg: {
                        img: {
                          src: '',
                          alt: '',
                          classes: 'object-fit',
                        },
                        overlay: '',
                        classes: '',
                      },
                      classes: '',
                      blockClasses: '',
                      style: {
                        borderRadius: 'none',
                        paddingTop: '0px',
                        paddingRight: '0px',
                        paddingBottom: '0px',
                        paddingLeft: '0px',
                        marginTop: '0px',
                        marginRight: '0px',
                        marginBottom: '0px',
                        marginLeft: '0px',
                      },

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
                            label: '易用的编辑器',
                          },
                          content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                        },
                      ],
                    },
                    {
                      row: {
                        xs: 12,
                        sm: 4,
                        md: 4,
                        lg: 4,
                      },
                      horizontal: 'center',
                      vertical: 'center',
                      bg: {
                        img: {
                          src: '',
                          classes: 'object-fit',
                          alt: '',
                        },
                        overlay: '',
                        classes: '',
                      },
                      classes: '',
                      style: {
                        paddingTop: '0px',
                        paddingRight: '0px',
                        paddingBottom: '0px',
                        paddingLeft: '0px',
                        marginTop: '0px',
                        marginRight: '0px',
                        marginBottom: '0px',
                        marginLeft: '0px',
                      },

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
                            label: '多语言',
                          },
                          content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
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
                md: 6,
                lg: 4,
              },
              horizontal: 'center',
              vertical: 'center',
              gap: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
              },
              bg: {
                img: {
                  src: '',
                  alt: '',
                  classes: 'object-fit',
                },
                overlay: '',
                classes: '',
              },
              classes: '',
              blockClasses: '',
              style: {
                borderRadius: 'none',
                paddingTop: '0px',
                paddingRight: '0px',
                paddingBottom: '0px',
                paddingLeft: '0px',
                marginTop: '0px',
                marginRight: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
              },

              elements: [
                {
                  type: 'img',
                  hostClasses: 'text-center',
                  classes: '',
                  src: 'https://builder.design/assets/images/illustration/11.png',
                  alt: 'alt',
                  style: {
                    opacity: '1',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    aspectRatio: '2 / 3',
                    objectFit: 'contain',
                  },
                  width: 500,
                  height: 600,
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    label: '常用组件',
    id: 'base',
    elements: [
      {
        label: '标题',
        id: 'title',
        icon: {
          svg: 'format-size',
        },
        content: {
          type: 'title',
          label: '欢迎使用<strong class="text-primary">Web Builder</strong>构建页面',
          classes: 'mat-headline-3 bold',
          style: 'style-v4',
        },
      },
      {
        label: '文本',
        id: 'text',
        icon: {
          svg: 'format-size',
        },
        content: {
          spacer: 'md',
          type: 'text',
          body: '信使UI是基于 Material 的 Angular 前端框架，提供五十多个丰富的组件，旨在为用户提供卓越的数字创新体验。通过 Web Builder，您可以轻松拖拽构建响应式、多主题的 Web 页面。此外，我们的平台集成了先进的 DeepSeek AI 功能，使页面构建更加智能化和高效。',
        },
      },
      {
        label: '富文本',
        id: 'text',
        icon: {
          svg: 'format-size',
        },
        content: {
          spacer: 'md',
          type: 'text',
          title: {
            label: '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
            classes: 'mat-headline-3 bold',
            style: 'style-v1',
          },
          bg: { classes: 'bg- ' },
          body: '信使UI是基于 Material 的 Angular 前端框架，提供五十多个丰富的组件，旨在为用户提供卓越的数字创新体验。通过 Web Builder，您可以轻松拖拽构建响应式、多主题的 Web 页面。此外，我们的平台集成了先进的 DeepSeek AI 功能，使页面构建更加智能化和高效。',
          classes: 'text-center',
          actionsAlign: 'center',
          actions: [
            { type: 'btn-generater', label: '生成页面', color: 'primary', mode: 'raised' },
            {
              type: 'btn',
              color: 'primary',
              mode: 'stroked',
              label: '演示视频',
              href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
              target: '_blank',
              icon: { inline: true, svg: 'play-circle-outline' },
            },
          ],
        },
      },
      {
        label: '图文',
        icon: {
          svg: 'image-text',
        },
        content: {
          fullWidth: false,
          spacer: 'none',

          overlay: '',
          containerClasses: '',
          id: '',
          bg: {
            img: {
              src: '/sites/default/files/2021-05/1-10.jpg',
              alt: '1-10',
              classes: 'bg-cover',
            },
            classes: 'bg- ',
            overlay: '',
          },
          type: 'hero-2v1',
          theme: 'text-white',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
              style: 'style-v1',
              classes: 'mat-headline-2',
            },
            spacer: 'xl',
            classes: 'xy-center text-center',
            body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-">Storybook</strong> 页面时添加组件到预览页面。',
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
        },
      },
      {
        label: '表格',
        icon: {
          svg: 'table',
        },
        content: {
          type: 'dynamic-table',
          header: [
            { label: '模块', key: 'module' },
            { label: '描述', key: 'info' },
            { label: '安装量', key: 'tatol' },
            { label: '备注', key: 'remarks', dialog: { shorten: 5, label: '更多' } },
          ],
          elements: [
            {
              module: 'Slick Carousel',
              tatol: 2992,
              info: 'Slick 轮播，强大响应式且性能优异的图片轮播解决方案，有非常丰富的配置选项，slick 官网自己调侃这是你最后使用的图片轮播',
              remarks: '查看',
            },
            {
              module: 'Views Slideshow',
              tatol: 5501,
              info: '视图轮播模块，该模块是最受欢迎的幻灯片模块，可放任何内容，高度定制\t',
              remarks: '查看',
            },
            {
              module: 'Colorbox',
              tatol: 4438,
              info: '轻量级高可定制幻灯片模块，高度集成在 Drupal 中，可放图片，Iframed 或者在线内容等等\t',
              remarks: '查看',
            },
            {
              module: 'Flex Slider',
              tatol: 8930,
              info: '响应式、可调整大小、适配浏览器和移动设备，支持移动设备手势滑动\t',
              remarks: '查看',
            },
            {
              module: 'Owl Carousel',
              tatol: 1000,
              info: '提供视图样式，字段格式化和管理 UI，支持响应式、移动手势、高定制幻灯片，CSS3 动画，JSON，有可用的回调，自定义事件等\t',
              remarks: '查看',
            },
          ],
        },
      },
      {
        label: '间距',
        icon: {
          svg: 'border-horizontal',
        },
        content: {
          type: 'spacer',
          size: 'sm',
        },
      },
      {
        label: '选项卡',
        icon: {
          svg: 'tab',
        },
        content: {
          type: 'tab',
          classes: 'bg-white',
          align: 'center',
          pills: true,
          fullWidth: false,
          elements: [
            {
              label: '简便快捷',
              elements: [
                {
                  id: '',
                  type: 'showcase-3v9',
                  spacer: 'xl',
                  bg: {
                    classes: '',
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
                      style: {
                        opacity: '',
                        borderRadius: '',
                        boxShadow: '',
                        aspectRatio: '',
                        objectFit: 'contain',
                      },
                      width: 800,
                      height: 600,
                    },
                  ],
                  right: [
                    {
                      type: 'text',
                      spacer: 'sm',
                      title: {
                        label: '构建你们的项目',
                        style: 'style-v4',
                        classes: 'mat-headline-2',
                      },
                      body: '允许用户通过拖放元素、调整布局和编辑内容来设计页面，而无需编写复杂的代码。这使得即使没有专业的编程知识，用户也能够创建出具有吸引力和功能性的网页',
                    },
                    {
                      type: 'swiper',
                      params: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        navigation: false,
                        observer: true,
                        observeParents: true,
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
              ],
            },
            {
              label: '无需专业',
              elements: [
                {
                  id: '',
                  type: 'showcase-3v9',
                  spacer: 'xl',
                  order: {
                    left: 1,
                    right: 0,
                  },
                  left: [
                    {
                      type: 'img',
                      src: '/assets/images/illustration/25.png',
                      style: {
                        opacity: '',
                        borderRadius: '',
                        boxShadow: '',
                        aspectRatio: '',
                        objectFit: 'contain',
                      },
                      width: 800,
                      height: 600,
                    },
                  ],
                  right: [
                    {
                      type: 'text',
                      spacer: 'sm',
                      title: {
                        label: '创意设计和干净整洁的代码',
                        style: 'style-v4',
                        classes: 'mat-headline-2',
                      },
                      body: '页面构建器的设计初衷是让非技术人员也能够轻松创建网页。通过使用页面构建器，任何人都可以成为网页设计师。',
                    },
                    {
                      type: 'swiper',
                      params: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        navigation: false,
                        observer: true,
                        observeParents: true,
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
              ],
            },
            {
              label: '成本效益',
              elements: [
                {
                  id: '',
                  type: 'showcase-3v9',
                  spacer: 'xl',
                  order: {
                    left: 0,
                    right: 1,
                  },
                  left: [
                    {
                      type: 'img',
                      src: '/assets/images/illustration/29.png',
                      style: {
                        opacity: '',
                        borderRadius: '',
                        boxShadow: '',
                        aspectRatio: '',
                        objectFit: 'contain',
                      },
                      width: 800,
                      height: 600,
                    },
                  ],
                  right: [
                    {
                      type: 'text',
                      spacer: 'sm',
                      title: {
                        label: '应用24小时支持和响应',
                        style: 'style-v4',
                        classes: 'mat-headline-2',
                      },
                      body: '相对于传统的自定义网页开发，使用页面构建器可以节省大量的时间和成本。它们提供了一系列预先设计好的模块和功能，用户只需根据自己的需求进行选择和调整即可。',
                    },
                    {
                      type: 'swiper',
                      params: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        navigation: false,
                        observer: true,
                        observeParents: true,
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
              ],
            },
          ],
        },
      },
      {
        label: '幻灯片',
        icon: {
          svg: 'view-array-outline',
        },
        content: {
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
        label: '折叠面板',
        icon: {
          svg: 'format-line-weight',
        },
        content: {
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
      },
      {
        label: '视频',
        icon: {
          svg: 'play-circle-outline',
        },
        content: {
          fullWidth: false,
          spacer: 'none',

          overlay: '',
          containerClasses: '',
          id: '',
          bg: {
            img: {
              src: '',
              alt: '',
            },
            classes: 'bg- ',
            overlay: '',
          },
          options: {
            loop: false,
            controls: true,
            aspectRatio: '1:1',
            poster: '/assets/video/poster01.png',
            sources: [
              {
                src: '/assets/video/storybook.mp4',
                type: 'video/mp4',
              },
            ],
            mode: 'cover',
          },
          animate: {
            aos: {
              enable: false,
            },
          },
          type: 'video',
        },
      },
      {
        label: '背景视频',
        icon: {
          svg: 'movie-outline',
        },
        content: {
          type: 'video-bg',
          source: {
            src: '/assets/video/storybook.mp4',
            type: 'video/mp4',
          },
          bg: {
            classes: ' overlay overlay-80',
          },
          classes: '',
          elements: [
            {
              type: 'showcase-1v3',
              title: {
                label: 'Storybook 是什么？',
                style: 'style-v1',
                classes: 'mat-headline-3',
              },
              classes: 'text-white',
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  style: {
                    'margin': '0 auto',
                    'text-align': 'center',
                    'width': '600px',
                  },
                  body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文，Storybook是一个用于开发和展示UI组件的工具。',
                  actionsAlign: 'center center',
                  actions: [
                    {
                      label: '了解更多',
                      type: 'btn',
                      href: '#',
                      mode: 'raised',
                      color: 'primary',
                    },
                    {
                      label: '回到官网',
                      type: 'btn',
                      classes: '!text-white',
                      href: '#',
                      icon: {
                        inline: true,
                        svg: 'home',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        label: '联系我们',
        icon: {
          svg: 'account-box-outline',
        },
        content: {
          type: 'contact-us',
          spacer: 'xl',
          params: {
            webform_id: 'contact',
          },
          bg: {
            classes: '',
            icon: 'wave',
          },
          action: {
            label: '提交表单',
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
          form: [
            {
              type: 'input',
              key: 'name',
              className: 'w-full',
              props: {
                label: '姓名',
                required: true,
              },
            },
            {
              type: 'input',
              key: 'email',
              className: 'w-full',
              props: {
                label: '邮箱',
                required: true,
              },
            },
            {
              type: 'input',
              key: 'subject',
              className: 'w-full',
              props: {
                label: '主题',
              },
            },
            {
              type: 'textarea',
              key: 'message',
              className: 'w-full',
              props: {
                label: '内容',
                placeholder: 'Message',
                rows: 5,
              },
            },
          ],
        },
      },
    ],
  },
  {
    label: '小程序组件',
    id: 'mini',
    elements: [
      {
        label: '示例',
        icon: {
          svg: 'code-json',
        },
        content: {
          type: 'json',
          name: 'sample',
          spacer: {
            x: 'none',
            y: 'none',
          },
        },
      },
      {
        label: '通用列表',
        icon: {
          svg: 'format-list-bulleted-type',
        },
        content: {
          type: 'json',
          name: 'dynamic-scroller',
          spacer: {
            x: 'md',
            y: 'md',
          },
          params: {
            api: '/api/xxx',
            widget: 'card-1v0',
          },
          search: {
            label: '筛选',
            filter: {
              form: [
                {
                  type: 'date-picker',
                  key: 'date',
                  label: '开始时间',
                },
                {
                  type: 'date-picker',
                  key: 'end_date',
                  label: '结束时间',
                },
                {
                  type: 'radio',
                  label: '状态',
                  key: 'moderation_state',
                  options: [
                    {
                      label: '待审核',
                      value: 'withdrawal_editorial-pending',
                    },
                    {
                      label: '驳回',
                      value: 'withdrawal_editorial-reject',
                    },
                    {
                      label: '通过',
                      value: 'withdrawal_editorial-published',
                    },
                    {
                      label: '撤销',
                      value: 'withdrawal_editorial-canceled',
                    },
                  ],
                },
                {
                  type: 'input',
                  key: 'store',
                  label: '经销商ID',
                },
              ],
              actions: [
                {
                  color: 'default',
                  label: '重置',
                  type: 'reset',
                },
                {
                  color: 'primary',
                  label: '搜索',
                  type: 'emit',
                },
              ],
            },
          },
        },
      },
    ],
  },
];
