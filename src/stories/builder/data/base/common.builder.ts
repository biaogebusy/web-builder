import * as textStory from '@stories/base/Text.stories';
import * as textHeroStory from '@stories/base/TextHero.stories';
import * as spacerStory from '@stories/theme/Spacer.stories';
import * as tabStory from '@stories/widgets/Tab.stories';
import * as panelStory from '@stories/widgets/Panel.stories';
import * as swiperStory from '@stories/widgets/Swiper.stories';
import * as videoBgStory from '@stories/components/video/videoBg.stories';
import * as contactStory from '@stories/drupal/form/ContactUs.stories';
import * as action1v1Story from '@stories/components/action/Action1v1.stories';

export const common = [
  {
    label: '富文本',
    id: 'text',
    icon: {
      svg: 'format-size',
    },
    content: textStory?.Center.args?.content,
  },
  {
    label: '图文',
    icon: { svg: 'image-text' },
    content: textHeroStory.Default?.args?.content,
  },
  {
    label: '间距',
    icon: {
      svg: 'border-horizontal',
    },
    content: spacerStory.Normal?.args?.content,
  },
  {
    label: '选项卡',
    icon: {
      svg: 'tab',
    },
    content: tabStory.Pills?.args?.content,
  },
  {
    label: '幻灯片',
    icon: {
      svg: 'view-array-outline',
    },
    content: swiperStory.Default?.args?.content,
  },
  {
    label: '搜索框',
    icon: { svg: 'magnify' },
    content: action1v1Story.Default?.args?.content,
  },
  {
    label: '折叠面板',
    icon: {
      svg: 'format-line-weight',
    },
    content: panelStory.Default?.args?.content,
  },
  {
    label: '背景视频',
    icon: { svg: 'movie-outline' },
    content: videoBgStory.Default?.args?.content,
  },
  {
    label: '联系我们',
    icon: {
      svg: 'account-box-outline',
    },
    content: contactStory.Default?.args?.content,
  },
];
