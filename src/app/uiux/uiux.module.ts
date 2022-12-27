import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombsModule } from './combs/combs.module';

const modules = [CombsModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class UiuxModule {}
