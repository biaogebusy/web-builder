import * as textStory from '@stories/base/Text.stories';
import * as titleStory from '@stories/base/Title.stories';
import * as textHeroStory from '@stories/base/TextHero.stories';
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
  Default: { args: textHero },
} = textHeroStory;

export const {
  TitleV1: { args: title },
} = titleStory;

export const {
  Center: { args: text },
} = textStory;

export const common = [
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
    label: '折叠面板',
    icon: {
      svg: 'format-line-weight',
    },
    ...panel,
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
