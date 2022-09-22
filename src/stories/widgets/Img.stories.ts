import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  Story,
  componentWrapperDecorator,
} from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { ImgComponent } from '../../app/uiux/widgets/img/img.component';
import { CORE_CONFIG } from '../../app/core/token/core.config';

export default {
  title: '基础/图片',
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
      (story) => `<div style="height:300px">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<ImgComponent> = (args) => ({
  component: ImgComponent,
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

ImgWithLink.args = {
  content: {
    classes: 'object-fit',
    src: '/assets/images/cases/porto2.jpg',
    alt: 'alt',
    href: '#',
    target: '_blank',
  },
};
