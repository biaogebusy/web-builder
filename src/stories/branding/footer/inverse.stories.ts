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
import { defaultHeader, footerInverse } from '../Branding.json';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '页面布局/页脚/反色',
  id: 'footer-inverse',
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrandingModule, StorysModule.forRoot()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ ...footerInverse, ...defaultHeader }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
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
      code: JSON.stringify(footerInverse),
      language: 'json',
      type: 'auto',
    },
  },
};
