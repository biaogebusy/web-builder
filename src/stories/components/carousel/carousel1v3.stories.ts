import { moduleMetadata, Meta } from '@storybook/angular';

import { Carousel1v3Component } from '@uiux/combs/carousel/carousel1v3/carousel1v3.component';
import { StorysModule } from '@core/module/storys.module';
import { ICarouselBase } from '@core/interface/combs/ICarousel';

const meta: Meta<MyComponent> = {
  title: '复合组件/幻灯片/1v3',
  id: 'carousel-1v3',
  component: Carousel1v3Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};
const content: ICarouselBase = {
  type: 'carousel-1v3',
  spacer: 'lg',
  text: {
    spacer: 'none',
    title: {
      label: '选择Drupal的原因',
      icon: '',
      style: 'style-v1',
      classes: 'mat-display-1',
    },
    classes: 'text-center',
    body: '<p class="text-center">Drupal是数据管理中心，提供集中的地方来访问所有平台的数据</p><br>',
  },
  classes: '',
  bg: {
    classes: 'bg-shadow',
  },
  sliders: {
    params: {
      slidesPerView: 1.2,
      spaceBetween: 20,
      navigation: false,
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    },
    classes: 'p-bottom',
    elements: [
      {
        type: 'box',
        img: {
          src: '/assets/images/svg/Asset187.svg',
          alt: 'browser',
          style: {
            width: '80px',
            marginRight: '10px',
          },
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: '组件编辑',
        },
        content: '通过简单的管理界面对复杂的可视化编辑',
      },
      {
        type: 'box',
        img: {
          src: '/assets/images/svg/Asset189.svg',
          alt: 'browser',
          style: {
            width: '80px',
            marginRight: '10px',
          },
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: '企业营销',
        },
        content: '与企业营销工具整合，实现对内容和表单的管理',
      },
      {
        type: 'box',
        img: {
          src: '/assets/images/svg/Asset190.svg',
          alt: 'browser',
          style: {
            width: '80px',
            marginRight: '10px',
          },
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: '数据收集',
        },
        content: '对数据进行收集和删除，符合政策的合规',
      },
      {
        type: 'box',
        img: {
          src: '/assets/images/svg/Asset192.svg',
          alt: 'browser',
          style: {
            width: '80px',
            marginRight: '10px',
          },
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: '简化管理',
        },
        content: '简化了内容管理和用户角色管理，易于提高服务器性能',
      },
      {
        type: 'box',
        img: {
          src: '/assets/images/svg/bike.svg',
          alt: 'browser',
          style: {
            width: '80px',
            marginRight: '10px',
          },
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: '存储集成',
        },
        content: '与云存储集成以实现解耦的文件管理',
      },
      {
        type: 'box',
        img: {
          src: '/assets/images/svg/calendar.png',
          alt: 'browser',
          style: {
            width: '80px',
            marginRight: '10px',
          },
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: 'API 优先',
        },
        content: 'API First 易于与外部系统集成',
      },
    ],
  },
};

Default.args = {
  content,
};

export const Client = Template.bind({});
const clientContent: ICarouselBase = {
  type: 'carousel-1v3',
  spacer: 'lg',
  text: {
    spacer: 'none',
    title: {
      label: '客户评价',
      icon: '',
      style: 'style-v1',
      classes: 'mat-display-1',
    },
    classes: 'text-center',
    body: '<p class="text-center">Storybook是一个开发工具和UI组件库，用于构建、测试和文档化可复用的UI组件。它提供了一个独立于主应用程序的环境，让开发者能够以隔离的方式开发和调试组件。</p>',
  },
  classes: '',
  bg: {
    classes: 'bg-shadow',
  },
  sliders: {
    params: {
      slidesPerView: 1.1,
      spaceBetween: 20,
      navigation: false,
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    },
    classes: 'p-bottom',
    elements: [
      {
        type: 'card-1v4',
        img: {
          classes: 'object-fit',
          src: '/assets/images/avatar/01.jpeg',
        },
        star: 4,
        title: '- 张明',
        subTitle: '前端开发',
        body: 'Storybook是我们团队的救星！它使我们能够独立地开发、测试和文档化组件，大大提高了我们的工作效率。非常好用！',
      },
      {
        type: 'card-1v4',
        img: {
          classes: 'object-fit',
          src: '/assets/images/avatar/02.jpeg',
        },
        star: 5,
        title: '- 王丽',
        subTitle: '前端开发',
        body: '使用Storybook后，我们的组件开发变得更加高效和可靠。它帮助我们定义多个使用场景，清晰地展示组件在各种情景下的表现。我们团队对它赞不绝口！',
      },
      {
        type: 'card-1v4',
        img: {
          classes: 'object-fit',
          src: '/assets/images/avatar/03.jpeg',
        },
        star: 5,
        title: '- 李军',
        subTitle: '前端开发',
        body: 'Storybook为我们的团队带来了极大的协作效益。它提供了一个集中查看和交流的平台，团队成员可以轻松共享和讨论组件。无疑是一个必备工具！',
      },
      {
        type: 'card-1v4',
        img: {
          classes: 'object-fit',
          src: '/assets/images/avatar/04.jpeg',
        },
        star: 4,
        title: '- 张燕',
        subTitle: '前端开发',
        body: '我们喜欢Storybook的文档化功能。它帮助我们详细记录和展示每个组件的使用方法和属性，使其他团队成员更容易理解和使用。真的很赞！',
      },
      {
        type: 'card-1v4',
        img: {
          classes: 'object-fit',
          src: '/assets/images/avatar/05.jpeg',
        },
        star: 5,
        title: '- 王刚',
        subTitle: '前端开发',
        body: 'Storybook让我们的前端开发更加流畅。它与我们的主应用程序分离，使我们能够更好地进行单独测试和调试。我们强烈推荐它给其他团队！',
      },
      {
        type: 'card-1v4',
        img: {
          classes: 'object-fit',
          src: '/assets/images/avatar/06.jpeg',
        },
        star: 5,
        title: '- 李丽',
        subTitle: '前端开发',
        body: 'Storybook是一个强大而灵活的工具，适用于各种项目和团队规模。我们发现它易于上手，并且它的插件生态系统给我们带来了很多扩展功能的选择。非常棒的工具！',
      },
    ],
  },
};
Client.storyName = '客户评价';
Client.args = {
  content: clientContent,
};
