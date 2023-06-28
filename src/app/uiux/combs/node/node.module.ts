import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ShowcaseModule } from '../showcase/showcase.module';
import { QuillModule } from 'ngx-quill';
import { ArticleBannerComponent } from './article/article-banner/article-banner.component';
import { ArticleComponent } from './article/article.component';
import { QuestionComponent } from './question/question.component';
import { CommentFormComponent } from './comment/comment-form/comment-form.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { ArticleMetaComponent } from './article/article-meta/article-meta.component';
import { CommentActionsComponent } from './comment/comment-actions/comment-actions.component';
import { CommentItemComponent } from './comment/comment-list/comment-item/comment-item.component';
import { ReportComponent } from './report/report.component';
import { HeaderMetaComponent } from './header-meta/header-meta.component';
import { BaseModule } from '@uiux/base/base.module';
import { RelateComponent } from './relate/relate.component';
import { SummaryComponent } from './common/summary/summary.component';
import { SummaryItemComponent } from './common/summary/summary-item/summary-item.component';
import { RelateShowcaseComponent } from './common/relate-showcase/relate-showcase.component';

const components = [
  ArticleComponent,
  ArticleBannerComponent,
  ArticleMetaComponent,
  QuestionComponent,
  CommentFormComponent,
  CommentListComponent,
  CommentItemComponent,
  CommentActionsComponent,
  ReportComponent,
  HeaderMetaComponent,
  RelateComponent,
  SummaryComponent,
  SummaryItemComponent,
  RelateShowcaseComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ShowcaseModule, QuillModule.forRoot()],
  exports: [
    ArticleComponent,
    QuestionComponent,
    ReportComponent,
    CommentFormComponent,
    CommentListComponent,
    CommentItemComponent,
    CommentActionsComponent,
    RelateComponent,
  ],
})
export class NodeModule extends BaseModule {
  dynamicComponents = [
    ArticleComponent,
    QuestionComponent,
    ReportComponent,
    RelateComponent,
  ];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}
