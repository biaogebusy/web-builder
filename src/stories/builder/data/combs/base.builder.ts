import * as textStory from '@stories/base/Text.stories';
import * as titleStory from '@stories/base/Title.stories';
import * as textHeroStory from '@stories/base/TextHero.stories';
import * as dynamicTableStory from '@stories/base/Table.stories';
import * as chartStory from '@stories/widgets/chart/ChartBar.stories';
import * as spacerStory from '@stories/theme/Spacer.stories';
import * as tabStory from '@stories/widgets/Tab.stories';
import * as panelStory from '@stories/widgets/Panel.stories';
import * as swiperStory from '@stories/widgets/Swiper.stories';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import * as videoBgStory from '@stories/components/video/videoBg.stories';
import * as contactStory from '@stories/drupal/form/ContactUs.stories';
import * as action1v1Story from '@stories/components/action/Action1v1.stories';

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
  Bar: { args: chart },
} = chartStory;
export const {
  DialogColumn: { args: dynamicTable },
} = dynamicTableStory;
export const {
  Default: { args: btnVideo },
} = btnVideoStory;
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
    label: '富文本',
    id: 'text',
    icon: {
      svg: 'format-size',
    },
    ...text,
  },
  {
    label: '标题',
    icon: { svg: 'format-header-2' },
    ...title,
  },
  {
    label: '图文',
    icon: { svg: 'image-text' },
    ...textHero,
  },
  {
    label: '播放按钮',
    icon: { svg: 'play-circle-outline' },
    ...btnVideo,
  },
  {
    label: '表格',
    icon: { svg: 'table' },
    ...dynamicTable,
  },
  {
    label: '图表',
    icon: {
      svg: 'chart-line',
    },
    ...chart,
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
