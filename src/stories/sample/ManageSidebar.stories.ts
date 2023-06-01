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
import { BRANDING } from '@core/token/token-providers';
import brandingSidebar from '@assets/app/core/branding-sidebar.json';
import { of } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NodeModule } from '@uiux/combs/node/node.module';

export default {
  title: '示例页面/中台管理/管理边栏',
  id: 'manage-sidebar',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        MatSidenavModule,
        BlockModule,
        NodeModule,
        BrandingModule,
        StorysModule.forRoot(),
      ],
      providers: [
        {
          provide: BRANDING,
          useValue: of(brandingSidebar),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
    <mat-drawer-container>
      <mat-drawer id="sidebar" mode="side" class="sidebar">
        <app-manage-sidebar></app-manage-sidebar>
      </mat-drawer>
      <mat-drawer-content id="main-container">
        <app-header></app-header>
        <div class="main has-manage-sidebar">
              ${story}
        </div>
      </mat-drawer-content>
    </mat-drawer-container>
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
Page.storyName = '管理边栏';
