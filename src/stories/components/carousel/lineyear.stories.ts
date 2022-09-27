import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Carousel1v1Component } from '@uiux/combs/carousel/carousel1v1/carousel1v1.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
export default {
  title: '组件/幻灯片/时间轴',
  component: Carousel1v1Component,
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
      ],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'carousel-1v1',
    title: {
      label: 'XINSHI History',
      style: 'style-v1',
    },
    style: 'text-dark',
    bg: {
      classes: 'bg-white bg-fill-width',
      img: {
        src: '/assets/images/map.png',
        hostClasses: 'bg-center',
      },
    },
    sliders: {
      params: {
        slidesPerView: 1.2,
        spaceBetween: 20,
        navigation: false,
        breakpoints: {
          600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
      },
      classes: 'p-bottom',
      elements: [
        {
          type: 'line-year',
          title: '2013',
          body: '1.KingZone was established <br>2. The 1 st product Teasla VW came out, and got over 5 million hits on social media.',
        },
        {
          type: 'line-year',
          title: '2014',
          body: '1.Entered the U.S. market<br>2. Cooperated with more than 10 distributors',
        },
        {
          type: 'line-year',
          title: '2015',
          body: '1. Entered the European market<br>2. Exhibited internationally and established channel partnerships in many countries<br>3. Enriched product series',
        },
        {
          type: 'line-year',
          title: '2016',
          body: 'Developed domestic market',
        },
        {
          type: 'line-year',
          title: '2017',
          body: '1.Entered Tmall<br>2. Further enriched the products<br>Terminator 90 W kit, Steampunk series, WYE series got incredible success',
        },
        {
          type: 'line-year',
          title: '2018',
          body: '1. Made a breakthrough on the atomizer<br>2. Entered the device market<br>3. Brand strategy promotion',
        },
        {
          type: 'line-year',
          title: '2019',
          body: '1. Established CBD product lines<br>2. Built a new factory <br>3. Built a professional R & D center <br> 4. Got more than 60 patents in utility model, invention, and appearance design <br> 5. Acquired ISO9001: 2015 quality management certification ',
        },
        {
          type: 'line-year',
          title: '2020',
          body: '1.Passed GMP certification<br>2. The second factory was established, lean production was achieved<br>3. Total area of factory reached 32, 000 square meters, more than 1000 employees',
        },
      ],
    },
  },
};
