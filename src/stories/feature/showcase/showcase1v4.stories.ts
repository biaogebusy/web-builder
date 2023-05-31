import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Showcase1v4Component } from '@uiux/combs/showcase/showcase1v4/showcase1v4.component';

export default {
  title: '特色组件/展示 Showcase/1v4',
  id: 'showcase-1v4',
  component: Showcase1v4Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-top-xl m-top-xl" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    spacer: 'lg',
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    row: 3,
    text: {
      title: {
        label: 'Work Process',
        style: 'style-v1',
      },
      body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
    },
    elements: [
      {
        type: 'card-1v5',
        title: 'Discuss The Project',
        body: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century.",
        more: {
          href: '/node/1',
          target: '_blank',
          label: 'Read more',
        },
        footer: {
          label: 'Step 01.',
          icon: {
            svg: 'chevron-double-right',
          },
        },
      },
      {
        type: 'card-1v5',
        title: 'Develop & Elaborate',
        body: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century.",
        more: {
          href: '/node/1',
          target: '_blank',
          label: 'Read more',
        },
        footer: {
          label: 'Step 02.',
          icon: {
            svg: 'chevron-double-right',
          },
        },
      },
      {
        type: 'card-1v5',
        title: 'Final Approvement',
        body: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century.",
        more: {
          href: '/node/1',
          target: '_blank',
          label: 'Read more',
        },
        footer: {
          label: 'Step 03.',
          icon: {
            svg: 'check-all',
          },
        },
      },
    ],
  },
};
