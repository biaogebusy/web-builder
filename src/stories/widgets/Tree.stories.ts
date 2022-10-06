import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TreeComponent } from '@circlon/angular-tree-component';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: '基础/树形',
  id: 'tree',
  component: TreeComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
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
    label: '金融',
    key: 'hundred_point',
    expandAll: true,
    value: 245,
    nodes: [
      {
        label: '全部',
        value: '',
      },
      {
        value: 861,
        label: '民商诉讼',
        elements: [
          {
            value: 1164,
            label: '互联网股权众筹纠纷',
          },
          {
            value: 1165,
            label: '以金融机构为债务人的破产纠纷',
          },
          {
            value: 875,
            label: '证券纠纷',
            elements: [
              {
                value: 1167,
                label: '客户交易结算资金纠纷',
              },
            ],
          },
        ],
      },
      {
        value: 1006,
        label: '公司',
        elements: [
          {
            value: 1030,
            label: '上市公司收购纠纷',
          },
          {
            value: 1018,
            label: '发起人责任纠纷',
          },
        ],
      },
    ],
  },
};
