import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/core.config';
import { ShareModule } from '@share/share.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BoxComponent } from '@uiux/widgets/box/box.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
export default {
  title: 'Widgets/Box',
  component: BoxComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        BoxComponent,
        IconComponent,
        LinkComponent,
        ImgComponent,
        SafeHtmlPipe,
      ],
      imports: [ShareModule, BrowserAnimationsModule, RouterTestingModule],

      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
  ],
} as Meta;

const Template: Story<BoxComponent> = (args) => ({
  component: BoxComponent,
  props: {
    ...args,
  },
});
export const Box = Template.bind({});

Box.args = {
  content: {
    style: 'style-v9',
    title: {
      href: '/',
      label: 'Best Financial Advice',
    },
    img: {
      classes: 'object-fit',
      src: '/assets/images/cases/porto1.jpg',
      alt: 'alt',
    },
    content: 'The most well-known which is said to have originated',
    more: {
      href: '#',
      label: 'Read More',
    },
  },
};
