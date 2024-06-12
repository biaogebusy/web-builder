import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { BlockComponent } from '@modules/render/block/block.component';
import { RenderModule } from '@modules/render/render.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NodeModule } from '@uiux/combs/node/node.module';
import * as relateStory from '@stories/sample/node/Relate.stories';
import { manageHeader } from '@modules/builder/data/Branding.json';
const meta: Meta<MyComponent> = {
  title: '示例页面/中台管理/管理边栏',
  id: 'manage-sidebar',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        MatSidenavModule,
        RenderModule,
        NodeModule,
        BrandingModule,
        StorysModule.forRoot(),
      ],
      providers: [
        {
          provide: BRANDING,
          useValue: of({ header: manageHeader }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
    <mat-drawer-container>
      <mat-drawer #manageDrawer id="sidebar" class="sidebar" mode="side" [opened]="true">
        <app-manage-sidebar [drawer]="manageDrawer"></app-manage-sidebar>
      </mat-drawer>
      <mat-drawer-content id="main-container">
        <app-header *ngIf="!(isBuilderPage$|async)"></app-header>
        <div class="main" [ngClass]="{'has-manage-sidebar': true}">
          ${story}
        </div>
      </mat-drawer-content>
    </mat-drawer-container>
    `,
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
};

export default meta;
export const Page = Template.bind({});
const {
  Default: { args: relate },
} = relateStory as any;
// Raname Story
Page.storyName = '管理边栏';
const content = of({ title: '', body: [relate.content] });
Page.args = {
  pageContent$: content,
};
