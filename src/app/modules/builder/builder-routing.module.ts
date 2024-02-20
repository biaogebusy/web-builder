import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuilderComponent } from './builder.component';
import { PreviewComponent } from './preview/preview.component';
import { BuilderUiuxComponent } from './sidebar/builder-uiux/builder-uiux.component';
import { BuilderSampleComponent } from './sidebar/builder-sample/builder-sample.component';
import { BuilderSettingsComponent } from './sidebar/builder-settings/builder-settings.component';

const routes: Routes = [
  {
    path: '',
    component: BuilderComponent,
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
        path: 'settings',
        component: BuilderSettingsComponent,
      },
    ],
  },
  {
    path: 'preview',
    component: PreviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuilderRoutingModule {}
