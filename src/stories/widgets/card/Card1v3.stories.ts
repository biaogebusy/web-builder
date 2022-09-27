import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { Card1v3Component } from '@uiux/widgets/card/card1v3/card1v3.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
export default {
  title: '基础/卡片/1v3',
  component: Card1v3Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        BrowserAnimationsModule,
        ScrollingModule,
        HttpClientModule,
      ],
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
Base.args = {
  content: {
    elements: [
      {
        title: '第一法庭',
        address: '良庆区玉洞街道玉洞大道8-1号',
        params: {
          address: '良庆区玉洞街道玉洞大道8-1号',
          title: '第一法庭',
        },
        meta: [
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '经办人员',
            value: '李四',
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
        title: '第二法庭',
        address: '良庆区玉洞街道玉洞大道86号',
        params: {
          address: '良庆区玉洞街道玉洞大道86号',
          title: '第二法庭',
        },
        meta: [
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '经办人员',
            value: '张三',
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
        title: '第三法庭',
        address: '良庆区玉洞街道玉洞大道80号',
        params: {
          address: '良庆区玉洞街道玉洞大道80号',
          title: '第三法庭',
        },
        meta: [
          {
            icon: {
              color: 'warn',
              svg: 'arrow_right',
              inline: true,
            },
            label: '经办人员',
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
    ],
  },
};
