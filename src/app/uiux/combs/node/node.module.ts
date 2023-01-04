import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ShowcaseModule } from '../showcase/showcase.module';
import { QuillModule } from 'ngx-quill';
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
import { CommentActionsComponent } from './comment/comment-actions/comment-actions.component';
import { CommentItemComponent } from './comment/comment-list/comment-item/comment-item.component';
import { ReportComponent } from './report/report.component';
import { AdvertComponent } from './advert/advert.component';
import { HeaderMetaComponent } from './header-meta/header-meta.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [
  JobComponent,
  ArticleComponent,
  JobNodeComponent,
  JobListComponent,
  JobFilterComponent,
  ArticleBannerComponent,
  ArticleMetaComponent,
  QuestionComponent,
  CommentFormComponent,
  CommentListComponent,
  CommentItemComponent,
  CommentActionsComponent,
  ReportComponent,
  AdvertComponent,
  HeaderMetaComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ShowcaseModule, QuillModule.forRoot()],
  exports: [
    ArticleComponent,
    QuestionComponent,
    JobComponent,
    ReportComponent,
    AdvertComponent,
  ],
})
export class NodeModule extends BaseModule {
  dynamicComponents = [
    ArticleComponent,
    QuestionComponent,
    JobComponent,
    ReportComponent,
    AdvertComponent,
  ];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}
