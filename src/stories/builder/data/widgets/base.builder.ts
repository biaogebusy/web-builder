import * as btnStory from '@stories/base/Btn.stories';
import * as iconStory from '@stories/base/Icon.stories';
import * as linkStory from '@stories/base/Link.stories';
import * as imgStory from '@stories/base/Img.stories';
import * as formStory from '@stories/widgets/Form.stories';
import * as playerStory from '@stories/feature/media/Player.stories';
import * as bgImg from '@stories/base/BgImg.stories';
import * as titleStory from '@stories/base/Title.stories';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import * as chartStory from '@stories/widgets/chart/ChartBar.stories';

export const {
  Bar: { args: chart },
} = chartStory;

export const {
  Default: { args: btnVideo },
} = btnVideoStory;

export const {
  TitleV1: { args: title },
} = titleStory;

export const {
  Opacity: { args: bg },
} = bgImg;

export const {
  Default: { args: player },
} = playerStory;

export const {
  Default: { args: img },
} = imgStory;

export const {
  Default: { args: form },
} = formStory as any;

export const {
  BtnLink: { args: btn },
} = btnStory;

export const {
  Primary: { args: icon },
} = iconStory;

export const {
  Default: { args: link },
} = linkStory;

export const base = [
  {
    label: '标题',
    forLayout: true,
    icon: { svg: 'format-header-2' },
    ...title,
  },
  {
    label: '播放按钮',
    forLayout: true,
    icon: { svg: 'play-circle-outline' },
    ...btnVideo,
  },
  {
    label: '图表',
    forLayout: true,
    icon: {
      svg: 'chart-line',
    },
    ...chart,
  },
  {
    label: '图片',
    forLayout: true,
    icon: {
      svg: 'image-outline',
    },
    ...img,
  },
  {
    label: '按钮',
    forLayout: true,
    icon: { svg: 'button-cursor' },
    ...btn,
  },
  {
    label: '链接',
    forLayout: true,
    icon: { svg: 'link' },
    ...link,
  },
  {
    label: '背景',
    forLayout: true,
    icon: { svg: 'format-color-fill' },
    ...bg,
  },
  {
    label: '视频',
    forLayout: true,
    icon: { svg: 'play-box' },
    ...player,
  },
  {
    label: '图标',
    forLayout: true,
    icon: {
      svg: 'svg',
    },
    ...icon,
  },
  {
    label: '表单',
    forLayout: true,
    icon: {
      svg: 'checkbox-marked-outline',
    },
    content: {
      type: 'formly',
      fields: form.fields,
    },
  },
];
