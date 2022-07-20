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
import { TabComponent } from '../../app/uiux/widgets/tab/tab.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';

export default {
  title: 'Widgets/Tab',
  component: TabComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
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
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<TabComponent> = (args) => ({
  component: TabComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'tab',
    title: {
      label: 'Why choose us',
      style: 'style-v4',
    },
    classes: 'bg-light',
    elements: [
      {
        label: 'Quality',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: '<p>Lorem Ipsum is simply dummy text of the printing and typeseting industry Lorem in text Ipsum has been the industry standar dummyy text ever since the when an iunesi known.</p><ul class="list3 clearfix">\n\t<li>Multiple Layout</li>\n\t<li>Awesome Shortcodes</li>\n\t<li>Browser Compatibility</li>\n\t<li>Easy to Edit Animations</li>\n\t<li>Parallax Effect</li>\n\t<li>Responsive Design</li>\n\t<li>Many Home Page Versions</li>\n\t<li>Many Blog Pages</li>\n</ul>',
          },
        ],
      },
      {
        label: 'Design',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: '<p>Lorem Ipsum is simply dummy text of the printing and typeseting industry Lorem in text Ipsum has been the industry standar dummyy text ever since the when an iunesi known.</p><ul class="list3 clearfix">\n\t<li>Multiple Layout</li>\n\t<li>Awesome Shortcodes</li>\n\t<li>Browser Compatibility</li>\n\t<li>Easy to Edit Animations</li>\n\t<li>Parallax Effect</li>\n\t<li>Responsive Design</li>\n\t<li>Many Home Page Versions</li>\n\t<li>Many Blog Pages</li>\n</ul>',
          },
        ],
      },
      {
        label: 'Programing',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: '<p>Lorem Ipsum is simply dummy text of the printing and typeseting industry Lorem in text Ipsum has been the industry standar dummyy text ever since the when an iunesi known.</p><ul class="list3 clearfix">\n\t<li>Multiple Layout</li>\n\t<li>Awesome Shortcodes</li>\n\t<li>Browser Compatibility</li>\n\t<li>Easy to Edit Animations</li>\n\t<li>Parallax Effect</li>\n\t<li>Responsive Design</li>\n\t<li>Many Home Page Versions</li>\n\t<li>Many Blog Pages</li>\n</ul>',
          },
        ],
      },
    ],
  },
};
