import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/storys.module';
import { Hero1v3Component } from '@uiux/combs/hero/hero1v3/hero1v3.component';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { PlayerComponent } from '@uiux/widgets/media/player/player.component';

export default {
  title: '特色组件/英雄区/1v3',
  id: 'hero-1v3',
  component: Hero1v3Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [DialogComponent, PlayerComponent],
      imports: [StorysModule.forRoot()],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const V1 = Template.bind({});

V1.args = {
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

export const V2 = Template.bind({});

V2.args = {
  content: {
    spacer: 'xl',
    text: {
      title: {
        label: '信使是一款 Angular 前端框架',
        classes: 'mat-display-4 bold',
        style: 'style-v4',
      },
      classes: 'p-x text-light',
      body: '信使是一款高度定制的 Angular UI 组件库，拥有超过60个复合组件，多个主题，可以快速适配您的品牌做活动营销。',
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
          type: 'btn-video',
          color: 'primary',
          video: {
            options: {
              controls: true,
              aspectRatio: '16:9',
              poster: '/assets/images/16-9/business-02.jpg',
              sources: [
                { src: '/assets/video/afterglow.mp4', type: 'video/mp4' },
              ],
            },
          },
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
      classes: 'bg-fill-width bg-primary bg-center overlay overlay-',
      img: {
        src: '/assets/images/bg/bg-hero.svg',
        mobile: '/assets/images/bg/bg-hero.svg',
      },
    },
  },
};
