import { StorysModule } from '@core/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { TestimonialComponent } from '@uiux/widgets/testimonial/testimonial.component';

export default {
  title: '基础/媒体/Testimonial',
  id: 'testimonial',
  component: TestimonialComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
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
    style: 'style-v2',
    title: 'Johnson',
    subTitle: 'FrontEnd',
    img: {
      src: '/assets/images/client1.jpeg',
      alt: '',
    },
    body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
  },
};
