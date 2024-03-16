import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Hero1v4Component } from '@uiux/combs/hero/hero1v4/hero1v4.component';
import { IHero1v4 } from '@core/interface/combs/IHero';
export default {
  title: '特色组件/首屏/1v4',
  id: 'hero-1v4',
  component: Hero1v4Component,
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
export const Default = Template.bind({});
Default.storyName = 'V1';
const content: IHero1v4 = {
  type: 'hero-1v4',
  spacer: 'xl',
  classes: '',
  text: {
    title: {
      label:
        '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
      classes: 'mat-display-2 bold',
      style: 'style-v1',
    },
    classes: 'p-x text-center',
    body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。',
    actionsAlign: 'center center',
    actions: [
      {
        type: 'btn',
        mode: 'raised',
        color: 'primary',
        href: '#',
        label: '立刻体验',
        target: '_blank',
      },
    ],
  },
  bg: {
    classes: 'bg-fill-width overlay- overlay-',
    img: {
      src: '/assets/images/bg/home-shape.png',
      hostClasses: '',
    },
  },
  widget: [
    {
      type: 'img',
      src: '/assets/images/illustration/29.png',
    },
  ],
};
Default.args = {
  content,
};

export const Shape = Template.bind({});
Shape.storyName = 'V2';
const shape: IHero1v4 = {
  spacer: 'xl',
  type: 'hero-1v4',
  classes: '',
  text: {
    ...Default.args.content.text,
    actionsAlign: 'center center',
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
        color: 'primary',
        label: '联系我们',
        icon: {
          inline: true,
          name: 'phone',
        },
        mode: 'stroked',
      },
    ],
  },
  bg: {
    classes: 'bg-fill-width overlay- overlay-',
    img: {
      src: '/assets/images/bg/bg-02.png',
      hostClasses: 'bg-center',
    },
  },
  order: -1,
  style: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  widget: [
    {
      type: 'img',
      style: {
        maxHeight: '400px',
      },
      src: '/assets/images/illustration/30.png',
    },
  ],
};
Shape.args = {
  content: shape,
};
