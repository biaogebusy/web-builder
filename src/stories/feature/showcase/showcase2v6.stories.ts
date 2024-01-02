import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase2v6Component } from '@uiux/combs/showcase/showcase2v6/showcase2v6.component';
import * as Card1v2Stories from 'src/stories/widgets/card/Card1v2.stories';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase2v6 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/展示 Showcase/2v6',
  id: 'showcase-2v6',
  component: Showcase2v6Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const card1v2: any = Card1v2Stories.Default.args;
const content: IShowcase2v6 = {
  type: 'showcase-2v6',
  text: {
    title: {
      label: '<strong class="text-primary">Storybook</strong> 是什么？',
      style: 'style-v1',
      classes: 'mat-display-2 blod',
    },
    body: '<p class="text-center">Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文</p>',
  },
  spacer: 'md',
  bg: { classes: '' },
  classes: '',
  row: 2,
  fullWidth: true,
  elements: [
    {
      type: 'card-1v2',
      link: {
        href: '#',
        label:
          'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观',
      },
      subTitle: '组件驱动开发',
      img: {
        href: '#',
        src: '/assets/images/16-9/business-06.jpg',
        alt: 'alt',
      },
      bg: {
        classes: 'object-fit',
        img: {
          hostClasses: '',
          src: '/assets/images/showcase/pattern-01.png',
        },
      },
    },
    {
      type: 'card-1v2',
      link: {
        href: '#',
        label:
          'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作',
      },
      subTitle: '组件展示和测试',
      img: {
        href: '#',
        src: '/assets/images/16-9/business-11.jpg',
        alt: 'alt',
      },
      bg: {
        classes: 'object-fit',
        img: {
          hostClasses: '',
          src: '/assets/images/showcase/pattern-02.png',
        },
      },
    },
  ],
};
Default.args = {
  content,
};
