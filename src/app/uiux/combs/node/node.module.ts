import { NgModule } from '@angular/core';
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
import { FormModule } from '@uiux/combs/form/form.module';
import { BannerSimpleComponent } from './banner-simple/banner-simple.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

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
  BannerSimpleComponent,
  BreadcrumbComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, FormModule, ShowcaseModule, QuillModule.forRoot()],
  exports: [
    ArticleComponent,
    QuestionComponent,
    ReportComponent,
    CommentFormComponent,
    CommentListComponent,
    CommentItemComponent,
    CommentActionsComponent,
  ],
})
export class NodeModule extends BaseModule {
  dynamicComponents = [ArticleComponent, QuestionComponent, ReportComponent];
}
