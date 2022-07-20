import { ShareModule } from '../../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CardComponent } from '../../../app/uiux/widgets/card/card.component';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { CORE_CONFIG } from '../../../app/core/token/core.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
export default {
  title: 'Widgets/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="300px" class="position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<CardComponent> = (args) => ({
  component: CardComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    title: 'JOHNSON',
    subTitle: 'Frontend Devel',
    classes: 'card-no-shadow',
    body: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. ',
    feature: {
      fullIcon: 'fullscreen',
      openIcon: 'open_in_new',
      link: '#',
      ratios: 'media-4-3',
      img: {
        classes: 'object-fit',
        src: '/assets/images/cases/porto1.jpg',
        alt: 'alt',
      },
    },
  },
};

export const Card = Template.bind({});

Card.args = {
  content: {
    header: {
      meta: [
        {
          label: '',
          value: '<span class="badge">第一次会议</span>',
        },
        {
          label: '会议期间',
          value: '周一，04/11/2022 11:30<br>周一，04/11/2022 16:30',
        },
        {
          label: '会议地址',
          value: '中国上海市浦东新区 线上会议',
        },
        {
          label: '参会人员',
          value: '<a href="/node/1">庞博</a>,<a href="/node/2">杜长明</a>',
        },
        {
          label: '工作工时',
          value: '1',
        },
      ],
    },
    feature: {
      type: 'feature-box',
      hoverIcon: true,
      fullIcon: 'fullscreen',
      ratios: 'media-16-9',
      img: {
        classes: 'object-fit',
        src: '/assets/images/cases/porto1.jpg',
        alt: 'lazyload',
      },
    },
    footer: {
      meta: [
        {
          label: '相关项目',
          value: '<a href="/node/1">药审分中心制度修改</a>',
        },
        {
          label: '会议文件',
          value: {
            label: ['文件名1', '文件名2'],
            elements: [
              {
                src: '/assets/images/cases/porto1.jpg',
                caption: '文件名1',
                thumb: '/assets/images/cases/porto1.jpg',
              },
              {
                src: '/assets/images/cases/porto2.jpg',
                caption: '文件名2',
                thumb: '/assets/images/cases/porto2.jpg',
              },
            ],
          },
          params: {
            lightbox: true,
          },
        },
        {
          label: '会议内容',
          value:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
          params: {
            line: 'two',
            shorten: 100,
            dialog: {
              label: '更多',
            },
          },
        },
        {
          label: '信息备注',
          value:
            'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
          params: {
            line: 'two',
            shorten: 100,
            dialog: {
              label: '更多',
            },
          },
        },
      ],
    },
    progressBar: {
      mode: 'determinate',
      value: 33,
    },
  },
};
