import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v1Component } from '@uiux/combs/showcase/showcase3v1/showcase3v1.component';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase3v1 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/展示 Showcase/3v1',
  id: 'showcase-3v1',
  component: Showcase3v1Component,
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
const content: IShowcase3v1 = {
  type: 'showcase-3v1',
  bg: {
    classes: 'bg-shadow bg-fill-width',
  },
  classes: 'text-light',
  bgImg: '/assets/images/showcase/bg2.jpeg',
  title: {
    label: '<strong>Storybook</strong> 是什么？',
    style: 'style-v1',
    classes: 'mat-display-3 blod',
  },
  content:
    '<p class="text-center">Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文</p><br>',
  carousel: {
    params: {
      slidesPerView: 1,
      navigation: false,
      centeredSlides: true,
    },
    classes: 'text-center',
    elements: [
      {
        type: 'img',
        src: '/assets/images/1-1/business-01.png',
        alt: 'porto1.jpg',
      },
      {
        type: 'img',
        src: '/assets/images/1-1/business-02.png',
        alt: 'porto2.jpg',
      },
      {
        type: 'img',
        src: '/assets/images/1-1/business-04.png',
        alt: 'porto2.jpg',
      },
    ],
  },
};

Default.args = {
  content,
};
