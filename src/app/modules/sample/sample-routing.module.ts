import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleWidgetsComponent } from './sample-widgets/sample-widgets.component';

const routes: Routes = [
  {
    path: 'widgets',
    component: SampleWidgetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SampleRoutingModule {}
