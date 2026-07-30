import { Routes } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { BuilderUiuxComponent } from './sidebar/builder-uiux/builder-uiux.component';
import { BuilderSettingsComponent } from './sidebar/builder-settings/builder-settings.component';
import { PageListComponent } from './sidebar/page-list/page-list.component';
import { BuilderWorkspaceComponent } from './main/builder-workspace/builder-workspace.component';
import { ManagePageComponent } from './main/manage-page/manage-page.component';
import { BuilderPageComponent } from './sidebar/builder-page/builder-page.component';
import { superAdminGuard } from '@core/guards/super-admin.guard';
import {
  BUILDER_CURRENT_PAGE,
  UIUX,
  BUILDER_CONFIG,
  MEDIA_ASSETS,
  BUILDER_FULL_SCREEN,
  DEBUG_ANIMATE,
} from '@core/token/token-providers';
import {
  builderCurrentPageFactory,
  builderFullScreenFactory,
  debugAnimateFactory,
  getBuilderConfig,
  mediaAssetsFactory,
  uiuxFactory,
} from '@core/factory/factory';
import { MONACO_EDITOR_CONFIG_PROVIDER } from '@core/config/monaco-editor.config';

export const routes: Routes = [
  {
    path: '',
    component: BuilderComponent,
    providers: [
      MONACO_EDITOR_CONFIG_PROVIDER,
      {
        provide: BUILDER_CONFIG,
        useFactory: getBuilderConfig,
      },
      {
        provide: UIUX,
        useFactory: uiuxFactory,
      },
      {
        provide: BUILDER_CURRENT_PAGE,
        useFactory: builderCurrentPageFactory,
      },
      {
        provide: MEDIA_ASSETS,
        useFactory: mediaAssetsFactory,
      },
      {
        provide: BUILDER_FULL_SCREEN,
        useFactory: builderFullScreenFactory,
      },
      {
        provide: DEBUG_ANIMATE,
        useFactory: debugAnimateFactory,
      },
    ],
    children: [
      {
        path: '',
        component: BuilderWorkspaceComponent,
        children: [
          {
            path: '',
            component: BuilderUiuxComponent,
          },
          {
            path: 'pages/:name',
            component: BuilderPageComponent,
          },
          {
            path: 'page-list',
            component: PageListComponent,
          },
          {
            path: 'settings',
            component: BuilderSettingsComponent,
          },
        ],
      },
      {
        path: 'config-check',
        loadComponent: () =>
          import('./main/config-check/config-check.component').then(m => m.ConfigCheckComponent),
      },
      {
        path: 'edit-branding',
        loadChildren: () => import('./main/edit-branding/edit-branding.routes').then(m => m.routes),
      },
      {
        path: 'node-add',
        loadChildren: () => import('./node/node-add/node-add.routes').then(m => m.routes),
      },
      {
        path: 'manage-uiux',
        canActivate: [superAdminGuard],
        loadComponent: () =>
          import('./main/manage-uiux/manage-uiux.component').then(m => m.ManageUiuxComponent),
      },
      {
        path: '**',
        component: ManagePageComponent,
      },
    ],
  },
];
