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
import { defaultHeader, footerInverse } from '../../global/Branding.json';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';
import { hero1v3V1 } from '@stories/builder/components/hero.builder';
import {
  showcase1v3_video,
  showcase2v1_card1v1,
  showcase3v6_background,
  showcase3v6_default,
  showcase3v9_reverse,
  showcase3v9_video,
  shwocase1v1_image,
} from '@stories/builder/components/showcase.builder';
import { carousel1v1 } from '@stories/builder/components/carousel.builder';
import { text } from '@stories/builder/widgets/base.builder';

export default {
  title: '示例页面/首页示例/04 应用介绍',
  id: 'home-v4',
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
  title: '首页 v4',
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
    hero1v3V1,
    shwocase1v1_image,
    showcase3v9_video,
    showcase3v9_reverse,
    showcase1v3_video,
    showcase3v6_background,
    carousel1v1,
    showcase2v1_card1v1,
    text,
  ],
});
Page.args = {
  pageContent$: content,
};
