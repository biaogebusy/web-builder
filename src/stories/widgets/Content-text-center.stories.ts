import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG } from '@core/token/core.config';
import { ContentTextCenterComponent } from '@uiux/widgets/content-text-center/content-text-center.component';
export default {
  title: 'Widgets/Content Text Center',
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

const Template: Story<ContentTextCenterComponent> = (args) => ({
  component: ContentTextCenterComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    width: '25',
    ratios: 'media-140',
    text: '<p style="font-size:45px">52<sup>%</sup></p><p>Women</p><p style="font-size:45px">32<sup>%</sup></p><p>POC</p><p style="font-size:45px">7<sup>%</sup></p><p>LGBT+</p><p>2020 ASSOCIATE CLASS</p>',
    img: {
      classes: 'object-fit',
      src: '/assets/images/showcase/info01.png',
      alt: 'alt',
    },
  },
};
