import * as lotteryStory from '@stories/feature/calculator/Lottery.stories';

const {
  Default: { args: lottery },
} = lotteryStory;
export const tools = [
  {
    label: '红包预算器',
    icon: {
      svg: 'gift',
    },
    ...lottery,
    form: {},
    model: {},
  },
  {
    label: '动态布局',
    icon: {
      svg: 'view-week-outline',
    },
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: true,
      elements: [
        {
          classes: '',
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
            xl: 6,
          },
          align: 'start stretch',
          elements: [
            {
              type: 'text',
              spacer: 'md',
              body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
              title: {
                label:
                  '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
                style: 'style-v4',
                classes: 'mat-display-2 bold',
              },
              bg: {
                classes: 'bg- bg-fill-width',
              },
              classes: '',
              actionsAlign: 'start center',
              actions: [
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '/builder',
                  label: '开始体验',
                },
              ],
            },
          ],
        },
        {
          classes: '',
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
            xl: 6,
          },
          align: 'start stretch',
          elements: [
            {
              type: 'img',
              hostClasses: 'text-center',
              classes: '',
              src: '/assets/images/cases/porto3.jpg',
              alt: 'alt',
            },
          ],
        },
      ],
    },
  },
];
