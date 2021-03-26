import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share/share.module';
import { UiuxModule } from '../../uiux/uiux.module';
import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, ShareModule, UiuxModule],
  exports: [ArticleComponent],
})
export class ArticleModule {}
