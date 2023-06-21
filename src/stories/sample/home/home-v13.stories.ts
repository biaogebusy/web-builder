import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { of } from 'rxjs';
import { defaultHeader, footerInverse } from '../../global/Branding.json';
import { BRANDING } from '@core/token/token-providers';
import { hero1v3V1, hero1v3V2 } from '@stories/builder/components/hero.builder';
import {
  carousel1v3_client,
  carousel2v2,
} from '@stories/builder/components/carousel.builder';
import {
  showcase1v1_primary,
  showcase1v3_video,
  showcase1v4_price,
  showcase3v6_background,
  showcase3v9_video,
  showcase4v1_img,
} from '@stories/builder/components/showcase.builder';
import { text } from '@stories/builder/widgets/base.builder';

export default {
  title: '示例页面/首页示例/13 现代商业',
  id: 'home-v13',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [StorysModule.forRoot(), BlockModule, BrandingModule],
      providers: [
        {
          provide: BRANDING,
          useValue: of({
            ...defaultHeader,
            ...footerInverse,
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
    `
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
const content = of({
  title: '现代商业',
  configBak: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '',
    },
  ],
  body: [
    hero1v3V2,
    carousel2v2,
    showcase1v1_primary,
    showcase3v9_video,
    showcase3v6_background,
    showcase4v1_img,
    showcase1v3_video,
    showcase1v4_price,
    showcase3v9_video,
    carousel1v3_client,
    text,
  ],
});
Page.args = {
  pageContent$: content,
};
