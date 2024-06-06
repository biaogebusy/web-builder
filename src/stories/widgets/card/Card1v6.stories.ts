import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Card1v6Component } from '@uiux/widgets/card/card1v6/card1v6.component';
import { ICard1v6 } from '@core/interface/widgets/ICard';

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
      (story) => `<div fxFlex="255px" class="widget relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: ICard1v6 = {
  title: {
    classes: 'text-primary',
    label: '免费',
  },
  type: 'card-1v6',
  prefix: '¥',
  number: '79',
  suffix: '/月',
  body: '<ul class="list-done"><li>完全开放</li><li>安全检测机制</li><li>高质量交付源码文件</li><li>免费一个域名绑定</li><li>二十四小时免费技术支持</li></ul>',
  classes: '',
  actionsAlign: 'start',
  actions: [
    {
      href: '#',
      label: '开始',
      type: 'btn',
      color: 'primary',
      mode: 'raised',
    },
    {
      type: 'btn',
      label: '立即购买',
      href: '#',
      mode: 'raised',
      color: 'primary',
    },
  ],
};
Default.args = {
  content,
};
