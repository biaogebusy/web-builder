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
import { carousel2v1 } from '@stories/builder/components/carousel.builder';
import { hero1v1 } from '@stories/builder/components/hero.builder';
import {
  showcase1v1Default,
  showcase2v1_default,
  showcase3v2_default,
  showcase3v6_default,
  showcase4v1_default,
} from '@stories/builder/components/showcase.builder';
import { videoBg } from '@stories/builder/widgets/media.builder';
import { shuffle } from '@stories/builder/components/masonry.builder';
import { text } from '@stories/builder/widgets/base.builder';

export default {
  title: '示例页面/首页示例/01 经典布局',
  id: 'home-v1',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [BlockModule, BrandingModule, StorysModule.forRoot()],
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
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
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
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
const content = of({
  title: '首页 | v1',
  meta: [
    {
      name: 'description',
      content:
        '信使是一个基于戴文 Dyniva 开源模块，围绕 Drupal jsonapi 为核心的 Angular 前端框架，分享 Drupal 优秀的数字创新体验。',
    },
    {
      name: 'keywords',
      content: 'angular,drupal,jsonapi,信使',
    },
  ],
  body: [
    hero1v1,
    showcase1v1Default,
    showcase3v2_default,
    showcase4v1_default,
    carousel2v1,
    showcase2v1_default,
    videoBg,
    showcase3v6_default,
    shuffle,
    text,
  ],
});
Page.args = {
  pageContent$: content,
};
