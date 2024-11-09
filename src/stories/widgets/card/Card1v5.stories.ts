import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { Card1v5Component } from '@uiux/widgets/card/card1v5/card1v5.component';
import { ICard1v5 } from '@core/interface/widgets/ICard';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Card1v5Component> = {
  title: '基础组件/卡片/1v5',
  id: 'card-1v5',
  component: Card1v5Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(
      story => `<div class="widget relative w-[370px]">${story}</div>`
    ),
  ],
};

export default meta;

type Story = StoryObj<Card1v5Component>;
export const StepFirst: Story = {};
const first: ICard1v5 = {
  type: 'card-1v5',
  title: '讨论 Builder 架构',
  body: '讨论未来的发展方向和基础架构，是否可以融入 AI 生成相应的内容，为用户提供优秀的数字创新体验。',
  more: {
    href: '/node/1',
    target: '_blank',
    label: '查看更多',
  },
  footer: {
    label: 'Step 01.',
    icon: {
      svg: 'chevron-double-right',
    },
  },
};
StepFirst.args = {
  content: first,
};

export const StepEnd: Story = {};
const end: ICard1v5 = {
  type: 'card-1v5',
  title: '讨论支持多语言',
  body: '前端框架如何支持多语言，要同时考虑界面多语言的翻译和数据内容多语言的翻译问题。',
  more: {
    href: '/node/1',
    target: '_blank',
    label: '查看更多',
  },
  footer: {
    label: 'Step 03.',
    icon: {
      svg: 'check-all',
    },
  },
};
StepEnd.args = {
  content: end,
};
