import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Hero1v1Component } from '@uiux/combs/hero/hero1v1/hero1v1.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '特色组件/英雄区/1v1',
  id: 'hero-1v1',
  component: Hero1v1Component,
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
export const Default = Template.bind({});
Default.args = {
  content: {
    spacer: 'none',
    type: 'hero-1v1',
    classes: 'text-light text-center',
    sliders: {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: false,
      },
      elements: [
        {
          type: 'text',
          spacer: 'xl',
          title: {
            label: '组件驱动开发',
            style: 'style-v1',
            classes: 'mat-display-3 bold',
          },
          classes: 'xy-center',
          bg: {
            classes: 'bg-center overlay overlay-80',
            img: {
              src: '/assets/images/16-9/business-14.jpeg',
              mobile: '/assets/images/mobile/mobile-03.jpg',
            },
          },
          body: '<p style="font-size:18px">Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"</p>',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn',
              mode: 'raised',
              color: 'primary',
              href: '#',
              label: '立刻体验',
            },
          ],
        },
        {
          type: 'text',
          title: {
            label: '组件展示和测试',
            style: 'style-v1',
            classes: 'mat-display-3 bold',
          },
          spacer: 'xl',
          classes: 'xy-center text-light',
          bg: {
            classes: 'bg-shadow  overlay overlay-80',
            img: {
              src: '/assets/images/16-9/business-15.jpeg',
              mobile: '/assets/images/mobile/mobile-04.jpg',
            },
          },
          body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn',
              mode: 'raised',
              color: 'primary',
              href: '#',
              label: '立刻体验',
            },
          ],
        },
        {
          type: 'text',
          title: {
            label: '文档化',
            style: 'style-v1',
            classes: 'mat-display-3 bold',
          },
          spacer: 'xl',
          classes: 'xy-center text-light',
          bg: {
            classes: 'bg-shadow  overlay overlay-80',
            img: {
              src: '/assets/images/16-9/business-15.jpeg',
              mobile: '/assets/images/mobile/mobile-04.jpg',
            },
          },
          body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn',
              mode: 'raised',
              color: 'primary',
              href: '#',
              label: '立刻体验',
            },
          ],
        },
      ],
    },
  },
};
