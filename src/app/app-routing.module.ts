import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobComponent } from './job/job.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {
    path: 'jobs',
    component: JobComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'articles',
    component: ArticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full',
  },

  // otherwise redirect to home
  {
    path: '**',
    loadChildren: './page-render/page-routing.module#PageRoutingModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
