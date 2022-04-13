import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ShowcaseModule } from '../showcase/showcase.module';
import { QuillModule } from 'ngx-quill';
import { CaseComponent } from './case/case.component';
import { CaseNodeComponent } from './case/case-node/case-node.component';
import { JobComponent } from './job/job.component';
import { JobFilterComponent } from './job/job-filter/job-filter.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { JobNodeComponent } from './job/job-node/job-node.component';
import { ArticleBannerComponent } from './article/article-banner/article-banner.component';
import { ArticleComponent } from './article/article.component';
import { QuestionComponent } from './question/question.component';
import { CommentComponent } from './question/comment/comment.component';
import { CommentFormComponent } from './question/comment/comment-form/comment-form.component';
import { CommentListComponent } from './question/comment/comment-list/comment-list.component';
import { ArticleMetaComponent } from './article/article-meta/article-meta.component';
import { ArticleCommentComponent } from './article/article-comment/article-comment.component';
import { ArticleCommentListComponent } from './article/article-comment-list/article-comment-list.component';
import { LawCaseComponent } from './law-case/law-case.component';
import { LawCaseFilesComponent } from './law-case/law-case-files/law-case-files.component';
import { LawCaseTableComponent } from './law-case/law-case-table/law-case-table.component';

const components = [
  JobComponent,
  CaseComponent,
  ArticleComponent,
  JobNodeComponent,
  JobListComponent,
  CaseNodeComponent,
  JobFilterComponent,
  ArticleBannerComponent,
  ArticleMetaComponent,
  QuestionComponent,
  LawCaseComponent,
  LawCaseFilesComponent,
  LawCaseTableComponent,
  CommentComponent,
  CommentFormComponent,
  CommentListComponent,
  ArticleCommentComponent,
  ArticleCommentListComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ShowcaseModule, QuillModule.forRoot()],
  exports: [
    CaseNodeComponent,
    CaseComponent,
    ArticleComponent,
    QuestionComponent,
    JobComponent,
    LawCaseComponent,
  ],
})
export class NodeModule {}
