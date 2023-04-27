import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { HeaderComponent } from '@core/branding/header/header.component';
import { BrandingModule } from '@core/branding/branding.module';
import { canvasHeader, footerInverse, megaHeader } from '../Branding.json';
import { sleep, StorysModule } from '@core/module/storys.module';

export default {
  title: '页面布局/页头/Canvas',
  id: 'header-canvas',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrandingModule, StorysModule.forRoot()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ ...canvasHeader, ...footerInverse }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      ${story}
        <div style="min-height:50vh">
        </div>
        <app-footer></app-footer>
    `
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '预览';
Default.parameters = {
  docs: {
    source: {
      code: JSON.stringify(canvasHeader),
      language: 'json',
      type: 'auto',
    },
  },
};

Default.play = async () => {
  const MenuComp = document.querySelectorAll('.for-test')[0];
  await userEvent.click(MenuComp);
  await sleep(2000);
  await userEvent.click(MenuComp);

  const SwithTheme = document.querySelectorAll('.switch-theme button')[0];
  await userEvent.click(SwithTheme);
  await sleep(2000);
  await userEvent.click(SwithTheme);

  await sleep(2000);
  const UserMenu = document.getElementsByClassName('user-picture')[0];
  await userEvent.click(UserMenu);
};
