import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { userEvent } from '@storybook/testing-library';
import { ListModule } from '@uiux/combs/list/list.module';
import { StorysModule } from '@core/module/storys.module';
import { List2v1Component } from '@uiux/combs/list/list2v1/list2v1.component';

export default {
  title: '复合组件/列表/2v1',
  id: 'list-2v1',
  component: List2v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ListModule, StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
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

Default.args = {
  content: {
    title: {
      label: 'Latest Articles',
      style: 'style-v4',
      classes: 'mat-display-1',
    },
    more: {
      label: 'More Articles',
      href: '#',
    },
  },
  lists: [
    {
      link: {
        label:
          'Cancer Biomarkers: Paving the Way for Better Lung Cancer Treatment',
        href: '#',
      },
      body: 'Advancements with cancer biomarkers are paving the way for better lung cancer treatments and personalization for patients.',
      tag: 'Science & Innovation',
      img: {
        src: '/assets/images/medical/showcase-03.jpg',
        alt: '',
      },
    },
    {
      link: {
        label: 'Maternal Immunization: Protecting Children from RSV and GBS',
        href: '#',
      },
      body: 'Scientists at the forefront of fetal health innovation are studying ways that vaccines given during pregnancy can continue to protect children in the months after birth.',
      tag: 'Science & Innovation',
      img: {
        src: '/assets/images/medical/showcase-04.jpg',
        alt: '',
      },
    },
    {
      link: {
        label:
          'Pfizer’s Biopharma Global Chief Marketing Officer Drew Panayiotou is ‘Radically Obsessed’ with Listening to Patients',
        href: '#',
      },
      body: "For Pfizer's Biopharma Global Chief Marketing Officer Drew Panayiotou, working at Pfizer comes with an enormous perk. The potential to change the world.",
      tag: 'Real People',
      img: {
        src: '/assets/images/medical/showcase-05.jpg',
        alt: '',
      },
    },
  ],
};
