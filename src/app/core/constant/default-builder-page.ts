export const DEFAULT_BUILDER_PAGE_BODY = [
  {
    type: 'text',
    title: {
      label:
        '<p style="display: inline-block; margin-bottom: 0px;">使用开源 <strong class="text-primary">Web Builder</strong> 快速构建页面</p>',
      style: 'style-v1',
      classes: 'mat-headline-3 bold',
    },
    bg: {
      classes: '',
    },
    body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
    classes: 'text-center',
    actionsAlign: 'center',
    actions: [
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
];
