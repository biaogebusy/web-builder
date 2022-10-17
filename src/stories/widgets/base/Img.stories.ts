import {
  moduleMetadata,
  Meta,
  Story,
  componentWrapperDecorator,
} from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: '基础/内容/图片',
  component: ImgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [MatIconModule, ShareModule, WidgetsModule],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative" fxFlex="300px" style="height:300px">${story}</div>`
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
    classes: 'object-fit',
    src: '/assets/images/cases/porto2.jpg',
    alt: 'alt',
  },
};

export const ImgWithLink = Template.bind({});
ImgWithLink.storyName = '带链接';
ImgWithLink.args = {
  content: {
    ...Default.args.content,
    href: '#',
    target: '_blank',
  },
};
