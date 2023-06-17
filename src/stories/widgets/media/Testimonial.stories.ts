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
      entryComponents: [...StorysModule.forEntryComponents()],
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
    type: 'testimonial',
    style: 'style-v2',
    title: 'Johnson',
    subTitle: 'FrontEnd',
    img: {
      src: '/assets/images/avatar/01.jpeg',
      alt: '',
    },
    body: '作为一名非专业的Web开发者，我曾经因为缺乏编码和设计技能而感到十分困惑。然而自从我开始使用Builder构建页面后，我的许多顾虑就消失了。这个软件非常容易上手，它使我可以通过直观的拖放界面来制作精美的网站页面，我还可以轻松自定义并整合不同的组件。使用Builder让创建漂亮的页面变得简单，不再需要长时间坐在电脑前手动编写代码，让我可以更多地关注我的内容本身。',
  },
};
