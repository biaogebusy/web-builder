import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { BlockComponent } from '@modules/render/block/block.component';
import { StorysModule } from '@core/module/storys.module';
import {
  defaultHeader,
  footerInverse,
} from '@modules/builder/data/Branding.json';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';
import { home_v2 } from '@stories/sample/home/data/home_v2';
import { importProvidersFrom } from '@angular/core';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { FooterComponent } from '@core/branding/footer/footer.component';
import { HeaderComponent } from '@core/branding/header/header.component';

const meta: Meta<BlockComponent> = {
  title: '示例页面/首页示例/02 服务介绍',
  id: 'home-v2',
  component: BlockComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [
        ...StorysModule.forEntryComponents(),
        SafeHtmlPipe,
        HeaderComponent,
        FooterComponent,
      ],
      providers: [
        {
          provide: BRANDING,
          useValue: of({
            header: defaultHeader,
            footer: footerInverse,
          }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      <app-header></app-header>
      ${story}
      <app-footer></app-footer>
    `,
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const content = of(home_v2);
type Story = StoryObj<BlockComponent>;
export const Page: Story = {};
// Raname Story
Page.storyName = '预览';
Page.args = {
  pageContent$: content,
};
