import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v8Component } from '@uiux/combs/showcase/showcase3v8/showcase3v8.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '特色组件/展示 Showcase/3v8',
  id: 'showcase-3v8',
  component: Showcase3v8Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
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
export const Default = Template.bind({});

Default.args = {
  content: {
    id: '',
    type: 'showcase-3v8',
    title: {
      type: 'text',
      spacer: 'sm',
      title: {
        label: '热门职位招聘',
        style: 'style-v1',
      },
      body: '<p class="text-center">甄选热门大厂内推职位，机不可失。',
    },
    bg: {
      classes: 'bg-fill-width',
      img: {
        hostClasses: '',
        src: '/assets/images/bg/home-shape.png',
        mobile: '/assets/images/bg/home-shape.png',
      },
    },
    main: {
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
        label: '前端开发工程师',
        classes: 'bold',
        href: '#',
      },
      subTitle: '字节跳动，北京',
    },
    top: [
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
          label: '前端开发工程师',
          classes: 'bold',
          href: '#',
        },
        subTitle: '字节跳动，北京',
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
          label: '前端架构师',
          classes: 'bold',
          href: '#',
        },
        subTitle: '美团，广州',
      },
    ],
    bottom: [
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
          label: '后端开发',
          classes: 'bold',
          href: '#',
        },
        subTitle: '微软，北京',
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
          label: 'UI 设计师',
          classes: 'bold',
          href: '#',
        },
        subTitle: '腾讯，深圳',
      },
    ],
  },
};
