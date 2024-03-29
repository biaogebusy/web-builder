import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Hero1v3Component } from '@uiux/combs/hero/hero1v3/hero1v3.component';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import { IHero1v3 } from '@core/interface/combs/IHero';

export default {
  title: '特色组件/首屏/1v3',
  id: 'hero-1v3',
  component: Hero1v3Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
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
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

const {
  Default: {
    args: { content: btnVideo },
  },
} = btnVideoStory as any;
export const V1 = Template.bind({});
V1.storyName = 'V1';
const v1: IHero1v3 = {
  type: 'hero-1v3',
  spacer: 'xl',
  bg: {
    classes: '',
  },
  classes: '',
  text: {
    title: {
      label: '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
      classes: 'mat-display-2 bold',
      style: 'style-v4',
    },
    classes: 'p-x',
    body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong >Storybook</strong> 页面时添加组件到预览页面。',
    actions: [
      {
        type: 'btn',
        mode: 'raised',
        color: 'primary',
        href: '#',
        label: '立刻体验',
        target: '_blank',
      },
      {
        ...btnVideo,
      },
    ],
  },
  right: [
    {
      type: 'img',
      hostClasses: 'img-bg-shape',
      src: '/assets/images/illustration/29.png',
    },
  ],
};
V1.args = {
  content: v1,
};

export const V2 = Template.bind({});
V2.storyName = 'v2';
const v2: IHero1v3 = {
  type: 'hero-1v3',
  spacer: 'xl',
  classes: '',
  text: {
    ...V1.args.content.text,
    classes: 'text-light',
    actions: [
      {
        type: 'btn',
        mode: 'raised',
        color: 'primary',
        href: '#',
        label: '立刻体验',
        target: '_blank',
      },
      {
        type: 'btn',
        mode: 'raised',
        color: 'primary',
        href: '#',
        label: 'Demo',
        target: '_blank',
      },
      {
        type: 'btn',
        mode: 'raised',
        color: 'primary',
        href: '#',
        label: '下载',
        target: '_blank',
      },
      {
        ...btnVideo,
      },
    ],
  },
  right: [
    {
      type: 'img',
      hostClasses: 'img-bg-shape',
      src: '/assets/images/hero/hero-component.svg',
    },
  ],
  bg: {
    classes: 'bg-fill-width bg-primary bg-center',
    img: {
      src: '/assets/images/bg/bg-hero.svg',
      mobile: '/assets/images/bg/bg-hero.svg',
    },
  },
};
V2.args = {
  content: v2,
};
