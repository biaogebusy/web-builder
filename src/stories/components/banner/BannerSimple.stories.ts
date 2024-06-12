import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';

import * as Breadcrumb from 'src/stories/widgets/Breadcrumb.stories';
import { BannerSimpleComponent } from '@uiux/combs/banner/banner-simple/banner-simple.component';
import { StorysModule } from '@core/module/storys.module';
import { IBannerSimple } from '@core/interface/combs/IBanner';

const meta: Meta<BannerSimpleComponent> = {
  title: '复合组件/横幅/简单横幅',
  id: 'banner-sample',
  component: BannerSimpleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `一般用在页面顶部，由标题、面包屑和背景图片组成。`,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<BannerSimpleComponent>;
export const Default: Story = {};
const breadcrumb: any = Breadcrumb.Base.args;
const defaultContent: IBannerSimple = {
  style: 'no-bg',
  type: 'banner-simple',
  title: '横幅',
  breadcrumb: breadcrumb.content,
};

Default.args = {
  content: defaultContent,
};

export const BannerWithBg: Story = {};
BannerWithBg.storyName = '横幅带背景图';
const BannerWithBgContent: IBannerSimple = {
  style: 'normal',
  type: 'banner-simple',
  bannerBg: {
    classes: 'bg-fill-width overlay overlay-',
    img: {
      hostClasses: '',
      src: '/assets/images/16-9/nature-08.jpg',
      alt: 'page title',
    },
  },
  title: Default.args.content.title,
  breadcrumb: breadcrumb.content,
};
BannerWithBg.args = {
  content: BannerWithBgContent,
};

export const BannerOverlay: Story = {};
BannerOverlay.storyName = '背景图不透明度';
const overlayContent: IBannerSimple = {
  style: 'normal',
  type: 'banner-simple',
  bannerBg: {
    classes: 'bg-fill-width overlay overlay-60',
    img: {
      hostClasses: '',
      src: '/assets/images/16-9/nature-08.jpg',
      alt: 'page title',
    },
  },
  title: Default.args.content.title,
  breadcrumb: breadcrumb.content,
};
BannerOverlay.args = {
  content: overlayContent,
};
