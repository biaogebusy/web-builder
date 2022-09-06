import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { ShareModule } from '../../app/share/share.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { DynamicTableComponent } from '../../app/uiux/widgets/dynamic-table/dynamic-table.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

export default {
  title: 'Widgets/Dynamic table',
  component: DynamicTableComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [DialogComponent, TextComponent],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<DynamicTableComponent> = (args) => ({
  component: DynamicTableComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
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
        name: '受理费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks: '已收到',
      },
      {
        name: '受理费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks: '已收到',
      },
      {
        name: '受理费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks: '已收到',
      },
    ],
  },
};

export const CustomStyle = Template.bind({});

CustomStyle.args = {
  content: {
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
    elements: [
      {
        name: '受理费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks: '已收到',
      },
      {
        name: '受理费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks: '已收到',
      },
      {
        name: '受理费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks: '已收到',
      },
    ],
  },
};

export const DialogColumn = Template.bind({});

DialogColumn.args = {
  content: {
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
        name: '受理费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks:
          'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
      {
        name: '受理费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks:
          'consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
      },
      {
        name: '受理费',
        money: '3679',
        billingTime: '2022-03-03',
        deliveryTime: '2022-03-04',
        remarks:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
      },
    ],
  },
};
