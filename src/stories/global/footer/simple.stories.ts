import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { defaultHeader, footerSimple } from '../Branding.json';
import { StorysModule } from '@core/module/storys.module';
import { FooterComponent } from '@core/branding/footer/footer.component';
import { BrandingModule } from '@core/branding/branding.module';

export default {
  title: '全局配置/页脚/简单',
  id: 'footer-simple',
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [BrandingModule, StorysModule.forRoot()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ header: defaultHeader, footer: footerSimple }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      <app-header></app-header>
       <div style="min-height:75vh">
        </div>
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
      code: JSON.stringify(footerSimple),
      language: 'json',
      type: 'auto',
    },
  },
};
