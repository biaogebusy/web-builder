import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/storys.module';
import { Hero1v3Component } from '@uiux/combs/hero/hero1v3/hero1v3.component';

export default {
  title: '特色组件/英雄区/1v3',
  id: 'hero-1v3',
  component: Hero1v3Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
  ],
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
        label: '使用信使构建你们的项目',
        classes: 'mat-display-4 bold',
        style: 'style-v4',
      },
      classes: 'p-x',
      body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
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
    right: [
      {
        type: 'img',
        hostClasses: 'img-bg-shape',
        src: '/assets/images/illustration/29.png',
      },
    ],
  },
};
