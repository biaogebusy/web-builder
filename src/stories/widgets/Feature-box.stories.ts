import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '../../app/core/token/core.config';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { FeatureBoxComponent } from '../../app/uiux/widgets/feature-box/feature-box.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
export default {
  title: 'Widgets/Feature Box',
  component: FeatureBoxComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width:33%">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<FeatureBoxComponent> = (args) => ({
  component: FeatureBoxComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    fullIcon: 'fullscreen',
    openIcon: 'open_in_new',
    link: '#',
    ratios: 'media-4-3',
    img: {
      classes: 'object-fit',
      src: '/assets/images/cases/porto1.jpg',
      alt: 'alt',
    },
  },
};

export const HoverIcon = Template.bind({});

HoverIcon.args = {
  content: {
    hoverIcon: true,
    fullIcon: 'fullscreen',
    ratios: 'media-4-3',
    img: {
      classes: 'object-fit',
      src: '/assets/images/cases/porto1.jpg',
      alt: 'lazyload',
    },
  },
};

export const Float = Template.bind({});

Float.args = {
  content: {
    mode: 'float',
    hoverIcon: true,
    fullIcon: 'fullscreen',
    ratios: 'media-16-9',
    img: {
      classes: 'object-fit',
      src: '/assets/images/cases/porto1.jpg',
      alt: 'lazyload',
    },
  },
};
