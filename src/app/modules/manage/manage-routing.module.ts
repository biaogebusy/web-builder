import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageMediaComponent } from './manage-media/manage-media.component';

const routes: Routes = [
  {
    path: 'media',
    component: ManageMediaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule {}
