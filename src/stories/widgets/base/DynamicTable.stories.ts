import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { DynamicTableComponent } from '@uiux/widgets/dynamic-table/dynamic-table.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '基础组件/基本元素/表格',
  id: 'table',
  component: DynamicTableComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: '基于 Material Table 组件',
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
Default.parameters = {
  controls: {
    include: ['content', 'form'],
  },
};
Default.args = {
  content: {
    type: 'dynamic-table',
    header: [
      {
        label: '发票名称',
        key: 'name',
      },
      {
        label: '开票金额',
        key: 'money',
      },
      {
        label: '交票时间',
        key: 'billingTime',
      },
      {
        label: '发票时间',
        key: 'deliveryTime',
      },
      {
        label: '备注',
        key: 'remarks',
      },
    ],
    elements: [
      {
        name: '经费',
        money: '1000',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks: '已收到',
      },
      {
        name: '咨询费',
        money: '2000',
        billingTime: '2022-04-02',
        deliveryTime: '2022-04-03',
        remarks: '已收到',
      },
      {
        name: '追加费',
        money: '3000',
        billingTime: '2022-03-03',
        deliveryTime: '2022-04-04',
        remarks: '未收到',
      },
    ],
  },
};

export const CustomStyle = Template.bind({});
CustomStyle.storyName = '自定义列样式';
CustomStyle.args = {
  content: {
    type: 'dynamic-table',
    header: [
      {
        label: '发票名称',
        key: 'name',
      },
      {
        label: '开票金额',
        key: 'money',
      },
      {
        label: '交票时间',
        key: 'billingTime',
        style: {
          textAlign: 'center',
          backgroundColor: 'rgba(0, 255, 51, 0.25)',
        },
      },
      {
        label: '发票时间',
        key: 'deliveryTime',
      },
      {
        label: '备注',
        key: 'remarks',
      },
    ],
    elements: Default.args.content.elements,
  },
};

export const DialogColumn = Template.bind({});
DialogColumn.storyName = '支持弹窗';
DialogColumn.args = {
  content: {
    type: 'dynamic-table',
    header: [
      {
        label: '发票名称',
        key: 'name',
      },
      {
        label: '开票金额',
        key: 'money',
      },
      {
        label: '交票时间',
        key: 'billingTime',
      },
      {
        label: '发票时间',
        key: 'deliveryTime',
      },
      {
        label: '备注',
        key: 'remarks',
        dialog: {
          shorten: 20,
          label: '更多',
        },
      },
    ],
    elements: [
      {
        name: '经费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks:
          'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
      {
        name: '经费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks:
          'consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
      },
      {
        name: '经费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      },
    ],
  },
};

export const ExpandColumn = Template.bind({});
ExpandColumn.storyName = '可折叠指定列';
ExpandColumn.args = {
  content: {
    type: 'dynamic-table',
    header: [
      {
        label: '还款次数',
        key: 'no',
      },
      {
        label: '执行款',
        key: 'paymentOne',
      },
      {
        label: '执行款二',
        key: 'paymentTwo',
      },
      {
        label: '执行款二',
        key: 'paymentThree',
      },
      {
        label: '利息',
        key: 'interest',
      },
      {
        label: '总合计',
        key: 'total',
      },
      {
        label: '还款日期',
        key: 'date',
      },
    ],
    elements: [
      {
        no: '1',
        paymentOne: '12000.00元',
        paymentTwo: '13000.00元',
        paymentThree: '13520.00元',
        interest: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
        total: '17658.00元',
        date: '2022/03/06',
        expand: [
          {
            type: 'text',
            spacer: 'none',
            title: {
              label: '违约金',
              style: 'style-v4',
            },
            body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
          },
          {
            type: 'text',
            spacer: 'none',
            title: {
              label: '逾期罚息',
              style: 'style-v4',
            },
            body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
          },
        ],
      },
      {
        no: '2',
        paymentOne: '12000.00元',
        paymentTwo: '13000.00元',
        paymentThree: '13520.00元',
        interest: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
        total: '17658.00元',
        date: '2022/03/06',
        expand: [
          {
            type: 'text',
            spacer: 'none',
            title: {
              label: '违约金',
              style: 'style-v4',
            },
            body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
          },
          {
            type: 'text',
            spacer: 'none',
            title: {
              label: '逾期罚息',
              style: 'style-v4',
            },
            body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
          },
        ],
      },
      {
        no: '3',
        paymentOne: '12000.00元',
        paymentTwo: '13000.00元',
        paymentThree: '13520.00元',
        interest: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
        total: '17658.00元',
        date: '2022/03/06',
        expand: [
          {
            type: 'text',
            spacer: 'none',
            title: {
              label: '违约金',
              style: 'style-v4',
            },
            body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
          },
          {
            type: 'text',
            spacer: 'none',
            title: {
              label: '逾期罚息',
              style: 'style-v4',
            },
            body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
          },
        ],
      },
      {
        no: '合计',
        paymentOne: '32000.00元',
        paymentTwo: '33000.00元',
        paymentThree: '33520.00元',
        interest: '8000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
        total: '57658.00元',
        date: '',
        expand: [
          {
            type: 'text',
            spacer: 'none',
            title: {
              label: '违约金',
              style: 'style-v4',
            },
            body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
          },
          {
            type: 'text',
            spacer: 'none',
            title: {
              label: '逾期罚息',
              style: 'style-v4',
            },
            body: '5000.00元<br><span class="sub">2022/02/01-2023/01/03</span>',
          },
        ],
      },
    ],
  },
};
