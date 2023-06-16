import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase1v3Component } from '@uiux/combs/showcase/showcase1v3/showcase1v3.component';
import * as ContactUs from 'src/stories/drupal/ContactUs.stories';
import { StorysModule } from '@core/module/storys.module';
import * as btnVideoStory from '@stories/widgets/base/BtnVideo.stories';
export default {
  title: '特色组件/展示 Showcase/1v3',
  id: 'showcase-1v3',
  component: Showcase1v3Component,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '默认';
Default.args = {
  content: {
    type: 'showcase-1v3',
    title: {
      label: '为什么你将会喜欢信使？',
      style: 'style-v1',
      classes: 'mat-display-1',
    },
    classes: 'text-light',
    bg: {
      classes: 'bg-fill-width overlay overlay-20',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/hero/bg-pattern-hero.png',
        alt: 'page title',
      },
    },
    elements: [
      {
        type: 'text',
        spacer: 'none',
        style: {
          margin: '0 auto',
          'text-align': 'center',
          width: '600px',
        },
        body: 'Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。',
        actionsAlign: 'center center',
        actions: [
          {
            label: '了解更多',
            type: 'btn-animate',
            href: '#',
            style: 'style-v1',
            icon: 'verified_user',
          },
          {
            label: '回到官网',
            type: 'btn-animate',
            href: '#',
            style: 'style-v1',
            icon: 'fingerprint',
          },
        ],
      },
    ],
  },
};

export const Contact = Template.bind({});
Contact.storyName = 'Widgets';
const contact: any = ContactUs.Default.args;
Contact.args = {
  content: {
    id: 'form',
    type: 'showcase-1v3',
    title: {
      label: '联系我们',
      style: 'style-v1',
    },
    elements: [
      {
        type: 'text',
        spacer: 'none',
        classes: 'text-center',
        body: '信使是以 Material UI为基础的 Angular 前端框架，为Drupal的数字创新提供友好的用户体验。',
      },
      contact.content,
    ],
  },
};

const {
  Default: {
    args: { content: btnVideo },
  },
} = btnVideoStory as any;

export const Video = Template.bind({});
Video.storyName = '视频';
Video.args = {
  content: {
    type: 'showcase-1v3',
    title: {
      label: '为什么你将会喜欢信使？',
      style: 'style-v1',
      classes: 'mat-display-1',
    },
    classes: 'text-light',
    bg: {
      classes: 'bg-fill-width overlay overlay-80',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/16-9/business-17.jpeg',
        alt: 'page title',
      },
    },
    elements: [
      {
        type: 'text',
        spacer: 'none',
        style: {
          margin: '0 auto',
          'text-align': 'center',
          width: '600px',
        },
        body: 'Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。',
        actionsAlign: 'center center',
        actions: [
          {
            ...btnVideo,
          },
        ],
      },
    ],
  },
};
