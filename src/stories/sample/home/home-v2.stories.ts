import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { defaultHeader, footerInverse } from '../../global/Branding.json';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';

export default {
  title: '示例页面/首页示例/02 服务介绍',
  id: 'home-v2',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot(), BlockModule, BrandingModule],
      providers: [
        {
          provide: BRANDING,
          useValue: of({
            ...defaultHeader,
            ...footerInverse,
          }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      <app-header></app-header>
      ${story}
      <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

const content = of({
  title: '首页 v2',
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '法律科技',
    },
  ],
  config: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  body: [
    {
      type: 'hero-2v3',
      id: '',
      spacer: 'md',
      shape: true,
      bg: {
        classes: 'bg-center',
        img: {
          hostClasses: 'bg-center',
          src: '/assets/images/bg/bg-04.png',
          mobile: '',
        },
      },
      text: {
        title: {
          label: '金融服务组织升级，科技赋能开拓创新',
          style: '',
          classes: 'mat-display-1',
        },
        spacer: 'none',
        body: '',
      },
      row: '3',
      elements: [
        {
          img: {
            src: '/assets/images/svg/bike.svg',
            href: '/financial-law',
          },
          link: {
            href: '/financial-law',
            label: '金融律师',
          },
        },
        {
          img: {
            src: '/assets/images/svg/car.svg',
            href: '/taxonomy/term/1258',
          },
          link: {
            href: '/taxonomy/term/1258',
            label: '注册会计师',
          },
        },
        {
          img: {
            src: '/assets/images/svg/family-health.svg',
            href: '/taxonomy/term/1259',
          },
          link: {
            href: '/taxonomy/term/1259',
            label: '资产评估师',
          },
        },
        {
          img: {
            src: '/assets/images/svg/health.svg',
            href: '/taxonomy/term/1260',
          },
          link: {
            href: '/taxonomy/term/1260',
            label: '税务师',
          },
        },
        {
          img: {
            src: '/assets/images/svg/investment.svg',
            href: '/taxonomy/term/1261',
          },
          link: {
            href: '/taxonomy/term/1261',
            label: '证券、期货',
          },
        },
        {
          img: {
            src: '/assets/images/svg/term-life.svg',
            href: '/taxonomy/term/1262',
          },
          link: {
            href: '/taxonomy/term/1262',
            label: '银行、基金',
          },
        },
      ],
    },
    {
      type: 'showcase-1v1',
      spacer: 'md',
      title: {
        label: '法律-金融-服务',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      bg: {
        classes: 'bg-light bg-fill-width',
      },
      elements: [
        {
          img: {
            src: '/assets/images/svg/bike.svg',
            alt: '信托.png',
          },
          style: 'style-v3 use-image',
          title: {
            href: '/taxonomy/term/1513',
            label: '信托',
          },
          content: '信任委托   货币资金+实物财产',
          more: {
            href: '/taxonomy/term/1513',
            label: '更多',
          },
        },
        {
          img: {
            src: '/assets/images/svg/car.svg',
            alt: '保险.png',
          },
          style: 'style-v3 use-image',
          title: {
            href: '/taxonomy/term/1514',
            label: '保险',
          },
          content: '社会生产生活精巧的稳定器',
          more: {
            href: '/taxonomy/term/1514',
            label: '查看更多',
          },
        },
        {
          img: {
            src: '/assets/images/svg/family-health.svg',
            alt: '租赁.png',
          },
          style: 'style-v3 use-image',
          title: {
            href: '/taxonomy/term/1515',
            label: '租赁',
          },
          content: '上雨旁风，无所盖障',
          more: {
            href: '/taxonomy/term/1515',
            label: '查看更多',
          },
        },
        {
          img: {
            src: '/assets/images/svg/health.svg',
            alt: '投资.png',
          },
          style: 'style-v3 use-image',
          title: {
            href: '/taxonomy/term/1516',
            label: '投资',
          },
          content: '好生意，好企业，好投资',
          more: {
            href: '/taxonomy/term/1516',
            label: '查看更多',
          },
        },
        {
          img: {
            src: '/assets/images/svg/investment.svg',
            alt: '理财.png',
          },
          style: 'style-v3 use-image',
          title: {
            href: '/taxonomy/term/1517',
            label: '理财',
          },
          content: '涓涓细流，汇为江海',
          more: {
            href: '/taxonomy/term/1517',
            label: '查看更多',
          },
        },
        {
          img: {
            src: '/assets/images/svg/term-life.svg',
            alt: '风控.png',
          },
          style: 'style-v3 use-image',
          title: {
            href: '/taxonomy/term/1518',
            label: '风控',
          },
          content: '君子以思患而豫防之',
          more: {
            href: '/taxonomy/term/1518',
            label: '查案更多',
          },
        },
      ],
    },
    {
      type: 'showcase-2v1',
      elements: [
        {
          type: 'card',
          subTitle: '以经济、知识、智能、科技驱动',
          link: {
            href: '/taxonomy/term/1263',
            label: '知识产权',
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
                hoverIcon: 0,
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '/taxonomy/term/1263',
                ratios: 'media-16-9',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/16-9/f-01.png',
                  alt: 'f-01.png',
                },
              },
            ],
          },
        },
        {
          type: 'card',
          subTitle: '用金融服务提升行业竞争力',
          link: {
            href: '/taxonomy/term/1264',
            label: '建工房产',
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
                hoverIcon: 0,
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '/taxonomy/term/1264',
                ratios: 'media-16-9',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/16-9/f-02.png',
                  alt: 'f-02.png',
                },
              },
            ],
          },
        },
        {
          type: 'card',
          subTitle: '产业升级，保驾护航',
          link: {
            href: '/taxonomy/term/1265',
            label: '公司集团',
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
                hoverIcon: 0,
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '/taxonomy/term/1265',
                ratios: 'media-16-9',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/16-9/f-03.png',
                  alt: 'f-03.png',
                },
              },
            ],
          },
        },
        {
          type: 'card',
          subTitle: '用科技提升金融行业竞争力',
          link: {
            href: '/taxonomy/term/1266',
            label: '互联网+',
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
                hoverIcon: 0,
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                link: '/taxonomy/term/1266',
                ratios: 'media-16-9',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/16-9/f-04.png',
                  alt: 'f-04.png',
                },
              },
            ],
          },
        },
      ],
    },
    {
      type: 'action-1v1',
      id: '',
      spacer: 'xl',
      bg: {
        classes: 'bg-shadow',
      },
      text: {
        title: {
          label: '创造价值才是最大的价值',
          style: '',
          classes: 'mat-display-1',
        },
        spacer: 'none',
        body: '<p>这里有你想要的答案，请根据以下筛选条件选择进行搜索。</p>',
        actionsAlign: 'center center',
        actions: [
          {
            type: 'search-action',
            button: {
              label: '搜索',
              color: 'primary',
            },
            form: [
              {
                type: 'select',
                key: 'skill',
                label: '技能',
                options: [
                  {
                    label: '无',
                    value: '',
                  },
                  {
                    label: 'Angular',
                    value: 'angular',
                  },
                  {
                    label: 'React',
                    value: 'react',
                  },
                  {
                    label: 'Vue',
                    value: 'vue',
                  },
                ],
              },
              {
                type: 'select',
                key: 'cms',
                label: 'CMS',
                options: [
                  {
                    label: '无',
                    value: '',
                  },
                  {
                    label: 'Drupal',
                    value: 'drupal',
                  },
                  {
                    label: 'WP',
                    value: 'wp',
                  },
                  {
                    label: 'Joomla',
                    value: 'joomla',
                  },
                ],
              },
              {
                type: 'input',
                key: 'keys',
                placeholder: '请输入关键词搜索',
                controlType: 'search',
                label: '关键词',
                appearance: 'legacy',
              },
            ],
          },
        ],
      },
      shape: true,
    },
    {
      type: 'showcase-3v4',
      spacer: 'lg',
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      img: {
        src: '/assets/images/1-1/business-02.png',
        alt: 'business-02.png',
      },
      elements: [
        {
          icon: {
            name: 'done',
          },
          style: 'style-v7',
          title: {
            label: '证券虚假陈述追诉',
            href: '/',
          },
          content:
            '<p>中国金融法律数据服务平台，于纷杂中淡定，于红海中从容</p>\r\n',
        },
        {
          icon: {
            name: 'cloud',
          },
          style: 'style-v7',
          title: {
            label: '不良资产项目处置库',
            href: '/',
          },
          content: '<p>向下解题+向上生长，定制需求才是竞争力</p>\r\n',
        },
        {
          icon: {
            name: 'content_paste',
          },
          style: 'style-v7',
          title: {
            label: '投资融资理财库',
            href: '/',
          },
          content: '<p>经济驱动，知识驱动，智能驱动，科技驱动</p>\r\n',
        },
        {
          icon: {
            name: 'pie_chart',
          },
          style: 'style-v7',
          title: {
            label: '金融服务科技开发区',
            href: '/',
          },
          content:
            '<p>案件思维不能解决系统问题，用科技解决金融法律时代</p>\r\n',
        },
      ],
    },
    {
      type: 'showcase-4v1',
      spacer: 'xl',
      bg: {
        classes: 'bg-light bg-fill-width',
      },
      elements: [
        {
          icon: {
            name: 'groups',
          },
          digit: {
            value: 80,
            label: '+',
          },
          title: '金融专业团队',
        },
        {
          icon: {
            name: 'vpn_key',
          },
          digit: {
            value: 300,
            label: '+',
          },
          title: '实务操作指南',
        },
        {
          icon: {
            name: 'business_center',
          },
          digit: {
            value: 1000,
            label: '+',
          },
          title: '金融实例',
        },
        {
          icon: {
            name: 'gavel',
          },
          digit: {
            value: 10000,
            label: '+',
          },
          title: '专业文档',
        },
      ],
    },
    {
      type: 'carousel-1v3',
      spacer: 'xl',
      text: {
        title: {
          label: '合作伙伴',
          style: 'style-v1',
          classes: 'mat-display-1',
        },
        spacer: 'none',
      },
      style: 'text-dark',
      bg: {
        classes: 'bg-shadow overlay overlay-',
        img: {
          src: '/assets/images/map.png',
          hostClasses: 'bg-center',
        },
      },
      sliders: {
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
              spaceBetween: 30,
            },
          },
        },
        classes: 'p-bottom',
        elements: [
          {
            type: 'box',
            style: 'style-v8',
            title: {
              href: 'javascript:void(0);',
              label: '产业园经济开发区',
            },
          },
          {
            type: 'box',
            style: 'style-v8',
            title: {
              href: 'javascript:void(0);',
              label: '创业金融孵化中心',
            },
          },
          {
            type: 'box',
            style: 'style-v8',
            title: {
              href: 'javascript:void(0);',
              label: '金融融创科技场',
            },
          },
          {
            type: 'box',
            style: 'style-v8',
            title: {
              href: 'javascript:void(0);',
              label: '信息互联科技开发',
            },
          },
          {
            type: 'box',
            style: 'style-v8',
            title: {
              href: 'javascript:void(0);',
              label: '传媒自媒体创新区',
            },
          },
        ],
      },
    },
  ],
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
Page.args = {
  pageContent$: content,
};
