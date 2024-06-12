import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { BlockComponent } from '@modules/render/block/block.component';
import { RenderModule } from '@modules/render/render.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import {
  defaultHeader,
  footerInverse,
} from '@modules/builder/data/Branding.json';
import { home_v6 } from '@stories/sample/home/data/home_v6';

const meta: Meta<MyComponent> = {
  title: '示例页面/首页示例/06 医疗科技',
  id: 'home-v6',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [StorysModule.forRoot(), RenderModule, BrandingModule],
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
      <div style="overflow:hidden">
      ${story}
      </div>
      <app-footer></app-footer>
    `,
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
export const Page = Template.bind({});
// Raname Story
const content = of(home_v6);
Page.storyName = '预览';
Page.args = {
  pageContent$: content,
};
