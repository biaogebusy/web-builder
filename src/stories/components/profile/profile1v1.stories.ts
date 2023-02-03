import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Profile1v1Component } from '@uiux/combs/profile/profile1v1/profile1v1.component';
import * as SwiperStories from 'src/stories/widgets/Swiper.stories';
import * as MediaObjectGroupStories from 'src/stories/widgets/media/MediaObjectGroup.stories';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '复合组件/用户/用户资料',
  id: 'profile-1v1',
  component: Profile1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
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
        body: '<p>我是一名充满热情和激情的程序员，对技术有着浓厚的兴趣。我通过不断学习和实践，已经具备了丰富的开发经验。我善于使用各种编程语言，能够快速高效地完成各类项目开发任务。我相信，通过我的技术实力，可以为公司和客户带来更大的价值，并不断推进技术的进步。',
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
