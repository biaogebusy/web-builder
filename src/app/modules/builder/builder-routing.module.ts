import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { PreviewComponent } from './preview/preview.component';
import { BuilderUiuxComponent } from './sidebar/builder-uiux/builder-uiux.component';
import { BuilderSampleComponent } from './sidebar/builder-sample/builder-sample.component';
import { BuilderSettingsComponent } from './sidebar/builder-settings/builder-settings.component';
import { PageListComponent } from './sidebar/page-list/page-list.component';
import { BuilderWorkspaceComponent } from './main/builder-workspace/builder-workspace.component';
import { ManagePageComponent } from './main/manage-page/manage-page.component';

const routes: Routes = [
  {
    path: '',
    component: BuilderComponent,
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
            path: 'samples',
            component: BuilderSampleComponent,
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
        path: 'preview',
        component: PreviewComponent,
      },
      {
        path: '**',
        component: ManagePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuilderRoutingModule {}
