import * as dynamicTableStory from '@stories/base/Table.stories';
import * as swiperStory from '@stories/widgets/Swiper.stories';
import * as titleStory from '@stories/base/Title.stories';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import * as chartBarStory from '@stories/widgets/chart/ChartBar.stories';
import * as chartLineStory from '@stories/widgets/chart/ChartLine.stories';
import * as chartPieStory from '@stories/widgets/chart/ChartPie.stories';
import * as btnStory from '@stories/base/Btn.stories';
import * as linkStory from '@stories/base/Link.stories';
import * as bgImg from '@stories/base/BgImg.stories';
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
  Opacity: { args: bg },
} = bgImg;

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
} = BoxStories;

export const {
  Normal: { args: spacer },
} = spacerStory as any;

export const {
  Default: { args: contact },
} = contactStory;

export const widgets: any[] = [
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
      animate: {
        disable: true,
      },
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
      svg: 'border-horizontal',
    },
    ...spacer,
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
    ...swiper,
  },
  {
    label: '联系我们',
    icon: {
      svg: 'account-box-outline',
    },
    ...contact,
  },
  {
    label: '柱状图',
    icon: {
      svg: 'chart-bar',
    },
    ...chartBar,
  },
  {
    label: '折线图',
    icon: {
      svg: 'chart-line',
    },
    ...chartLine,
  },
  {
    label: '饼图',
    icon: {
      svg: 'chart-pie',
    },
    ...chartPie,
  },
  {
    label: '表格',
    icon: { svg: 'table' },
    ...dynamicTable,
  },
  {
    label: '播放按钮',
    icon: { svg: 'play-circle-outline' },
    ...btnVideo,
  },
  {
    label: '背景',
    icon: { svg: 'format-color-fill' },
    ...bg,
  },
  {
    label: 'Box',
    icon: { svg: 'box' },
    ...box,
  },
  {
    label: '卡片',
    icon: { svg: 'card-outline' },
    ...cardBase,
  },
  {
    label: 'v1',
    icon: {
      svg: 'numeric-1',
    },
    ...v1,
  },
  {
    label: 'v2',
    icon: {
      svg: 'numeric-2',
    },
    ...v2,
  },
  {
    label: '1v4',
    icon: { svg: 'numeric-4' },
    ...v4,
  },
  {
    label: '1v5',
    icon: { svg: 'numeric-5' },
    ...v5,
  },
  {
    label: '1v6',
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
    label: '进度条',
    icon: { svg: 'progress-helper' },
    ...progressbar,
  },
  {
    label: 'Iframe',
    icon: {
      svg: 'application-array-outline',
    },
    ...iframe,
  },
  {
    label: 'Lightbox',
    icon: {
      svg: 'view-carousel-outline',
    },
    ...lightbox,
  },
  {
    label: '形状',
    icon: {
      svg: 'cosine-wave',
    },
    ...shape,
  },
];
