import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '@share/share.module';
import { Profile1v1Component } from '@uiux/combs/profile/profile1v1/profile1v1.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import * as SwiperStories from 'src/stories/widgets/Swiper.stories';
import * as MediaObjectGroupStories from 'src/stories/widgets/media/MediaObjectGroup.stories';
export default {
  title: '组件/用户/1v1',
  id: 'profile-1v1',
  component: Profile1v1Component,
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
      ],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const swiper: any = SwiperStories.Base.args;
const medaiObjectGroup: any = MediaObjectGroupStories.Base.args;
Default.args = {
  content: {
    bannerBg: {
      classes: 'bg-fill-width overlay overlay-80',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/16-9/business-14.jpeg',
        alt: 'page title',
      },
    },
    avatar: {
      src: '/assets/images/avatar/01.jpeg',
      alt: 'Johnson',
    },
    name: 'Johnson',
    subTitle: 'Drupal 前端开发',
    details: {
      label: '个人资料',
      elements: [
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '职位',
          content: '前端开发',
        },
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '微信',
          content: 'biaogebusy',
        },
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '公众号',
          content: 'Drupal 自习室',
        },
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '邮箱',
          content: 'biaogebusy@example.com',
        },
        {
          icon: {
            color: 'warn',
            svg: 'arrow_right',
            inline: true,
          },
          label: '地址',
          content: '南宁',
        },
      ],
    },
    actions: [
      {
        type: 'btn',
        label: '编辑',
        icon: {
          name: 'editor',
          inline: true,
        },
        href: 'https://admin.zhaobg.com/manage/content/50/edit',
        target: '_blank',
      },
    ],
    content: [
      {
        label: '简介',
        type: 'text',
        spacer: 'none',
        body: '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      },
      {
        label: '技能',
        type: 'progress-group',
        elements: [
          {
            label: 'HTML/CSS',
            value: '95',
          },
          {
            label: 'Angular/JavaScript',
            value: '79',
          },
          {
            label: 'Drupal',
            value: '60',
          },
        ],
      },
      {
        label: '工作经历',
        type: 'media-object-group',
        ...medaiObjectGroup.content,
      },
      {
        label: '案例',
        type: 'swiper',
        ...swiper.content,
      },
    ],
  },
};
