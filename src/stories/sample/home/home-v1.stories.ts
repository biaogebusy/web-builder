import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/storys.module';
import { CarouselModule } from '@uiux/combs/carousel/carousel.module';
import { BrandingModule } from '@core/branding/branding.module';
import { Hero1v1Component } from '@uiux/combs/hero/hero1v1/hero1v1.component';
import { Hero1v2Component } from '@uiux/combs/hero/hero1v2/hero1v2.component';
import { Hero1v3Component } from '@uiux/combs/hero/hero1v3/hero1v3.component';
import { Hero2v1Component } from '@uiux/combs/hero/hero2v1/hero2v1.component';
import { Hero2v2Component } from '@uiux/combs/hero/hero2v2/hero2v2.component';
import { Hero2v3Component } from '@uiux/combs/hero/hero2v3/hero2v3.component';
import { Showcase1v1Component } from '@uiux/combs/showcase/showcase1v1/showcase1v1.component';
import { Showcase1v3Component } from '@uiux/combs/showcase/showcase1v3/showcase1v3.component';
import { Showcase2v1Component } from '@uiux/combs/showcase/showcase2v1/showcase2v1.component';
import { Showcase2v2Component } from '@uiux/combs/showcase/showcase2v2/showcase2v2.component';
import { Showcase2v3Component } from '@uiux/combs/showcase/showcase2v3/showcase2v3.component';
import { Showcase2v4Component } from '@uiux/combs/showcase/showcase2v4/showcase2v4.component';
import { Showcase2v5Component } from '@uiux/combs/showcase/showcase2v5/showcase2v5.component';
import { Showcase2v6Component } from '@uiux/combs/showcase/showcase2v6/showcase2v6.component';
import { Showcase3v1Component } from '@uiux/combs/showcase/showcase3v1/showcase3v1.component';
import { Showcase3v2Component } from '@uiux/combs/showcase/showcase3v2/showcase3v2.component';
import { Showcase3v3Component } from '@uiux/combs/showcase/showcase3v3/showcase3v3.component';
import { Showcase3v4Component } from '@uiux/combs/showcase/showcase3v4/showcase3v4.component';
import { Showcase3v5Component } from '@uiux/combs/showcase/showcase3v5/showcase3v5.component';
import { Showcase3v6Component } from '@uiux/combs/showcase/showcase3v6/showcase3v6.component';
import { Showcase3v7Component } from '@uiux/combs/showcase/showcase3v7/showcase3v7.component';
import { Showcase3v8Component } from '@uiux/combs/showcase/showcase3v8/showcase3v8.component';
import { Showcase3v9Component } from '@uiux/combs/showcase/showcase3v9/showcase3v9.component';
import { Showcase4v1Component } from '@uiux/combs/showcase/showcase4v1/showcase4v1.component';
import { ShowcaseModule } from '@uiux/combs/showcase/showcase.module';
import { Carousel1v1Component } from '@uiux/combs/carousel/carousel1v1/carousel1v1.component';
import { Carousel1v2Component } from '@uiux/combs/carousel/carousel1v2/carousel1v2.component';
import { Carousel1v3Component } from '@uiux/combs/carousel/carousel1v3/carousel1v3.component';
import { Carousel2v1Component } from '@uiux/combs/carousel/carousel2v1/carousel2v1.component';
import { Carousel2v2Component } from '@uiux/combs/carousel/carousel2v2/carousel2v2.component';
import { VideoBgComponent } from '@uiux/combs/video/video-bg/video-bg.component';
import { VideoModule } from '@uiux/combs/video/video.module';
import { BgComponent } from '@uiux/widgets/bg/bg.component';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { ShuffleComponent } from '@uiux/combs/masonry/shuffle/shuffle.component';
import { MapComponent } from '@uiux/widgets/map/map.component';
import { MasonryModule } from '@uiux/combs/masonry/masonry.module';
import { PackeryComponent } from '@uiux/combs/masonry/packery/packery.component';
import { BoxComponent } from '@uiux/widgets/box/box.component';

export default {
  title: '示例页面/首页示例/v1 经典布局',
  id: 'home-v1',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [BlockModule, BrandingModule, StorysModule.forRoot()],
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
