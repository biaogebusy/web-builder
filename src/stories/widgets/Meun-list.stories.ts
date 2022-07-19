import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/core.config';
import { ShareModule } from '@share/share.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { MenuListComponent } from '@uiux/widgets/menu-list/menu-list.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: 'Widgets/Menu list',
  component: MenuListComponent,
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
  ],
} as Meta;

const Template: Story<MenuListComponent> = (args) => ({
  component: MenuListComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    title: '标签',
    elements: [
      {
        link: {
          href: '#',
          label: 'Angular',
        },
        label: '3',
      },
      {
        link: {
          href: '#',
          label: 'Drupal',
        },
        label: '3',
      },
      {
        link: {
          href: '#',
          label: 'Jsonapi',
        },
        label: '2',
      },
    ],
  },
};
