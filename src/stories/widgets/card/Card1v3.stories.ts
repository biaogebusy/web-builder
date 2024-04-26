import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Card1v3Component } from '@uiux/widgets/card/card1v3/card1v3.component';
import * as TextStories from '@stories/base/Text.stories';
import { StorysModule } from '@core/module/storys.module';
import { ICard1v3 } from '@core/interface/widgets/ICard';

export default {
  title: '基础组件/卡片/1v3',
  id: 'card-1v3',
  component: Card1v3Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
      providers: [],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="300px" class="widget relative">${story}</div>`
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `卡片1v3主要应用在地图作为背景的页面，当点击某个卡片时，如果是dialog则弹窗显示对应widget的内容，否则emit item数据给外部组件订阅，当外部组件比如map订阅到item的数据，则更新地图的位置信息。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});
const text: any = TextStories.Title.args;
const base: ICard1v3 = {
  type: 'card-1v3',
  elements: [
    {
      title: '创客城',
      address: '南宁市高科路八号创客城',
      params: {
        address: '南宁市高科路八号创客城',
        title: '创客城',
      },
      meta: [
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '联系人',
          value: '张三',
        },
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '联系电话',
          value: '18878793xx',
        },
      ],
    },
    {
      title: '中关村',
      address: '南宁市高新区创新路中关村',
      params: {
        address: '南宁市高新区创新路中关村',
        title: '中关村',
      },
      meta: [
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '联系人',
          value: '李四',
        },
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '联系电话',
          value: '0771-78734454',
        },
      ],
    },
    {
      title: '华尔街工谷',
      address: '南宁市高新区发展大道189号华尔街工谷',
      params: {
        address: '南宁市高新区发展大道189号华尔街工谷',
        title: '华尔街工谷',
      },
      meta: [
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '联系人',
          value: '王五',
        },
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '联系电话',
          value: '0771-6543976',
        },
      ],
    },
    {
      title: 'Dialog',
      address: '南宁市高科路八号创客城',
      params: {
        address: '南宁市高科路八号创客城',
        title: '创客城',
      },
      meta: [
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '联系人',
          value: '张三',
        },
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '联系电话',
          value: '18878793xx',
        },
      ],
      dialog: [
        {
          type: 'text',
          ...text.content,
        },
      ],
    },
  ],
};
Base.args = {
  content: base,
};
