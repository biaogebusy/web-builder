import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBlockComponent } from './manage-block/manage-block.component';
import { ManageMediaComponent } from './manage-media/manage-media.component';

const routes: Routes = [
  {
    path: 'media',
    component: ManageMediaComponent,
  },
  {
    path: 'block',
    component: ManageBlockComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule {}
