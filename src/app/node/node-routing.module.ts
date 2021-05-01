import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { BlogComponent } from './blog/blog.component';
import { CaseComponent } from './case/case.component';
import { JobComponent } from './job/job.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  {
    path: 'jobs',
    component: JobComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'cases',
    component: CaseComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'blog',
    component: BlogComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'news',
    component: NewsComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NodeRoutingModule {}
