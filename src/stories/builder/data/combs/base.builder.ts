import * as textStory from '@stories/base/Text.stories';
import * as titleStory from '@stories/base/Title.stories';
import * as textHeroStory from '@stories/base/TextHero.stories';
import * as dynamicTableStory from '@stories/base/Table.stories';
import * as spacerStory from '@stories/theme/Spacer.stories';
import * as tabStory from '@stories/widgets/Tab.stories';
import * as panelStory from '@stories/widgets/Panel.stories';
import * as swiperStory from '@stories/widgets/Swiper.stories';
import * as videoBgStory from '@stories/components/video/videoBg.stories';
import * as contactStory from '@stories/drupal/form/ContactUs.stories';
import * as action1v1Story from '@stories/components/action/Action1v1.stories';
import * as btnStory from '@stories/base/Btn.stories';

export const {
  BtnLink: { args: btn },
} = btnStory;

export const {
  Default: { args: contact },
} = contactStory;

export const {
  Default: { args: videoBg },
} = videoBgStory;

export const {
  Default: { args: action1v1 },
} = action1v1Story;

export const {
  Default: { args: panel },
} = panelStory;

export const {
  Default: { args: swiper },
} = swiperStory;

export const {
  Pills: { args: tab },
} = tabStory;

export const {
  Normal: { args: spacer },
} = spacerStory as any;

export const {
  DialogColumn: { args: dynamicTable },
} = dynamicTableStory;

export const {
  Default: { args: textHero },
} = textHeroStory;

export const {
  TitleV1: { args: title },
} = titleStory;

export const {
  Center: { args: text },
} = textStory;

export const base = [
  {
    label: '动态布局',
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
  {
    label: '富文本',
    id: 'text',
    icon: {
      svg: 'format-size',
    },
    ...text,
  },
  {
    label: '图文',
    icon: { svg: 'image-text' },
    ...textHero,
  },
  {
    label: '表格',
    forLayout: true,
    icon: { svg: 'table' },
    ...dynamicTable,
  },
  {
    label: '间距',
    icon: {
      svg: 'border-horizontal',
    },
    ...spacer,
  },
  {
    label: '选项卡',
    icon: {
      svg: 'tab',
    },
    ...tab,
  },
  {
    label: '面板',
    icon: {
      svg: 'format-line-weight',
    },
    ...panel,
  },
  {
    label: '幻灯片',
    forLayout: true,
    icon: {
      svg: 'view-array-outline',
    },
    ...swiper,
  },
  {
    label: '搜索框',
    icon: { svg: 'magnify' },
    ...action1v1,
  },
  {
    label: '背景视频',
    icon: { svg: 'movie-outline' },
    ...videoBg,
  },
  {
    label: '联系我们',
    icon: {
      svg: 'account-box-outline',
    },
    ...contact,
  },
];
