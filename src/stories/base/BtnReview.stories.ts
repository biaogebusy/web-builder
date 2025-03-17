import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { BlockComponent } from '@modules/render/block/block.component';
import { StorysModule } from '@core/module/storys.module';
import { of } from 'rxjs';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import { importProvidersFrom } from '@angular/core';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { MatIcon } from '@angular/material/icon';

const meta: Meta<BlockComponent> = {
  title: '基本元素/按钮/预览',
  id: 'buttom-review',
  component: BlockComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [DynamicComponentComponent, SafeHtmlPipe, ReqRolesDirective, MatIcon],
    }),
    componentWrapperDecorator(
      story => `
      <app-header></app-header>
      <div class="widget" style="overflow:hidden">
      ${story}
      </div>
      <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<BlockComponent>;
const {
  Default: {
    args: { content: btnVideo },
  },
} = btnVideoStory as any;

export const Page: Story = {};
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
        {
          type: 'btn',
          color: 'primary',
          label: 'MDI Icon',
          icon: {
            inline: true,
            svg: 'delete',
          },
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'disabled',
          disabled: true,
          icon: {
            inline: true,
            svg: 'delete',
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
        {
          type: 'btn',
          color: 'primary',
          label: 'MDI Icon',
          icon: {
            inline: true,
            svg: 'progress-download',
          },
          mode: 'raised',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'disabled',
          disabled: true,
          icon: {
            inline: true,
            svg: 'progress-download',
          },
          mode: 'raised',
        },
      ],
    },
    {
      type: 'text',
      spacer: 'sm',
      title: {
        label: 'Stroked',
        style: 'style-v4',
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
        {
          type: 'btn',
          color: 'primary',
          label: 'MDI Icon',
          icon: {
            inline: true,
            svg: 'delete',
          },
          mode: 'stroked',
        },
        {
          type: 'btn',
          color: 'primary',
          label: 'disabled',
          disabled: true,
          icon: {
            inline: true,
            svg: 'delete',
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
        {
          type: 'btn',
          color: 'primary',
          mode: 'mini-fab',
          icon: {
            inline: true,
            svg: 'delete',
          },
        },
        {
          type: 'btn',
          color: 'primary',
          mode: 'mini-fab',
          disabled: true,
          icon: {
            inline: true,
            svg: 'delete',
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
      actions: [
        {
          type: 'btn',
          color: 'primary',
          mode: 'icon',
          icon: {
            svg: 'react',
          },
        },
        {
          type: 'btn',
          color: 'primary',
          mode: 'icon',
          icon: {
            svg: 'delete',
          },
        },
        {
          type: 'btn',
          color: 'primary',
          mode: 'icon',
          disabled: true,
          icon: {
            svg: 'eye-outline',
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
          ...btnVideo,
          color: 'primary',
        },
      ],
    },
  ],
});
Page.args = {
  pageContent$: content,
};
