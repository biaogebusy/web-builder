import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG } from '@core/token/token-providers';
import { ContentTextCenterComponent } from '@uiux/widgets/content-text-center/content-text-center.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
export default {
  title: '基础/内容/内容居中块',
  id: 'content-text-center',
  component: ContentTextCenterComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [WidgetsModule, RouterTestingModule],
      providers: [
        {
          provide: CORE_CONFIG,
          userValue: {},
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="width:40%" class="position-relative text-light">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});

Base.args = {
  content: {
    width: '25',
    ratios: 'media-140',
    text: '<p style="font-size:45px">118k</p><p>活跃的模块</p><p style="font-size:45px">46k<sup>+</sup></p><p>开发者</p><p style="font-size:45px">1.4M<sup></sup></p><p>使用</p><p>Drupal 统计</p>',
    img: {
      classes: 'object-fit',
      src: '/assets/images/showcase/info01.png',
      alt: 'alt',
    },
  },
};
