import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { BuilderUiuxComponent } from './sidebar/builder-uiux/builder-uiux.component';
import { BuilderSettingsComponent } from './sidebar/builder-settings/builder-settings.component';
import { PageListComponent } from './sidebar/page-list/page-list.component';
import { BuilderWorkspaceComponent } from './main/builder-workspace/builder-workspace.component';
import { ManagePageComponent } from './main/manage-page/manage-page.component';
import { BuilderGuard } from '@core/guards/builder.guard';
import { BuilderPageComponent } from './sidebar/builder-page/builder-page.component';
import { ConfigCheckComponent } from './main/config-check/config-check.component';
import { NodeAddComponent } from './node/node-add/node-add.component';

const routes: Routes = [
  {
    path: '',
    component: BuilderComponent,
    canActivate: [BuilderGuard],
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
        component: ConfigCheckComponent,
      },
      {
        path: 'node-add/:type',
        component: NodeAddComponent,
      },
      {
        path: '**',
        component: ManagePageComponent,
        canActivate: [BuilderGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuilderRoutingModule {}
