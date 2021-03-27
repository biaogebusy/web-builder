import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from './widgets/widgets.module';
import { SkipSelf } from '@angular/core';
import { CombsModule } from './combs/combs.module';

const modules = [WidgetsModule, CombsModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class UiuxModule {
  /**
   * @SkipSelf 让模块去父级寻找依赖，不然会造成死循环
   * @Optional 可选，如果UiuxModule不存在正常执行
   * @param parent
   * @param iconRegistry
   * @param ds
   */
  constructor(@Optional() @SkipSelf() parent: UiuxModule) {
    if (parent) {
      throw new Error('uiux 模块已经存在，不能再加载！');
    }
  }
}
