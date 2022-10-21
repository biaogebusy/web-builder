import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { BrandingModule } from '@core/branding/branding.module';
import { FooterComponent } from '@core/branding/footer/footer.component';
import { defaultHeader, footerLight } from '../Branding.json';
import { StorysModule } from '@core/storys.module';

export default {
  title: '页头页脚/页脚/浅色',
  id: 'footer-light',
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrandingModule, StorysModule.forRoot()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ ...footerLight, ...defaultHeader }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
        <app-header></app-header>
        <div style="min-height:85vh">
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
      code: JSON.stringify(footerLight),
      language: 'json',
      type: 'auto',
    },
  },
};
