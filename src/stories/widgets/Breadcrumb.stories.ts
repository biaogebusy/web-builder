import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BreadcrumbComponent } from '@uiux/widgets/breadcrumb/breadcrumb.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
export default {
  title: 'Widgets/Breadcrumb',
  component: BreadcrumbComponent,
  decorators: [
    moduleMetadata({
      declarations: [LinkComponent, SafeHtmlPipe],
      imports: [ShareModule, BrowserAnimationsModule, RouterTestingModule],
    }),
    componentWrapperDecorator(
      (story) => `<div class="bg-primary bg-fill-width p-x p-y">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<BreadcrumbComponent> = (args) => ({
  component: BreadcrumbComponent,
  props: {
    ...args,
  },
});
export const Breadcrumb = Template.bind({});

Breadcrumb.args = {
  content: [
    {
      label: 'Home',
      href: '#',
    },
    {
      label: 'Contact Us',
      href: '/about',
    },
  ],
};
