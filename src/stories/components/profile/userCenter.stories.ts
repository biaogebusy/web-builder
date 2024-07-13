import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { UserCenterComponent } from '@uiux/combs/profile/user-center/user-center.component';
import { StorysModule } from '@core/module/storys.module';
import { IUserCenter } from '@core/interface/IUserCenter';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<UserCenterComponent> = {
  title: '复合组件/用户/用户中心',
  id: 'user-center',
  component: UserCenterComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<UserCenterComponent>;
export const Default: Story = {};
const content: IUserCenter = {
  type: 'user-center',
  params: {
    showProfile: false,
    showDetails: false,
  },
  main: {
    spacer: 'sm',
    bg: {
      classes: 'bg-fill-width bg-shadow',
    },
  },
  left: [
    {
      type: 'user-card',
      menu: [
        {
          type: 'link',
          label: '资料更新',
          dialog: {
            params: {
              width: '1200px',
              disableClose: true,
            },
            afterClosed: {
              success: {
                label: '更新资料成功！',
              },
              emit: true,
            },
            data: [
              {
                type: 'iframe',
                url: '/?path=/story/full-calendar--default',
                height: '900',
              },
            ],
          },
        },
      ],
    },
  ],
  right: [
    {
      type: 'showcase-3v6',
      title: {
        type: 'text',
        spacer: 'xs',
        title: {
          label: '快捷入口',
          style: 'style-v4',
        },
      },
      params: {},
      spacer: 'xs',
      row: '4',
      elements: [
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            width: 45,
            height: 45,
            alt: 'logo',
          },
          css3: true,
          link: {
            label: '发布文章',
            classes: 'bold',
            dialog: {
              params: {
                width: '1200px',
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
                  url: '/',
                  height: '1000',
                },
              ],
            },
          },
          subTitle: '发布内容到文章',
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            width: 45,
            height: 45,
            alt: 'logo',
          },
          css3: true,
          link: {
            label: '发布博客',
            classes: 'bold',
            dialog: {
              params: {
                width: '1200px',
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
                  url: '/',
                  height: '1200',
                },
              ],
            },
          },
          subTitle: '发布内容到博客',
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            width: 45,
            height: 45,
            alt: 'logo',
          },
          css3: true,
          link: {
            label: '我的收藏',
            classes: 'bold',
            href: '#',
          },
          subTitle: '查看收藏的内容',
        },
      ],
    },
    {
      type: 'showcase-3v6',
      row: '3',
      spacer: 'xs',
      title: {
        type: 'text',
        spacer: 'xs',
        title: {
          label: '快捷入口',
          style: 'style-v4',
        },
      },
      params: {
        reqRoles: [],
      },
      action: {
        label: '管理更多',
        href: '/',
        style: 'style-v1',
        icon: 'open_in_new',
      },
      elements: [
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            width: 45,
            height: 45,
            alt: 'logo',
          },
          css3: true,
          link: {
            label: '填写订单',
            classes: 'bold',
            dialog: {
              params: {
                width: '1200px',
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
                  url: '/',
                  height: '1000',
                },
              ],
            },
          },
          subTitle: '发布工作需求',
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            width: 45,
            height: 45,
            alt: 'project.png',
          },
          css3: true,
          subTitle: '发布项目内容',
          link: {
            href: '/',
            label: '项目',
            classes: 'bold',
          },
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            width: 45,
            height: 45,
            alt: 'meeting.png',
          },
          css3: true,
          subTitle: '发布会议',
          link: {
            href: '/',
            label: '会议',
            classes: 'bold',
          },
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            width: 45,
            height: 45,
            alt: 'doc.png',
          },
          css3: true,
          subTitle: '发布资料',
          link: {
            href: '/',
            label: '文库资料',
            classes: 'bold',
          },
        },
        {
          img: {
            src: '/assets/images/logo/codepen.svg',
            width: 45,
            height: 45,
            alt: 'customer.png',
          },
          css3: true,
          subTitle: '创建新客户',
          link: {
            href: '/',
            label: '客户',
            classes: 'bold',
          },
        },
      ],
    },
  ],
};
Default.args = {
  content,
};
