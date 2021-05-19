import { NgModule } from '@angular/core';
import { NodeRoutingModule } from './node-routing.module';
import { CaseComponent } from './case/case.component';
import { BlogComponent } from './blog/blog.component';
import { CaseNodeComponent } from './case/case-node/case-node.component';
import { ArticleComponent } from './article/article.component';
import { JobComponent } from './job/job.component';
import { JobFilterComponent } from './job/job-filter/job-filter.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { JobNodeComponent } from './job/job-node/job-node.component';
import { ShareModule } from '../share/share.module';
import { CombsModule } from '../uiux/combs/combs.module';
import { WidgetsModule } from '../uiux/widgets/widgets.module';
import { NewsComponent } from './news/news.component';
import { ListComponent } from './list/list.component';
import { MediaListComponent } from './article/media-list/media-list.component';
import { MenuListComponent } from './article/menu-list/menu-list.component';
import { ArticleBannerComponent } from './article/article-banner/article-banner.component';

const components = [
  JobComponent,
  BlogComponent,
  NewsComponent,
  CaseComponent,
  ListComponent,
  JobNodeComponent,
  JobListComponent,
  ArticleComponent,
  MenuListComponent,
  CaseNodeComponent,
  MediaListComponent,
  JobFilterComponent,
  ArticleBannerComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, CombsModule, WidgetsModule, NodeRoutingModule],
  exports: [CaseNodeComponent, ArticleComponent],
})
export class NodeModule {}
