import { StorysModule } from '@core/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { FeatureBoxComponent } from '@uiux/widgets/feature-box/feature-box.component';

export default {
  title: '基础/功能盒子',
  id: 'feature-box',
  component: FeatureBoxComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width:33%">${story}</div>`
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
    fullIcon: 'fullscreen',
    openIcon: 'open_in_new',
    link: '#',
    ratios: 'media-4-3',
    img: {
      classes: 'object-fit',
      src: '/assets/images/cases/porto1.jpg',
      alt: 'alt',
    },
  },
};

export const HoverIcon = Template.bind({});
HoverIcon.storyName = 'Icon 经过';
HoverIcon.args = {
  content: {
    ...Default.args.content,
    hoverIcon: true,
  },
};

export const Float = Template.bind({});
Float.storyName = 'Icon 浮出';
Float.args = {
  content: {
    ...Default.args.content,
    mode: 'float',
    hoverIcon: true,
  },
};
