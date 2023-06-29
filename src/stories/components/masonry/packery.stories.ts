import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NgxPackeryModule } from 'ngx-packery';
import { PackeryComponent } from '@uiux/combs/masonry/packery/packery.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '复合组件/瀑布流/图片堆砌',
  id: 'packery',
  component: PackeryComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot(), NgxPackeryModule],
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
    type: 'packery',
    config: {
      gutter: 0,
      imagesLoaded: true,
      percentPosition: true,
    },
    spacer: 'md',
    text: {
      title: {
        label: 'Drupal 是如何数字创新的？',
        style: 'style-v1',
        classes: 'mat-display-1 text-light',
      },
      body: '<p class="text-light text-center">Drupal通过其灵活性、多功能性和可扩展性，为数字创新提供了强大的基础。它能够满足不同规模和需求的组织和企业的数字化转型和创新需求，并提供可靠、安全、高效的数字解决方案。</p>',
    },
    bg: {
      classes: 'bg-fill-width bg-shadow overlay overlay-80',
      img: {
        hostClasses: '',
        src: '/assets/images/bg/home-shape.png',
        mobile: '/assets/images/bg/home-shape.png',
      },
    },
    elements: [
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto1.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto2.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '40',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto3.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto4.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto5.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto6.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        hoverIcon: true,
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto7.jpg',
          alt: 'alt',
        },
      },
    ],
  },
};

export const ContentBox = Template.bind({});
ContentBox.storyName = '内容盒子';
ContentBox.args = {
  content: {
    type: 'packery',
    config: {
      gutter: 0,
      imagesLoaded: true,
      percentPosition: true,
    },
    spacer: 'md',
    text: Default.args.content.text,
    bg: Default.args.content.bg,
    fullWidth: true,
    elements: [
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-4-3',
        subTitle: {
          label: '灵活的架构',
          href: '/search',
          queryParams: {
            law_category: 25,
          },
        },
        title: {
          label: '能够构建各种类型的数字解决方案',
          href: '/search',
          queryParams: {
            law_category: 25,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto1.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-4-3',
        subTitle: {
          label: '多站点管理',
          href: '/search',
          queryParams: {
            law_category: 27,
          },
        },
        title: {
          label: '简化了多个网站的运维和维护工作',
          href: '/search',
          queryParams: {
            law_category: 27,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto2.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-4-3',
        subTitle: {
          label: '多语言支持',
          href: '/search',
          queryParams: {
            law_category: 13,
          },
        },
        title: {
          label: '企业能够更好地面向全球市场进行本地化和国际化',
          href: '/search',
          queryParams: {
            law_category: 13,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto3.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '25',
        ratios: 'media-4-3',
        subTitle: {
          label: '社交媒体集成',
          href: '/search',
          queryParams: {
            law_category: 28,
          },
        },
        title: {
          label: '增强用户参与度、推广品牌和提高网站的可见性',
          href: '/search',
          queryParams: {
            law_category: 28,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto4.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '25',
        ratios: 'media-4-3',
        subTitle: {
          label: '移动友好性',
          href: '/search',
          queryParams: {
            law_category: 35,
          },
        },
        title: {
          label: '能够更好地适应移动化的用户行为和需求',
          href: '/search',
          queryParams: {
            law_category: 35,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto6.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '25',
        ratios: 'media-4-3',
        subTitle: {
          label: '数据分析和个性化',
          href: '/search',
          queryParams: {
            law_category: 36,
          },
        },
        title: {
          label: '根据用户的兴趣和偏好提供个性化的内容和体验',
          href: '/search',
          queryParams: {
            law_category: 25,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto7.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '25',
        ratios: 'media-4-3',
        subTitle: {
          label: '安全和稳定性',
          href: '/search',
          queryParams: {
            law_category: 37,
          },
        },
        title: {
          label:
            '它的安全记录和稳定性得到了业界的认可，为企业提供了可信赖的数字平台',
          href: '/search',
          queryParams: {
            law_category: 37,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto5.jpg',
          alt: 'alt',
        },
      },
    ],
  },
};
