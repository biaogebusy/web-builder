import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Card1v6Component } from '@uiux/widgets/card/card1v6/card1v6.component';

export default {
  title: '基础组件/卡片/1v6',
  id: 'card-1v6',
  component: Card1v6Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
      providers: [],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div fxFlex="255px" class="widget position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.args = {
  content: {
    title: {
      classes: 'text-primary',
      label: 'FREE',
    },
    type: 'card-1v6',
    prefix: '$',
    number: '79',
    suffix: '/mo',
    body: '<ul class="list-done"><li>Full Access</li><li>Enhanced Security</li><li>Source Files</li><li>1 Domain Free</li><li>Free Installment</li></ul>',
    actionsAlign: 'start center',
    actions: [
      {
        href: '#',
        label: '开始',
        type: 'btn',
        color: 'primary',
        mode: 'raised',
      },
      {
        type: 'btn-animate',
        label: 'Buy Now',
        href: '#',
        style: 'style-v1',
        icon: 'open_in_new',
      },
    ],
  },
};
