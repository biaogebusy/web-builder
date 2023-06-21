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
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { defaultHeader, footerInverse } from '../../global/Branding.json';
import { hero1v3V2 } from '@stories/builder/components/hero.builder';
import {
  showcase1v3_video,
  showcase2v1_card1v1,
  showcase3v9_reverse,
  showcase3v9_video,
} from '@stories/builder/components/showcase.builder';
import {
  carousel1v2,
  carousel2v2,
} from '@stories/builder/components/carousel.builder';
import { action1v1 } from '@stories/builder/widgets/common.builder';
import { text } from '@stories/builder/widgets/base.builder';

export default {
  title: '示例页面/首页示例/06 医疗科技',
  id: 'home-v6',
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
const content = of({
  title: '首页 v6 医疗科技',
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
    showcase3v9_video,
    showcase3v9_reverse,
    showcase2v1_card1v1,
    carousel1v2,
    action1v1,
    carousel2v2,
    showcase1v3_video,
    text,
  ],
});
Page.storyName = '预览';
Page.args = {
  pageContent$: content,
};
