import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NodeModule } from '@uiux/combs/node/node.module';
import { StorysModule } from '@core/module/storys.module';
import { RelateComponent } from '@uiux/combs/node/relate/relate.component';

export default {
  title: '示例页面/内容类型/相关性',
  id: 'relate',
  component: RelateComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot(), NodeModule],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `主要展示几个不同的数据类型互相关联的展示`,
      },
    },
  },
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
      label: '团队A中国移动中标发票',
      style: 'style-v4',
      classes: 'mat-display-1 m-bottom-0',
    },
    summary: {
      left: [
        {
          type: 'icon',
          color: 'primary',
          svg: 'credit-card-check',
        },
        {
          type: 'text',
          space: 'none',
          classes: 'mat-display-4 m-bottom-0',
          body: '10,000',
        },
        {
          type: 'dropdown-menu',
          btn: {
            label: '发票预览',
            color: 'primary',
            mode: 'raised',
          },
          child: [
            {
              type: 'link',
              label: '发票A',
              dialog: {
                params: {
                  width: '800px',
                },
                data: [
                  {
                    type: 'text',
                    content:
                      '<img src="/assets/images/16-9/business-01.jpg" />',
                  },
                ],
              },
            },
            {
              type: 'link',
              label: '发票B',
              dialog: {
                params: {
                  width: '800px',
                },
                data: [
                  {
                    type: 'text',
                    content:
                      '<img src="/assets/images/16-9/business-02.jpg" />',
                  },
                ],
              },
            },
          ],
        },
      ],
      middle: {
        label: '发票信息',
        elements: [
          [
            {
              label: '类别',
              value: '广告物料',
            },
            {
              label: '开票日期',
              value: '2023/02/23',
            },
          ],
          [
            {
              label: '团队负责人',
              value: '张三',
            },
          ],
          [
            {
              label: '备注',
              value: '该发票类别有误，但是已经告知，下次要及时',
            },
          ],
        ],
      },
      right: {
        label: '更新记录',
        elements: [
          {
            type: 'table',
            header: [
              {
                label: '用户',
                key: 'user',
              },
              {
                label: '时间',
                key: 'date',
              },
            ],
            elements: [
              {
                user: '张三',
                date: '2023/02/21',
              },
              {
                user: '李四',
                date: '2023/02/23',
              },
            ],
          },
        ],
      },
    },
  },
};
