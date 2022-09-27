import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { CORE_CONFIG } from '@core/token/core.config';
import { ShareModule } from '@share/share.module';
import { CardComponent } from '@uiux/widgets/card/card.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
import { RouterTestingModule } from '@angular/router/testing';
export default {
  title: '基础/卡片/基础',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [DialogComponent, TextComponent],
      imports: [
        ShareModule,
        WidgetsModule,
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot(),
        RouterTestingModule,
        MatDialogModule,
        HttpClientModule,
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
Base.storyName = '无边框、无阴影';
Base.args = {
  content: {
    title: '高性能',
    subTitle: 'High Performance',
    classes: 'card-no-shadow',
    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
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

export const Avatar = Template.bind({});
Avatar.storyName = '头像及幻灯片';
Avatar.args = {
  content: {
    subTitle: '2022/03/04',
    avatar: {
      src: '/assets/images/showcase/weather.png',
      alt: '',
    },
    carousel: {
      params: {
        slidesPerView: 1,
        navigation: false,
        autoplay: {
          delay: 5000,
        },
        breakpoints: null,
      },
      elements: [
        {
          type: 'feature-box',
          hoverIcon: true,
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto1.jpg',
            alt: 'lazyload',
          },
        },
        {
          type: 'feature-box',
          hoverIcon: false,
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          ratios: 'media-4-3',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto2.jpg',
            alt: 'lazyload',
          },
        },
      ],
    },
    link: {
      href: '/use/1',
      label: 'Johnson',
    },
  },
};

export const BroderShadow = Template.bind({});
BroderShadow.storyName = '带边框和阴影';
BroderShadow.args = {
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
          value: '<a href="/node/1">庞博</a>,<a href="/node/2">Johnson</a>',
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
