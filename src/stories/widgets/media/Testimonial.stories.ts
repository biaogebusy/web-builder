import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { TestimonialComponent } from '@uiux/widgets/testimonial/testimonial.component';

export default {
  title: '基础组件/媒体/Testimonial',
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
    body: '我是一名充满热情和激情的程序员，对技术有着浓厚的兴趣。我通过不断学习和实践，已经具备了丰富的开发经验。我善于使用各种编程语言，能够快速高效地完成各类项目开发任务。我相信，通过我的技术实力，可以为公司和客户带来更大的价值，并不断推进技术的进步。',
  },
};
