import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { Card1v4Component } from '@uiux/widgets/card/card1v4/card1v4.component';
import { ICard1v4 } from '@core/interface/widgets/ICard';

const meta: Meta<Card1v4Component> = {
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
      (story) => `<div fxFlex="370px" class="widget relative">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<Card1v4Component>;
export const Default: Story = {};
const content: ICard1v4 = {
  type: 'card-1v4',
  img: {
    classes: 'w-full h-full object-cover',
    src: '/assets/images/avatar/01.jpeg',
  },
  star: 5,
  title: '- Johnson',
  subTitle: '前端开发',
  body: '信使是一个灵活可扩展性高的前端Anuglar框架，动态组件可以使得组件之间变得更加灵活，但是依赖循环也变得复杂。',
};
Default.args = {
  content,
};
