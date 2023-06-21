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
import { hero2v3 } from '@stories/builder/components/hero.builder';
import {
  showcase1v1_v3,
  showcase2v1_card1v1,
  showcase3v4_background,
  showcase4v1_default,
} from '@stories/builder/components/showcase.builder';
import { action1v1 } from '@stories/builder/widgets/common.builder';
import { carousel1v1 } from '@stories/builder/components/carousel.builder';

export default {
  title: '示例页面/首页示例/02 服务介绍',
  id: 'home-v2',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
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
      ${story}
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

const content = of({
  title: '首页 v2',
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '法律科技',
    },
  ],
  config: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  body: [
    hero2v3,
    showcase1v1_v3,
    showcase2v1_card1v1,
    action1v1,
    showcase3v4_background,
    showcase4v1_default,
    carousel1v1,
  ],
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
Page.args = {
  pageContent$: content,
};
