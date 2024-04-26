import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Card1v2Component } from '@uiux/widgets/card/card1v2/card1v2.component';
import { StorysModule } from '@core/module/storys.module';
import { ICard1v2 } from '@core/interface/widgets/ICard';

export default {
  title: '基础组件/卡片/1v2',
  id: 'card-1v2',
  component: Card1v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="50%" class="widget relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: ICard1v2 = {
  type: 'card-1v2',
  link: {
    href: '#',
    label: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
  },
  subTitle: '多语言',
  img: {
    href: '#',
    src: '/assets/images/cases/porto3.jpg',
    alt: 'alt',
  },
  bg: {
    classes: 'object-fit',
    img: {
      hostClasses: '',
      src: '/assets/images/showcase/pattern-01.png',
    },
  },
};
Default.args = {
  content,
};
