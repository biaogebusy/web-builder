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
  defaultHeader,
  footerInverse,
} from '@modules/builder/data/Branding.json';
import { StorysModule } from '@core/module/storys.module';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<HeaderComponent> = {
  title: '全局配置/页头/经典',
  id: 'header-default',
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
          useValue: of({ header: defaultHeader, footer: footerInverse }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      ${story}
        <div style="min-height:100vh">
        </div>
        <app-footer></app-footer>
    `,
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `Mage 风格的页头，当鼠标经过时下拉显示该主菜单的所有子菜单，可以方便快速查看导航菜单的内容，适合菜单过多时使用。`,
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
      code: JSON.stringify(defaultHeader),
      language: 'json',
      type: 'auto',
    },
  },
};
