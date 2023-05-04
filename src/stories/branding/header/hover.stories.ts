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
import { footerInverse, HoverHeader } from '../Branding.json';
import { sleep, StorysModule } from '@core/module/storys.module';

export default {
  title: '页面布局/页头/Hover',
  id: 'header-hover',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrandingModule, StorysModule.forRoot()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ ...HoverHeader, ...footerInverse }),
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
      code: JSON.stringify(HoverHeader),
      language: 'json',
      type: 'auto',
    },
  },
};
