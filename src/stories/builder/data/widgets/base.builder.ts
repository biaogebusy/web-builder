import * as btnStory from '@stories/base/Btn.stories';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import * as dynamicTableStory from '@stories/base/Table.stories';
import * as iconStory from '@stories/base/Icon.stories';
import * as linkStory from '@stories/base/Link.stories';
import * as tabStory from '@stories/widgets/Tab.stories';
import * as titleStory from '@stories/base/Title.stories';
import * as panelStory from '@stories/widgets/Panel.stories';
import * as textStory from '@stories/base/Text.stories';
import * as imgStory from '@stories/base/Img.stories';
import * as chartStory from '@stories/widgets/chart/ChartBar.stories';
import * as spacerStory from '@stories/theme/Spacer.stories';
import * as formStory from '@stories/widgets/Form.stories';
import * as playerStory from '@stories/feature/media/Player.stories';
import * as textHeroStory from '@stories/base/TextHero.stories';
import * as swiperStory from '@stories/widgets/Swiper.stories';
import * as bgImg from '@stories/base/BgImg.stories';

export const {
  Default: { args: textHero },
} = textHeroStory;

export const {
  Opacity: { args: bg },
} = bgImg;

export const {
  Default: { args: player },
} = playerStory;

export const {
  Center: { args: text },
} = textStory;

export const {
  Default: { args: img },
} = imgStory;

export const {
  Bar: { args: chart },
} = chartStory;

export const {
  Normal: { args: spacer },
} = spacerStory as any;

export const {
  Default: { args: form },
} = formStory as any;

export const {
  Default: { args: panel },
} = panelStory;

export const {
  Pills: { args: tab },
} = tabStory;

export const {
  BtnLink: { args: btn },
} = btnStory;

export const {
  Default: { args: btnVideo },
} = btnVideoStory;

export const {
  DialogColumn: { args: dynamicTable },
} = dynamicTableStory;

export const {
  Primary: { args: icon },
} = iconStory;

export const {
  Default: { args: link },
} = linkStory;

export const {
  TitleV1: { args: title },
} = titleStory;

export const {
  Default: { args: swiper },
} = swiperStory;

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
    label: '图片',
    icon: {
      svg: 'image-outline',
    },
    ...img,
  },
  {
    label: '按钮',
    icon: { svg: 'button-cursor' },
    ...btn,
  },
  {
    label: '链接',
    icon: { svg: 'link' },
    ...link,
  },
  {
    label: '标题',
    icon: { svg: 'format-header-2' },
    ...title,
  },
  {
    label: '背景',
    icon: { svg: 'format-color-fill' },
    ...bg,
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
    label: '视频',
    icon: { svg: 'play-box' },
    ...player,
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
    label: '图标',
    icon: {
      svg: 'svg',
    },
    ...icon,
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
    label: '表单',
    icon: {
      svg: 'checkbox-marked-outline',
    },
    content: {
      type: 'formly',
      fields: form.fields,
    },
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
];
