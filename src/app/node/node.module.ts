import { NgModule, Optional, SkipSelf } from '@angular/core';
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

const components = [
  BlogComponent,
  NewsComponent,
  CaseComponent,
  CaseNodeComponent,
  ArticleComponent,
  JobComponent,
  JobFilterComponent,
  JobListComponent,
  JobNodeComponent,
  ListComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, CombsModule, WidgetsModule, NodeRoutingModule],
  exports: [CaseNodeComponent],
})
export class NodeModule {
  constructor(@Optional() @SkipSelf() parent: NodeModule) {
    if (parent) {
      throw new Error('NodeModule 模块已经存在，不能再加载！');
    }
  }
}
