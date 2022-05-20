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
import { CommentFormComponent } from './comment/comment-form/comment-form.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { ArticleMetaComponent } from './article/article-meta/article-meta.component';
import { LawCaseComponent } from './law/law-case/law-case.component';
import { LawFilesComponent } from './law/law-files/law-files.component';
import { LawTableComponent } from './law/law-table/law-table.component';
import { LawShowcaseComponent } from './law/law-showcase/law-showcase.component';
import { LawCardComponent } from './law/law-card/law-card.component';
import { LawHeaderComponent } from './law/law-header/law-header.component';
import { CommentActionsComponent } from './comment/comment-actions/comment-actions.component';

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
  LawFilesComponent,
  LawTableComponent,
  CommentFormComponent,
  CommentListComponent,
  LawShowcaseComponent,
  LawCardComponent,
  LawHeaderComponent,
  CommentActionsComponent,
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
