import { NgModule } from '@angular/core';
import { NodeRoutingModule } from './node-routing.module';
import { CaseComponent } from './case/case.component';
import { CaseNodeComponent } from './case/case-node/case-node.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { JobComponent } from './job/job.component';
import { JobFilterComponent } from './job/job-filter/job-filter.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { JobNodeComponent } from './job/job-node/job-node.component';
import { ShareModule } from '../share/share.module';
import { CombsModule } from '../uiux/combs/combs.module';
import { WidgetsModule } from '../uiux/widgets/widgets.module';
import { ListComponent } from './list/list.component';
import { MediaListComponent } from './article/media-list/media-list.component';
import { MenuListComponent } from './article/menu-list/menu-list.component';
import { ArticleBannerComponent } from './article/article-banner/article-banner.component';
import { ArticleComponent } from './article/article.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ArticleListComponent } from './article-list/article-list.component';

const components = [
  JobComponent,
  NewsListComponent,
  CaseComponent,
  ListComponent,
  BlogListComponent,
  ArticleComponent,
  ArticleListComponent,
  SidebarComponent,
  JobNodeComponent,
  JobListComponent,
  MenuListComponent,
  CaseNodeComponent,
  MediaListComponent,
  JobFilterComponent,
  ArticleBannerComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, CombsModule, WidgetsModule, NodeRoutingModule],
  exports: [
    CaseNodeComponent,
    ArticleComponent,
    BlogListComponent,
    NewsListComponent,
    ArticleListComponent,
  ],
})
export class NodeModule {}
