import { NgModule } from '@angular/core';
import { NodeRoutingModule } from './node-routing.module';
import { CaseComponent } from './case/case.component';
import { CaseNodeComponent } from './case/case-node/case-node.component';
import { JobComponent } from './job/job.component';
import { JobFilterComponent } from './job/job-filter/job-filter.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { JobNodeComponent } from './job/job-node/job-node.component';
import { ShareModule } from '@share/share.module';
import { CombsModule } from '@uiux/combs/combs.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ArticleBannerComponent } from './article/article-banner/article-banner.component';
import { ArticleComponent } from './article/article.component';
import { QuestionComponent } from './question/question.component';
import { CommentComponent } from './question/comment/comment.component';
import { CommentFormComponent } from './question/comment/comment-form/comment-form.component';
import { CommentListComponent } from './question/comment/comment-list/comment-list.component';
import { QuillModule } from 'ngx-quill';

const components = [
  JobComponent,
  CaseComponent,
  ArticleComponent,
  JobNodeComponent,
  JobListComponent,
  CaseNodeComponent,
  JobFilterComponent,
  ArticleBannerComponent,
  QuestionComponent,
  CommentComponent,
  CommentFormComponent,
  CommentListComponent,
];
@NgModule({
  declarations: [...components],
  imports: [
    ShareModule,
    CombsModule,
    WidgetsModule,
    NodeRoutingModule,
    QuillModule.forRoot(),
  ],
  exports: [CaseNodeComponent, ArticleComponent, QuestionComponent],
})
export class NodeModule {}
