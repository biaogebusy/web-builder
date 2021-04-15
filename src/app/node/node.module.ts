import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobModule } from './job/job.module';
import { CaseModule } from './case/case.module';
import { ArticleModule } from './article/article.module';
import { NodeRoutingModule } from './node-routing.module';

const modules = [JobModule, CaseModule, ArticleModule, NodeRoutingModule];
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
