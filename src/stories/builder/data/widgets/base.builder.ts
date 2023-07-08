import * as btnStory from '@stories/widgets/base/Btn.stories';
import * as btnVideoStory from '@stories/widgets/base/BtnVideo.stories';
import * as dynamicTableStory from '@stories/widgets/base/Table.stories';
import * as iconStory from '@stories/widgets/base/Icon.stories';
import * as linkStory from '@stories/widgets/base/Link.stories';
import * as tabStory from '@stories/widgets/Tab.stories';
import * as titleStory from '@stories/widgets/base/Title.stories';
import * as panelStory from '@stories/widgets/Panel.stories';
import * as textStory from '@stories/widgets/base/Text.stories';
import * as imgStory from '@stories/widgets/base/Img.stories';
import * as chartStory from '@stories/widgets/chart/ChartBar.stories';
import * as spacerStory from '@stories/theme/Spacer.stories';
import * as formStory from '@stories/widgets/Form.stories';
import * as playerStory from '@stories/feature/media/Player.stories';
import * as textHeroStory from '@stories/widgets/base/TextHero.stories';

export const {
  Default: { args: textHero },
} = textHeroStory;

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

export const base = [
  {
    label: 'Text',
    id: 'text',
    icon: {
      svg: 'format-size',
    },
    ...text,
  },
  {
    label: 'Image',
    icon: {
      svg: 'image-outline',
    },
    ...img,
  },
  {
    label: 'Btn',
    icon: { svg: 'button-cursor' },
    ...btn,
  },
  {
    label: 'Link',
    icon: { svg: 'link' },
    ...link,
  },
  {
    label: 'Title',
    icon: { svg: 'format-header-2' },
    ...title,
  },
  {
    label: 'Text Hero',
    icon: { svg: 'image-text' },
    ...textHero,
  },
  {
    label: 'Btn Video',
    icon: { svg: 'play-circle-outline' },
    ...btnVideo,
  },
  {
    label: 'Player',
    icon: { svg: 'play-box' },
    ...player,
  },
  {
    label: 'Tabel',
    icon: { svg: 'table' },
    ...dynamicTable,
  },
  {
    label: 'Chart',
    icon: {
      svg: 'chart-line',
    },
    ...chart,
  },
  {
    label: 'Icon',
    icon: {
      svg: 'svg',
    },
    ...icon,
  },
  {
    label: 'Spacer',
    icon: {
      svg: 'border-horizontal',
    },
    ...spacer,
  },
  {
    label: 'Tab',
    icon: {
      svg: 'tab',
    },
    ...tab,
  },

  {
    label: 'Form',
    icon: {
      svg: 'checkbox-marked-outline',
    },
    content: {
      type: 'formly',
      fields: form.fields,
    },
  },
  {
    label: 'Panel',
    icon: {
      svg: 'format-line-weight',
    },
    ...panel,
  },
];
