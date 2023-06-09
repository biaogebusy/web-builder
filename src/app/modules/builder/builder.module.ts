import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BlockModule } from '@uiux/combs/block/block.module';

@NgModule({
  declarations: [BuilderComponent],
  imports: [CommonModule, MatSidenavModule, BlockModule],
  exports: [BuilderComponent],
})
export class BuilderModule {}
