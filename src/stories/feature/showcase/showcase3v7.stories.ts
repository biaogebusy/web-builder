import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { Showcase3v7Component } from '@uiux/combs/showcase/showcase3v7/showcase3v7.component';
import { StorysModule } from '@core/module/storys.module';
import * as showcase3v5Stories from './showcase3v5.stories';
import { IShowcase3v7 } from '@core/interface/combs/IShowcase';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Showcase3v7Component> = {
  title: '特色组件/图文 Showcase/3v7',
  id: 'showcase-3v7',
  component: Showcase3v7Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Showcase3v7Component>;
export const Default: Story = {};
const showcase3v5: any = showcase3v5Stories.Default.args;
const content: IShowcase3v7 = {
  type: 'showcase-3v7',
  title: {
    ...showcase3v5.content.title,
  },
  bg: {
    classes: 'bg-shadow bg-fill-width',
  },
  classes: '',
  img: {
    src: '/assets/images/illustration/27.png',
    alt: 'OUR FEATURES',
    width: 500,
    height: 500,
    classes: 'object-contain',
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
};

Default.args = {
  content,
};
