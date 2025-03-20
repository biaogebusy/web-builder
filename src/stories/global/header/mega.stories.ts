import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { HeaderComponent } from '@core/branding/header/header.component';
import { footerInverse, megaHeader } from '@modules/builder/data/Branding.json';
import { StorysModule } from '@core/module/storys.module';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<HeaderComponent> = {
  title: '全局配置/页头/Mage',
  id: 'header-mega',
  component: HeaderComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      providers: [
        {
          provide: BRANDING,
          useValue: of({ header: megaHeader, footer: footerInverse }),
        },
      ],
    }),
    componentWrapperDecorator(
      story => `
      ${story}
        <div style="min-height:50vh">
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
          menuHoverOpen: false,
        }
        `,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<HeaderComponent>;
export const Default: Story = {};
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
