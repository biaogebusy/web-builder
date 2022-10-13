import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import * as Breadcrumb from 'src/stories/widgets/Breadcrumb.stories';
import { BannerSimpleComponent } from '@uiux/combs/banner/banner-simple/banner-simple.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '组件/横幅/简单横幅',
  id: 'banner-sample',
  component: BannerSimpleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `一般用在页面顶部，由标题、面包屑和背景图片组成。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const breadcrumb: any = Breadcrumb.Base.args;
Default.args = {
  content: {
    style: 'no-bg',
    title: '横幅',
    breadcrumb: breadcrumb.content,
  },
};
export const BannerWithBg = Template.bind({});
BannerWithBg.storyName = '横幅带背景图';
BannerWithBg.args = {
  content: {
    style: 'normal',
    bannerBg: {
      classes: 'bg-fill-width overlay',
      img: {
        hostClasses: 'bg-center',
        src: '/assets/images/banner-01.jpeg',
        alt: 'page title',
      },
    },
    title: Default.args.content.title,
    breadcrumb: breadcrumb.content,
  },
};
