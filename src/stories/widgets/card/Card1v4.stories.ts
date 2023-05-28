import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import * as TextStories from '../base/Text.stories';
import { StorysModule } from '@core/module/storys.module';
import { Card1v4Component } from '@uiux/widgets/card/card1v4/card1v4.component';

export default {
  title: '基础组件/卡片/1v4',
  id: 'card-1v4',
  component: Card1v4Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
      providers: [],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="300px" class="position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});
const text: any = TextStories.Title.args;
Base.args = {
  content: {},
};
