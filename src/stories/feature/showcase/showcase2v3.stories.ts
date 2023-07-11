import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase2v3Component } from '@uiux/combs/showcase/showcase2v3/showcase2v3.component';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase2v3 } from '@core/interface/combs/IShowcase';
export default {
  title: '特色组件/展示 Showcase/2v3',
  id: 'showcase-2v3',
  component: Showcase2v3Component,
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
const content: IShowcase2v3 = {
  type: 'showcase-2v3',
  spacer: 'md',
  text: {
    title: {
      label: '我们的产品',
      style: 'style-v1',
      classes: 'display-v2',
    },
  },
  bg: {
    classes: 'bg-fill-width',
    img: {
      hostClasses: '',
      src: '/assets/images/bg/home-shape.png',
      mobile: '/assets/images/bg/home-shape.png',
    },
  },
  classes: '',
  row: 3,
  elements: [
    {
      title: 'PUFF<br>BAR',
      subTitle: '400 puffs<br>17 Flavors',
      link: {
        label: 'More',
        href: '#',
        color: 'primary',
      },
      img: {
        src: '/assets/images/showcase/arc.png',
        alt: 'arcvap',
        href: '#',
      },
    },
    {
      title: 'PUFF<br>BAR',
      subTitle: '400 puffs<br>17 Flavors',
      link: {
        label: 'More',
        href: '#',
        color: 'primary',
      },
      img: {
        src: '/assets/images/showcase/arc.png',
        alt: 'arcvap',
        href: '#',
      },
    },
    {
      title: 'PUFF<br>BAR',
      subTitle: '400 puffs<br>17 Flavors',
      link: {
        label: 'More',
        href: '#',
        color: 'primary',
      },
      img: {
        src: '/assets/images/showcase/arc.png',
        alt: 'arcvap',
        href: '#',
      },
    },
  ],
};

Default.args = {
  content,
};
