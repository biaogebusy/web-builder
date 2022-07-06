import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ContentBoxComponent } from '@uiux/widgets/content-box/content-box.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG } from '@core/token/core.config';
export default {
  title: 'Widgets/Content Box',
  component: ContentBoxComponent,
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
        `<div style="width:40%" class="position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<ContentBoxComponent> = (args) => ({
  component: ContentBoxComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'content-box',
    width: '33.33',
    ratios: 'media-140',
    subTitle: {
      label: '信使',
      href: '/search',
      queryParams: {
        law_category: 25,
      },
    },
    title: {
      label: '基于 Drupal 的 Angular 前端框架',
      href: '/search',
      queryParams: {
        law_category: 25,
      },
    },
    img: {
      classes: 'object-fit',
      src: '/assets/images/cases/porto1.jpg',
      alt: 'alt',
    },
  },
};
