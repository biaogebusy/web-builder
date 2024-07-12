import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { Hero2v1Component } from '@uiux/combs/hero/hero2v1/hero2v1.component';
import { StorysModule } from '@core/module/storys.module';
import { ITextHero } from '@core/interface/widgets/IText';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Hero2v1Component> = {
  title: '特色组件/首屏/2v1',
  id: 'hero-2v1',
  component: Hero2v1Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Hero2v1Component>;
export const Default: Story = {};
const content: ITextHero = {
  type: 'hero-2v1',
  theme: 'text-light',
  params: {
    height: '750px',
  },
  text: {
    title: {
      label: '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
      style: 'style-v1',
      classes: 'mat-headline-2',
    },
    spacer: 'xl',
    classes: 'xy-center text-center',
    bg: {
      classes: 'bg-shadow overlay overlay-80',
      img: {
        src: '/assets/images/hero/1-6.jpg',
        mobile: '/assets/images/mobile/mobile-03.jpg',
      },
    },
    body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-">Storybook</strong> 页面时添加组件到预览页面。',
    actionsAlign: 'center center',
    actions: [
      {
        type: 'btn',
        mode: 'raised',
        color: 'primary',
        href: '#',
        label: '立刻体验',
      },
    ],
  },
};
Default.args = {
  content,
};

export const YCenter: Story = {};
YCenter.storyName = 'Y轴中心';
const yContent: ITextHero = {
  type: 'hero-2v1',
  theme: 'text-light',
  params: {
    height: '750px',
  },
  text: {
    title: {
      label: '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
      style: 'style-v4',
      classes: 'mat-headline-3',
    },
    spacer: 'xl',
    style: {
      width: '50%',
    },
    classes: 'y-center',
    bg: {
      classes: 'bg-shadow overlay overlay-80',
      img: {
        src: '/assets/images/hero/329.jpg',
        mobile: '/assets/images/mobile/mobile-04.jpg',
      },
    },
    body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-">Storybook</strong> 页面时添加组件到预览页面。',
    actionsAlign: 'start center',
    actions: [
      {
        type: 'btn',
        mode: 'raised',
        color: 'primary',
        href: '#',
        label: '了解更多',
      },
    ],
  },
};
YCenter.args = {
  content: yContent,
};

export const YCenterXCustom: Story = {};
YCenterXCustom.storyName = 'Y中心 X自定义';
const yCxCustom: ITextHero = {
  type: 'hero-2v1',
  theme: '',
  params: {
    height: '750px',
  },
  text: {
    title: {
      label:
        '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
      style: 'style-v4',
      classes: 'mat-headline-3',
    },
    spacer: 'xl',
    style: {
      width: '50%',
      left: '50%',
    },
    classes: 'y-center',
    bg: {
      classes: 'bg-shadow overlay overlay-20',
      img: {
        src: '/assets/images/hero/light-bg.jpeg',
        mobile: '/assets/images/mobile/follower-04.jpg',
      },
    },
    body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。',
    actionsAlign: 'start center',
    actions: [
      {
        type: 'btn',
        mode: 'raised',
        color: 'primary',
        href: '#',
        label: '了解更多',
      },
    ],
  },
};
YCenterXCustom.args = {
  content: yCxCustom,
};

export const XYCustom: Story = {};
XYCustom.storyName = 'XY自定义';
const xyCustom: ITextHero = {
  type: 'hero-2v1',
  theme: 'text-light',
  params: {
    height: '750px',
  },
  text: {
    title: {
      label:
        '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
      style: 'style-v4',
      classes: 'mat-headline-3',
    },
    spacer: 'xl',
    style: {
      width: '50%',
      left: '40%',
      top: '10%',
    },
    classes: 'absolute',
    bg: {
      classes: 'bg-shadow overlay overlay-80',
      img: {
        src: '/assets/images/hero/light-bg.jpeg',
        mobile: '/assets/images/mobile/mobile-02.jpg',
      },
    },
    body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。',
    actionsAlign: 'start center',
    actions: [
      {
        type: 'btn',
        mode: 'raised',
        color: 'primary',
        href: '#',
        label: '了解更多',
      },
    ],
  },
};
XYCustom.args = {
  content: xyCustom,
};
