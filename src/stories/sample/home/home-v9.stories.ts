import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { BlockComponent } from '@modules/render/block/block.component';
import { StorysModule } from '@core/module/storys.module';
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import {
  defaultHeader,
  footerInverse,
} from '@modules/builder/data/Branding.json';
import { home_v9 } from '@stories/sample/home/data/home_v9';
import { importProvidersFrom } from '@angular/core';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { FooterComponent } from '@core/branding/footer/footer.component';
import { HeaderComponent } from '@core/branding/header/header.component';

const meta: Meta<BlockComponent> = {
  title: '示例页面/首页示例/09 艺术科学',
  id: 'home-v9',
  component: BlockComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [
        ...StorysModule.forEntryComponents(),
        HeaderComponent,
        FooterComponent,
        SafeHtmlPipe,
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
type Story = StoryObj<BlockComponent>;
export const Page: Story = {};
// Raname Story
Page.storyName = '预览';
const content = of(home_v9);
Page.args = {
  pageContent$: content,
};
