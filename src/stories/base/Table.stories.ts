import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { DynamicTableComponent } from '@uiux/widgets/dynamic-table/dynamic-table.component';
import { StorysModule } from '@core/module/storys.module';
import { random } from 'lodash-es';
import { IDynamicTable } from '@core/interface/widgets/IWidgets';

export default {
  title: '基本元素/表格',
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
const content: IDynamicTable = {
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
};
Default.args = {
  content,
};

export const CustomStyle = Template.bind({});
CustomStyle.storyName = '自定义列样式';
const custom: IDynamicTable = {
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
};
CustomStyle.args = {
  content: custom,
};

export const DialogColumn = Template.bind({});
DialogColumn.storyName = '支持弹窗';
const dialog: IDynamicTable = {
  type: 'dynamic-table',
  header: [
    {
      label: '模块',
      key: 'module',
    },
    {
      label: '描述',
      key: 'info',
    },
    {
      label: '安装量',
      key: 'tatol',
    },
    {
      label: '备注',
      key: 'remarks',
      dialog: {
        shorten: 5,
        label: '更多',
      },
    },
  ],
  elements: [
    {
      module: 'Slick Carousel',
      tatol: random(1000, 10000),
      info: 'Slick 轮播，强大响应式且性能优异的图片轮播解决方案，有非常丰富的配置选项，slick 官网自己调侃这是你最后使用的图片轮播',
      remarks: '查看',
    },
    {
      module: 'Views Slideshow',
      tatol: random(1000, 10000),
      info: '视图轮播模块，该模块是最受欢迎的幻灯片模块，可放任何内容，高度定制	',
      remarks: '查看',
    },
    {
      module: 'Colorbox',
      tatol: random(1000, 10000),
      info: '轻量级高可定制幻灯片模块，高度集成在 Drupal 中，可放图片，Iframed 或者在线内容等等	',
      remarks: '查看',
    },
    {
      module: 'Flex Slider',
      tatol: random(1000, 10000),
      info: '响应式、可调整大小、适配浏览器和移动设备，支持移动设备手势滑动	',
      remarks: '查看',
    },
    {
      module: 'Owl Carousel',
      tatol: random(1000, 1000),
      info: '提供视图样式，字段格式化和管理 UI，支持响应式、移动手势、高定制幻灯片，CSS3 动画，JSON，有可用的回调，自定义事件等	',
      remarks: '查看',
    },
  ],
};
DialogColumn.args = {
  content: dialog,
};

export const ExpandColumn = Template.bind({});
ExpandColumn.storyName = '可折叠指定列';
const expand: IDynamicTable = {
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
};
ExpandColumn.args = {
  content: expand,
};
