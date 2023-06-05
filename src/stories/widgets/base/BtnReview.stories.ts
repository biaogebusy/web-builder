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
import { defaultHeader, footerInverse } from '../../branding/Branding.json';
export default {
  title: '基础组件/基本元素/按钮/预览',
  id: 'buttom-review',
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
Page.storyName = '预览';
const content = of({
  title: '按钮预览',
  body: [
    {
      type: 'text',
      spacer: 'sm',
      title: {
        label: 'Basic',
        style: 'style-v4',
      },
      animate: {
        disable: true,
      },
      actions: [
        {
          type: 'btn',
          label: 'Basic',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'Primary',
        },
        {
          type: 'btn',
          color: 'accent',
          label: 'accent',
        },
        {
          type: 'btn',
          color: 'warn',
          label: 'warn',
        },
        {
          type: 'btn',
          href: '/node/1',
          target: '_blank',
          label: 'link',
          color: 'primary',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'Icon',
          icon: {
            inline: true,
            name: 'delete',
          },
        },
      ],
    },
    {
      type: 'text',
      spacer: 'sm',
      title: {
        label: 'Raised',
        style: 'style-v4',
      },
      animate: {
        disable: true,
      },
      actions: [
        {
          type: 'btn',
          label: 'Basic',
          mode: 'raised',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'Primary',
          mode: 'raised',
        },
        {
          type: 'btn',
          color: 'accent',
          label: 'accent',
          mode: 'raised',
        },
        {
          type: 'btn',
          color: 'warn',
          label: 'warn',
          mode: 'raised',
        },
        {
          type: 'btn',
          href: '/node/1',
          target: '_blank',
          label: 'link',
          color: 'primary',
          mode: 'raised',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'Icon',
          icon: {
            inline: true,
            name: 'delete',
          },
          mode: 'raised',
        },
      ],
    },
    {
      type: 'text',
      spacer: 'sm',
      title: {
        label: 'Stroke',
        style: 'style-v4',
      },
      animate: {
        disable: true,
      },
      actions: [
        {
          type: 'btn',
          label: 'Basic',
          mode: 'stroked',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'Primary',
          mode: 'stroked',
        },
        {
          type: 'btn',
          color: 'accent',
          label: 'accent',
          mode: 'stroked',
        },
        {
          type: 'btn',
          color: 'warn',
          label: 'warn',
          mode: 'stroked',
        },
        {
          type: 'btn',
          href: '/node/1',
          target: '_blank',
          label: 'link',
          color: 'primary',
          mode: 'stroked',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'Icon',
          icon: {
            inline: true,
            name: 'delete',
          },
          mode: 'stroked',
        },
      ],
    },
    {
      type: 'text',
      spacer: 'sm',
      title: {
        label: 'Flat',
        style: 'style-v4',
      },
      animate: {
        disable: true,
      },
      actions: [
        {
          type: 'btn',
          label: 'Basic',
          mode: 'flat',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'Primary',
          mode: 'flat',
        },
        {
          type: 'btn',
          color: 'accent',
          label: 'accent',
          mode: 'flat',
        },
        {
          type: 'btn',
          color: 'warn',
          label: 'warn',
          mode: 'flat',
        },
        {
          type: 'btn',
          href: '/node/1',
          target: '_blank',
          label: 'link',
          color: 'primary',
          mode: 'flat',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'Icon',
          icon: {
            inline: true,
            name: 'delete',
          },
          mode: 'flat',
        },
        {
          type: 'btn',
          color: 'primary',
          mode: 'mini-fab',
          icon: {
            inline: true,
            name: 'more_vert',
          },
        },
      ],
    },
    {
      type: 'text',
      spacer: 'sm',
      title: {
        label: 'Icon',
        style: 'style-v4',
      },
      animate: {
        disable: true,
      },
      actions: [
        {
          type: 'btn',
          color: 'primary',
          mode: 'icon',
          icon: {
            name: 'more_vert',
          },
        },
      ],
    },
    {
      type: 'text',
      spacer: 'sm',
      title: {
        label: 'Other',
        style: 'style-v4',
      },
      animate: {
        disable: true,
      },
      actions: [
        {
          type: 'btn',
          href: '/?path=/story/welcome--page',
          label: 'Drawer 预览',
          mode: 'raised',
          color: 'primary',
          drawerIframe: true,
        },
        {
          type: 'btn-video',
          color: 'primary',
          video: {
            options: {
              controls: true,
              aspectRatio: '16:9',
              poster: '/assets/images/16-9/business-02.jpg',
              sources: [
                {
                  src: '/assets/video/afterglow.mp4',
                  type: 'video/mp4',
                },
              ],
            },
          },
        },
        {
          type: 'btn-animate',
          label: '查看更多',
          href: '#',
          style: 'style-v1',
          icon: 'open_in_new',
        },
      ],
    },
  ],
});
Page.args = {
  pageContent$: content,
};
