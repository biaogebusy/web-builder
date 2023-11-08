import * as btnStory from '@stories/base/Btn.stories';
import * as iconStory from '@stories/base/Icon.stories';
import * as linkStory from '@stories/base/Link.stories';
import * as imgStory from '@stories/base/Img.stories';
import * as formStory from '@stories/widgets/Form.stories';
import * as playerStory from '@stories/feature/media/Player.stories';
import * as bgImg from '@stories/base/BgImg.stories';

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
    label: '背景',
    icon: { svg: 'format-color-fill' },
    ...bg,
  },
  {
    label: '视频',
    icon: { svg: 'play-box' },
    ...player,
  },
  {
    label: '图标',
    icon: {
      svg: 'svg',
    },
    ...icon,
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
];
