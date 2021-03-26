import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { UiuxModule } from '../uiux/uiux.module';
import { JobModule } from './job/job.module';
import { CaseModule } from './case/case.module';
import { ArticleModule } from './article/article.module';

const modules = [JobModule, CaseModule, ArticleModule];
@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  exports: [...modules],
})
export class NodeModule {
  constructor(@Optional() @SkipSelf() parent: NodeModule) {
    if (parent) {
      throw new Error('NodeModule 模块已经存在，不能再加载！');
    }
  }
}
