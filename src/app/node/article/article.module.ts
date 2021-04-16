import { NgModule } from '@angular/core';
import { ShareModule } from '../../share/share.module';
import { UiuxModule } from '../../uiux/uiux.module';
import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [ArticleComponent],
  imports: [ShareModule, UiuxModule],
  exports: [ArticleComponent],
})
export class ArticleModule {}
