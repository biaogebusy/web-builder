import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CardComponent } from '@uiux/widgets/card/card.component';
import { StorysModule } from '@core/module/storys.module';
export default {
  title: '基础组件/卡片/基础',
  id: 'card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div fxFlex="300px" class="widget position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});
Base.storyName = '无边框、无阴影';

Base.args = {
  content: {
    type: 'card',
    title: '高性能',
    subTitle: 'High Performance',
    classes: 'card-no-shadow',
    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
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
  },
};

export const Avatar = Template.bind({});
Avatar.storyName = '头像及幻灯片';
Avatar.args = {
  content: {
    type: 'card',
    subTitle: '2022/03/04',
    avatar: {
      src: '/assets/images/showcase/weather.png',
      alt: '',
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
    link: {
      href: '/use/1',
      label: 'Johnson',
    },
  },
};

export const BroderShadow = Template.bind({});
BroderShadow.storyName = '带边框和阴影';
BroderShadow.args = {
  content: {
    type: 'card',
    header: {
      meta: [
        {
          label: '',
          value: '<span class="badge">第一次会议</span>',
        },
        {
          label: '会议期间',
          value: '周一，04/11/2022 11:30<br>周一，04/11/2022 16:30',
        },
        {
          label: '会议地址',
          value: '中国上海市浦东新区 线上会议',
        },
        {
          label: '参会人员',
          value: '<a href="/node/1">张三</a>,<a href="/node/2">Johnson</a>',
        },
        {
          label: '工作工时',
          value: '1',
        },
      ],
    },
    feature: {
      type: 'feature-box',
      hoverIcon: true,
      fullIcon: 'fullscreen',
      ratios: 'media-16-9',
      img: {
        classes: 'object-fit',
        src: '/assets/images/cases/porto1.jpg',
        alt: 'lazyload',
      },
    },
    footer: {
      meta: [
        {
          label: '相关项目',
          value: '<a href="/node/1">创客城制度修改</a>',
        },
        {
          label: '会议文件',
          value: [
            {
              elements: [
                {
                  type: 'link',
                  label: '第二次签字.docx',
                  href: 'xxx.docx',
                  target: '_blank',
                  classes: 'file one-line',
                },
                {
                  type: 'btn',
                  href: '#',
                  mode: 'stroked',
                  label: 'PDF',
                  color: 'warn',
                  target: '_blank',
                  classes: 'border-warn',
                },
              ],
            },
            {
              elements: [
                {
                  type: 'link',
                  label: '第一次签字.docx',
                  href: 'xxx.docx',
                  target: '_blank',
                  classes: 'file one-line',
                },
                {
                  type: 'btn',
                  href: '#',
                  mode: 'stroked',
                  label: 'PDF',
                  color: 'warn',
                  target: '_blank',
                  classes: 'border-warn',
                },
              ],
            },
          ],
          params: {
            dynamic: true,
          },
        },
        {
          label: '会议内容',
          value:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
          params: {
            line: 'two',
            shorten: 100,
            dialog: {
              label: '更多',
            },
          },
        },
        {
          label: '信息备注',
          value:
            'sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
          params: {
            line: 'two',
            shorten: 100,
            dialog: {
              label: '更多',
            },
          },
        },
      ],
    },
    progressBar: {
      mode: 'determinate',
      value: 33,
    },
  },
};
