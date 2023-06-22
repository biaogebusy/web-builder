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
import { hero1v4Default } from '@stories/builder/components/hero.builder';
import {
  showcase3v9_reverse,
  showcase3v9_video,
} from '@stories/builder/components/showcase.builder';
import { carousel1v3_client } from '@stories/builder/components/carousel.builder';
import { text } from '@stories/builder/widgets/base.builder';

export default {
  title: '示例页面/首页示例/07 Sass 服务',
  id: 'home-v7',
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
Page.storyName = '预览';
const content = of({
  title: '首页 v7 Sass',
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
    hero1v4Default,
    {
      type: 'showcase-1v1',
      title: {
        label: 'Our Trusted Clients',
        style: 'style-v2',
      },
      subTitle: {
        spacer: 'none',
        body: '<p class="text-center">可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。无论是一个还是多个站点，Drupal 总是可以游刃有余的构建。</p><br>',
      },
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      row: '4',
      elements: [
        {
          img: {
            src: '/assets/images/logo/amazon.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '高性能',
          },
          content:
            '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          img: {
            src: '/assets/images/logo/shopify.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '易用的编辑器',
          },
          content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          img: {
            src: '/assets/images/logo/google.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '多语言',
          },
          content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          img: {
            src: '/assets/images/logo/lenovo.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '更有弹性',
          },
          content: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
          more: {
            href: '#',
            label: '+',
          },
        },
      ],
    },
    showcase3v9_video,
    showcase3v9_reverse,
    carousel1v3_client,
    text,
  ],
});
Page.args = {
  pageContent$: content,
};
