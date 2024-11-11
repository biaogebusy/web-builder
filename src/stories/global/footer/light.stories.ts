import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { BrandingModule } from '@core/branding/branding.module';
import { FooterComponent } from '@core/branding/footer/footer.component';
import {
  defaultHeader,
  footerLight,
} from '@modules/builder/data/Branding.json';
import { StorysModule } from '@core/module/storys.module';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<FooterComponent> = {
  title: '全局配置/页脚/浅色',
  id: 'footer-light',
  component: FooterComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ header: defaultHeader, footer: footerLight }),
        },
      ],
    }),
    componentWrapperDecorator(
      story => `
        <app-header></app-header>
        <div style="min-height:65vh">
        </div>
        <mat-divider></mat-divider>
        ${story}
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
        浅色风格
        ##
        "params": {
          "mode": "light"
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
      code: JSON.stringify(footerLight),
      language: 'json',
      type: 'auto',
    },
  },
};
