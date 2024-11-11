import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { FooterComponent } from '@core/branding/footer/footer.component';
import {
  defaultHeader,
  footerInverse,
} from '@modules/builder/data/Branding.json';
import { StorysModule } from '@core/module/storys.module';
import { importProvidersFrom } from '@angular/core';
import { HeaderComponent } from '@core/branding/header/header.component';

const meta: Meta<FooterComponent> = {
  title: '全局配置/页脚/反色',
  id: 'footer-inverse',
  component: FooterComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents(), HeaderComponent],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ header: defaultHeader, footer: footerInverse }),
        },
      ],
    }),
    componentWrapperDecorator(
      story => `
        <app-header></app-header>
        <div style="min-height:50vh">
        </div>
        ${story}
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
        反色风格
        ##
        "params": {
          "mode": "inverse",
          "shape": true,
        }
        `,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<FooterComponent>;
export const Default: Story = {};
Default.storyName = '预览';
Default.parameters = {
  docs: {
    source: {
      code: JSON.stringify(footerInverse),
      language: 'json',
      type: 'auto',
    },
  },
};
