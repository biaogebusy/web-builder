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
import { footerInverse, megaHeader } from '../Branding.json';
import { sleep, StorysModule } from '@core/storys.module';

export default {
  title: '页头页脚/页头/Mage',
  id: 'header-mega',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrandingModule, StorysModule.forRoot()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ ...megaHeader, ...footerInverse }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      ${story}
        <div style="min-height:100vh">
        </div>
        <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `Mage 风格的页头，当鼠标经过时下拉显示该主菜单的所有子菜单，可以方便快速查看导航菜单的内容，适合菜单过多时使用。
        ## 在params中定义显示
        params: {
          themeSwitch: true,
          userInfo: true,
          isMegaMenu: true,
          menuHoverOpen: true,
        }
        `,
      },
    },
  },
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
      code: JSON.stringify(megaHeader),
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
