import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { ListModule } from '@uiux/combs/list/list.module';
import { TreeListComponent } from '@uiux/combs/list/tree-list/tree-list.component';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
export default {
  title: 'Components/list/Tree list',
  component: TreeListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        ListModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
} as Meta;

const Template: Story<TreeListComponent> = (args) => ({
  component: TreeListComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    tree: [
      {
        label: '金融 100T',
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
    ],
  },
};
