import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Carousel1v1Component } from '@uiux/combs/carousel/carousel1v1/carousel1v1.component';
import { StorysModule } from '@core/module/storys.module';
import { ICarouselBase } from '@core/interface/combs/ICarousel';

export default {
  title: '复合组件/幻灯片/1v4',
  id: 'carousel-1v4',
  component: Carousel1v1Component,
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
        component: `该幻灯片组件可自定义内部的文字所在的位置。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '自定义位置';
const content: ICarouselBase = {
  type: 'carousel-1v1',
  spacer: 'lg',
  title: {
    label: 'Storybook 能够做什么？',
    icon: 'email',
    style: 'style-v2',
    classes: 'mat-display-2',
  },
  bg: {
    classes: '',
  },
  classes: '',
  fullWidth: true,
  sliders: {
    params: {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: false,
      pagination: false,
      effect: 'slide',
      breakpoints: {
        600: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        960: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
    },
    classes: 'p-bottom',
    elements: [
      {
        type: 'text-hero',
        theme: 'text-light',
        params: {
          height: '750px',
        },
        text: {
          title: {
            label: '组件驱动开发',
            style: 'style-v1',
            classes: 'mat-display-4',
          },
          spacer: 'xl',
          classes: 'xy-center',
          'style-': {
            width: '50%',
            left: '0%',
            top: '5%',
          },
          bg: {
            classes: 'bg-shadow overlay overlay-80',
            img: {
              src: '/assets/images/hero/1-6.jpg',
              mobile: '/assets/images/mobile/mobile-03.jpg',
            },
          },
          body: 'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
          actionsAlign: 'center center',
          actions: [
            {
              href: '#',
              label: '马上体验',
            },
          ],
        },
      },
      {
        type: 'text-hero',
        theme: 'text-light',
        params: {
          height: '750px',
        },
        text: {
          title: {
            label: '组件展示和测试',
            style: 'style-v4',
            classes: 'mat-display-4',
          },
          spacer: 'xl',
          style: {
            width: '50%',
          },
          classes: 'y-center',
          bg: {
            classes: 'bg-shadow overlay overlay-80',
            img: {
              src: '/assets/images/hero/329.jpg',
              mobile: '/assets/images/mobile/mobile-04.jpg',
            },
          },
          body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
          actionsAlign: 'start center',
          actions: [
            {
              href: '#',
              label: '马上体验',
            },
          ],
        },
      },
      {
        type: 'text-hero',
        theme: '',
        params: {
          height: '750px',
        },
        text: {
          title: {
            label: '文档化',
            style: 'style-v4',
            classes: 'mat-display-4',
          },
          spacer: 'xl',
          style: {
            width: '50%',
            left: '50%',
          },
          classes: 'y-center',
          bg: {
            classes: 'bg-shadow overlay overlay-20',
            img: {
              src: '/assets/images/hero/light-bg.jpeg',
              mobile: '/assets/images/mobile/follower-04.jpg',
            },
          },
          body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
          actionsAlign: 'start center',
          actions: [
            {
              href: '#',
              label: '马上体验',
            },
          ],
        },
      },
      {
        type: 'text-hero',
        theme: 'text-light',
        params: {
          height: '750px',
        },
        text: {
          title: {
            label: '插件和工具生态系统',
            style: 'style-v4',
            classes: 'mat-display-4',
          },
          spacer: 'xl',
          style: {
            width: '50%',
            left: '40%',
            top: '10%',
          },
          classes: 'position-absolute',
          bg: {
            classes: 'bg-shadow overlay overlay-80',
            img: {
              src: '/assets/images/hero/light-bg.jpeg',
              mobile: '/assets/images/mobile/mobile-02.jpg',
            },
          },
          body: 'Storybook拥有丰富的插件和工具生态系统，可以扩展其功能。这些插件可以用于模拟数据、测试组件的不同状态和交互，并生成自动化测试报告。这样，开发人员可以根据自己的需求定制和扩展Storybook。',
          actionsAlign: 'start center',
          actions: [
            {
              href: '#',
              label: '马上体验',
            },
          ],
        },
      },
    ],
  },
};
Default.args = {
  content,
};
