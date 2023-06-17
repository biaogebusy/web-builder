import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Hero1v4Component } from '@uiux/combs/hero/hero1v4/hero1v4.component';
export default {
  title: '特色组件/英雄区/1v4',
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
Default.args = {
  content: {
    type: 'hero-1v4',
    spacer: 'xl',
    text: {
      title: {
        label:
          '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
        classes: 'mat-display-4 bold',
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
      classes: 'bg-fill-width overlay overlay-',
      img: {
        src: '/assets/images/bg/home-shape.png',
        hostClasses: 'bg-center',
      },
    },
    widget: [
      {
        type: 'img',
        src: '/assets/images/illustration/29.png',
      },
    ],
  },
};

export const Order = Template.bind({});
Order.storyName = 'V2';
Order.args = {
  content: {
    spacer: 'xl',
    type: 'hero-1v4',
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
      classes: 'bg-fill-width overlay overlay-',
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
  },
};
