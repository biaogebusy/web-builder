import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v7Component } from '@uiux/combs/showcase/showcase3v7/showcase3v7.component';
import { StorysModule } from '@core/module/storys.module';
import * as showcase3v5Stories from './showcase3v5.stories';

export default {
  title: '特色组件/展示 Showcase/3v7',
  id: 'showcase-3v7',
  component: Showcase3v7Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
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
const showcase3v5: any = showcase3v5Stories.Default.args;
Default.args = {
  content: {
    type: 'showcase-3v7',
    title: {
      ...showcase3v5.content.title,
    },
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    img: {
      src: '/assets/images/illustration/27.png',
      alt: 'OUR FEATURES',
    },
    left: [
      {
        ...showcase3v5.content.elements[0],
        style: 'style-v10',
      },
      {
        ...showcase3v5.content.elements[1],
        style: 'style-v10',
      },
      {
        ...showcase3v5.content.elements[2],
        style: 'style-v10',
      },
    ],
    right: [
      {
        ...showcase3v5.content.elements[3],
        style: 'style-v8',
      },
      {
        ...showcase3v5.content.elements[4],
        style: 'style-v8',
      },
      {
        ...showcase3v5.content.elements[5],
        style: 'style-v8',
      },
    ],
  },
};
