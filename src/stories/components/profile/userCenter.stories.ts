import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { UserCenterComponent } from '@uiux/combs/profile/user-center/user-center.component';
import { Profile1v1Component } from '@uiux/combs/profile/profile1v1/profile1v1.component';
import { UserProfileComponent } from '@uiux/combs/profile/user-center/user-profile/user-profile.component';
import { StorysModule } from '@core/storys.module';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { IframeComponent } from '@uiux/widgets/iframe/iframe.component';

export default {
  title: '复合组件/用户/用户中心',
  id: 'user-center',
  component: UserCenterComponent,
  decorators: [
    moduleMetadata({
      declarations: [Profile1v1Component, UserProfileComponent],
      entryComponents: [DialogComponent, IframeComponent],
      imports: [StorysModule.forRoot()],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
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
    ],
  },
};
