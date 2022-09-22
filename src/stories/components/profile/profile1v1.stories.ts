import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { Profile1v1Component } from '../../../app/uiux/combs/profile/profile1v1/profile1v1.component';
export default {
  title: '组件/个人资料/1v1',
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

const Template: Story<Profile1v1Component> = (args) => ({
  component: Profile1v1Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

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
            meta: '2017-08',
            title: '前端开发工程师',
            subTitle: '字节跳动',
            content:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
          },
          {
            img: {
              src: '/assets/images/logo/logo_default.png',
              style: {
                width: '45px',
                height: '45px',
              },
              alt: 'logo',
            },
            meta: '2017-08',
            title: '前端开发工程师',
            subTitle: '字节跳动',
            content:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
          },
        ],
      },
      {
        label: '案例',
        type: 'swiper',
        params: {
          slidesPerView: 1.2,
          spaceBetween: 20,
          navigation: false,
          breakpoints: {
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          },
        },
        classes: 'p-bottom',
        elements: [
          {
            type: 'card',
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
          {
            type: 'card',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto2.jpg',
                alt: 'alt',
              },
            },
            title: 'JOHNSON',
            subTitle: 'Frontend Devel',
            classes: 'card-no-shadow',
            body: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. ',
          },
          {
            type: 'card',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto3.jpg',
                alt: 'alt',
              },
            },
            title: 'Will',
            subTitle: 'Frontend Devel',
            classes: 'card-no-shadow',
            body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr. ',
          },
          {
            type: 'card',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto4.jpg',
                alt: 'alt',
              },
            },
            title: 'Tamy',
            subTitle: 'Backend Devel',
            classes: 'card-no-shadow',
            body: 'Sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
          },
          {
            type: 'card',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto5.jpg',
                alt: 'alt',
              },
            },
            title: 'Ada',
            subTitle: 'Frontend Devel',
            classes: 'card-no-shadow',
            body: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.',
          },
          {
            type: 'card',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto6.jpg',
                alt: 'alt',
              },
            },
            title: 'MeiMei',
            subTitle: 'Frontend Devel',
            classes: 'card-no-shadow',
            body: 'Vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.',
          },
          {
            type: 'card',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto7.jpg',
                alt: 'alt',
              },
            },
            title: 'Nikki',
            subTitle: 'BA Test',
            classes: 'card-no-shadow',
            body: 'Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
          },
        ],
      },
    ],
  },
};
