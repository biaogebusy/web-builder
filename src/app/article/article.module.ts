import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { ArticleComponent } from './article.component';
@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, ShareModule],
})
export class ArticleModule {}
