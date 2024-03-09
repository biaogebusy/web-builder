import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Profile1v1Component } from '@uiux/combs/profile/profile1v1/profile1v1.component';
import * as SwiperStories from 'src/stories/widgets/Swiper.stories';
import * as MediaObjectGroupStories from 'src/stories/widgets/media/MediaObjectGroup.stories';
import { StorysModule } from '@core/module/storys.module';
import { IProfile1v1 } from '@core/interface/combs/IProfile';
import { comments } from '@stories/sample/node/comments.json';

export default {
  title: '示例页面/资料简介',
  id: 'profile-1v1',
  component: Profile1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
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
export const UserProfile = Template.bind({});
UserProfile.storyName = '用户资料';
const swiper: any = SwiperStories.Default.args;
const medaiObjectGroup: any = MediaObjectGroupStories.Default.args;
const content: IProfile1v1 = {
  type: 'profile-1v1',
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
        content: '广西南宁',
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
      href: '#',
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
};
UserProfile.args = {
  content,
};

export const Componey = Template.bind({});
Componey.storyName = '公司简介';
const componey: IProfile1v1 = {
  type: 'profile-1v1',
  bannerBg: {
    classes: 'bg-fill-width overlay overlay-80',
    img: {
      hostClasses: 'bg-center',
      src: '/assets/images/16-9/business-14.jpeg',
      alt: 'page title',
    },
  },
  avatar: {
    src: '/assets/images/logo/lenovo.svg',
    alt: '才华有限公司',
  },
  name: '才华有限公司',
  actions: [
    {
      type: 'btn',
      label: '编辑',
      icon: {
        name: 'editor',
        inline: true,
      },
      href: '#',
      target: '_blank',
    },
  ],
  details: {
    label: '公司资料',
    elements: [
      {
        icon: {
          color: 'warn',
          svg: 'arrow_right',
          inline: true,
        },
        label: '类型',
        content: '科技',
      },
      {
        icon: {
          color: 'warn',
          svg: 'arrow_right',
          inline: true,
        },
        label: '联系人',
        content: '张三',
      },
      {
        icon: {
          color: 'warn',
          svg: 'arrow_right',
          inline: true,
        },
        label: '联系方式',
        content: '18878718888',
      },
    ],
  },
  content: [
    {
      label: '简介',
      type: 'text',
      spacer: 'none',
      body: '<p>才华有限公司，宛如一座汇聚智慧星光的灯塔，我们秉持“人尽其才，文以载道”的信念，悠游于浩瀚的人才海洋。公司专注于挖掘并点亮个体的内在光芒，精心编织了一张横跨各行业的文艺经纬，为每一颗璀璨的才华之星提供翱翔的舞台。我们凭借深厚的艺术底蕴和敏锐的时代洞察力，倾心打造定制化的培养方案，旨在让每一份独特的才华在此诗意绽放，共同谱绘一幅生机盎然的职场画卷。</p>',
    },
    {
      type: 'showcase-2v1',
      row: 5,
      label: '相关材料',
      spacer: 'xs',
      elements: [
        {
          type: 'card',
          title: '营业执照',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto1.jpg',
              alt: '营业执照',
            },
          },
          progressBar: {
            mode: 'determinate',
            value: 20,
          },
        },
        {
          type: 'card',
          title: '开户许可证',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto2.jpg',
              alt: '开户许可证',
            },
          },
          progressBar: {
            mode: 'determinate',
            value: 40,
          },
        },
        {
          type: 'card',
          title: '资信证明',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto3.jpg',
              alt: '资信证明',
            },
          },
          progressBar: {
            mode: 'determinate',
            value: 60,
          },
        },
        {
          type: 'card',
          title: '纳税人信用等级',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto4.jpg',
              alt: '纳税人信用等级',
            },
          },
          progressBar: {
            mode: 'determinate',
            value: 80,
          },
        },
        {
          type: 'card',
          title: '法人身份证',
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
          progressBar: {
            mode: 'determinate',
            value: 100,
          },
        },
      ],
    },
    {
      label: '相关业务',
      type: 'tab',
      spacer: 'none',
      classes: 'bg-light',
      elements: [
        {
          label: '财务数据',
          elements: [
            {
              type: 'text',
              spacer: 'none',
              body: '<p>动态组件</p>',
            },
          ],
        },
        {
          label: '业绩合同',
          elements: [
            {
              type: 'text',
              spacer: 'none',
              body: '<p>动态组件</p>',
            },
          ],
        },
        {
          label: '项目',
          elements: [
            {
              type: 'text',
              spacer: 'none',
              body: '<p>动态组件</p>',
            },
          ],
        },
      ],
    },
  ],
};
Componey.args = {
  content: componey,
};

export const Comments = Template.bind({});
Comments.storyName = '带评论';
const comment: IProfile1v1 = {
  ...componey,
  uuid: 'xxx',
  comment: {
    actions: [],
    title: false,
  },
  params: {
    comment: {
      type: 'comment--comment',
      attributes: {
        entity_type: 'node',
        field_name: 'comment',
      },
      relationships: {
        comment_type: {
          data: {
            type: 'comment_type--comment_type',
            id: '19c33b19-bfdc-4a26-9c64-af6171b123cb',
          },
        },
        entity_id: {
          data: {
            type: 'node--customer',
            id: 'cda904c6-39f7-498b-99ce-5d6df8b72d0b',
          },
        },
      },
    },
  },
};
Comments.args = {
  content: comment,
  comments: comments,
};
