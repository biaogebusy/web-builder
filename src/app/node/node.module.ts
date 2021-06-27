import { NgModule } from '@angular/core';
import { NodeRoutingModule } from './node-routing.module';
import { CaseComponent } from './case/case.component';
import { CaseNodeComponent } from './case/case-node/case-node.component';
import { JobComponent } from './job/job.component';
import { JobFilterComponent } from './job/job-filter/job-filter.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { JobNodeComponent } from './job/job-node/job-node.component';
import { ShareModule } from '../share/share.module';
import { CombsModule } from '../uiux/combs/combs.module';
import { WidgetsModule } from '../uiux/widgets/widgets.module';
import { ArticleBannerComponent } from './article/article-banner/article-banner.component';
import { ArticleComponent } from './article/article.component';

const components = [
  JobComponent,
  CaseComponent,
  ArticleComponent,
  JobNodeComponent,
  JobListComponent,
  CaseNodeComponent,
  JobFilterComponent,
  ArticleBannerComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, CombsModule, WidgetsModule, NodeRoutingModule],
  exports: [CaseNodeComponent, ArticleComponent],
})
export class NodeModule {}
