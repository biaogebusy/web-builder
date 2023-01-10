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
import { AdvertComponent } from './advert/advert.component';
import { HeaderMetaComponent } from './header-meta/header-meta.component';
import { BaseModule } from '@uiux/base/base.module';
import { LawCaseComponent } from './law/law-case/law-case.component';
import { LawCardComponent } from './law/law-card/law-card.component';
import { LawFilesComponent } from './law/law-files/law-files.component';
import { LawHeaderComponent } from './law/law-header/law-header.component';
import { LawTabComponent } from './law/law-tab/law-tab.component';
import { LawTableComponent } from './law/law-table/law-table.component';
import { LawShowcaseComponent } from './law/law-showcase/law-showcase.component';

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
  AdvertComponent,
  HeaderMetaComponent,
  LawCaseComponent,
  LawCardComponent,
  LawFilesComponent,
  LawHeaderComponent,
  LawTabComponent,
  LawTableComponent,
  LawShowcaseComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ShowcaseModule, QuillModule.forRoot()],
  exports: [
    ArticleComponent,
    QuestionComponent,
    ReportComponent,
    AdvertComponent,
    LawCaseComponent,
  ],
})
export class NodeModule extends BaseModule {
  dynamicComponents = [
    ArticleComponent,
    QuestionComponent,
    ReportComponent,
    AdvertComponent,
    LawCaseComponent,
  ];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}
