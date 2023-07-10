import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Hero1v2Component } from '@uiux/combs/hero/hero1v2/hero1v2.component';
import { SwiperModule } from 'swiper/angular';
import { StorysModule } from '@core/module/storys.module';
import { IHero1v2 } from '@core/interface/combs/IHero';

export default {
  title: '特色组件/英雄区/1v2',
  id: 'hero-1v2',
  component: Hero1v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [SwiperModule, StorysModule.forRoot()],
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
const content: IHero1v2 = {
  type: 'hero-1v2',
  spacer: 'none',
  classes: 'text-light text-center',
  sliders: {
    params: {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: true,
    },
    classes: '',
    elements: [
      {
        title: '使Storybook 是什么？',
        subTitle:
          'Storybook是一个开源的前端工具，用于开发、测试和文档化UI组件。它提供了一个独立的环境，开发人员可以在其中构建和展示单个UI组件，而无需依赖于整个应用程序的上下文。',
        bg: {
          type: 'bg-img',
          classes: 'bg-fill-width overlay overlay-40',
          img: {
            src: '/assets/images/16-9/business-13.jpg',
            classes: 'object-fit',
          },
        },
        btn: {
          href: '#',
          mode: 'raised',
          label: '查看更多',
          classes: 'round-btn',
        },
      },
      {
        title: '组件驱动开发',
        subTitle:
          'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
        bg: {
          type: 'bg-img',
          classes: 'bg-fill-width overlay overlay-40',
          img: {
            src: '/assets/images/16-9/business-14.jpeg',
            classes: 'object-fit',
          },
        },
        btn: {
          href: '#',
          mode: 'raised',
          label: '查看更多',
          classes: 'round-btn',
        },
      },
      {
        title: '组件展示和测试',
        subTitle:
          'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
        bg: {
          type: 'bg-img',
          classes: 'bg-fill-width overlay overlay-40',
          img: {
            src: '/assets/images/16-9/business-15.jpeg',
            classes: 'object-fit',
          },
        },
        btn: {
          href: '#',
          mode: 'raised',
          label: '查看更多',
          classes: 'round-btn',
        },
      },
      {
        title: '文档化',
        subTitle:
          'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
        bg: {
          type: 'bg-img',
          classes: 'bg-fill-width overlay overlay-40',
          img: {
            src: '/assets/images/16-9/business-16.jpeg',
            classes: 'object-fit',
          },
        },
        btn: {
          href: '#',
          mode: 'raised',
          label: '查看更多',
          classes: 'round-btn',
        },
      },
    ],
  },
  bg: {
    classes: 'bg-center overlay overlay-80',
    img: {
      src: '/assets/images/hero/bg-pattern-hero.png',
      mobile: '/assets/images/hero/bg-pattern-hero.png',
    },
  },
};
Default.args = {
  content,
};
