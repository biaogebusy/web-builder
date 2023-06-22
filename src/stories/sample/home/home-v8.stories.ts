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
import { BRANDING } from '@core/token/token-providers';
import { defaultHeader, footerInverse } from '../../global/Branding.json';
import { hero1v4Shape } from '@stories/builder/components/hero.builder';
import {
  carousel1v3_client,
  carousel2v2,
} from '@stories/builder/components/carousel.builder';
import {
  showcase3v6_background,
  showcase3v9_video,
  showcase4v1_img,
} from '@stories/builder/components/showcase.builder';
import { text } from '@stories/builder/widgets/base.builder';
export default {
  title: '示例页面/首页示例/08 应用市场',
  id: 'home-v8',
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
const content = of({
  title: '首页 v8 Marketing',
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
    hero1v4Shape,
    carousel2v2,
    showcase3v6_background,
    showcase3v9_video,
    carousel1v3_client,
    showcase4v1_img,
    text,
  ],
});
Page.storyName = '预览';
Page.args = {
  pageContent$: content,
};
