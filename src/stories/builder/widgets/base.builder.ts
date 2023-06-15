import * as btnStory from '../../widgets/base/Btn.stories';
import * as btnVideoStory from '../../widgets/base/BtnVideo.stories';
import * as dynamicTableStory from '../../widgets/base/DynamicTable.stories';
import * as iconStory from '../../widgets/base/Icon.stories';
import * as linkStory from '../../widgets/base/Link.stories';
import * as tabStory from '../../widgets/Tab.stories';
import * as titleStory from '../../widgets/base/Title.stories';
import * as panelStory from '../../widgets/Panel.stories';
import * as textStory from '../../widgets/base/Text.stories';
import * as imgStory from '../../widgets/base/Img.stories';
import * as chartStory from '../../widgets/chart/ChartBar.stories';
import * as spacerStory from '../../theme/Spacer.stories';
import * as formStory from '../../widgets/Form.stories';

const {
  Center: { args: text },
} = textStory;

const {
  Default: { args: img },
} = imgStory;

const {
  Bar: { args: chart },
} = chartStory;

const {
  Normal: { args: spacer },
} = spacerStory as any;

const {
  Default: { args: form },
} = formStory as any;

const {
  Default: { args: panel },
} = panelStory;

const {
  Pills: { args: tab },
} = tabStory;

const {
  BtnLink: { args: btn },
} = btnStory;

const {
  Default: { args: btnVideo },
} = btnVideoStory;

const {
  DialogColumn: { args: dynamicTable },
} = dynamicTableStory;

const {
  Primary: { args: icon },
} = iconStory;

const {
  Default: { args: link },
} = linkStory;

const {
  TitleV1: { args: title },
} = titleStory;

export const base = [
  {
    label: 'Text',
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
    label: 'Btn Video',
    icon: { svg: 'play-circle-outline' },
    ...btnVideo,
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
      svg: 'color-helper',
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
