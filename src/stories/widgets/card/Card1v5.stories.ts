import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Card1v5Component } from '@uiux/widgets/card/card1v5/card1v5.component';

export default {
  title: '基础组件/卡片/1v5',
  id: 'card-1v5',
  component: Card1v5Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
      providers: [],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="370px" class="position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const StepFirst = Template.bind({});
StepFirst.args = {
  content: {
    title: 'Discuss The Project',
    body: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century.",
    more: {
      href: '/node/1',
      target: '_blank',
      label: 'Read more',
    },
    footer: {
      label: 'Step 01.',
      icon: {
        svg: 'chevron-double-right',
      },
    },
  },
};

export const StepEnd = Template.bind({});
StepEnd.args = {
  content: {
    title: 'Discuss The Project',
    body: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century.",
    more: {
      href: '/node/1',
      target: '_blank',
      label: 'Read more',
    },
    footer: {
      label: 'Step 03.',
      icon: {
        svg: 'check-all',
      },
    },
  },
};
