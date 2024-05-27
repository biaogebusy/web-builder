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
import * as lightboxStory from '@stories/widgets/InlineLightbox.stories';
import * as BoxStories from '@stories/base/Box.stories';
import * as spacerStory from '@stories/theme/Spacer.stories';
import * as contactStory from '@stories/drupal/form/ContactUs.stories';
import * as panelStory from '@stories/widgets/Panel.stories';
import { Default as CustomTeplate } from '@stories/builder/CustomTemplate.stories';

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
    label: '自定义',
    icon: {
      svg: 'code-json',
    },
    content: CustomTeplate.args?.content,
  },
  {
    label: 'API',
    icon: {
      svg: 'api',
    },
    content: {
      type: 'custom-template',
      isAPI: true,
      api: '/api/v1/content',
      html: `<div class="flex flex-wrap">
    {{#each rows}}
    <div class="flex-12/12 sm:flex-6/12 md:flex-4/12">
        <div class="m-3 shadow-md transition-all flex flex-col break-all rounded-md overflow-hidden hover:shadow-lg">
            <a href="{{url}}"><img class="!object-cover w-full" height="200px" src="{{img}}" /></a>
            <div class="p-5">
                <a class="!text-black opacity-95 hover:!opacity-80 text-lg one-line" href="{{url}}">{{title}}</a>
                <div class="three-line opacity-90">{{body}}</div>
                <div class="footer flex items-center mt-5">
                    <img class="w-10 h-10 rounded-full mr-3" src="{{picture}}" />
                    <div class="flex flex-col">
                        <div class="font-bold">{{user}}</div>
                        <div class="small">{{created}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{/each}}
</div>`,
    },
  },
  {
    label: '标题',
    icon: { svg: 'format-header-2' },
    content: titleStory.TitleV1.args?.content,
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
    content: imgStory.Default.args?.content,
  },
  {
    label: '链接',
    icon: { svg: 'link' },
    content: linkStory.Default.args?.content,
  },
  {
    label: '按钮',
    icon: { svg: 'button-cursor' },
    content: btnStory.BtnLink.args?.content,
  },
  {
    label: '间距',
    icon: {
      svg: 'minus-thick',
    },
    content: spacerStory.Normal.args?.content,
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
    content: iconStory.Primary.args?.content,
  },
  {
    label: '幻灯片',
    icon: {
      svg: 'view-array-outline',
    },
    preview: '/assets/images/builder/widgets/swiper.png',
    content: swiperStory.Default.args?.content,
  },
  {
    label: '联系我们',
    icon: {
      svg: 'account-box-outline',
    },
    preview: '/assets/images/builder/widgets/contact.png',
    content: contactStory.Default.args?.content,
  },
  {
    label: '柱状图',
    icon: {
      svg: 'chart-bar',
    },
    preview: '/assets/images/builder/widgets/bar.png',
    content: chartBarStory.Bar.args?.content,
  },
  {
    label: '折线图',
    icon: {
      svg: 'chart-line',
    },
    preview: '/assets/images/builder/widgets/line.png',
    content: chartLineStory.Line.args?.content,
  },
  {
    label: '饼图',
    icon: {
      svg: 'chart-pie',
    },
    preview: '/assets/images/builder/widgets/pie.png',
    content: chartPieStory.Pie.args?.content,
  },
  {
    label: '折叠面板',
    icon: { svg: 'format-line-weight' },
    content: panelStory.Default.args?.content,
  },
  {
    label: '表格',
    icon: { svg: 'table' },
    preview: '/assets/images/builder/widgets/table.png',
    content: dynamicTableStory.DialogColumn.args?.content,
  },
  {
    label: '播放按钮',
    icon: { svg: 'play-circle-outline' },
    content: btnVideoStory.Default.args?.content,
  },
  {
    label: 'Box',
    icon: { svg: 'box' },
    content: BoxStories.Primary.args?.content,
  },
  {
    label: 'Box v1',
    icon: { svg: 'box' },
    content: BoxStories.StyleV1.args?.content,
  },
  {
    label: 'Box v2',
    icon: { svg: 'box' },
    content: BoxStories.StyleV2.args?.content,
  },
  {
    label: 'Box v3',
    icon: { svg: 'box' },
    content: BoxStories.StyleV3.args?.content,
  },
  {
    label: 'Box v4',
    icon: { svg: 'box' },
    content: BoxStories.StyleV4.args?.content,
  },
  {
    label: 'Box v5',
    icon: { svg: 'box' },
    content: BoxStories.StyleV5.args?.content,
  },
  {
    label: 'Box v6',
    icon: { svg: 'box' },
    content: BoxStories.StyleV6.args?.content,
  },
  {
    label: 'Box v7',
    icon: { svg: 'box' },
    content: BoxStories.StyleV7.args?.content,
  },
  {
    label: 'Box v9',
    icon: { svg: 'box' },
    content: BoxStories.StyleV9.args?.content,
  },
  {
    label: 'Box v10',
    icon: { svg: 'box' },
    content: BoxStories.StyleV10.args?.content,
  },
  {
    label: '卡片',
    icon: { svg: 'card-outline' },
    preview: '/assets/images/builder/widgets/card.png',
    content: cardBaseStory.Base.args?.content,
  },
  {
    label: '卡片1v1',
    icon: {
      svg: 'numeric-1',
    },
    preview: '/assets/images/builder/widgets/card-1v1.png',
    content: card1v1Story.Default.args?.content,
  },
  {
    label: '卡片2v2',
    icon: {
      svg: 'numeric-2',
    },
    preview: '/assets/images/builder/widgets/card-1v2.png',
    content: card1v2Story.Default.args?.content,
  },
  {
    label: '卡片1v4',
    icon: { svg: 'numeric-4' },
    content: card1v4Story.Default.args?.content,
  },
  {
    label: '卡片1v5',
    icon: { svg: 'numeric-5' },
    content: card1v5Story.StepFirst.args?.content,
  },
  {
    label: '卡片1v6',
    icon: { svg: 'numeric-6' },
    content: card1v6Story.Default.args?.content,
  },
  {
    label: '进步器',
    icon: {
      svg: 'debug-step-over',
    },
    content: stepperStory.Horizontal.args?.content,
  },
  {
    label: '进度组',
    icon: { svg: 'format-list-group' },
    content: progressGroupStory.Default.args?.content,
  },
  {
    label: '列表',
    icon: { svg: 'format-list-checkbox' },
    content: mediaListStory.Default.args?.content,
  },
  {
    label: '对象',
    icon: { svg: 'format-list-bulleted-type' },
    content: mediaObjectStory.Default.args?.content,
  },
  {
    label: '感言',
    icon: { svg: 'format-wrap-square' },
    content: testimonialStory.Default.args?.content,
  },
  {
    label: 'Lightbox',
    icon: {
      svg: 'view-carousel-outline',
    },
    content: lightboxStory.Default.args?.content,
  },
];
