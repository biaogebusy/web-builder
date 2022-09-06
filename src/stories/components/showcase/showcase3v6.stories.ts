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
import { Showcase3v6Component } from '@uiux/combs/showcase/showcase3v6/showcase3v6.component';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
export default {
  title: 'Components/showcase/3v6',
  component: Showcase3v6Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
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

const Template: Story<Showcase3v6Component> = (args) => ({
  component: Showcase3v6Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'showcase-3v6',
    id: '',
    title: {
      type: 'text',
      spacer: 'sm',
      title: {
        label: '为所有开发者、所有应用场景而设计',
        style: 'style-v1',
      },
      body: '<p class="text-center">让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>',
    },
    bg: {
      classes: 'bg-light bg-fill-width',
    },
    row: '4',
    elements: [
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '响应式设计',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '基于 Material',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',

          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: 'Icon 库',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',

          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '使用 Sass 构建',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',

          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: 'W3C 验证',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '易于扩展',
      },
    ],
  },
};

export const Background = Template.bind({});

Background.args = {
  content: {
    id: '',
    title: {
      type: 'text',
      spacer: 'sm',
      title: {
        label: '职位招聘',
        style: 'style-v1',
      },
      body: '<p class="text-center">免费推送相关职位信息，关注公众号随时随地了解职位情况。</p>',
    },
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    row: '3',
    elements: [
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        link: {
          label: '前端开发工程师 @dialog',
          classes: 'bold',
          dialog: {
            params: {
              width: '1000px',
              disableClose: true,
            },
            afterClosed: {
              success: {
                label: '请检查是否发布成功！',
              },
              emit: true,
            },
            data: [
              {
                type: 'iframe',
                url: '/manage/node/meeting/front/add?disable_sidebar=1',
                height: '1000',
              },
            ],
          },
        },
        subTitle: '字节跳动，北京',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        link: {
          label: '前端架构师',
          classes: 'bold',
          href: '#',
        },
        subTitle: '美团，广州',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        link: {
          label: '后端开发',
          classes: 'bold',
          href: '#',
        },
        subTitle: '微软，北京',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        link: {
          label: 'UI 设计师',
          classes: 'bold',
          href: '#',
        },
        subTitle: '腾讯，深圳',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        link: {
          label: 'IOS 开发',
          classes: 'bold',
          href: '#',
        },
        subTitle: '华为，深圳',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        link: {
          label: '游戏开发',
          classes: 'bold',
          href: '#',
        },
        subTitle: '腾讯，成都',
      },
    ],
    action: {
      label: 'Read more',
      href: '#',
      style: 'style-v1',
      icon: 'open_in_new',
    },
  },
};
