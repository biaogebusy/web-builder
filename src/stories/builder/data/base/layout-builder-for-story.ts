import * as titleStory from '@stories/base/Title.stories';
import * as swiperStory from '@stories/widgets/Swiper.stories';
import * as btnStory from '@stories/base/Btn.stories';

export const {
  BtnLink: { args: btn },
} = btnStory;
export const {
  TitleV1: { args: title },
} = titleStory;

export const {
  Default: { args: swiper },
} = swiperStory;

export const layoutBuilder: any[] = [
  {
    label: '默认',
    icon: {
      svg: 'view-week-outline',
    },
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: false,
      layoutAlign: 'center center',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/home-shape.png',
          alt: 'home-shape.png',
          classes: 'object-fit',
        },
      },
      elements: [
        {
          classes: '',
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 6,
          },
          align: 'start stretch',
          elements: [
            {
              ...title?.content,
            },
            {
              type: 'text',
              spacer: 'none',
              body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
              bg: {
                classes: 'bg- bg-fill-width',
              },
              classes: '',
            },
            {
              ...swiper?.content,
            },
            {
              ...btn?.content,
            },
          ],
        },
        {
          classes: '',
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 4,
          },
          align: 'center stretch',
          elements: [
            {
              type: 'img',
              hostClasses: 'text-center',
              classes: '',
              src: '/assets/images/illustration/11.png',
              alt: 'alt',
              style: {
                'max-width': '60%',
              },
            },
          ],
        },
      ],
    },
  },
];
