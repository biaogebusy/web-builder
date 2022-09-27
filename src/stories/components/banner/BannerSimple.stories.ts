import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
import * as Breadcrumb from 'src/stories/widgets/Breadcrumb.stories';
import { ShareModule } from '@share/share.module';
import { BannerSimpleComponent } from '@uiux/combs/banner/banner-simple/banner-simple.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
export default {
  title: '组件/横幅/简单横幅',
  component: BannerSimpleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
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
