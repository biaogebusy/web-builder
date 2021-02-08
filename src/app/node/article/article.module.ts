import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share/share.module';
import { ArticleComponent } from './article.component';
import { UiuxModule } from '../../uiux/uiux.module';
@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, ShareModule, UiuxModule],
})
export class ArticleModule {}
