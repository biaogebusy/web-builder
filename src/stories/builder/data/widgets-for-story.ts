import * as dynamicTableStory from '@stories/base/Table.stories';
import * as swiperStory from '@stories/widgets/Swiper.stories';
import * as titleStory from '@stories/base/Title.stories';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import * as chartBarStory from '@stories/widgets/chart/ChartBar.stories';
import * as chartLineStory from '@stories/widgets/chart/ChartLine.stories';
import * as chartPieStory from '@stories/widgets/chart/ChartPie.stories';
import * as btnStory from '@stories/base/Btn.stories';
import * as linkStory from '@stories/base/Link.stories';
import * as iconStory from '@stories/base/Icon.stories';
import * as formStory from '@stories/widgets/Form.stories';
import * as imgStory from '@stories/base/Img.stories';
import * as cardBaseStory from '@stories/widgets/card/Card.stories';
import * as card1v1Story from '@stories/widgets/card/Card1v1.stories';
import * as card1v2Story from '@stories/widgets/card/Card1v2.stories';
import * as card1v4Story from '@stories/widgets/card/Card1v4.stories';
import * as card1v5Story from '@stories/widgets/card/Card1v5.stories';
import * as card1v6Story from '@stories/widgets/card/Card1v6.stories';
import * as stepperStory from '@stories/widgets/Stepper.stories';
import * as progressGroupStory from '@stories/widgets/feedback/ProgressGroup.stories';
import * as mediaObjectStory from '@stories/widgets/media/MediaObject.stories';
import * as testimonialStory from '@stories/widgets/media/Testimonial.stories';
import * as mediaListStory from '@stories/widgets/media/MediaList.stories';
import * as progressBarStory from '@stories/widgets/feedback/ProgressBar.stories';
import * as iframeStory from '@stories/widgets/Iframe.stories';
import * as lightboxStory from '@stories/widgets/InlineLightbox.stories';
import * as shapeStory from '@stories/widgets/Shape.stories';
import * as BoxStories from '@stories/base/Box.stories';
import * as spacerStory from '@stories/theme/Spacer.stories';
import * as contactStory from '@stories/drupal/form/ContactUs.stories';
import * as panelStory from '@stories/widgets/Panel.stories';

export const {
  Default: { args: panel },
} = panelStory;

export const {
  Horizontal: { args: stepper },
} = stepperStory;

export const {
  Default: { args: img },
} = imgStory;

export const {
  TitleV1: { args: title },
} = titleStory;

export const {
  Primary: { args: icon },
} = iconStory;

export const {
  Default: { args: link },
} = linkStory;

export const {
  Default: { args: swiper },
} = swiperStory;

export const {
  Default: { args: form },
} = formStory as any;

export const {
  DialogColumn: { args: dynamicTable },
} = dynamicTableStory;

export const {
  Default: { args: btnVideo },
} = btnVideoStory;

export const {
  Bar: { args: chartBar },
} = chartBarStory;

export const {
  Line: { args: chartLine },
} = chartLineStory;

export const {
  Pie: { args: chartPie },
} = chartPieStory;

export const {
  BtnLink: { args: btn },
} = btnStory;

export const {
  Default: { args: mediaList },
} = mediaListStory;

export const {
  Default: { args: testimonial },
} = testimonialStory;

export const {
  Default: { args: mediaObject },
} = mediaObjectStory;

const {
  Base: { args: cardBase },
} = cardBaseStory;

const {
  Default: { args: v1 },
} = card1v1Story;
const {
  Default: { args: v2 },
} = card1v2Story;
const {
  Default: { args: v4 },
} = card1v4Story;

const {
  StepFirst: { args: v5 },
} = card1v5Story;

const {
  Default: { args: v6 },
} = card1v6Story;

const {
  Default: { args: progressGroup },
} = progressGroupStory;

const {
  Determinate: { args: progressbar },
} = progressBarStory;

export const {
  CustomSize: { args: iframe },
} = iframeStory;

export const {
  Default: { args: lightbox },
} = lightboxStory;

export const {
  Default: { args: shape },
} = shapeStory;

export const {
  Primary: { args: box },
  StyleV1: { args: boxV1 },
  StyleV2: { args: boxV2 },
  StyleV3: { args: boxV3 },
  StyleV4: { args: boxV4 },
  StyleV5: { args: boxV5 },
  StyleV6: { args: boxV6 },
  StyleV7: { args: boxV7 },
  StyleV9: { args: boxV9 },
  StyleV10: { args: boxV10 },
} = BoxStories;

export const {
  Normal: { args: spacer },
} = spacerStory as any;

export const {
  Default: { args: contact },
} = contactStory;

export const widgets: any[] = [
  {
    label: 'Layout',
    icon: {
      svg: 'view-dashboard-outline',
    },
    preview: '/assets/images/builder/widgets/layout.png',
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: false,
      bg: {
        classes: 'bg-fill-width',
      },
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
          direction: 'column',
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
          direction: 'column',
          elements: [],
        },
      ],
    },
  },
  {
    label: '标题',
    icon: { svg: 'format-header-2' },
    ...title,
  },
  {
    label: '富文本',
    icon: { svg: 'format-text' },
    content: {
      type: 'text',
      spacer: 'none',
      body: '信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。',
    },
  },
  {
    label: '图片',
    icon: {
      svg: 'image-outline',
    },
    ...img,
  },
  {
    label: '链接',
    icon: { svg: 'link' },
    ...link,
  },
  {
    label: '按钮',
    icon: { svg: 'button-cursor' },
    ...btn,
  },
  {
    label: '间距',
    icon: {
      svg: 'minus-thick',
    },
    ...spacer,
  },
  {
    label: '分割线',
    icon: {
      svg: 'border-horizontal',
    },
    content: {
      type: 'divider',
    },
  },
  {
    label: '图标',
    icon: {
      svg: 'svg',
    },
    ...icon,
  },
  {
    label: '幻灯片',
    icon: {
      svg: 'view-array-outline',
    },
    preview: '/assets/images/builder/widgets/swiper.png',
    ...swiper,
  },
  {
    label: '联系我们',
    icon: {
      svg: 'account-box-outline',
    },
    preview: '/assets/images/builder/widgets/contact.png',
    ...contact,
  },
  {
    label: '柱状图',
    icon: {
      svg: 'chart-bar',
    },
    preview: '/assets/images/builder/widgets/bar.png',
    ...chartBar,
  },
  {
    label: '折线图',
    icon: {
      svg: 'chart-line',
    },
    preview: '/assets/images/builder/widgets/line.png',
    ...chartLine,
  },
  {
    label: '饼图',
    icon: {
      svg: 'chart-pie',
    },
    preview: '/assets/images/builder/widgets/pie.png',
    ...chartPie,
  },
  {
    label: '折叠面板',
    icon: { svg: 'format-line-weight' },
    ...panel,
  },
  {
    label: '表格',
    icon: { svg: 'table' },
    preview: '/assets/images/builder/widgets/table.png',
    ...dynamicTable,
  },
  {
    label: '播放按钮',
    icon: { svg: 'play-circle-outline' },
    ...btnVideo,
  },
  {
    label: 'Box',
    icon: { svg: 'box' },
    ...box,
  },
  {
    label: 'Box v1',
    icon: { svg: 'box' },
    ...boxV1,
  },
  {
    label: 'Box v2',
    icon: { svg: 'box' },
    ...boxV2,
  },
  {
    label: 'Box v3',
    icon: { svg: 'box' },
    ...boxV3,
  },
  {
    label: 'Box v4',
    icon: { svg: 'box' },
    ...boxV4,
  },
  {
    label: 'Box v5',
    icon: { svg: 'box' },
    ...boxV5,
  },
  {
    label: 'Box v6',
    icon: { svg: 'box' },
    ...boxV6,
  },
  {
    label: 'Box v7',
    icon: { svg: 'box' },
    ...boxV7,
  },
  {
    label: 'Box v9',
    icon: { svg: 'box' },
    ...boxV9,
  },
  {
    label: 'Box v10',
    icon: { svg: 'box' },
    ...box,
  },
  {
    label: 'Box',
    icon: { svg: 'box' },
    ...boxV10,
  },
  {
    label: '卡片',
    icon: { svg: 'card-outline' },
    preview: '/assets/images/builder/widgets/card.png',
    ...cardBase,
  },
  {
    label: '卡片1v1',
    icon: {
      svg: 'numeric-1',
    },
    preview: '/assets/images/builder/widgets/card-1v1.png',
    ...v1,
  },
  {
    label: '卡片2v2',
    icon: {
      svg: 'numeric-2',
    },
    preview: '/assets/images/builder/widgets/card-1v2.png',
    ...v2,
  },
  {
    label: '卡片1v4',
    icon: { svg: 'numeric-4' },
    ...v4,
  },
  {
    label: '卡片1v5',
    icon: { svg: 'numeric-5' },
    ...v5,
  },
  {
    label: '卡片1v6',
    icon: { svg: 'numeric-6' },
    ...v6,
  },
  {
    label: '进步器',
    icon: {
      svg: 'debug-step-over',
    },
    ...stepper,
  },
  {
    label: '进度组',
    icon: { svg: 'format-list-group' },
    ...progressGroup,
  },
  {
    label: '列表',
    icon: { svg: 'format-list-checkbox' },
    ...mediaList,
  },
  {
    label: '对象',
    icon: { svg: 'format-list-bulleted-type' },
    ...mediaObject,
  },
  {
    label: '感言',
    icon: { svg: 'format-wrap-square' },
    ...testimonial,
  },
  {
    label: 'Lightbox',
    icon: {
      svg: 'view-carousel-outline',
    },
    ...lightbox,
  },
];
