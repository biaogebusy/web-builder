import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { ShareModule } from '../share/share.module';
import { UiuxModule } from '../uiux/uiux.module';
import { CaseComponent } from './case/case.component';
import { JobModule } from './job/job.module';

const components = [ArticleComponent];

@NgModule({
  declarations: [...components, CaseComponent],
  imports: [CommonModule, ShareModule, UiuxModule, JobModule],
  exports: [...components],
})
export class NodeModule {
  constructor(@Optional() @SkipSelf() parent: NodeModule) {
    if (parent) {
      throw new Error('NodeModule 模块已经存在，不能再加载！');
    }
  }
}
