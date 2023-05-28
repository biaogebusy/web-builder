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

Default.args = {
  content: {
    spacer: 'xl',
    text: {
      title: {
        label: 'Conduct More Customer In A Better Way',
        classes: 'mat-display-4 bold',
        style: 'style-v1',
      },
      classes: 'p-x text-center',
      body: 'Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.',
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
    bottom: [
      {
        type: 'img',
        src: '/assets/images/illustration/29.png',
      },
    ],
  },
};
