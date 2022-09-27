import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG } from '../../app/core/token/core.config';
import { DropdownMenuComponent } from '../../app/uiux/widgets/dropdown-menu/dropdown-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
export default {
  title: '基础/下拉菜单',
  component: DropdownMenuComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        WidgetsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          userValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="width:40%" class="position-relative text-light">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: [
    {
      label: '内推',
      classes: 'bold',
      href: '#',
    },
    {
      label: '自习室',
      classes: 'bold',
      href: '#',
      queryParams: {
        demo: '466',
      },
      fragment: 'title',
    },
    {
      label: '案例',
      classes: 'bold',
      href: '#',
    },
    {
      label: '组件库',
      classes: 'bold',
      child: [
        {
          label: 'Hero',
          child: [
            {
              label: 'Hero 1v1',
              href: '/sample/combs/hero/hero1v1',
            },
            {
              label: 'Hero 1v2',
              href: '/sample/combs/hero/hero1v2',
            },
            {
              label: 'Hero 2v1',
              href: '/sample/combs/hero/hero2v1',
            },
            {
              label: 'Hero 2v2',
              href: '/sample/combs/hero/hero2v2',
            },
            {
              label: 'Hero 2v3',
              href: '/sample/combs/hero/hero2v3',
            },
          ],
        },
        {
          label: 'Showcase',
          child: [
            {
              label: 'Showcase 1v1',
              href: '/sample/combs/showcase/showcase1v1',
            },
            {
              label: 'Showcase 1v2',
              href: '/sample/combs/showcase/showcase1v2',
            },
            {
              label: 'Showcase 1v3',
              href: '/sample/combs/showcase/showcase1v3',
            },
            {
              label: 'Showcase 2v1',
              href: '/sample/combs/showcase/showcase2v1',
            },
            {
              label: 'Showcase 2v2',
              href: '/sample/combs/showcase/showcase2v2',
            },
            {
              label: 'Showcase 2v3',
              href: '/sample/combs/showcase/showcase2v3',
            },
            {
              label: 'Showcase 2v4',
              href: '/sample/combs/showcase/showcase2v4',
            },
            {
              label: 'Showcase 2v5',
              href: '/sample/combs/showcase/showcase2v5',
            },
            {
              label: 'Showcase 2v6',
              href: '/sample/combs/showcase/showcase2v6',
            },
            {
              label: 'Showcase 3v1',
              href: '/sample/combs/showcase/showcase3v1',
            },
            {
              label: 'Showcase 3v2',
              href: '/sample/combs/showcase/showcase3v2',
            },
            {
              label: 'Showcase 3v3',
              href: '/sample/combs/showcase/showcase3v3',
            },
            {
              label: 'Showcase 3v4',
              href: '/sample/combs/showcase/showcase3v4',
            },
            {
              label: 'Showcase 3v5',
              href: '/sample/combs/showcase/showcase3v5',
            },
            {
              label: 'Showcase 3v6',
              href: '/sample/combs/showcase/showcase3v6',
            },
            {
              label: 'Showcase 3v7',
              href: '/sample/combs/showcase/showcase3v7',
            },
            {
              label: 'Showcase 3v8',
              href: '/sample/combs/showcase/showcase3v8',
            },
            {
              label: 'Showcase 4v1',
              href: '/sample/combs/showcase/showcase4v1',
            },
          ],
        },
        {
          label: 'Carousel',
          href: 'javascript:void(0)',
          child: [
            {
              label: 'Carousel 1v1',
              href: '/sample/combs/carousel/carousel1v1',
            },
            {
              label: 'Carousel 1v2',
              href: '/sample/combs/carousel/carousel1v2',
            },
            {
              label: 'Carousel 1v3',
              href: '/sample/combs/carousel/carousel1v3',
            },
            {
              label: 'Carousel 1v4',
              href: '/sample/combs/carousel/carousel1v4',
            },
            {
              label: 'Carousel 2v1',
              href: '/sample/combs/carousel/carousel2v1',
            },
            {
              label: 'Carousel 2v2',
              href: '/sample/combs/carousel/carousel2v2',
            },
            {
              label: 'Line Year',
              href: '/sample/combs/carousel/lineyear',
            },
          ],
        },
        {
          label: 'Node',
          href: 'javascript:void(0)',
          child: [
            {
              label: 'Case',
              href: '/sample/node/case',
            },
            {
              label: 'Law Case',
              href: '/sample/node/law-case',
            },
            {
              label: 'Law Meeting',
              href: '/sample/node/law-meeting',
            },
            {
              label: 'Law Project',
              href: '/sample/node/law-project',
            },
            {
              label: 'article',
              href: '/sample/node/article',
            },
            {
              label: 'article v1 with comment',
              href: '/sample/node/article-v1',
            },
            {
              label: '问答',
              href: '/sample/node/question',
            },
            {
              label: 'User center',
              href: '/sample/combs/profile/user-center',
            },
            {
              label: 'Profile 1v1',
              href: '/sample/combs/profile/profile1v1',
            },
            {
              label: 'Profile 1v1 judge',
              href: '/sample/combs/profile/profile1v1-judge',
            },
            {
              label: 'Profile 1v1 handler',
              href: '/sample/combs/profile/profile1v1-handler',
            },
            {
              label: 'Profile 1v1 customer',
              href: '/sample/combs/profile/profile1v1-customer',
            },
            {
              label: 'Profile 1v1 court',
              href: '/sample/combs/profile/profile1v1-court',
            },
            {
              label: 'Dynamic Media List',
              href: '/sample/list/dynamic-media-list',
            },
            {
              label: 'Dynamic Card List',
              href: '/sample/list/dynamic-card-list',
            },
            {
              label: 'Dynamic Card List 1v1',
              href: '/sample/list/dynamic-card-list-1v1',
            },
            {
              label: 'Taxonomy list',
              href: '/sample/list/taxonomy-list',
            },
            {
              label: 'Taxonomy thin list',
              href: '/sample/list/taxonomy-thin-list',
            },
            {
              label: 'Tree list',
              href: '/sample/list/tree-list',
            },
            {
              label: 'Search index',
              href: '/sample/combs/search/search',
            },
          ],
        },
        {
          label: 'Widgets',
          href: 'javascript:void(0)',
          child: [
            {
              label: '通用文本组件',
              href: '/sample/widgets/text',
            },
            {
              label: 'Tab',
              href: '/sample/widgets/tab',
            },
            {
              label: 'View List',
              href: '/sample/list/view-list',
            },
            {
              label: 'Tab View List',
              href: '/sample/widgets/tab-view-list',
            },
            {
              label: 'Panel',
              href: '/sample/widgets/panel',
            },
            {
              label: 'Widgets',
              href: '/sample/widgets',
            },
          ],
        },
        {
          label: 'Action',
          href: 'javascript:void(0)',
          child: [
            {
              label: 'Action 1v1',
              href: '/sample/combs/action/action1v1',
            },
          ],
        },
        {
          label: 'Map',
          href: 'javascript:void(0)',
          child: [
            {
              label: 'Location',
              href: '/sample/combs/map/location',
            },
            {
              label: 'Map list v1',
              href: '/sample/combs/map/map-list-v1',
            },
          ],
        },
        {
          label: 'Other',
          href: 'javascript:void(0)',
          child: [
            {
              label: 'Shuffle',
              href: '/sample/combs/masonry/shuffle',
            },
            {
              label: 'Packery',
              href: '/sample/combs/masonry/packery',
            },
            {
              label: 'Packery content box',
              href: '/sample/combs/masonry/packery-content-box',
            },
            {
              label: 'Video bg',
              href: '/sample/combs/video/videobg',
            },
            {
              label: 'Banner',
              href: '/sample/combs/banner/banner-simple',
            },
            {
              label: 'Why Choose Us',
              href: '/sample/combs/other/whychooseus',
            },
            {
              label: 'Contact us',
              href: '/sample/combs/other/contact',
            },
            {
              label: 'Full calendar',
              href: '/sample/combs/calendar/full-calendar',
            },
          ],
        },
      ],
    },
    {
      label: '关于我们',
      classes: 'bold',
      href: '/sample/combs/other/contact',
      fragment: 'form',
    },
  ],
};
