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
import {
  footerInverse,
  HoverHeader,
} from '@modules/builder/data/Branding.json';
import { StorysModule } from '@core/module/storys.module';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<HeaderComponent> = {
  title: '全局配置/页头/Hover',
  id: 'header-hover',
  component: HeaderComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ header: HoverHeader, footer: footerInverse }),
        },
      ],
    }),
    componentWrapperDecorator(
      story => `
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
        component: `Hover 风格的菜单，当鼠标经过时下拉显示。
        ## 在params中定义显示
        params: {
          themeSwitch: true,
          userInfo: true,
          isMegaMenu: false,
          menuHoverOpen: true,
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
      code: JSON.stringify(HoverHeader),
      language: 'json',
      type: 'auto',
    },
  },
};
