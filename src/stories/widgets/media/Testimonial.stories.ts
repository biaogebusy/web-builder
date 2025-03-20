import { importProvidersFrom } from '@angular/core';
import { ITestimonial } from '@core/interface/widgets/IWidgets';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { TestimonialComponent } from '@uiux/widgets/testimonial/testimonial.component';

const meta: Meta<TestimonialComponent> = {
  title: '基础组件/媒体/Testimonial',
  id: 'testimonial',
  component: TestimonialComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
    componentWrapperDecorator(
      story => `<div class="relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
};

export default meta;
type Story = StoryObj<TestimonialComponent>;
export const Default: Story = {};
const content: ITestimonial = {
  type: 'testimonial',
  style: 'style-v2',
  title: 'Johnson',
  subTitle: 'FrontEnd',
  img: {
    src: '/assets/images/avatar/01.jpeg',
    alt: '',
  },
  body: '作为一名非专业的Web开发者，我曾经因为缺乏编码和设计技能而感到十分困惑。然而自从我开始使用Builder构建页面后，我的许多顾虑就消失了。',
};
Default.args = {
  content,
};
