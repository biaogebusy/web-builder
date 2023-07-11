import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Card1v1Component } from '@uiux/widgets/card/card1v1/card1v1.component';
import { StorysModule } from '@core/module/storys.module';
import { ICard1v1 } from '@core/interface/widgets/ICard';

export default {
  title: '基础组件/卡片/1v1',
  id: 'card-1v1',
  component: Card1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div fxFlex="33.33%" class="widget position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: ICard1v1 = {
  type: 'card-1v1',
  link: {
    href: '#',
    label: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
  },
  user: '表歌',
  time: '2022/09/27',
  feature: {
    fullIcon: 'fullscreen',
    openIcon: 'open_in_new',
    link: '#',
    ratios: 'media-4-3',
    img: {
      classes: 'object-fit',
      src: '/assets/images/cases/porto3.jpg',
      alt: 'alt',
    },
  },
  moreLabel: '查看更多',
};
Default.args = {
  content,
};

export const Component = Template.bind({});
const comp: ICard1v1 = {
  type: 'card-1v1',
  link: {
    href: '#',
    label: 'Showcase 1v1',
  },
  components: [
    {
      type: 'hero-1v4',
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
      widget: [
        {
          type: 'img',
          src: '/assets/images/illustration/29.png',
        },
      ],
    },
  ],
};
Component.args = {
  content: comp,
};
