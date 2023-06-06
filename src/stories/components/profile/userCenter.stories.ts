import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { UserCenterComponent } from '@uiux/combs/profile/user-center/user-center.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '复合组件/用户/用户中心',
  id: 'user-center',
  component: UserCenterComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
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
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
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
              style: {
                width: '45px',
                height: '45px',
              },
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
                    url: '/manage/node/project/front/add?disable_sidebar=1',
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
              style: {
                width: '45px',
                height: '45px',
              },
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
                    url: '/manage/node/meeting/front/add?disable_sidebar=1',
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
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'logo',
            },
            css3: true,
            link: {
              label: '文章列表',
              classes: 'bold',
              href: '#',
            },
            subTitle: '查看项目文章列表',
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
          href: '/manage/case',
          style: 'style-v1',
          icon: 'open_in_new',
        },
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
                    url: '/sample/combs/other/autoclose',
                    height: '1000',
                  },
                ],
              },
            },
            subTitle: '发布工作需求给律师',
          },
          {
            img: {
              src: '/assets/images/logo/codepen.svg',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'case.png',
            },
            css3: true,
            subTitle: '发布案件内容',
            link: {
              href: '/manage/content/case/add?redirect=/preview&disable_sidebar=1',
              label: '案件',
              classes: 'bold',
            },
          },
          {
            img: {
              src: '/assets/images/logo/codepen.svg',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'project.png',
            },
            css3: true,
            subTitle: '发布项目内容',
            link: {
              href: '/manage/content/project/add?redirect=/preview&disable_sidebar=1',
              label: '项目',
              classes: 'bold',
            },
          },
          {
            img: {
              src: '/assets/images/logo/codepen.svg',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'meeting.png',
            },
            css3: true,
            subTitle: '发布会议',
            link: {
              href: '/manage/content/meeting/add?redirect=/preview&disable_sidebar=1',
              label: '会议',
              classes: 'bold',
            },
          },
          {
            img: {
              src: '/assets/images/logo/codepen.svg',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'doc.png',
            },
            css3: true,
            subTitle: '发布文库资料',
            link: {
              href: '/manage/content/doc_lib/add?redirect=/preview&disable_sidebar=1',
              label: '文库资料',
              classes: 'bold',
            },
          },
          {
            img: {
              src: '/assets/images/logo/codepen.svg',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'customer.png',
            },
            css3: true,
            subTitle: '创建新客户',
            link: {
              href: '/manage/content/customer/add?redirect=/preview&disable_sidebar=1',
              label: '客户',
              classes: 'bold',
            },
          },
          {
            img: {
              src: '/assets/images/logo/codepen.svg',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'handler.png',
            },
            css3: true,
            subTitle: '创建经办人',
            link: {
              href: '/manage/content/handler/add?redirect=/preview&disable_sidebar=1',
              label: '经办人',
              classes: 'bold',
            },
          },
          {
            img: {
              src: '/assets/images/logo/codepen.svg',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'faguan.png',
            },
            css3: true,
            subTitle: '创建法官',
            link: {
              href: '/manage/content/court/add?redirect=/preview&disable_sidebar=1',
              label: '法官',
              classes: 'bold',
            },
          },
          {
            img: {
              src: '/assets/images/logo/codepen.svg',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'fayuan.png',
            },
            css3: true,
            subTitle: '创建法院',
            link: {
              href: '/manage/content/judge/add?redirect=/preview&disable_sidebar=1',
              label: '法院',
              classes: 'bold',
            },
          },
          {
            img: {
              src: '/assets/images/logo/codepen.svg',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'business.png',
            },
            css3: true,
            subTitle: '创建业务对方',
            link: {
              href: '/manage/content/other_party/add?redirect=/preview&disable_sidebar=1',
              label: '业务对方',
              classes: 'bold',
            },
          },
        ],
      },
    ],
  },
};
